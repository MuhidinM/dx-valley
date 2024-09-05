/** @format */

"use client";

import { useEffect, useState } from "react";
import Countdown from "@/components/events/countdown";
import { Event } from "@/types/types";
// import { Button } from "react-day-picker";
import { Button } from "../ui/button";

export default function ContestsPage() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/event");
        const data = await response.json();
        if (Array.isArray(data)) {
          setEvents(data);
          console.log("event data", data);
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

  if (!events) {
    return <div>No Events Found</div>;
  }

  return (
    // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  h-fit mb-10'>
      {/* rest of the code remains the same */}

      {(Events.length > 0 &&
        Events.map((event) => (
          <div
          // className='shadow-lg border-spacing-2 rounded-lg'
          >
            {" "}
            <Countdown key={event?.id} event={event} />
            {/* <h2>{event?.name}</h2>
            <div> {event?.targetDate} </div>
            <p> {event?.description}</p>
            <div className='flex flex-row align-bottom mt-72px'>
                   <Button />
            </div> */}
          </div>
        ))) ||
        (!events.length || (
          <div className='col-span-full text-center py-10'>
            <p className='text-lg font-semibold'>No Event Available.</p>
          </div>
        ))}
    </div>
  );
}
