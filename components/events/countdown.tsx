/** @format */

"use client";
import React, { useEffect, useState, useRef } from "react";
import { Event } from "@/types/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface ContestCardProps {
  event: Event;
  onTimeLeftCalculated?: (timeLeft: string) => void;
  renderUI?: boolean;
}

const Countdown: React.FC<ContestCardProps> = ({
  event,
  onTimeLeftCalculated,
  renderUI = true,
}) => {
  const router = useRouter();

  const [timeLeft, setTimeLeft] = useState("");
  const [eventHasPassed, setEventHasPassed] = useState(false);
  const [initialized, setInitialized] = useState(false); // State to track initialization
  const intervalRef = useRef<number | null>(null);

  const calculateTimeLeft = () => {
    const now = new Date();
    const targetDate = new Date(event.targetDate);
    const difference = targetDate.getTime() - now.getTime();

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      const calculatedTimeLeft = `${days}d ${hours}h ${minutes}m ${seconds}s`;

      setTimeLeft(calculatedTimeLeft);
      setEventHasPassed(false);

      if (onTimeLeftCalculated) {
        onTimeLeftCalculated(calculatedTimeLeft);
      }
    } else {
      setTimeLeft("Event Has Expired");
      setEventHasPassed(true);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    setInitialized(true); // Mark as initialized after the first calculation
  };

  useEffect(() => {
    calculateTimeLeft(); // Initial calculation
    intervalRef.current = window.setInterval(calculateTimeLeft, 1000); // Update every second

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current); // Clear the interval on component unmount
    };
  }, []); // Empty dependency array ensures this effect only runs once

  const handleRegisterClick = () => {
    const eventId = event.id.toString();
    let formRoute = "/";

    switch (event.category) {
      case "contest":
        formRoute = "admin/register/hackathon";
        break;
      case "tech expo":
        formRoute = "admin/register/techexpo";
        break;
      case "call for proposal":
        formRoute = "/incubationform";
        break;
      default:
        formRoute = "/register/general";
    }
    const fullRoute = `${formRoute}?eventId=${eventId}`;
    router.push(fullRoute);
  };

  if (!initialized || eventHasPassed) {
    // Render nothing until initialized or if the event has passed
    return null;
  }

  return (
    <div className="event-container">
      {renderUI && (
        <Card className="shadow-xl border-spacing-2 rounded-lg">
          <CardHeader>
            <CardTitle>{event.name}</CardTitle>
            <CardDescription>
              <p>
                Target Date: {new Date(event?.targetDate).toLocaleDateString()}
              </p>
            </CardDescription>
            <p>{event?.description}</p>
          </CardHeader>
          <CardContent>
            <div className="border p-4 rounded shadow">
              <p className="mt-4 text-lg text-red-500">{timeLeft}</p>
            </div>
          </CardContent>
          <CardFooter>
            {!eventHasPassed && renderUI ? (
              <Button
                className="w-full bg-coopBlue hover:bg-coopBlueHover "
                onClick={handleRegisterClick}
              >
                Register
              </Button>
            ) : (
              <Button disabled className="w-full">
                Register
              </Button>
            )}
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default Countdown;
