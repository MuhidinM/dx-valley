/** @format */

"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";

// Set this to false for "coming soon" mode
const IS_MEETUP_DATE_SET = false;
const MEETUP_DATE = new Date("2025-02-15T09:00:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function DevMeetupModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());

  useEffect(() => {
    // Show modal after a short delay
    const timer = setTimeout(() => setIsOpen(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!IS_MEETUP_DATE_SET) return;

    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function getTimeLeft(): TimeLeft {
    if (!IS_MEETUP_DATE_SET) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const difference = +MEETUP_DATE - +new Date();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className='sm:max-w-[600px] p-0 overflow-hidden bg-inherit'>
        <div className='p-6'>
          <div className='flex justify-center mb-8'>
            <Image
              src={"/image/dxvalleylogo1.png"}
              alt='DxValley Logo'
              width={300}
              height={60}
              className='h-12 w-auto'
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-center'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              Dev Meetup <span className='text-[#00ADEF]'>V3</span>
            </h2>

            {IS_MEETUP_DATE_SET ? (
              <>
                <div className='flex items-center justify-center gap-2 text-[#F7941D] mb-6'>
                  <Calendar className='w-5 h-5' />
                  <span className='text-lg'>
                    {MEETUP_DATE.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <div className='grid grid-cols-4 gap-4 mb-8'>
                  {Object.entries(timeLeft).map(([unit, value]) => (
                    <div
                      key={unit}
                      className='bg-inherit p-3 rounded-lg text-center'>
                      <div className='text-2xl font-bold text-coopOrange'>
                        {value.toString().padStart(2, "0")}
                      </div>
                      <div className='text-sm text-gray-400 capitalize'>
                        {unit}
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  size='lg'
                  className='bg-coopBlue hover:bg-coopBlueHover text-white'>
                  Register Now
                </Button>
              </>
            ) : (
              <div className='space-y-4'>
                <p className='text-xl text-gray-600'>Coming Soon at DxValley</p>
                <div className='flex items-center justify-center gap-2 text-[#00ADEF]'>
                  <Clock className='w-5 h-5 animate-pulse' />
                  <span>Stay tuned!</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
