type SendMailInput = {
  to: string;
  subject: string;
  text: string;
  html?: string;
};

async function sendWithSmtp(input: SendMailInput) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || '587');
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.MAIL_FROM || user;

  if (!host || !user || !pass || !from) {
    return { success: false as const, reason: 'missing_config' };
  }

  const nodemailer = await import('nodemailer');
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from,
    to: input.to,
    subject: input.subject,
    text: input.text,
    html: input.html,
  });

  return { success: true as const };
}

export async function sendOtpEmail(email: string, otp: string) {
  const subject = 'Your Sona Cereal verification code';
  const text = `Your Sona Cereal verification code is ${otp}. It expires in 10 minutes.`;
  const html = `<p>Your Sona Cereal verification code is <strong>${otp}</strong>.</p><p>It expires in 10 minutes.</p>`;

  const result = await sendWithSmtp({ to: email, subject, text, html });
  if (result.success) return result;

  console.log(`[mock-email-otp] ${email}: ${otp}`);
  return { success: true as const, mocked: true as const };
}
