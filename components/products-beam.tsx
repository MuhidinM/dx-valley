/** @format */

"use client";

import React, { useState, forwardRef, useRef } from "react";

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import Image from "next/image";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode; onClick?: () => void }
>(({ className, children, onClick }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function ProductsBeam() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);
  const div8Ref = useRef<HTMLDivElement>(null);

  // Descriptions for each tag
  const descriptions = {
    div1: "We'd love to hear from you! Have a question about our products or services? Need help with an order? Our friendly customer support team is here to assist you.",
    div2: "Description for Debbo",
    div3: "Description for Coop Stream",
    div4: "Description for Dx-valley",
    div5: "Description for Diaspora Banking",
    div6: "Description for VSLA",
    div7: "Description for Souqpass",
    div8: "Description for Equb",
  };

  const handleCircleClick = (tag: string) => {
    setActiveTag(tag);
  };

  return (
    <div className="flex">
      <div
        className="relative flex h-[450px] w-[1500px] items-start justify-start overflow-hidden rounded-lg"
        ref={containerRef}
      >
        <div className="flex flex-col items-center justify-start w-full max-w-lg max-h-[200px] gap-10 p-4">
          <div className="flex flex-row items-center justify-start gap-10">
            <Circle
              ref={div1Ref}
              className="w-25 h-25  hover:scale-110 hover:bg-cooplightBlueHover2 border-2 border-transparent hover:border-white"
              onClick={() => handleCircleClick('div1')}
            >
              <Image
                width={100}
                height={100}
                src="/image/companies/recon.png"
                alt="recon"
              />
            </Circle>
            <Circle
              ref={div5Ref}
              className="w-25 h-25  hover:scale-110 hover:bg-cooplightBlueHover2 border-2 border-transparent hover:border-white"
              onClick={() => handleCircleClick('div5')}
            >
              <Image
                width={100}
                height={100}
                src="/image/companies/diaspora.png"
                alt="diasporabanking"
              />
            </Circle>
          </div>
          <div className="flex flex-row items-center justify-start gap-10">
            <Circle
              ref={div2Ref}
              className="w-25 h-25  hover:scale-110 hover:bg-cooplightBlueHover2 border-2 border-transparent hover:border-white"
              onClick={() => handleCircleClick('div2')}
            >
              <Image
                width={100}
                height={100}
                src="/image/companies/debbo.png"
                alt="deboo"
              />
            </Circle>
            <Circle
              ref={div4Ref}
              className="w-25 h-25  hover:scale-110 hover:bg-cooplightBlueHover2 border-2 border-transparent hover:border-white"
              onClick={() => handleCircleClick('div4')}
            >
              <Image
                width={100}
                height={100}
                src="/image/companies/dx.jpg"
                alt="coop"
              />
            </Circle>
            <Circle
              ref={div6Ref}
              className="w-25 h-25  hover:scale-110 hover:bg-cooplightBlueHover2 border-2 border-transparent hover:border-white"
              onClick={() => handleCircleClick('div6')}
            >
              <Image
                width={100}
                height={70}
                src="/image/companies/VSLA-image.png"
                alt="vsla"
              />
            </Circle>
          </div>
          <div className="flex flex-row items-center justify-start gap-10">
            <Circle
              ref={div3Ref}
              className="w-25 h-25  hover:scale-110 hover:bg-cooplightBlueHover2 border-2 border-transparent hover:border-white"
              onClick={() => handleCircleClick('div3')}
            >
              <Image
                width={100}
                height={100}
                src="/image/companies/coop-stream.png"
                alt="coop-stream"
              />
            </Circle>
            <Circle
              ref={div7Ref}
              className="w-25 h-25  hover:scale-110 hover:bg-cooplightBlueHover2 border-2 border-transparent hover:border-white"
              onClick={() => handleCircleClick('div7')}
            >
              <Image
                width={100}
                height={100}
                src="/image/companies/souqpass.png"
                alt="souqpass"
              />
            </Circle>
            <Circle
              ref={div8Ref}
              className="w-25 h-25 hover:scale-110 hover:bg-cooplightBlueHover2 border-2 border-transparent hover:border-white"
              onClick={() => handleCircleClick('div8')}
            >
              <Image
                width={100}
                height={100}
                src="/image/companies/equb.png"
                alt="equb"
              />
            </Circle>
          </div>
        </div>

        {/* Description Display Area */}
        <div className="flex flex-col items-start justify-start p-4 border-l-2 border-gray-300 h-[580px] w-[768px]">
          <p className="text-lg  mb-4">
            {descriptions[activeTag || 'div1']}
          </p>
          <button className="bg-coopBlue text-white px-6 py-2 rounded-md hover:bg-coopBlueHover transition">
            Learn More
          </button>
        </div>

        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div8Ref}
          toRef={div4Ref}
          curvature={75}
          endYOffset={30}
          height={4}
          reverse
        />
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
    </div>
  );
}
