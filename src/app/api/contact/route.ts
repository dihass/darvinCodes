import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { name, company, phone, email, message } = await req.json();

  if (!email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Darvin Code Contact <onboarding@resend.dev>",
    to: "info@darvincode.com",
    replyTo: email,
    subject: `New enquiry from ${name || email}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
        <h2 style="margin-bottom:4px">New project enquiry</h2>
        <hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0"/>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:8px 0;color:#666;width:130px">Name</td><td>${name || "—"}</td></tr>
          <tr><td style="padding:8px 0;color:#666">Property / Company</td><td>${company || "—"}</td></tr>
          <tr><td style="padding:8px 0;color:#666">Phone</td><td>${phone ? `<a href="tel:${phone}" style="color:#c3704c">${phone}</a>` : "—"}</td></tr>
          <tr><td style="padding:8px 0;color:#666">Email</td><td><a href="mailto:${email}" style="color:#c3704c">${email}</a></td></tr>
        </table>
        <hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0"/>
        <p style="font-size:14px;color:#666;margin-bottom:6px">Message</p>
        <p style="font-size:15px;line-height:1.6;white-space:pre-wrap">${message}</p>
      </div>
    `,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
