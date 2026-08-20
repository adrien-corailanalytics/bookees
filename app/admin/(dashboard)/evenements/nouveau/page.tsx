import EventForm from "@/components/admin/EventForm";
import { createEvent } from "@/app/admin/actions";

export default function NewEventPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-serif text-3xl text-espresso">Nouvel événement</h1>
      <div className="mt-8">
        <EventForm action={createEvent} />
      </div>
    </div>
  );
}
