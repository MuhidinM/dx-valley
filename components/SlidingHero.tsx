"use client";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { CardData } from "@/types/strapi-types";

export default function SlidingHero({hero}:{hero: CardData[]}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const mottos = hero?.map(elmnt => (
    elmnt.title
  )) || []
  const quotes = hero?.map(elmnt => (
    elmnt.description
  )) || []
  const links = hero?.map(elmnt => (
    elmnt.link.href
  )) || []
  const link_desc = hero?.map(elmnt => (
    elmnt.link.title
  )) || []
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % hero.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative h-[650px] overflow-hidden">
      {hero.map((img, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(http://10.1.151.64:1337${img.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-black bg-opacity-70" />
      <div className="absolute inset-0 flex flex-col justify-end text-white p-8 md:p-16 max-w-2xl">
        <h1 className="text-5xl md:text-4xl font-bold mb-2">
          {mottos[currentIndex]}
        </h1>
        <p className="text-md md:text-base italic md:mt-1 mt-2 ">
          "{quotes[currentIndex]}"
        </p>
        <Button
          className="w-36 bg-coopBlue mt-5 text-white font-bold font-sans  hover:bg-coopBlueHover  hover:cursor-pointer"
          onClick={() => (window.location.href = links[currentIndex])}
        >
          {link_desc[currentIndex]}
        </Button>
      </div>
      <div className="absolute bottom-4 left-8 flex space-x-2">
        {hero.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white bg-opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
