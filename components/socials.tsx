"use client";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Send,
  Twitter,
} from "lucide-react";
import React from "react";

const Socials = () => {
  return (
    <header>
      <nav className="border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 border-b">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <div className=""></div>
          <div className="flex items-center lg:order-2 text-blue-500 space-x-4">
            <Facebook
              onClick={() =>
                window.open("https://www.facebook.com/cooperativebankoforomia")
              }
              className="cursor-pointer"
            />
            <Instagram
              onClick={() =>
                window.open("https://www.instagram.com/coop_bank/")
              }
              className="cursor-pointer"
            />
            <Youtube
              onClick={() =>
                window.open("https://www.youtube.com/@CoopbankoromiaEthio")
              }
              className="cursor-pointer"
            />
            <Twitter
              onClick={() => window.open("https://twitter.com/coopbankoromia")}
              className="cursor-pointer"
            />
            <Linkedin
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/company/cooperative-bank-of-oromia/"
                )
              }
              className="cursor-pointer"
            />
            <Send
              onClick={() => window.open("https://t.me/s/coopbankoromia")}
              className="cursor-pointer"
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Socials;
