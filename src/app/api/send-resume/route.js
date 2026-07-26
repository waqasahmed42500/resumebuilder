import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { to, subject, html, text } = await request.json();

    if (!to) {
      return Response.json({ success: false, message: 'Recipient email is required.' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject: subject || 'Resume Builder export',
      text: text || 'A resume export was sent from Resume Builder.',
      html: html || '<p>A resume export was sent from Resume Builder.</p>',
    });

    return Response.json({ success: true, message: 'Email sent successfully.' });
  } catch (error) {
    console.error('Email send failed', error);
    return Response.json({ success: false, message: 'Failed to send email.' }, { status: 500 });
  }
}
