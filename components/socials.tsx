"use client";
import {
  Facebook,
  Instagram,
  Linkedin,
  MessageCircle,
  Send,
  Twitter,
} from "lucide-react";
import React from "react";

const Socials = () => {
  return (
    <header>
      <nav className="border-gray-200 dark:border-gray-700 px-4 lg:px-6 py-2.5 dark:bg-gray-900 border-b">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <div className=""></div>
          <div className="flex items-center lg:order-2 text-blue-500 space-x-4">
            <Facebook
              onClick={() => window.open("https://facebook.com")}
              className="cursor-pointer"
            />
            <Instagram
              onClick={() => window.open("https://facebook.com")}
              className="cursor-pointer"
            />
            <MessageCircle
              onClick={() => window.open("https://facebook.com")}
              className="cursor-pointer"
            />
            <Twitter
              onClick={() => window.open("https://facebook.com")}
              className="cursor-pointer"
            />
            <Linkedin
              onClick={() => window.open("https://facebook.com")}
              className="cursor-pointer"
            />
            <Send
              onClick={() => window.open("https://facebook.com")}
              className="cursor-pointer"
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Socials;
