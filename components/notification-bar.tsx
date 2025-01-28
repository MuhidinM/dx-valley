/** @format */

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotificationBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className='relative bg-inherit flex justify-center'>
          <div className='max-w-3xl w-full mx-auto rounded-b-lg bg-inherit text-white'>
            <div className='px-6 py-3'>
              <div className='flex items-center justify-between gap-4'>
                <div className='flex items-center gap-3 min-w-0'>
                  <Clock className='h-5 w-5 flex-shrink-0 text-orange-500' />
                  <div className='min-w-0'>
                    <p className='text-sm text-gray-700 hidden sm:block'>
                      Register For Developer Meet V3
                    </p>
                    {/* <p className='text-sm font-medium text-gray-800'>
                      <span className='text-orange-500'>
                        Registration Deadline:
                      </span>{" "}
                      February 3, 2025
                    </p> */}
                  </div>
                </div>

                <div className='flex items-center gap-4'>
                  <Link href={"/call-for-proposal"}>
                    <Button
                      variant='default'
                      className='bg-orange-500 hover:bg-orange-600 text-white'
                      size='sm'
                      disabled>
                      {/* Register Now */}
                      Coming Soon
                      {/* <ArrowRight className='ml-2 h-4 w-4' /> */}
                    </Button>
                  </Link>
                  <button
                    onClick={() => setIsVisible(false)}
                    className='text-gray-800 hover:text-gray-500 transition-colors'
                    aria-label='Close notification'>
                    <X className='h-5 w-5' />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
