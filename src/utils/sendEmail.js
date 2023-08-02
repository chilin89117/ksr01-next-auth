import nodemailer from 'nodemailer'
import bcrypt from 'bcryptjs'
import Token from '@/models/Token.js'

export const sendEmail = async ({email, emailType, userId}) => {
  try {
    // Create token with valid flag and save to database
    const token = await bcrypt.hash(userId, 10)
    const newToken = new Token({token, userId, emailType, isValid: true})
    await newToken.save()

    // Transporter object
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      service: 'gmail',
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASSWORD
      }
    })

    const mailOptions = {from: process.env.AUTH_EMAIL, to: email}

    // Set 'mailOptions' depending on type of email
    if (emailType === 'emailVerification') {
      mailOptions.subject = 'ksr01 email verification'
      mailOptions.html = `
        <h2>Click on the button below to verify your email for ksr01-next-auth app.</h2>
        <br />
        <a
          href="${process.env.DOMAIN}/verify-email/?token=${token}"
          style="padding: 8px; font-size: 16px; background-color: #2222ff; color: #fff; border-radius: 3px; text-decoration: none;"
        >
          VERIFY MY EMAIL
        </a>
      `
    } else {
      mailOptions.subject = 'ksr01 password reset'
      mailOptions.html = `
        <h2>Click on the button below to reset your password for ksr01-next-auth app.</h2>
        <br />
        <a
          href="${process.env.DOMAIN}/reset-password/?token=${token}"
          style="padding: 8px; font-size: 18px; background-color: #2222ff; color: #fff; border-radius: 3px; text-decoration: none;"
        >
          RESET PASSWORD
        </a>
      `
    }

    const mailResponse = await transporter.sendMail(mailOptions)
    return mailResponse
  } catch (error) {
    throw new Error(error.message)
  }
}
