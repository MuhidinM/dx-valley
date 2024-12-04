/** @format */

"use client";

import { CalendarIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Event } from "@/types/types";
import { MultiStepFormComponent } from "@/components/multi-step-form2";

export default function EventsSider() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/newapi/event");
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

  const sortedEvents = [...events].sort(
    (a, b) =>
      new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime()
  );

  const upcomingEvents = sortedEvents.filter((event) => {
    const eventDate = new Date(event.targetDate);
    const today = new Date();
    return eventDate >= today;
  });

  const latestEvents = upcomingEvents.slice(0, 3);

  const filteredEvents = latestEvents.filter(
    (event) => event.category !== "call for proposal"
  );

  // If there are no filtered events, return null to hide the component
  if (filteredEvents.length === 0) {
    // return null;
    return (
      <section className='dark:bg-gray-950 bg-white rounded-b-lg py-5'>
        {" "}
        <MultiStepFormComponent />{" "}
      </section>
    ); 
  }

  return (
    <div className='relative right-0 w-full sm:w-96 pace-y-4 mb-2'>
      <Card className='border-none shadow-none'>
        <CardHeader className='pb-2'>
          <CardTitle className='text-lg '>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent className='space-y-2 pt-0'>
          {filteredEvents.map((event) => (
            <div key={event.id} className='text-sm'>
              <h3 className='font-medium'>{event.name}</h3>
              <div className='flex justify-between items-center text-sm'>
                <p className='text-muted-foreground flex items-center'>
                  <CalendarIcon className='mr-1 h-3 w-3' />
                  {new Date(event?.targetDate).toLocaleDateString()}
                </p>
                <Link
                  href={event.link || "/contests"}
                  className='text-primary text-sm font-semibold hover:underline text-md'>
                  Register
                </Link>
              </div>
            </div>
          ))}
          <Link
            href='/contests'
            className='text-sm font-semibold text-primary hover:underline flex items-center'>
            View All Events
            <ArrowRightIcon className='ml-1 h-3 w-3' />
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
