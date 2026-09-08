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

  // ── 1. Verify Bearer token + super_admin ────────────────────────────────
  const authHeader = getHeader(event, 'authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
  const sessionToken = authHeader.slice(7)
  const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(sessionToken)
  if (authError || !user) throw createError({ statusCode: 401, statusMessage: 'Invalid session' })

  const { data: callerProfile } = await supabaseAdmin
    .from('profiles').select('role').eq('id', user.id).single()
  if (callerProfile?.role !== 'super_admin') {
    throw createError({ statusCode: 403, statusMessage: 'Only super admins can send password resets' })
  }

  // ── 2. Look up target user email ─────────────────────────────────────────
  const targetId = getRouterParam(event, 'id')
  const { data: targetProfile } = await supabaseAdmin
    .from('profiles').select('email, full_name').eq('id', targetId).maybeSingle()

  if (!targetProfile) {
    throw createError({ statusCode: 404, statusMessage: 'Admin user not found' })
  }

  // ── 3. Clear existing unused reset tokens for this user ──────────────────
  await supabaseAdmin.from('admin_password_resets').delete().eq('user_id', targetId).is('used_at', null)

  // ── 4. Generate token + hash ─────────────────────────────────────────────
  const rawToken  = randomBytes(32).toString('hex')
  const tokenHash = createHash('sha256').update(rawToken).digest('hex')
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString()

  const { error: insertError } = await supabaseAdmin.from('admin_password_resets').insert({
    user_id:    targetId,
    token_hash: tokenHash,
    expires_at: expiresAt,
  })
  if (insertError) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to create reset token' })
  }

  // ── 5. Build reset link + email HTML ─────────────────────────────────────
  const baseUrl   = config.public.siteUrl || `https://${getHeader(event, 'host')}`
  const resetLink = `${baseUrl}/admin/reset-password?token=${rawToken}`
  const firstName = targetProfile.full_name?.split(' ')[0] ?? 'there'

  const htmlContent = `
    <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:32px;background:#0d1610;border-radius:16px;border:1px solid rgba(255,255,255,0.08);">
      <div style="margin-bottom:24px;">
        <span style="display:inline-block;background:rgba(239,68,68,0.2);color:#fca5a5;font-size:0.7rem;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;padding:4px 10px;border-radius:99px;border:1px solid rgba(239,68,68,0.3);">Password Reset</span>
      </div>
      <h2 style="color:#f0e8dc;font-size:1.5rem;margin:0 0 12px;">Password Reset Requested</h2>
      <p style="color:rgba(240,232,220,0.65);font-size:0.95rem;line-height:1.65;margin:0 0 8px;">
        Hi ${firstName}, your password for your <strong style="color:#f0e8dc;">Ethno Kenia Adventures</strong> admin account has been reset by an administrator.
      </p>
      <p style="color:rgba(240,232,220,0.5);font-size:0.875rem;margin:0 0 32px;">
        Click the button below to set a new password. This link expires in <strong style="color:#f0e8dc;">30 minutes</strong>.
      </p>
      <a href="${resetLink}"
         style="display:inline-block;background:#c4714e;color:white;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:600;font-size:0.95rem;">
        Set New Password &rarr;
      </a>
      <p style="color:rgba(240,232,220,0.28);font-size:0.78rem;margin:32px 0 0;line-height:1.6;">
        If you did not expect this, contact your super admin immediately.<br/>
        This link will expire at ${new Date(expiresAt).toUTCString()}.
      </p>
    </div>
  `

  // ── 6. Send email (simulate in dev if SMTP missing) ──────────────────────
  if (!config.smtpHost || !config.smtpUser || !config.smtpPass) {
    console.warn('[send-password-reset] SMTP not configured — simulating')
    console.log('[send-password-reset] Reset link:', resetLink)
    await supabaseAdmin.from('audit_logs').insert({
      admin_id: user.id, action: 'SEND_PASSWORD_RESET', target_id: targetId,
      details: { target_email: targetProfile.email },
    })
    return { success: true, simulated: true, reset_link: resetLink }
  }

  const smtpPort = Number(config.smtpPort || 465)
  const transporter = nodemailer.createTransport({
    host: config.smtpHost as string, port: smtpPort, secure: smtpPort === 465,
    auth: { user: config.smtpUser as string, pass: config.smtpPass as string },
    tls: { rejectUnauthorized: false },
  })

  await transporter.sendMail({
    from:    `"Ethno Kenia Adventures" <${config.smtpUser}>`,
    to:      targetProfile.email,
    subject: 'Password reset for your Ethno Kenia Adventures admin account',
    html:    htmlContent,
  })

  // ── 7. Audit log ─────────────────────────────────────────────────────────
  await supabaseAdmin.from('audit_logs').insert({
    admin_id: user.id, action: 'SEND_PASSWORD_RESET', target_id: targetId,
    details: { target_email: targetProfile.email },
  })

  return { success: true }
})
