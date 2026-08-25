import { createClient } from '@supabase/supabase-js'
import nodemailer from 'nodemailer'
import { randomBytes, createHash } from 'node:crypto'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  if (!config.public.supabaseUrl || !config.supabaseServiceKey) {
    throw createError({ statusCode: 500, statusMessage: 'Server configuration error' })
  }

  const supabaseAdmin = createClient(
    config.public.supabaseUrl as string,
    config.supabaseServiceKey as string,
  )

  // ── 1. Verify Bearer token + super_admin role ────────────────────────────
  const authHeader = getHeader(event, 'authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const sessionToken = authHeader.slice(7)
  const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(sessionToken)
  if (authError || !user) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid session' })
  }

  const { data: callerProfile } = await supabaseAdmin
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (callerProfile?.role !== 'super_admin') {
    throw createError({ statusCode: 403, statusMessage: 'Only super admins can send invitations' })
  }

  // ── 2. Validate body ─────────────────────────────────────────────────────
  const body = await readBody(event)
  const { email, role } = body

  if (!email || !role) {
    throw createError({ statusCode: 400, statusMessage: 'email and role are required' })
  }
  if (!['admin', 'super_admin'].includes(role)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid role' })
  }

  // ── 3. Clear any existing pending invites for this email ─────────────────
  await supabaseAdmin
    .from('admin_invitations')
    .delete()
    .eq('email', email)
    .is('used_at', null)

  // ── 4. Generate token + hash ─────────────────────────────────────────────
  const rawToken = randomBytes(32).toString('hex')
  const tokenHash = createHash('sha256').update(rawToken).digest('hex')
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString()

  // ── 5. Persist invitation ────────────────────────────────────────────────
  const { error: insertError } = await supabaseAdmin
    .from('admin_invitations')
    .insert({
      email,
      role,
      token_hash: tokenHash,
      expires_at: expiresAt,
      invited_by: user.id,
    })

  if (insertError) {
    console.error('[invite] DB insert error:', insertError)
    throw createError({ statusCode: 500, statusMessage: 'Failed to create invitation' })
  }

  // ── 6. Build invite link + email HTML ────────────────────────────────────
  const baseUrl = config.public.siteUrl || `https://${getHeader(event, 'host')}`
  const inviteLink = `${baseUrl}/admin/accept-invite?token=${rawToken}`
  const roleLabel = role.replace('_', ' ')

  const htmlContent = `
    <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:32px;background:#0d1610;border-radius:16px;border:1px solid rgba(255,255,255,0.08);">
      <div style="margin-bottom:24px;">
        <span style="display:inline-block;background:#c4714e;color:white;font-size:0.7rem;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;padding:4px 10px;border-radius:99px;">Admin Invitation</span>
      </div>
      <h2 style="color:#f0e8dc;font-size:1.6rem;margin:0 0 12px;">You're Invited to Join the Team</h2>
      <p style="color:rgba(240,232,220,0.65);font-size:0.95rem;line-height:1.65;margin:0 0 8px;">
        You have been invited to join <strong style="color:#f0e8dc;">Ethno Kenia Adventures</strong> as a
        <strong style="color:#c4714e;">${roleLabel}</strong>.
      </p>
      <p style="color:rgba(240,232,220,0.5);font-size:0.875rem;margin:0 0 32px;">
        Click the button below to set up your account. This link expires in 30 minutes.
      </p>
      <a href="${inviteLink}"
         style="display:inline-block;background:#c4714e;color:white;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:600;font-size:0.95rem;">
        Accept Invitation &rarr;
      </a>
      <p style="color:rgba(240,232,220,0.28);font-size:0.78rem;margin:32px 0 0;line-height:1.6;">
        If you did not expect this invitation, you can safely ignore this email.<br />
        This link will expire at ${new Date(expiresAt).toUTCString()}.
      </p>
    </div>
  `

  // ── 7. Send email (simulate in dev if SMTP missing) ──────────────────────
  if (!config.smtpHost || !config.smtpUser || !config.smtpPass) {
    console.warn('[invite] SMTP not configured — simulating email send')
    console.log('[invite] Invite link:', inviteLink)
    await supabaseAdmin.from('audit_logs').insert({
      admin_id:  user.id,
      action:    'INVITE_ADMIN',
      target_id: user.id,
      details:   { invited_email: email, role, expires_at: expiresAt },
    })
    return { success: true, simulated: true, invite_link: inviteLink }
  }

  const smtpPort = Number(config.smtpPort || 465)
  const transporter = nodemailer.createTransport({
    host:   config.smtpHost as string,
    port:   smtpPort,
    secure: smtpPort === 465,
    auth:   { user: config.smtpUser as string, pass: config.smtpPass as string },
    tls:    { rejectUnauthorized: false },
  })

  await transporter.sendMail({
    from:    `"Ethno Kenia Adventures" <${config.smtpUser}>`,
    to:      email,
    subject: `You've been invited to join the Ethno Kenia Adventures admin team`,
    html:    htmlContent,
  })

  // ── 8. Audit log ─────────────────────────────────────────────────────────
  await supabaseAdmin.from('audit_logs').insert({
    admin_id:  user.id,
    action:    'INVITE_ADMIN',
    target_id: user.id,
    details:   { invited_email: email, role, expires_at: expiresAt },
  })

  return { success: true }
})
