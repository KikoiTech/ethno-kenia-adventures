import { defineEventHandler, readBody, createError } from 'h3'
import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const isBooking = body.type === 'booking'
  const config = useRuntimeConfig(event)

  // Determine email content based on type
  const subject = isBooking 
    ? `New Booking Inquiry: ${body.safariName}`
    : `New Website Inquiry`
  
  const title = isBooking ? 'New Safari Booking Inquiry' : 'New Website Inquiry'
  
  let htmlContent = `
    <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
      <h2 style="color: #A25035;">${title}</h2>
      <p><strong>Name:</strong> ${body.name || body.firstName + ' ' + body.lastName}</p>
      <p><strong>Email:</strong> ${body.email}</p>
      <p><strong>Phone:</strong> ${body.phone || 'N/A'}</p>
  `

  if (isBooking) {
    htmlContent += `
      <p><strong>Safari:</strong> ${body.safariName}</p>
      <p><strong>Country of Origin:</strong> ${body.country || 'N/A'}</p>
      <p><strong>Preferred Date:</strong> ${body.travelDate || 'Flexible'}</p>
      <p><strong>Adults:</strong> ${body.adults || 'N/A'}</p>
      <p><strong>Children:</strong> ${body.children || '0'}</p>
    `
  }

  htmlContent += `
      <hr style="border: none; border-top: 1px solid #eee;" />
      <p><strong>Message:</strong></p>
      <p>${(body.message || body.extraDetails || '').replace(/\n/g, '<br>')}</p>
    </div>
  `

  // Check if SMTP configuration exists
  if (!config.smtpHost || !config.smtpUser || !config.smtpPass) {
    console.warn('⚠️ SMTP credentials not found in environment variables.')
    console.warn('Simulating email send for local development. Content:')
    console.log(htmlContent)
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    return { success: true, simulated: true }
  }

  // Configure Transporter for Truehost/cPanel
  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: Number(config.smtpPort || 465),
    secure: Number(config.smtpPort) === 465, // Use true for port 465
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
    // Truehost shared servers sometimes require this to prevent SSL errors
    tls: {
      rejectUnauthorized: false 
    }
  })

  try {
    await transporter.sendMail({
      // "From" MUST match your SMTP_USER on most Truehost plans
      from: `"Ethno Kenia Website" <${config.smtpUser}>`,
      to: 'info@ethnokeniaadventure.com', 
      replyTo: body.email,
      subject: subject,
      html: htmlContent,
    })

    return { success: true }
  } catch (error: any) {
    console.error('SMTP Error:', error.message)
    throw createError({
      statusCode: 500,
      statusMessage: 'Could not send email. Verify your SMTP settings.',
    })
  }
})
