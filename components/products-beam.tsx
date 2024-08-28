"use client";

import React, { forwardRef, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "./ui/animated-beam";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
    <div className='flex flex-col items-center gap-2'>
      <div
        ref={ref}
        className={cn(
          "z-10 flex size-24 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] cursor-pointer transition-transform hover:scale-105",
          className
        )}
        onClick={onClick}>
        {children}
      </div>
      <span className='text-sm font-medium'>{name}</span>
    </div>
  );
});


Circle.displayName = "Circle";

export function ProductsBeam() {
  // const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string>("div4") 

  // const descriptions = {
  //   div1: "Description for Equb",
  //   div2: "Deboo is a crowdfunding platform that provides a secure environment for individuals and organizations to receive donations and for contributors to support trustworthy causes.",
  //   div3: "Description for Coop Stream",
  //   div4: "Description for Dx-valley",
  //   div5: "Description for Diaspora Banking",
  //   div6: "Description for VSLA",
  //   div7: "Description for Souqpass",
  // };

  const products = {
    div1: {
      name: "Equb",
      description: "Description for Equb",
      image: "/image/companies/equb.png",
    },
    div2: {
      name: "Deboo",
      description:
        "Deboo is a crowdfunding platform that provides a secure environment for individuals and organizations to receive donations and for contributors to support trustworthy causes.",
      image: "/image/companies/debbo.png",
    },
    div3: {
      name: "Coop Stream",
      description: "Description for Coop Stream",
      image: "/image/companies/coop-stream.png",
    },
    div4: {
      name: "DX Valley",
      description:
        "DX Valley is an innovative tech hub fostering digital transformation and entrepreneurship in Ethiopia. It serves as a collaborative space for startups, developers, and tech enthusiasts to create cutting-edge solutions and drive technological advancement in the region.",
      image: "/image/companies/DX.jpg",
    },
    div5: {
      name: "Diaspora Banking",
      description: "Description for Diaspora Banking",
      image: "/image/companies/diaspora.png",
    },
    div6: {
      name: "VSLA",
      description: "Description for VSLA",
      image: "/image/companies/VSLA-image.png",
    },
    div7: {
      name: "Souqpass",
      description: "Description for Souqpass",
      image: "/image/companies/souqpass.png",
    },
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
      className='relative rounded-lg border bg-background p-10 grid lg:grid-cols-2 gap-4 sm:grid-cols-1'
      ref={containerRef}>
      <div className='flex size-full flex-col max-w-lg items-stretch justify-between '>
        <div className='flex flex-row items-center justify-between'>
          <Circle
            ref={div1Ref}
            className='w-24 h-24'
            onClick={() => setActiveTag("div1")}
            name={""}>
            <Image
              src={"/image/companies/equb.png"}
              alt=''
              width={100}
              height={100}
            />
          </Circle>
          <Circle
            ref={div5Ref}
            className='w-24 h-24'
            onClick={() => setActiveTag("div5")}
            name={""}>
            <Image
              src={"/image/companies/diaspora.png"}
              alt=''
              width={100}
              height={100}
            />
          </Circle>
        </div>
        <div className='flex flex-row items-center justify-between'>
          <Circle
            ref={div2Ref}
            className='w-24 h-24'
            onClick={() => setActiveTag("div2")}
            name={""}>
            <Image
              src={"/image/companies/debbo.png"}
              alt=''
              width={100}
              height={100}
            />
          </Circle>
          <Circle
            ref={div4Ref}
            className='w-36 h-36'
            onClick={() => setActiveTag("div4")}
            name={""}>
            <Image
              src={"/image/companies/DX.jpg"}
              alt=''
              width={100}
              height={100}
            />
          </Circle>
          <Circle
            ref={div6Ref}
            className='w-24 h-24'
            onClick={() => setActiveTag("div6")}
            name={""}>
            <Image
              src={"/image/companies/VSLA-image.png"}
              alt=''
              width={100}
              height={100}
            />
          </Circle>
        </div>
        <div className='flex flex-row items-center justify-between'>
          <Circle
            ref={div3Ref}
            className='w-24 h-24'
            onClick={() => setActiveTag("div3")}
            name={""}>
            <Image
              src={"/image/companies/coop-stream.png"}
              alt=''
              width={100}
              height={100}
            />
          </Circle>
          <Circle
            ref={div7Ref}
            className='w-24 h-24'
            // onHover={() => setActiveTag("div7")}
            // onLeave={() => setActiveTag(null)}
            onClick={() => setActiveTag("div7")}
            name={""}>
            <Image
              src={"/image/companies/souqpass.png"}
              alt=''
              width={100}
              height={100}
            />
          </Circle>
        </div>
      </div>

      {/* <div className="border-l-2 px-10">
        {activeTag
          ? descriptions[activeTag]
          : "Hover over a circle to see the description"}
      </div> */}

      <div className='border-l-2 px-6 flex flex-col justify-between mt-10 md:mt-0'>
        <div>
          <h2 className='text-2xl font-bold mb-4'>
            {products[activeTag]?.name}
          </h2>
          <p className='mb-4'>{products[activeTag].description}</p>
        </div>
        <div className='flex gap-8'>
          <Link href='#'>
            <Button> Visit Site <ArrowRight /> </Button>
          </Link>
          <Button variant='outline'>Read More</Button>
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