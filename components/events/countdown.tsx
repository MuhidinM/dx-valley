import React, { useEffect, useState } from "react";
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

interface ContestCardProps {
  event: Event;
}

const Countdown: React.FC<ContestCardProps> = ({ event }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const targetDate = new Date(event.targetDate);
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft("Event has passed");
      }
    };

    calculateTimeLeft();
    const timerId = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timerId);
  }, [event.targetDate]);

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
        <Button className="w-full bg-coopBlue hover:bg-amber-500">
          Register to participate
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Countdown;
