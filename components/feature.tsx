/** @format */

"use client";
import { cn, getImageUrl } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IncubationData, CardNoLinkData } from "@/types/strapi-types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Feature({ focus }: { focus: CardNoLinkData[]}) {
  const [featureOpen, setFeatureOpen] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 10);
    }, 10);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer > 10000) {
      setFeatureOpen((prev) => (prev + 1) % focus.length);
      setTimer(0);
    }
  }, [timer]);

  return (
    <div className='container'>
      <div className='text-center mb-20'>
        <h2 className='text-3xl b-4 shrink-0 font-bold'>
          <span className=' text-coopBlue'> How</span> Does It Work ?
        </h2>
        <div className='flex justify-center mt-2  mb-12'>
          <div className='w-20 h-1 bg-coopOrange'></div>
        </div>
      </div>
      <div className=' grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='space-y-6 '>
          {focus.map((item, index) => (
            <button
              key={item.title}
              type='button'
              className='w-full'
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
        <div className='h-full'>
          <div
            className={cn(
              "relative h-[500px]  w-full rounded-lg overflow-hidden"
            )}>
            {focus.map((item, index) => (
              <Image
                key={item.title}
                src={`http://10.1.151.64:1337${item?.img ?? "" }`}
                alt={item.title}
                width={400}
                height={800}
                className={cn(
                  "rounded-lg absolute w-full object-cover transition-all duration-300 h-[500px] transform-gpu",
                  featureOpen === index ? "scale-100" : "scale-70",
                  featureOpen > index ? "translate-y-full" : ""
                )}
                style={{ zIndex: focus.length - index }}
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
          isOpen ? " max-h-64" : "max-h-0"
        )}>
        <p className='p-4 text-lg'>{content}</p>
        <div className='w-full pb-4 px-4'>
          <div className='h-1 relative rounded-full w-full overflow-hidden'>
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
