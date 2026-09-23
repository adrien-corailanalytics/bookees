import type { Event } from "@/lib/types";
import { googleCalendarUrl, outlookCalendarUrl, icsDownloadUrl } from "@/lib/calendarLinks";

const small = "btn-ghost !px-4 !py-1.5 text-xs";

export default function CalendarButtons({ event, siteUrl }: { event: Event; siteUrl: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      <a href={googleCalendarUrl(event, siteUrl)} target="_blank" rel="noopener noreferrer" className={small}>
        Google Calendar
      </a>
      <a href={outlookCalendarUrl(event, siteUrl)} target="_blank" rel="noopener noreferrer" className={small}>
        Outlook
      </a>
      <a href={icsDownloadUrl(event, siteUrl)} className={small}>
        Apple / .ics
      </a>
    </div>
  );
}
