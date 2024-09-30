/** @format */

"use client";
import React, { useEffect, useState, useRef } from "react";
import { Event } from "@/types/types";
import { useRouter } from "next/navigation";

interface CountdownProps {
  event: Event;
  onTimeLeftCalculated?: (timeLeft: string) => void;
  renderUI?: boolean;
}

const CountDownCallForProposal: React.FC<CountdownProps> = ({
  event,
  onTimeLeftCalculated,
  renderUI = true,
}) => {
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

      setTimeLeft(calculatedTimeLeft);
      setEventHasPassed(false);

      if (onTimeLeftCalculated) {
        onTimeLeftCalculated(calculatedTimeLeft);
      }
    } else {
      const expiredTime = "00h 00m 00s";
      setTimeLeft(expiredTime);
      setEventHasPassed(true);
      if (onTimeLeftCalculated) {
        onTimeLeftCalculated(expiredTime);
      }
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    calculateTimeLeft(); // Initial calculation
    intervalRef.current = window.setInterval(calculateTimeLeft, 1000); // Update every second

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current); // Clear the interval on component unmount
    };
  }, []);

  return null; // Since we are not rendering anything directly inside Countdown
};

export default CountDownCallForProposal;
