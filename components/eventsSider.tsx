/** @format */

"use client";

import {
  CalendarIcon,
  ArrowRightIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Event } from "@/types/types";
// interface Event {
//   id: number;
//   title: string;
//   date: Date | string;
//   link: string;
//   category: string;
// } 

// const events: Event[] = [
//   {
//     id: 1,
//     title: "AI Ethics Workshop",
//     date: "2023-08-22",
//     link: "/contests",
//     category: "contest",
//   },
//   {
//     id: 2,
//     title: "Startup Pitch Competition",
//     date: "2023-08-22",
//     link: "/contests",
//     category: "contest",
//   },
// ];

  

export default function EventsSider() {

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
  console.log(Events.length, "is the event length");

  if (!events) {
    return <div>No Events Found</div>;
  }
  return (
    <div className='relative right-0 w-full sm:w-96 pace-y-4  mb-2'>
      <Card className='border-none shadow-none'>
        <CardHeader className='pb-2'>
          <CardTitle className='text-lg '>Upcoming Events</CardTitle>
        </CardHeader>
        {events.length ? (
          <CardContent className='space-y-2 pt-0'>
            {events.map((event) => (
              <div key={event.id} className='text-sm'>
                <h3 className='font-medium'>{event.name}</h3>
                <div className='flex justify-between items-center text-sm'>
                  <p className='text-muted-foreground flex items-center'>
                    <CalendarIcon className='mr-1 h-3 w-3' />
                    {/* {event.targetDate}
                     */}
                    {new Date(event?.targetDate).toLocaleDateString()}
                  </p>
                  <Link
                    href={event.link}
                    className='text-primary text-sm font-semibold hover:underline  text-md'>
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
        ) : (
          <div className='text-lg font-semibold m-10'>No Events Available</div>
        )}
      </Card>
    </div>
  );
}
