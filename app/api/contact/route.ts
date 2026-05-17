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
         body { font-family: Arial, sans-serif; background: #f5f5f5; color: #1a1a1a; margin: 0; padding: 24px; }
.container { max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e5e5e5; overflow: hidden; }
.header { padding: 28px 32px; border-bottom: 1px solid #e5e5e5; }
.header h1 { font-size: 18px; font-weight: 700; margin: 0 0 4px; color: #1a1a1a; }
.header p { font-size: 13px; color: #888; margin: 0; }
.body { padding: 28px 32px; }
.field { margin-bottom: 18px; }
.label { font-size: 11px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 4px; }
.value { font-size: 15px; color: #1a1a1a; }
.message-value { white-space: pre-wrap; line-height: 1.6; background: #f9f9f9; border-radius: 6px; padding: 12px 14px; border: 1px solid #e5e5e5; }
.divider { border: none; border-top: 1px solid #e5e5e5; margin: 0; }
.footer { padding: 16px 32px; color: #aaa; font-size: 12px; } 
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
