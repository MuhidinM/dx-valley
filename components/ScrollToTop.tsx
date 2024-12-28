/** @format */
"use client"
import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 800);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {showButton && (
        <button
          onClick={scrollToTop}
          className='fixed bottom-5 right-5 bg-coopBlue hover:bg-coopBlueHover text-white p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out'
          aria-label='Scroll to top'>
          <ArrowUp className='w-6 h-6' />
        </button>
      )}
    </div>
  );
}

export default ScrollToTopButton;
