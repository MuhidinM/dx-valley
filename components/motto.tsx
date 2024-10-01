/** @format */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Motto() {
  const colors = {
    primary: "#00adef", // Blue
    secondary: "#e38524", // Orange
    accent: "#000000", // Black
  };

  const [inView, setInView] = useState(false);
  const mottoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // Stop observing once the animation is triggered
        }
      },
      { threshold: 0.5 } // Adjust the threshold as needed
    );

    if (mottoRef.current) {
      observer.observe(mottoRef.current);
    }

    return () => {
      if (mottoRef.current) {
        observer.unobserve(mottoRef.current);
      }
    };
  }, []);

  return (
    <div ref={mottoRef} className='max-w-xl mx-auto '>
      <motion.h2
        className='text-3xl lg:text-5xl md:text-4xl  font-extrabold text-center leading-tight'
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}>
        <motion.span
          className='block mb-2'
          // style={{ color: colors.accent }}
          initial={{ x: -50, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}>
          Empowering
        </motion.span>
        <motion.span
          className='block mb-2 italic'
          style={{ color: colors.secondary }}
          initial={{ x: 50, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}>
          Communities,
        </motion.span>
        <motion.div
          className='relative inline-block'
          initial={{ scale: 0.9, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8, type: "spring" }}>
          <span className='block relative z-10'>Transforming</span>
          <svg
            className='absolute inset-0 w-full h-full'
            viewBox='0 0 300 70'
            preserveAspectRatio='none'>
            <motion.path
              d='M0,50 Q150,85 300,50'
              fill='none'
              stroke={colors.secondary}
              strokeWidth='4'
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>
        <motion.span
          className='block italic'
          style={{ color: colors.primary }}
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}>
          Lives
        </motion.span>
      </motion.h2>
      {/* <motion.p
        className='mt-6 text-xl md:text-2xl text-gray-600 text-center'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}>
        Together, we build stronger communities and brighter futures.
      </motion.p> */}
    </div>
  );
}
