import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

export const sendResetEmail = async (to, token) => {
  const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`

  await transporter.sendMail({
    from: `"Economark Soporte" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Recuperación de contraseña',
    html: `
      <h3>¿Olvidaste tu contraseña?</h3>
      <p>Haz clic en el siguiente enlace para restablecerla:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>Este enlace expirará en 15 minutos.</p>
    `
  })
}
