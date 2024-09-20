/** @format */

"use client";
import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import Image from "next/image";
import { CardNoLinkData } from "@/types/strapi-types";

export default function Stats({ items }: { items: CardNoLinkData[] }) {
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
    <section
      className="dark:bg-gray-900 max-w-screen-xl md:w-full "
      ref={statsRef}
    >
      <div className="max-w-screen-xl md:w-full px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
        <dl className="grid gap-8 mx-auto text-gray-900 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 dark:text-white">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-6 bg-slate-200 dark:bg-gray-800 rounded-xl shadow-lg"
            >
              <div>
                <img
                  alt=""
                  width={60}
                  height={0}
                  src={`${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}${item.img}`}
                  className="pb-6"
                />
                {/* <div className="w-60 h-60">{item.img}</div> */}
              </div>
              <dt className="mb-3 text-4xl font-bold text-gray-900 dark:text-white">
                {inView ? (
                  <CountUp
                    start={0}
                    end={parseInt(item.description)}
                    duration={2.5}
                    delay={0.5}
                  />
                ) : (
                  0
                )}
              </dt>
              <dd className="text-2xl font-extrabold text-gray-700 dark:text-gray-300 ">
                {item.title}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
