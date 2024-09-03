/** @format */

"use client";
import React, { useEffect, useState } from "react";
import { Event } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Countdown from "./countdown";
import { useRouter } from "next/navigation";

export default function Callforproposal() {
  const [events, setEvents] = useState<Event[]>([]);
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: string }>({});

  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/event");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
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
  }, []); // Only run once, on moun

  const handleTimeLeftCalculated = (id: string, calculatedTimeLeft: string) => {
    setTimeLeft((prev) => ({
      ...prev,
      [id]: calculatedTimeLeft,
    }));
  };

  const callForProposalEvents = events.filter(
    (event) => event.category === "call for proposal"
  );

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:mt-10 mb-20 mx-3'>
      {callForProposalEvents.length > 0 ? (
        callForProposalEvents.map((event) => (
          <div key={event.id}>
            <Countdown
              event={event}
              renderUI={false}
              onTimeLeftCalculated={(calculatedTimeLeft) =>
                handleTimeLeftCalculated(event.id, calculatedTimeLeft)
              }
            />
            <Card>
              <CardHeader className=' flex flex-row justify-between p-4  rounded-lg m-4 sm:m-4'>
                <CardTitle className=''>
                  Call for Proposal
                </CardTitle>
                <div className='h-full align-middle'>
                  <p className='text-lg flex text-left text-red-500 m-0 leading-none'>
                    {timeLeft[event?.id] || "Calculating..."}
                  </p>
                </div>
              </CardHeader>

              <CardContent>
                <p className='mb-6 font-light text-gray-500 md:text-lg h-80 justify-around items-center dark:text-gray-400'>
                  {event.description}
                </p>

                <Button
                  className='bg-coopBlue text-white font-bold cursor-pointer px-6 py-2 hover:bg-amber-500'
                  onClick={() => {
                    let formRoute = "/incubationform";
                    const eventId = event.id.toString();
                    router.push(`${formRoute}?eventId=${eventId}`);
                  }}>
                  Apply
                </Button>
              </CardContent>
            </Card>
          </div>
        ))
      ) : (
        <div className='col-span-full text-center py-10'>
          <p className='text-lg font-semibold'>No events available.</p>
        </div>
      )}
    </div>
  );
}
