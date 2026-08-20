import "server-only";
import { Resend } from "resend";
import type { Event, Registration } from "./types";
import { formatDateLong, formatTimeRange } from "./utils";
import { googleCalendarUrl, outlookCalendarUrl, icsDownloadUrl } from "./calendarLinks";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

function emailShell(bodyHtml: string): string {
  return `
  <div style="background:#F7F1E6;padding:32px 16px;font-family:Georgia,serif;color:#2E211A;">
    <div style="max-width:520px;margin:0 auto;background:#FBF7EE;border-radius:12px;overflow:hidden;border:1px solid #e8ddc8;">
      <div style="background:#2E211A;padding:24px 32px;">
        <span style="color:#F7F1E6;font-size:22px;letter-spacing:0.04em;">AGORABICA</span>
      </div>
      <div style="padding:32px;">
        ${bodyHtml}
      </div>
      <div style="padding:20px 32px;border-top:1px solid #e8ddc8;font-family:Arial,sans-serif;font-size:12px;color:#7a6f5f;">
        Agorabica — Comprendre. Discuter. Agir.<br/>
        Vous recevez cet email car vous vous êtes inscrit·e à un événement Agorabica.
      </div>
    </div>
  </div>`;
}

function button(href: string, label: string): string {
  return `<a href="${href}" style="display:inline-block;background:#B23A26;color:#FBF7EE;text-decoration:none;padding:12px 20px;border-radius:8px;font-family:Arial,sans-serif;font-size:14px;margin:4px 8px 4px 0;">${label}</a>`;
}

export async function sendRegistrationEmail(event: Event, registration: Registration) {
  const siteUrl = getSiteUrl();
  const eventUrl = `${siteUrl}/evenements/${event.slug}`;
  const cancelUrl = `${siteUrl}/annulation/${registration.cancellation_token}`;
  const isWaitlist = registration.status === "waitlist";

  const intro = isWaitlist
    ? `<p style="font-size:16px;line-height:1.6;">Bonjour ${registration.first_name},</p>
       <p style="font-size:16px;line-height:1.6;">L'événement <strong>${event.title}</strong> affiche complet, mais vous êtes maintenant sur la liste d'attente. Si une place se libère, elle sera automatiquement proposée aux personnes inscrites, dans l'ordre d'arrivée.</p>`
    : `<p style="font-size:16px;line-height:1.6;">Bonjour ${registration.first_name},</p>
       <p style="font-size:16px;line-height:1.6;">Votre inscription à <strong>${event.title}</strong> est confirmée. On a hâte de vous y retrouver !</p>`;

  const details = `
    <table style="font-family:Arial,sans-serif;font-size:14px;margin:20px 0;width:100%;">
      <tr><td style="padding:4px 0;color:#7a6f5f;width:90px;">Date</td><td>${formatDateLong(event.start_date)}</td></tr>
      <tr><td style="padding:4px 0;color:#7a6f5f;">Horaire</td><td>${formatTimeRange(event.start_date, event.end_date)}</td></tr>
      <tr><td style="padding:4px 0;color:#7a6f5f;">Lieu</td><td>${event.venue_name}, ${event.address}</td></tr>
    </table>`;

  const calendarSection = isWaitlist
    ? ""
    : `<p style="font-family:Arial,sans-serif;font-size:14px;color:#7a6f5f;margin-bottom:8px;">Ajouter à mon agenda</p>
       <p>
         ${button(googleCalendarUrl(event, siteUrl), "Google Calendar")}
         ${button(outlookCalendarUrl(event, siteUrl), "Outlook")}
         ${button(icsDownloadUrl(event, siteUrl), "Apple / .ics")}
       </p>`;

  const html = emailShell(`
    ${intro}
    ${details}
    ${calendarSection}
    <p style="font-family:Arial,sans-serif;font-size:13px;margin-top:28px;">
      <a href="${eventUrl}" style="color:#7A1E2B;">Voir la page de l'événement</a>
    </p>
    <p style="font-family:Arial,sans-serif;font-size:13px;color:#7a6f5f;">
      Un empêchement ? <a href="${cancelUrl}" style="color:#7A1E2B;">Annuler mon inscription</a>
    </p>
  `);

  await getResend().emails.send({
    from: process.env.EMAIL_FROM ?? "Agorabica <bonjour@agorabica.fr>",
    to: registration.email,
    subject: isWaitlist
      ? `Liste d'attente — ${event.title}`
      : `Inscription confirmée — ${event.title}`,
    html,
  });
}

export async function sendWaitlistPromotionEmail(event: Event, registration: Registration) {
  const siteUrl = getSiteUrl();
  const cancelUrl = `${siteUrl}/annulation/${registration.cancellation_token}`;

  const html = emailShell(`
    <p style="font-size:16px;line-height:1.6;">Bonjour ${registration.first_name},</p>
    <p style="font-size:16px;line-height:1.6;">Bonne nouvelle : une place s'est libérée pour <strong>${event.title}</strong> et elle vous revient. Votre inscription est confirmée !</p>
    <table style="font-family:Arial,sans-serif;font-size:14px;margin:20px 0;width:100%;">
      <tr><td style="padding:4px 0;color:#7a6f5f;width:90px;">Date</td><td>${formatDateLong(event.start_date)}</td></tr>
      <tr><td style="padding:4px 0;color:#7a6f5f;">Horaire</td><td>${formatTimeRange(event.start_date, event.end_date)}</td></tr>
      <tr><td style="padding:4px 0;color:#7a6f5f;">Lieu</td><td>${event.venue_name}, ${event.address}</td></tr>
    </table>
    <p>
      ${button(googleCalendarUrl(event, siteUrl), "Google Calendar")}
      ${button(outlookCalendarUrl(event, siteUrl), "Outlook")}
      ${button(icsDownloadUrl(event, siteUrl), "Apple / .ics")}
    </p>
    <p style="font-family:Arial,sans-serif;font-size:13px;color:#7a6f5f;">
      Un empêchement ? <a href="${cancelUrl}" style="color:#7A1E2B;">Annuler mon inscription</a>
    </p>
  `);

  await getResend().emails.send({
    from: process.env.EMAIL_FROM ?? "Agorabica <bonjour@agorabica.fr>",
    to: registration.email,
    subject: `Une place s'est libérée — ${event.title}`,
    html,
  });
}
