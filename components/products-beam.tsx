/** @format */

"use client";

import React, { forwardRef, useRef } from "react";

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";

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
      )}>
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function ProductsBeam() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);
  const div8Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className='relative flex h-[600px] w-full items-center justify-center overflow-hidden rounded-lg'
      ref={containerRef}>
      <div className='flex size-full flex-col max-w-lg max-h-[200px] items-stretch justify-between gap-10'>
        <h1 className='px-14 text-2xl font-bold'>Some Products We've Launched</h1>
        <div className='flex flex-row items-center justify-between'>
          <Circle ref={div1Ref} className='size-20'>
            <img src='/image/companies/recon.png' alt='recon' />
          </Circle>
          <Circle ref={div5Ref} className='size-20'>
            <img src='/image/companies/diaspora.png' alt='diasporabanking' />
          </Circle>
        </div>
        <div className='flex flex-row items-center justify-between'>
          <Circle ref={div2Ref} className='size-20'>
            <img src='/image/companies/debbo.png' alt='deboo' />
          </Circle>
          <Circle ref={div4Ref} className='size-20'>
            <img src='/image/companies/dx.jpg' alt='coop' />
          </Circle>
          <Circle ref={div6Ref} className='size-20'>
            <img src='/image/companies/VSLA-image.png' alt='vsla' />
          </Circle>
        </div>
        <div className='flex flex-row items-center justify-between'>
          <Circle ref={div3Ref} className='size-20'>
            <img src='/image/companies/coop-stream.png' alt='coop=stream' />
          </Circle>
          <Circle ref={div7Ref} className='size-20'>
            <img src='/image/companies/souqpass.png' alt='souqpass' />
          </Circle>
          <Circle ref={div8Ref} className='size-20'>
            <img src='/image/companies/equb.png' alt='equb' />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div8Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
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
  );
}

