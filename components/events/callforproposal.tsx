/** @format */

"use client";
import React, { useEffect, useState } from "react";
import { Event } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import CountDownCallForProposal from "./countDownCallForProposal";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Callforproposal() {
  const [events, setEvents] = useState<Event[]>([]);
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Fetch events data
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);

        const response = await fetch("/newapi/event");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setEvents(data);
          setLoading(false);
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

  // Update the time left for a specific event
  const handleTimeLeftCalculated = (id: string, calculatedTimeLeft: string) => {
    setTimeLeft((prev) => ({
      ...prev,
      [id]: calculatedTimeLeft, // Dynamically store time left for each event by its ID
    }));
  };

  const sortedEvents = [...events].sort(
    (a, b) =>
      new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime()
  );

  const upcomingEvents = sortedEvents.filter((event) => {
    const eventDate = new Date(event.targetDate);
    const today = new Date();
    return eventDate >= today;
  });
  // Filter events to only show "call for proposal"
  const callForProposalEvents = upcomingEvents.filter(
    (event) => event.category === "call for proposal"
  );

  if (loading) {
    return (
      <div className='flex items-center justify-center lg:min-h-80 md:min-h-72 '>
        <div className='flex items-center space-x-2'>
          <div className='w-4 h-4 rounded-full bg-coopBlue animate-bounce'></div>
          <div className='w-4 h-4 rounded-full bg-coopOrange animate-bounce delay-200'></div>
          <div className='w-4 h-4 rounded-full bg-black animate-bounce delay-400'></div>
        </div>
        {/* <p className='mt-4 text-gray-600 font-medium ml-4-'>Loading...</p> */}
      </div>
    );
  }

  return (
    <div className=' w-full lg:my-16 my-8 px-4'>
      {callForProposalEvents.length > 0 ? (
        callForProposalEvents.map((event) => {
          const timeLeftForEvent = timeLeft[event.id];

          if (timeLeftForEvent === "00h 00m 00s") {
            return null;
          }

          return (
            <div key={event.id}>
              {/* Countdown Component */}
              <CountDownCallForProposal
                event={event}
                renderUI={false} // Disable Countdown's internal UI
                onTimeLeftCalculated={(calculatedTimeLeft) =>
                  handleTimeLeftCalculated(event.id, calculatedTimeLeft)
                }
              />

              {/* Event Card */}
              <Card>
                <CardHeader className='flex flex-row justify-between p-4 gap-8 rounded-lg m-4 sm:m-4'>
                  <div className='text-2xl lg:text-3xl lg:ml-32 font-bold'>
                    Call For Startup Proposal
                  </div>
                  <div className='h-full align-middle'>
                    <p className='text-lg lg:text-2xl flex text-left text-red-500 font-mono leading-none'>
                      {/* Show time left or "Calculating..." if it's still loading */}
                      {timeLeftForEvent || "Calculating..."}
                    </p>
                  </div>
                </CardHeader>

                <CardContent className='align-center justify-around items-center w-full'>
                  <div className='prose w-full mx-auto items-center justify-center mb-6 text-gray-500 md:text-lg dark:text-gray-400'>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {event.description}
                    </ReactMarkdown>

                    <Button
                      className='bg-coopBlue text-white font-bold cursor-pointer px-6 py-2 hover:bg-coopBlueHover'
                      onClick={() => {
                        const formRoute = "/incubationform";
                        router.push(`${formRoute}?eventId=${event.id}`);
                      }}>
                      Apply
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })
      ) : (
        <div className='col-span-full text-center py-10 lg:min-h-80 md:min-h-72'>
          <p className='text-lg font-semibold h-fit'>No Call Available.</p>
        </div>
      )}
    </div>
  );
}
