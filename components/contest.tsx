"use client";

import { useEffect, useState } from "react";
import Countdown from "@/components/countdown";
import { Event } from "@/app/contest/types";

export default function ContestsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/contest");
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

  // if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <Countdown key={event._id} event={event} />
      ))}
    </div>
  );
}
