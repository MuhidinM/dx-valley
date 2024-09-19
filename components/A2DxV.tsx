/** @format */

"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function A2DxV() {
  const [inView, setInView] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect(); // Stop observing once the section is in view
        }
      },
      { threshold: 0.3 } // Adjust this threshold as needed
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={statsRef}
      // className='min-h-screen bg-gray-100 flex items-center justify-center p-4 overflow-hidden relative'
      >
      <div className='z-10 w-full max-w-6xl bg-white rounded-lg shadow-xl p-8 flex flex-col md:flex-row lg:items-center md:items-center gap-8'>
        <motion.div
          className='w-full md:w-1/3 flex flex-col items-center'
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}>
          <div className='text-6xl font-bold mb-4'>
            <span className='text-orange-500'>A2</span>
            <span className='text-[#00adef]'>DxV</span>
          </div>
          <div className='text-center mb-6'>
            <h2 className='font-bold text-base mb-2'>What is A2DxV?</h2>
            <p className='text-gray-600 text-sm'>
              A2DxV stands for &quot;Africans to DxValley&quot;. It represents
              our mission to keep African talent in Africa, fostering innovation
              and growth within the continent.
            </p>
          </div>
          <Link
            href='/callforproposal'
            className='text-gray-600 lg:block md:block hidden'>
            <motion.button
              className='bg-coopBlue hover:coopBlueHover text-white font-bold py-2 px-4 rounded-full shadow-lg flex items-center justify-center w-full max-w-xs'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={
                inView
                  ? {
                      boxShadow: [
                        "0px 0px 0px rgba(0, 0, 0, 0.2)",
                        "0px 0px 20px rgba(0, 0, 0, 0.2)",
                        "0px 0px 0px rgba(0, 0, 0, 0.2)",
                      ],
                    }
                  : {}
              }
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}>
              Apply Now <ArrowRight className='ml-2 h-4 w-4' />
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          className='w-full md:w-2/3 space-y-6'
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.5, delay: 0.2 }}>
          <div className='flex items-center justify-between'>
            <h1 className='lg:text-3xl md:text-3xl text-xl font-bold text-gray-800'>
              DxValley&apos;s Incubation Lab
            </h1>
            <motion.div
              className='text-2xl font-bold'
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.5 }}>
              <span className='text-orange-500'>A2</span>
              <span className='text-[#00adef]'>DxV</span>
            </motion.div>
          </div>
          <div className='space-y-4 text-gray-600'>
            <p className='font-bold text-lg text-gray-800 italic'>
              Why send Africa&apos;s brightest to Silicon Valley when we can
              nurture talent right here?
            </p>
            <p>
              Our expert guidance transforms potential into performance,
              empowering African innovators to build solutions for Africa and
              beyond.
            </p>
            <p className='font-bold italic text-lg text-black'>
              Come to DxValley, where African talent grows for Africa.
            </p>
          </div>
        </motion.div>

        <Link
          href='/callforproposal'
          className='text-gray-600 lg:hidden md:hidden block'>
          <motion.button
            className='bg-coopBlue hover:coopBlueHover text-white font-bold py-2 px-4 rounded-full shadow-lg flex items-center justify-center w-full max-w-xs'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={
              inView
                ? {
                    boxShadow: [
                      "0px 0px 0px rgba(0, 0, 0, 0.2)",
                      "0px 0px 20px rgba(0, 0, 0, 0.2)",
                      "0px 0px 0px rgba(0, 0, 0, 0.2)",
                    ],
                  }
                : {}
            }
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}>
            Apply Now <ArrowRight className='ml-2 h-4 w-4' />
          </motion.button>
        </Link>
      </div>

      <motion.div
        className='absolute bottom-0 right-0 w-64 h-64 opacity-20 z-0'
        initial={{ opacity: 0, x: 100 }}
        animate={inView ? { opacity: 0.2, x: 0 } : { opacity: 0, x: 100 }}
        transition={{ duration: 1, delay: 1 }}>
        <svg
          viewBox='0 0 800 800'
          fill='currentColor'
          className='text-gray-800'>
          {/* SVG content */}
        </svg>
      </motion.div>
    </div>
  );
}
