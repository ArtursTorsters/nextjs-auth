import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'

// Function to send email for user verification or password reset
export const sendMail = async ({ email, emailType, userId }: any) => {
    try {
        // Hashing userId to generate a unique token
        const hashToken = await bcryptjs.hash(userId.toString(), 10);

        // Updating user with hashed token and expiry based on email type
        if (emailType === "VERIFY") {
            // For verification emails
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashToken,
                verifyTokenExpiry: Date.now() + 360000 // Setting expiry time to 1 hour from now
            });
        } else if (emailType === "RESET") {
            // For password reset emails
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashToken,
                forgotPasswordTokenExpiry: Date.now() + 360000 // Setting expiry time to 1 hour from now
            });
        }

        // Creating nodemailer transporter with mailtrap credentials
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "b182d748f2c888",
              pass: "82f45ccefc07e1"
            }
          });

        // Setting up email options
        const mailOptions = {
            from: 'test@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.domain}/verifyemail?token=${hashToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.domain}/verifyemail?token=${hashToken}
            </p>`
        }

        // Sending the email
      const mailResponse = await transport.sendMail(mailOptions)
      return mailResponse

    } catch (error: any) {
        // Handling errors
        console.error('Failed to send email.'); // Throwing error if sending fails
        console.log('Failed to send email.'); // Throwing error if sending fails

    }
};
