import type { Event } from "@/lib/types";
import { googleCalendarUrl, outlookCalendarUrl, icsDownloadUrl } from "@/lib/calendarLinks";

export default function CalendarButtons({ event, siteUrl }: { event: Event; siteUrl: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      <a
        href={googleCalendarUrl(event, siteUrl)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary !px-4 !py-2 text-xs"
      >
        Google Calendar
      </a>
      <a
        href={outlookCalendarUrl(event, siteUrl)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary !px-4 !py-2 text-xs"
      >
        Outlook
      </a>
      <a href={icsDownloadUrl(event, siteUrl)} className="btn-secondary !px-4 !py-2 text-xs">
        Apple / .ics
      </a>
    </div>
  );
}
