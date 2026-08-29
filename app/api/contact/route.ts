import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name = '',
      email = '',
      phone = '',
      mobile = '',
      company = '',
      city = '',
      industry = '',
      page = '',
      source = 'Contact Form',
      query = '',
      message = '',
      subject: customSubject,
    } = body;

    const contactPhone = phone || mobile || 'N/A';
    const contactCompany = company || 'N/A';
    const contactCity = city || 'N/A';
    const contactIndustry = industry || 'General';
    const contactMessage = message || query || 'No additional message provided.';
    const contactPage = page || 'Direct / Unknown';

    const subject =
      customSubject ||
      `🚀 [New Lead] ${contactCompany !== 'N/A' ? contactCompany : name} — ${contactIndustry}`;

    // Admin recipient address
    const recipientEmail =
      process.env.CONTACT_NOTIFICATION_EMAIL ||
      process.env.EMAIL_SERVER_USER ||
      'theotheo031@gmail.com';

    // Verify if SMTP is configured
    const host = process.env.EMAIL_SERVER_HOST || 'smtp.gmail.com';
    const port = Number(process.env.EMAIL_SERVER_PORT) || 587;
    const secure = process.env.EMAIL_SERVER_SECURE === 'true';
    const user = process.env.EMAIL_SERVER_USER;
    const pass = process.env.EMAIL_SERVER_PASSWORD;

    if (user && pass) {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: { user, pass },
      });

      const textBody = `
========================================
NEW LEAD / CONTACT FORM SUBMISSION
========================================

Name:       ${name}
Email:      ${email}
Phone:      ${contactPhone}
Company:    ${contactCompany}
City/Area:  ${contactCity}
Industry:   ${contactIndustry}
Page URL:   ${contactPage}
Source:     ${source}
Date/Time:  ${new Date().toISOString()}

----------------------------------------
Message / Goals to Promote:
${contactMessage}
========================================
`;

      const htmlBody = `
<div style="background-color: #f8fafc; padding: 24px; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    <div style="background: linear-gradient(135deg, #ea580c, #f97316); padding: 20px 24px; color: #ffffff;">
      <h2 style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff;">New Lead Notification</h2>
      <p style="margin: 4px 0 0; font-size: 13px; color: rgba(255,255,255,0.9);">${contactIndustry} &bull; ${source}</p>
    </div>
    
    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; font-weight: 600; color: #64748b; width: 140px;">Full Name</td>
          <td style="padding: 10px 0; color: #0f172a; font-weight: 700;">${name}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; font-weight: 600; color: #64748b;">Email Address</td>
          <td style="padding: 10px 0; color: #0f172a;"><a href="mailto:${email}" style="color: #ea580c; text-decoration: none; font-weight: 600;">${email}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; font-weight: 600; color: #64748b;">Phone / WhatsApp</td>
          <td style="padding: 10px 0; color: #0f172a;"><a href="tel:${contactPhone}" style="color: #0f172a; text-decoration: none; font-weight: 600;">${contactPhone}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; font-weight: 600; color: #64748b;">Business / Brand</td>
          <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${contactCompany}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; font-weight: 600; color: #64748b;">City / Area</td>
          <td style="padding: 10px 0; color: #0f172a;">${contactCity}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; font-weight: 600; color: #64748b;">Industry</td>
          <td style="padding: 10px 0; color: #0f172a;">${contactIndustry}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; font-weight: 600; color: #64748b;">Page URL</td>
          <td style="padding: 10px 0; color: #0f172a;"><a href="${contactPage}" style="color: #ea580c; text-decoration: underline; word-break: break-all;" target="_blank">${contactPage}</a></td>
        </tr>
      </table>

      <div style="margin-top: 20px; background: #fff7ed; border-left: 4px solid #ea580c; padding: 14px 16px; border-radius: 4px;">
        <p style="margin: 0 0 6px; font-weight: 700; color: #9a3412; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Message / Promotional Goals</p>
        <p style="margin: 0; color: #334155; font-size: 14px; line-height: 1.5; white-space: pre-wrap;">${contactMessage}</p>
      </div>

      <div style="margin-top: 24px; text-align: center;">
        <a href="mailto:${email}?subject=Re:%20${encodeURIComponent(subject)}" style="display: inline-block; background: #ea580c; color: #ffffff; padding: 10px 24px; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 14px;">Reply to ${name}</a>
      </div>
    </div>
    <div style="background: #f1f5f9; padding: 12px 24px; font-size: 12px; color: #94a3b8; text-align: center;">
      Shoutly AI Lead Notification &bull; ${new Date().toLocaleString()}
    </div>
  </div>
</div>
`;

      const mailOptions = {
        from: process.env.EMAIL_FROM || `"Shoutly AI Leads" <${user}>`,
        to: recipientEmail,
        subject,
        replyTo: email,
        text: textBody,
        html: htmlBody,
      };

      await transporter.sendMail(mailOptions);
    } else {
      console.log('--- NEW LEAD RECEIVED (SMTP not configured in env) ---');
      console.log({
        name,
        email,
        phone: contactPhone,
        company: contactCompany,
        city: contactCity,
        industry: contactIndustry,
        message: contactMessage,
        page: contactPage,
        source,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your request has been received.',
    });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to submit form' },
      { status: 500 }
    );
  }
}

