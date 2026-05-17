import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  businessName: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { fullName, email, phone, businessName, message } = body;

    if (!fullName || !email || !businessName || !message) {
      return NextResponse.json(
        { error: 'Please fill in all required fields.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailPassword) {
      console.error('Gmail credentials not configured');
      return NextResponse.json(
        { error: 'Email service is not configured. Please try again later.' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPassword,
      },
    });

    const htmlBody = `
      <!DOCTYPE html>
      <html>
        <body style="font-family:Arial,sans-serif;background:#f5f5f5;margin:0;padding:24px;">
          <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:8px;border:1px solid #e5e5e5;overflow:hidden;">
            <div style="padding:28px 32px;border-bottom:1px solid #e5e5e5;">
              <h1 style="font-size:18px;font-weight:700;margin:0 0 4px;color:#1a1a1a;">New Enquiry — SS Consulting</h1>
              <p style="font-size:13px;color:#888;margin:0;">A visitor submitted the contact form on your website.</p>
            </div>
            <div style="padding:28px 32px;">
              <div style="margin-bottom:18px;">
                <div style="font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:0.07em;margin-bottom:4px;">Full Name</div>
                <div style="font-size:15px;color:#1a1a1a;">${fullName}</div>
              </div>
              <div style="margin-bottom:18px;">
                <div style="font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:0.07em;margin-bottom:4px;">Email</div>
                <div style="font-size:15px;color:#1a1a1a;">${email}</div>
              </div>
              ${phone ? `
              <div style="margin-bottom:18px;">
                <div style="font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:0.07em;margin-bottom:4px;">Phone</div>
                <div style="font-size:15px;color:#1a1a1a;">${phone}</div>
              </div>
              ` : ''}
              <div style="margin-bottom:18px;">
                <div style="font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:0.07em;margin-bottom:4px;">Business Name</div>
                <div style="font-size:15px;color:#1a1a1a;">${businessName}</div>
              </div>
              <div style="margin-bottom:0;">
                <div style="font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:0.07em;margin-bottom:4px;">Message</div>
                <div style="font-size:15px;color:#1a1a1a;white-space:pre-wrap;line-height:1.6;background:#f9f9f9;border-radius:6px;padding:12px 14px;border:1px solid #e5e5e5;">${message}</div>
              </div>
            </div>
            <div style="padding:16px 32px;border-top:1px solid #e5e5e5;color:#aaa;font-size:12px;">
              Sent from the contact form at stuartsaliadarre.com
            </div>
          </div>
        </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"SS Consulting Website" <${gmailUser}>`,
      to: 'saliadar@gmail.com',
      replyTo: email,
      subject: `New Enquiry from ${fullName} — ${businessName}`,
      html: htmlBody,
      text: `
New Enquiry — SS Consulting

Full Name: ${fullName}
Email: ${email}
${phone ? `Phone: ${phone}\n` : ''}Business Name: ${businessName}

Message:
${message}
      `.trim(),
    });

    return NextResponse.json(
      { success: true, message: 'Your message has been sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send your message. Please try again later.' },
      { status: 500 }
    );
  }
}
