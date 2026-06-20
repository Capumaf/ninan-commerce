import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getAlerts } from "@/lib/getAlerts";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const alerts = await getAlerts();

  if (alerts.length === 0) {
    return NextResponse.json({ sent: false, reason: "no alerts" });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const html = `
    <div style="font-family: monospace; background: #0a1220; color: #e2e8f0; padding: 24px;">
      <h2 style="color: #e2e8f0; font-weight: 300;">NINAN Commerce OS — Alertas (${alerts.length})</h2>
      ${alerts
        .map(
          (a) => `
        <div style="background: ${a.color}10; border: 1px solid ${a.color}40; border-radius: 8px; padding: 12px 16px; margin-bottom: 8px; color: ${a.color};">
          ⚠ ${a.message}
        </div>
      `
        )
        .join("")}
      <p style="color: #64748b; font-size: 12px; margin-top: 24px;">
        <a href="https://ninancommerce.com/os/analytics" style="color: #60a5fa;">Ver dashboard completo →</a>
      </p>
    </div>
  `;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: process.env.ALERT_EMAIL_TO!,
    subject: `⚠ NINAN Commerce OS — ${alerts.length} alerta(s)`,
    html,
  });

  return NextResponse.json({ sent: true, count: alerts.length });
}