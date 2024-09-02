"use client";

import { useEffect, useState } from "react";
import Countdown from "@/components/events/countdown";
import { Event } from "@/types/types";

export default function ContestsPage() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/event");
        const data = await response.json();
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          console.error("Expected an array but received:", data);
          setEvents([]);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
      }
    };

    fetchEvents();
  }, []);
  const Events = events.filter(
    (event) => event.category !== "call for proposal"
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Events.length > 0 ? (
        Events.map((event) => <Countdown key={event.id} event={event} />)
      ) : (
        <div className="col-span-full text-center py-10">
          <p className="text-lg font-semibold">No Events Available.</p>
        </div>
      )}
    </div>
  );
}
