"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { heroImages } from "@/constants";
import Image from "next/image";
import { Button } from "react-day-picker";
import Link from "next/link";

export function Hero() {
  const plugin = React.useRef(Autoplay({ delay: 2000 }));

  return (
    <div className="mx-8">
      <Carousel plugins={[plugin.current]} className="w-full">
        <CarouselContent>
          {heroImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <div className="relative w-full h-[600px]">
                      <div className="absolute w-full bottom-0 z-10 bg-opacity-50 bg-black text-white p-8 rounded">
                        <h1 className="text-3xl">{image.text}</h1>
                        <div className="flex mt-2">
                          <Link
                            href={image.link}
                            className="bg-coopBlue text-white py-3 px-4 rounded-md items-end"
                          >
                            {image.linkTitle}
                          </Link>
                        </div>
                      </div>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        style={{ objectFit: "cover" }}
                        className="rounded"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
