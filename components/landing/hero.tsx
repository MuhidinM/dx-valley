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

import {heroImages} from "@/constants";

export function Hero() {
  const plugin = React.useRef(Autoplay({ delay: 2000 }));

  return (
    <div className="mx-8">
      <Carousel plugins={[plugin.current]} className="w-full">
        <CarouselContent>
          {heroImages.map((image) => (
            <CarouselItem key={image?.id}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex items-center h-[550px] justify-center p-6">
                    <span className="text-4xl font-semibold">{image?.img} This is the content</span>
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
