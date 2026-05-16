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

    // Basic validation
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
        <head>
          <style>
            body { font-family: Inter, Arial, sans-serif; background: #0a0a0f; color: #f0f0f5; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; background: #12121a; border-radius: 12px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #6c63ff, #5a52e0); padding: 32px 40px; }
            .header h1 { color: #fff; font-size: 22px; font-weight: 700; margin: 0; }
            .header p { color: rgba(255,255,255,0.8); font-size: 14px; margin: 6px 0 0; }
            .body { padding: 36px 40px; }
            .field { margin-bottom: 20px; }
            .label { font-size: 12px; font-weight: 600; color: #6c63ff; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px; }
            .value { font-size: 15px; color: #f0f0f5; background: #1a1a26; border-radius: 8px; padding: 12px 16px; border-left: 3px solid #6c63ff; }
            .message-value { white-space: pre-wrap; line-height: 1.6; }
            .footer { padding: 20px 40px; border-top: 1px solid #2a2a3a; color: #9090a8; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Enquiry — SS Consulting</h1>
              <p>A visitor has submitted the contact form on your website.</p>
            </div>
            <div class="body">
              <div class="field">
                <div class="label">Full Name</div>
                <div class="value">${fullName}</div>
              </div>
              <div class="field">
                <div class="label">Email</div>
                <div class="value">${email}</div>
              </div>
              ${phone ? `
              <div class="field">
                <div class="label">Phone</div>
                <div class="value">${phone}</div>
              </div>
              ` : ''}
              <div class="field">
                <div class="label">Business Name</div>
                <div class="value">${businessName}</div>
              </div>
              <div class="field">
                <div class="label">Message</div>
                <div class="value message-value">${message}</div>
              </div>
            </div>
            <div class="footer">
              This email was sent from the contact form at SS Consulting website.
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
