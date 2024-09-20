/** @format */

"use client";

import React, { forwardRef, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "./ui/animated-beam";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CardData } from "@/types/strapi-types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Circle = forwardRef<
  HTMLDivElement,
  {
    className?: string;
    children?: React.ReactNode;
    onClick: () => void;
    name: string;
  }
>(({ className, children, onClick, name }, ref) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        ref={ref}
        className={cn(
          "z-10 flex lg:size-24 md:size-24  sm:size-20 xs: size-16 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] cursor-pointer transition-transform hover:scale-105",
          className
        )}
        onClick={onClick}
      >
        {children}
      </div>
      <span className="text-sm font-medium">{name}</span>
    </div>
  );
});

Circle.displayName = "Circle";

export function ProductsBeam({ products }: { products: CardData[] }) {
  const [activeTag, setActiveTag] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative rounded-lg border bg-background p-10 grid lg:grid-cols-2 gap-4 sm:grid-cols-1"
      ref={containerRef}
    >
      <div className="flex  flex-col max-w-lg justify-between ">
        <div className="flex flex-row items-center justify-between">
          <Circle
            ref={div1Ref}
            onClick={() => setActiveTag(3)}
            name={""}
            className="dark:bg-gray-200"
          >
            <img
              src={`${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}${
                products[3]?.img ?? ""
              }`}
              alt=""
              width={200}
              height={100}
            />
          </Circle>
          <Circle ref={div5Ref} onClick={() => setActiveTag(1)} name={""}>
            <img
              src={`${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}${
                products[1]?.img ?? ""
              }`}
              alt=""
              width={200}
              height={100}
              className="dark:bg-gray-200"
            />
          </Circle>
        </div>

        <div className="flex flex-row items-center justify-between">
          <Circle ref={div2Ref} onClick={() => setActiveTag(2)} name={""}>
            <img
              src={`${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}${
                products[2]?.img ?? ""
              }`}
              alt=""
              width={200}
              height={100}
              className="dark:bg-gray-200"
            />
          </Circle>
          <Circle
            ref={div4Ref}
            className="w-24 h-24 xs:w-12 xs:h-12"
            onClick={() => setActiveTag(0)}
            name={""}
          >
            <img
              src={`${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}${
                products[0]?.img ?? ""
              }`}
              alt=""
              width={200}
              height={100}
              className="dark:bg-gray-200"
            />
          </Circle>
          <Circle ref={div6Ref} onClick={() => setActiveTag(4)} name={""}>
            <img
              src={`${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}${
                products[4]?.img ?? ""
              }`}
              alt=""
              width={200}
              height={100}
              className="dark:bg-gray-200"
            />
          </Circle>
        </div>

        <div className="flex flex-row items-center justify-between">
          <Circle ref={div3Ref} onClick={() => setActiveTag(5)} name={""}>
            <img
              src={`${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}${
                products[5]?.img ?? ""
              }`}
              alt=""
              width={200}
              height={100}
              className="dark:bg-gray-200"
            />
          </Circle>
          <Circle ref={div7Ref} onClick={() => setActiveTag(6)} name={""}>
            <img
              src={`${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}${
                products[6]?.img ?? ""
              }`}
              alt=""
              width={200}
              height={100}
              className="dark:bg-gray-200"
            />
          </Circle>
        </div>
      </div>

      <div className="border-l-2 px-6 flex flex-col justify-between mt-10 md:mt-0">
        <div>
          <h2 className="text-2xl font-bold mb-4">
            {products[activeTag]?.title ?? ""}
          </h2>

          <div className="prose mb-4 ">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              className={"prose dark:prose-invert"}
            >
              {products[activeTag]?.description ?? ""}
            </ReactMarkdown>
          </div>
        </div>
        <div className="flex gap-8">
          {products[activeTag]?.link?.href && (
            <Link href={products[activeTag].link.href} target="_blank">
              <Button>
                Visit Site <ArrowRight />
              </Button>
            </Link>
          )}

          {/* <Button variant='outline'>Read More</Button> */}
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div4Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div4Ref}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div7Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
        reverse
      />
    </div>
  );
}
