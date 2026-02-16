import { defineEventHandler, readBody, createError } from 'h3'
import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const isBooking = body.type === 'booking'

  // Configure Transporter for Truehost/cPanel
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true, // Use true for port 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    // Truehost shared servers sometimes require this to prevent SSL errors
    tls: {
      rejectUnauthorized: false 
    }
  })

  // Determine email content based on type
  const subject = isBooking 
    ? `New Booking Inquiry: ${body.safariName}`
    : `New Website Inquiry`
  
  const title = isBooking ? 'New Safari Booking Inquiry' : 'New Website Inquiry'
  
  let htmlContent = `
    <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
      <h2 style="color: #A25035;">${title}</h2>
      <p><strong>Name:</strong> ${body.name}</p>
      <p><strong>Email:</strong> ${body.email}</p>
      <p><strong>Phone:</strong> ${body.phone || 'N/A'}</p>
  `

  if (isBooking) {
    htmlContent += `
      <p><strong>Safari:</strong> ${body.safariName}</p>
      <p><strong>Preferred Date:</strong> ${body.preferredDate || 'Flexible'}</p>
      <p><strong>Group Size:</strong> ${body.groupSize || 'N/A'}</p>
      <p><strong>Nationality:</strong> ${body.nationality || 'N/A'}</p>
    `
  }

  htmlContent += `
      <hr style="border: none; border-top: 1px solid #eee;" />
      <p><strong>Message:</strong></p>
      <p>${(body.message || '').replace(/\n/g, '<br>')}</p>
    </div>
  `

  try {
    await transporter.sendMail({
      // "From" MUST match your SMTP_USER on most Truehost plans
      from: `"Ethno Kenia Website" <${process.env.SMTP_USER}>`,
      to: 'info@ethnokeniaadventure.com', 
      replyTo: body.email,
      subject: subject,
      html: htmlContent,
    })

    return { success: true }
  } catch (error) {
    console.error('SMTP Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Could not send email. Verify your SMTP settings in cPanel.',
    })
  }
})
