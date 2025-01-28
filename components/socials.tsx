"use client";

import { SocialItemFetch } from "@/services/social";
import { Social } from "@/types/strapi-types";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Send,
  Twitter,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import NotificationBar from "./notification-bar";

const Socials = () => {
  const [socialItems, setSocialItems] = useState<Social[]>();

  useEffect(() => {
    const fetchSocialItems = async () => {
      const data = await SocialItemFetch();
      setSocialItems(data);
    };

    fetchSocialItems();
  }, []);

  // useEffect(() => {
  //   console.log("socialItems: ", socialItems)
  // },[socialItems])

  return (
    <header>
      <nav className='border-gray-200 dark:border-gray-700 px-4 lg:px-6 py-2.5 dark:bg-gray-900 border-b'>
        <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl'>
          <div className=''>
            {" "}
            <NotificationBar />
          </div>
          <div className='flex items-center lg:order-2 text-coopBlue space-x-4 '>
            <Facebook
              onClick={() =>
                window.open(
                  socialItems?.find((social) => social.media === "Facebook")
                    ?.url || ""
                )
              }
              className='cursor-pointer'
              target='_blank'
            />
            <Instagram
              onClick={() =>
                window.open(
                  socialItems?.find((social) => social.media === "Instagram")
                    ?.url || ""
                )
              }
              className='cursor-pointer'
              target='_blank'
            />

            <Twitter
              onClick={() =>
                window.open(
                  socialItems?.find((social) => social.media === "Twitter(X)")
                    ?.url || ""
                )
              }
              className='cursor-pointer'
              target='_blank'
            />
            <Youtube
              onClick={() =>
                window.open(
                  socialItems?.find((social) => social.media === "Youtube")
                    ?.url || ""
                )
              }
              className='cursor-pointer'
              target='_blank'
            />
            <Linkedin
              onClick={() =>
                window.open(
                  socialItems?.find((social) => social.media === "LinkedIn")
                    ?.url || ""
                )
              }
              className='cursor-pointer'
              target='_blank'
            />
            <Send
              onClick={() =>
                window.open(
                  socialItems?.find((social) => social.media === "Telegram")
                    ?.url || ""
                )
              }
              className='cursor-pointer'
              target='_blank'
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Socials;
