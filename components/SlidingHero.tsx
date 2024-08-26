/** @format */

"use client";
import { useState, useEffect } from "react";

const images = ["/image/hero2.jpg", "/image/hero3.jpg", "/image/hero4.jpg"];

const mottos = [
  "Empowering Communities",
  "Innovating for Change",
  "Building Futures Together",
];

const quotes = [
  "Making digitalization the standard for empowering communities and enhancing lives.",
  "Innovating and Transforming Lives, One Digital Step at a Time",
  "Opening doors for anyone who wants to work together.",
];

export default function SlidingHero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative h-[500px] overflow-hidden">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-black bg-opacity-70" />
      <div className="absolute inset-0 flex flex-col justify-center text-white p-8 md:p-16 max-w-2xl">
        <h1 className="text-5xl md:text-4xl font-bold mb-2">
          {mottos[currentIndex]}
        </h1>
        <p className="text-md md:text-base italic md:mt-1 mt-2 ">
          "{quotes[currentIndex]}"
        </p>
        <button
  onClick={() => window.location.href = '#'}
  className="mt-6  ml-20 mr-20 bg-coopBlue text-white px-7 py-2  rounded-md hover:bg-coopBlueHover transition "
>
  Explore For More
</button>

      </div>
      <div className="absolute bottom-4 left-8 flex space-x-2">
        {images.map((_, index) => (
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
