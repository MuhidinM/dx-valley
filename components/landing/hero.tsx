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

export function Hero() {
  const plugin = React.useRef(Autoplay({ delay: 2000 }));

  return (
    <div className="mx-8">
      <Carousel plugins={[plugin.current]} className="w-full">
        <CarouselContent>
          {/* {items.map((item, index) => ( */}
          {heroImages.map((image, index) => (
            // <CarouselItem key={image?.id}>
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <div className="relative w-full h-[600px] mb-4">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        layout="fill"
                        objectFit="cover"
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
