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

  const router = useRouter();

  // Fetch events data
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/newapi/event");
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
  }, []);

  // Update the time left for a specific event
  const handleTimeLeftCalculated = (id: string, calculatedTimeLeft: string) => {
    setTimeLeft((prev) => ({
      ...prev,
      [id]: calculatedTimeLeft, // Dynamically store time left for each event by its ID
    }));
  };

  // Filter events to only show "call for proposal"
  const callForProposalEvents = events.filter(
    (event) => event.category === "call for proposal"
  );

  return (
    <div className="lg:container w-full lg:my-16 my-8 px-4">
      {callForProposalEvents.length > 0 ? (
        callForProposalEvents.map((event) => {
          const timeLeftForEvent = timeLeft[event.id]; // Get time left for this event

          console.log("Time left for event", event.id, ":", timeLeftForEvent);

          // If the timeLeft is undefined or "00h 00m 00s", skip rendering the event

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
                <CardHeader className="flex flex-row justify-between p-4 gap-8 rounded-lg m-4 sm:m-4">
                  <CardTitle className="text-lg lg:text-3xl sm:text-lg">
                    Call for Start Up Proposal
                  </CardTitle>
                  <div className="h-full align-middle">
                    <p className="text-lg lg:text-2xl flex text-left text-red-500 font-mono leading-none">
                      {/* Show time left or "Calculating..." if it's still loading */}
                      {timeLeftForEvent || "Calculating..."}
                    </p>
                  </div>
                </CardHeader>

                <CardContent className="align-center justify-around items-center">
                  <p className="prose mb-6 text-gray-500 md:text-lg h-4/5 dark:text-gray-400">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {event.description}
                    </ReactMarkdown>
                  </p>

                  <Button
                    className="bg-coopBlue text-white font-bold cursor-pointer px-6 py-2 hover:bg-coopBlueHover"
                    onClick={() => {
                      const formRoute = "/incubationform";
                      router.push(`${formRoute}?eventId=${event.id}`);
                    }}
                  >
                    Apply
                  </Button>
                </CardContent>
              </Card>
            </div>
          );
        })
      ) : (
        <div className="col-span-full text-center py-10 lg:min-h-80 md:min-h-72">
          <p className="text-lg font-semibold h-fit">No Call Available.</p>
        </div>
      )}
    </div>
  );
}
