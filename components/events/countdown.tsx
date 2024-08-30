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

      // Only update state if the time left has changed
      setTimeLeft((prevTimeLeft) =>
        prevTimeLeft !== calculatedTimeLeft ? calculatedTimeLeft : prevTimeLeft
      );

      if (onTimeLeftCalculated) {
        onTimeLeftCalculated(calculatedTimeLeft);
      }
    } else {
      setTimeLeft("Event has passed");
      setEventHasPassed(true);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    calculateTimeLeft(); // Initial calculation
    intervalRef.current = window.setInterval(calculateTimeLeft, 1000); // Update every second

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current); // Clear the interval on component unmount
    };
  }, []); // Empty dependency array ensures this effect only runs once

  if (eventHasPassed || !renderUI) {
    return null;
  }

  const handleRegisterClick = () => {
    // const router = useRouter();
    const eventId = event.id.toString();
    let formRoute = "/register";

    switch (event.category) {
      case "contest":
        formRoute = "/register/hackathon";
        break;
      case "tech expo":
        formRoute = "/register/techexpo";
        break;
      default:
        formRoute = "/register/general";
    }
    const fullRoute = `${formRoute}?eventId=${eventId}`;
    router.push(fullRoute);
    // router.push(formRoute);
    // router.push({
    //   pathname: formRoute,
    //   query: { eventId },
    // });
  };

  return (
    <Card className="contest-card">
      <CardHeader>
        <CardTitle>{event.name}</CardTitle>
        <CardDescription>
          <p>Target Date: {new Date(event.targetDate).toLocaleDateString()}</p>
        </CardDescription>
        <p>{event.description}</p>
      </CardHeader>
      <CardContent>
        <div className="border p-4 rounded shadow">
          <p className="mt-4 text-lg text-red-500">Countdown: {timeLeft}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-coopBlue hover:bg-amber-500"
          onClick={handleRegisterClick}
        >
          Register to participate
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Countdown;
