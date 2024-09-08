/** @format */

"use client";

import {
  CalendarIcon,
  ArrowRightIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface Event {
  id: number;
  title: string;
  date: string;
  link: string;
} 

const events: Event[] = [
  {
    id: 1,
    title: "Annual Tech Innovation Summit",
    date: "2023-08-15",
    link: "/contests",
  },
  {
    id: 2,
    title: "AI Ethics Workshop",
    date: "2023-08-22",
    link: "/contests",
  },
  {
    id: 3,
    title: "Startup Pitch Competition",
    date: "2023-08-30",
    link: "/contests",
  },
];


export default function EventsSider() {
  return (
    events.length ? (
        <div className='relative right-0 w-full sm:w-96 pace-y-4  mb-2'>
      <Card className='border-none shadow-none'>
        <CardHeader className='pb-2'>
          <CardTitle className='text-lg     '>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent className='space-y-2 pt-0'>
          {events.map((event) => (
            <div key={event.id} className='text-sm'>
              <h3 className='font-medium'>{event.title}</h3>
              <div className='flex justify-between items-center text-sm'>
                <p className='text-muted-foreground flex items-center'>
                  <CalendarIcon className='mr-1 h-3 w-3' />
                  {event.date}
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
      </Card>
    </div>
    ) : null
    )
}
