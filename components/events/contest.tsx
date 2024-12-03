/** @format */

"use client";

import { useEffect, useState } from "react";
import Countdown from "@/components/events/countdown";
import { Event } from "@/types/types";

export default function ContestsPage() {
  const [events, setEvents] = useState<Event[]>([]);


   const sortedEvents = [...events].sort(
     (a, b) =>
       new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime()
   );

   const upcomingEvents = sortedEvents.filter((event) => {
     const eventDate = new Date(event.targetDate);
     const today = new Date();
     return eventDate >= today;
   });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/newapi/event");
        const data = await response.json();
        if (Array.isArray(data)) {
          setEvents(data);
          // console.log("event data", data);
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

  const Events = upcomingEvents.filter(
    (event) => event.category === "tech expo" || event.category === "contest"
  );
   console.log(Events.length, "is the event length");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-3 gap-6  h-fit mb-10">
      {(Events.length && // here was   Events.length > 0 &&
        Events.map((event) => <Countdown key={event?.id} event={event} />)) || (
        <div className="col-span-full text-center py-10 lg:min-h-80 md:min-h-72">
          <p className="text-lg font-semibold">No Event Available.</p>
        </div>
      )}
    </div>
  );
}
