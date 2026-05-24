import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendWelcomeEmail(email: string, name: string) {
  await resend.emails.send({
    from: "Mais que Album <noreply@maisquealbum.com.br>",
    to: email,
    subject: "Bem-vindo ao Mais que Album! 📸",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h1 style="color: #C85277;">Olá, ${name}! 🌸</h1>
        <p>Seja bem-vindo ao <strong>Mais que Album</strong> — onde você transforma momentos em memórias.</p>
        <p>Você tem <strong>14 dias grátis</strong> para explorar tudo:</p>
        <ul>
          <li>Crie álbuns de fotos físicos</li>
          <li>Organize por dias e momentos</li>
          <li>Escolha layouts bonitos</li>
        </ul>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard"
           style="display:inline-block;background:#C85277;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:16px;">
          Começar agora →
        </a>
        <p style="color:#9B6B72;font-size:12px;margin-top:24px;">
          Tradições com propósito.
        </p>
      </div>
    `,
  })
}
