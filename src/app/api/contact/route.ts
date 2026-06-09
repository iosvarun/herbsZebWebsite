import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";
import { getDb } from "@/lib/mongodb";

const dbPath = path.join(process.cwd(), "src/data/inquiries_db.json");

async function saveInquiry(inquiry: any): Promise<string> {
  try {
    const mongoDb = await getDb();
    if (mongoDb) {
      await mongoDb.collection("inquiries").insertOne(inquiry);
      return "mongodb";
    }
  } catch (err) {
    console.error("Failed to save inquiry to MongoDB, falling back to local file", err);
  }

  try {
    await fs.mkdir(path.dirname(dbPath), { recursive: true });
    let data: any[] = [];
    try {
      const fileContent = await fs.readFile(dbPath, "utf-8");
      data = JSON.parse(fileContent);
    } catch (e) {
      data = [];
    }
    data.unshift(inquiry);
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to save inquiry to file", e);
  }
  return "local";
}

export async function POST(req: NextRequest) {
  try {
    const { name, mobile, email, message } = await req.json();

    if (!name || !mobile || !email || !message) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    const inquiry = {
      name,
      mobile,
      email,
      message,
      createdAt: new Date().toISOString(),
    };

    // 1. Save inquiry (MongoDB first, fallback to JSON)
    const dbMode = await saveInquiry(inquiry);

    // 2. Read SMTP details from process.env
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpUser || !smtpPass) {
      console.warn(`SMTP credentials not set. Inquiry saved in ${dbMode} database.`);
      return NextResponse.json({
        success: true,
        savedLocally: true,
        dbMode,
        emailSent: false,
        message: `Enquiry received! (Saved in ${dbMode} DB). Note: To activate live email alerts to herbszen007@gmail.com, please configure SMTP_USER and SMTP_PASS environment variables.`
      });
    }

    // 3. Configure Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // 4. Form HTML Email Content
    const mailOptions = {
      from: `"HerbsZen Contact Portal" <${smtpUser}>`,
      to: "herbszen007@gmail.com",
      replyTo: email,
      subject: `New Website Inquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); margin: 0 auto;">
          <div style="background-color: #113E21; color: white; padding: 24px; text-align: center;">
            <h2 style="margin: 0; font-family: Georgia, serif; font-size: 20px; font-weight: bold;">New Website Inquiry</h2>
            <p style="margin: 6px 0 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 2.5px; color: #8FA89B; font-weight: bold;">HerbsZen Private Limited</p>
          </div>
          <div style="padding: 24px; color: #1e293b; line-height: 1.6; background-color: #ffffff;">
            <p style="margin-top: 0; font-size: 14px;">Hello Admin,</p>
            <p style="font-size: 14px;">A visitor has submitted an inquiry message through the contact form on <strong>HerbsZen.com</strong>:</p>
            
            <table style="width: 100%; border-collapse: collapse; margin: 24px 0; font-size: 13px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; width: 130px; color: #64748b;">Customer Name:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #64748b;">Mobile Number:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 600;">${mobile}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #64748b;">Email Address:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #3b7a57; font-weight: 600;"><a href="mailto:${email}" style="color: #3b7a57; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #64748b; vertical-align: top;">Inquiry Message:</td>
                <td style="padding: 10px 0; color: #334155; white-space: pre-wrap; font-style: italic;">"${message}"</td>
              </tr>
            </table>

            <div style="margin-top: 32px; border-t: 1px solid #f1f5f9; padding-top: 16px; text-align: center; font-size: 10px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
              Generated automatically by HerbsZen Server at ${new Date().toLocaleString()}
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      savedLocally: true,
      dbMode,
      emailSent: true,
      message: "Enquiry successfully sent to herbszen007@gmail.com!"
    });

  } catch (error: any) {
    console.error("Email sending failure:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

