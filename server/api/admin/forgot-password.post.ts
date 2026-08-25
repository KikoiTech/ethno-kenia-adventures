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

  const body = await readBody(event)
  const email = String(body.email ?? '').trim().toLowerCase()

  if (!email) {
    throw createError({ statusCode: 400, statusMessage: 'Email is required' })
  }

  // Always return success to prevent email enumeration
  const successResponse = { success: true }

  // ── Look up admin profile by email ───────────────────────────────────────
  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('id, full_name, email')
    .eq('email', email)
    .in('role', ['admin', 'super_admin'])
    .maybeSingle()

  // No profile → still return success (don't reveal if email exists)
  if (!profile) return successResponse

  // ── Clear existing unused reset tokens ───────────────────────────────────
  await supabaseAdmin.from('admin_password_resets').delete().eq('user_id', profile.id).is('used_at', null)

  // ── Generate token + hash ────────────────────────────────────────────────
  const rawToken  = randomBytes(32).toString('hex')
  const tokenHash = createHash('sha256').update(rawToken).digest('hex')
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString()

  const { error: insertError } = await supabaseAdmin.from('admin_password_resets').insert({
    user_id:    profile.id,
    token_hash: tokenHash,
    expires_at: expiresAt,
  })
  if (insertError) return successResponse // silently fail — don't reveal internal errors

  // ── Build reset link + email HTML ────────────────────────────────────────
  const baseUrl   = config.public.siteUrl || `https://${getHeader(event, 'host')}`
  const resetLink = `${baseUrl}/admin/reset-password?token=${rawToken}`
  const firstName = profile.full_name?.split(' ')[0] ?? 'there'

  const htmlContent = `
    <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:32px;background:#0d1610;border-radius:16px;border:1px solid rgba(255,255,255,0.08);">
      <div style="margin-bottom:24px;">
        <span style="display:inline-block;background:rgba(239,68,68,0.2);color:#fca5a5;font-size:0.7rem;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;padding:4px 10px;border-radius:99px;border:1px solid rgba(239,68,68,0.3);">Password Reset</span>
      </div>
      <h2 style="color:#f0e8dc;font-size:1.5rem;margin:0 0 12px;">Reset Your Password</h2>
      <p style="color:rgba(240,232,220,0.65);font-size:0.95rem;line-height:1.65;margin:0 0 8px;">
        Hi ${firstName}, we received a request to reset the password for your <strong style="color:#f0e8dc;">Ethno Kenia Adventures</strong> admin account.
      </p>
      <p style="color:rgba(240,232,220,0.5);font-size:0.875rem;margin:0 0 32px;">
        Click the button below to set a new password. This link expires in <strong style="color:#f0e8dc;">30 minutes</strong>.
      </p>
      <a href="${resetLink}"
         style="display:inline-block;background:#c4714e;color:white;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:600;font-size:0.95rem;">
        Reset Password &rarr;
      </a>
      <p style="color:rgba(240,232,220,0.28);font-size:0.78rem;margin:32px 0 0;line-height:1.6;">
        If you didn't request a password reset, you can safely ignore this email.<br/>
        This link will expire at ${new Date(expiresAt).toUTCString()}.
      </p>
    </div>
  `

  if (!config.smtpHost || !config.smtpUser || !config.smtpPass) {
    console.warn('[forgot-password] SMTP not configured — simulating')
    console.log('[forgot-password] Reset link:', resetLink)
    return successResponse
  }

  const smtpPort = Number(config.smtpPort || 465)
  const transporter = nodemailer.createTransport({
    host: config.smtpHost as string, port: smtpPort, secure: smtpPort === 465,
    auth: { user: config.smtpUser as string, pass: config.smtpPass as string },
    tls: { rejectUnauthorized: false },
  })

  try {
    await transporter.sendMail({
      from:    `"Ethno Kenia Adventures" <${config.smtpUser}>`,
      to:      profile.email,
      subject: 'Reset your Ethno Kenia Adventures admin password',
      html:    htmlContent,
    })
  } catch (err) {
    console.error('[forgot-password] Email send error:', err)
    // Don't reveal email errors to the caller
  }

  return successResponse
})
