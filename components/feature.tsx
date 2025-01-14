/** @format */

"use client";
import { cn, getImageUrl } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { CardNoLinkData } from "@/types/strapi-types";

export function Feature({ focus }: { focus: CardNoLinkData[] }) {
  const [featureOpen, setFeatureOpen] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);
  const [hasPlayed, setHasPlayed] = useState<boolean>(false); // New state to track animation play status
  const featureRef = useRef<HTMLDivElement>(null);

  // Callback function to handle intersection changes
  const handleIntersection = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting) {
        if (!hasPlayed) {
          setHasPlayed(true); // Set to true when animation starts
          const interval = setInterval(() => {
            setTimer((prev) => prev + 10);
          }, 20);
          return () => clearInterval(interval); // Clean up interval when component is out of view
        }
      } else {
        setTimer(0); // Reset timer if the component is out of view
        setHasPlayed(false); // Reset hasPlayed flag when out of view
      }
    },
    [hasPlayed]
  );

  // Create IntersectionObserver instance
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1, // Trigger when at least 10% of the component is visible
    });

    if (featureRef.current) {
      observer.observe(featureRef.current);
    }

    return () => {
      if (featureRef.current) {
        observer.unobserve(featureRef.current);
      }
    };
  }, [handleIntersection]);

  useEffect(() => {
    if (timer > 10000) {
      setFeatureOpen((prev) => (prev + 1) % focus.length);
      setTimer(0);
    }
  }, [timer]);

  return (
    <div ref={featureRef} className='mt-20 lg:max-w-7xl mx-auto'>
      <div className='text-center '>
        <h2 className='text-4xl b-4 shrink-0 font-extrabold'>
          <span className=' text-coopBlue'> How</span> Does It Work ?
        </h2>
        <div className='flex justify-center mt-2 mb-12'>
          <div className='w-20 h-1 bg-coopOrange'></div>
        </div>
      </div>
      <div className=' grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='space-y-6 '>
          {focus.map((item, index) => (
            <button
              key={item.title}
              type='button'
              className='w-full '
              onClick={() => {
                setFeatureOpen(index);
                setTimer(0);
              }}
              title={item.title}>
              <TextComponent
                number={index + 1}
                title={item.title}
                content={item.description}
                isOpen={featureOpen === index}
                loadingWidthPercent={featureOpen === index ? timer / 100 : 0}
              />
            </button>
          ))}
        </div>
        <div className='h-full w-full '>
          <div
            className={cn(
              "relative w-full h-full rounded-lg overflow-hidden   "
            )}>
            {focus.map((item, index) => (
              <img
                key={item.title}
                src={`${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}${
                  item?.img ?? ""
                }`}
                alt={item.title}
                className={cn(
                  "rounded-lg absolute w-full object-cover transition-all duration-300 h-[500px] transform-gpu",
                  featureOpen === index ? "scale-100" : "scale-70",
                  featureOpen > index ? "translate-y-full" : ""
                )}
                style={{ zIndex: focus.length - index }}
                loading='lazy'
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TextComponent({
  number,
  title,
  content,
  isOpen,
  loadingWidthPercent,
}: Readonly<{
  number: number;
  title: string;
  content: string;
  isOpen: boolean;
  loadingWidthPercent?: number;
}>) {
  return (
    <div
      className={cn(
        "transition-colors rounded-lg transform-gpu",
        isOpen ? "bg-coopBlue/10" : "saturate-0 opacity-50"
      )}>
      <div className='w-full p-4 flex gap-4 items-center'>
        <p
          className={cn(
            "inline-flex size-8 rounded-md items-center justify-center text-coopBlue bg-coopBlue/20"
          )}>
          {number}
        </p>
        <h2
          className={cn(
            "text-xl font-medium dark:text-gray-200 text-gray-800 text-left"
          )}>
          {title}
        </h2>
      </div>
      <div
        className={cn(
          "overflow-hidden transition-all duration-500 text-left dark:text-gray-400 text-gray-600 w-full transform-gpu",
          isOpen ? " max-h-80" : "max-h-0"
        )}>
        <p className='p-4 text-lg'>{content}</p>
        <div className='w-full pb-4 px-4'>
          <div className='h-2 relative rounded-full w-full overflow-hidden'>
            <div
              className={cn("absolute top-0 left-0 h-1 bg-coopBlue")}
              style={{ width: `${loadingWidthPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
