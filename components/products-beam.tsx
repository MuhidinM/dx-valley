"use client";

import React, { forwardRef, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "./ui/animated-beam";
import Image from "next/image";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function ProductsBeam() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const descriptions = {
    div1: "We'd love to hear from you! Have a question about our products or services? Need help with an order? Our friendly customer support team is here to assist you.",
    div2: "Deboo is a crowdfunding platform that provides a secure environment for individuals and organizations to receive donations and for contributors to support trustworthy causes. It serves as a bridge between potential donors and equity contributors, facilitating the connection between those seeking financial support and those willing to provide it.",
    div3: "Description for Coop Stream",
    div4: "Description for Dx-valley",
    div5: "Description for Diaspora Banking",
    div6: "Description for VSLA",
    div7: "Description for Souqpass",
    div8: "Description for Equb",
  };

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
      className="relative h-[500px] rounded-lg border bg-background p-10 md:shadow-xl grid grid-cols-2 gap-4"
      ref={containerRef}
    >
      <div className="flex size-full flex-col max-w-lg items-stretch justify-between ">
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div1Ref} className="w-24 h-24">
            <Image
              src={"/image/companies/coop-stream.png"}
              alt=""
              width={100}
              height={100}
            />
          </Circle>
          <Circle ref={div5Ref} className="w-24 h-24">
            <Image
              src={"/image/companies/coop-stream.png"}
              alt=""
              width={100}
              height={100}
            />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div2Ref} className="w-24 h-24">
            <Image
              src={"/image/companies/coop-stream.png"}
              alt=""
              width={100}
              height={100}
            />
          </Circle>
          <Circle ref={div4Ref} className="w-36 h-36">
            <Image
              src={"/image/companies/coop-stream.png"}
              alt=""
              width={100}
              height={100}
            />
          </Circle>
          <Circle ref={div6Ref} className="w-24 h-24">
            <Image
              src={"/image/companies/coop-stream.png"}
              alt=""
              width={100}
              height={100}
            />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div3Ref} className="w-24 h-24">
            <Image
              src={"/image/companies/coop-stream.png"}
              alt=""
              width={100}
              height={100}
            />
          </Circle>
          <Circle ref={div7Ref} className="w-24 h-24">
            <Image
              src={"/image/companies/coop-stream.png"}
              alt=""
              width={100}
              height={100}
            />
          </Circle>
        </div>
      </div>

      <div className="border-l-2 px-10">test</div>

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
