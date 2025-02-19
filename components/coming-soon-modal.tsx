/** @format */

"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
const LAUNCH_DATE = new Date("2025-09-28T14:05:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function ComingSoonModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());
const [userClosed, setUserClosed] = useState<boolean>(false);

useEffect(() => {
  const timer = setInterval(() => {
    const newTimeLeft = getTimeLeft();
    setTimeLeft(newTimeLeft);

    if (
      newTimeLeft.days <= 0 &&
      newTimeLeft.hours <= 0 &&
      newTimeLeft.minutes <= 0 &&
      newTimeLeft.seconds <= 0
    ) {
      setIsOpen(false);
      setUserClosed(true);
      clearInterval(timer);
    } else if (!userClosed && !isOpen) {
      setIsOpen(true);
    }
  }, 1000);

  return () => clearInterval(timer);
}, [getTimeLeft, isOpen, userClosed]);

  function getTimeLeft(): TimeLeft {
    const difference = +LAUNCH_DATE - +new Date();
    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

const handleOpenChange = (open: boolean) => {
  setIsOpen(open);
  if (!open) {
    setUserClosed(true);
  }
};


 return (
   <Dialog open={isOpen} onOpenChange={handleOpenChange}>
     <DialogContent className='sm:max-w-[800px] bg-white text-gray-800 overflow-hidden'>
       <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5 }}
         className='p-6 text-center relative'>
         <motion.h3
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.5, delay: 0.2 }}
           className='text-4xl font-extrabold mb-8 text-coopOrange'>
           We Are Coming Soon!
         </motion.h3>
         <Image
           src={"/image/dxvalleylogo1.png"}
           alt='dxvalley logo'
           width={500}
           height={200}
           className='mx-auto mb-4'
         />

         <div className='flex justify-center space-x-4 mb-8'>
           {Object.entries(timeLeft).map(([unit, value]) => (
             <CalendarFlipUnit key={unit} unit={unit} value={value} />
           ))}
         </div>

         <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.5, delay: 0.2 }}
           className='mb-6'></motion.div>
       </motion.div>

       <AnimatedMotto />
     </DialogContent>
   </Dialog>
 );
}

interface CalendarFlipUnitProps {
  unit: string;
  value: number;
}

function CalendarFlipUnit({ unit, value }: CalendarFlipUnitProps) {
  return (
    <div className='flex flex-col items-center'>
      <div className='relative w-16 h-20 bg-gray-100 rounded-lg shadow-md overflow-hidden'>
        <AnimatePresence mode='popLayout'>
          <motion.div
            key={value}
            initial={{ rotateX: -90, y: "50%", opacity: 0 }}
            animate={{ rotateX: 0, y: "0%", opacity: 1 }}
            exit={{ rotateX: 90, y: "-50%", opacity: 0 }}
            transition={{ duration: 0.5 }}
            className='absolute inset-0 flex items-center justify-center bg-white border-b-2 border-gray-200'>
            <span className='text-2xl font-bold text-[#00adef]'>
              {value.toString().padStart(2, "0")}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
      <span className='text-sm capitalize mt-2 text-coopOrange'>{unit}</span>
    </div>
  );
}

function AnimatedMotto() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className='relative top-0 right-4 text-right'>
      <h4 className='text-2xl font-bold mb-2 text-[#00adef] sparkling-text'>
        Empowering <span className='italic font-extrabold '> Communities,</span>
      </h4>
      <h4 className='text-2xl font-bold text-coopOrange sparkling-text'>
        Transforming <span className='italic font-extrabold'> Lives</span>
      </h4>
      <style jsx>{`
        @keyframes sparkle {
          0% {
            text-shadow: 0 0 4px rgba(0, 173, 239, 0.5),
              0 0 11px rgba(0, 173, 239, 0.5), 0 0 19px rgba(0, 173, 239, 0.5);
          }
          50% {
            text-shadow: 0 0 4px rgba(255, 165, 0, 0.5),
              0 0 11px rgba(255, 165, 0, 0.5), 0 0 19px rgba(255, 165, 0, 0.5);
          }
          100% {
            text-shadow: 0 0 4px rgba(0, 173, 239, 0.5),
              0 0 11px rgba(0, 173, 239, 0.5), 0 0 19px rgba(0, 173, 239, 0.5);
          }
        }
        .sparkling-text {
          animation: sparkle 2s infinite;
        }
      `}</style>
    </motion.div>

    // <Motto />
  );
}
