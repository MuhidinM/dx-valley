/** @format */
"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { FooterItemFetch } from '@/services/footer'
import { FooterData, FooterItems } from "@/types/strapi-types";

const Footer = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const response = await fetch("/api/subscriber", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    if (response.ok) {
      alert("subscribed successfully!");
      setEmail("");
    } else {
      alert("Failed to be subscribed!");
    }
  };


  const [FooterItems, setFooterItems] = useState<FooterData>(); // Initialize as an empty array

  useEffect(() => {
    const fetchMenuItems = async () => {
      const data = await FooterItemFetch();
      setFooterItems(data);
    };

    fetchMenuItems();
  }, []);

  return (
    <footer className="font-sans bg-coopBlue text-white">
      <div className="mx-auto max-w-screen-xl px-4 ">
        <div className="border-b border-gray-100 py-4 dark:border-gray-700 md:py-4 lg:py-12">
          <div className="items-start gap-6 md:gap-8 lg:flex">
            <div className="grid min-w-0 flex-1 grid-cols-1 gap-6 md:gap-16 xl:grid-cols-2 p-6">
              <div>
                <h6 className=" font-sans mb-4 text-xl font-extrabold ">
                {FooterItems?.title}
                  <span className=" text-gray-800 font-bold mx-2">
                    D<span className="text-coopOrange"> X </span>VALLEY{" "}
                  </span>
                </h6>
                <p className="flex font-sans text-white">
                {FooterItems?.description}
                </p>
              </div>

              <div className="mt-0 flex justify-end">
                <div className="mt-4 w-full md:mt-0 lg:mt-0 lg:max-w-lg justify-end">
                  <div className="space-y-5 rounded-lg p-6">
                    <form onSubmit={handleSubmit} action="#">
                      <div className="items-end space-y-4 sm:flex sm:space-y-0">
                        <div className="relative mr-3 w-full sm:w-96 lg:w-full space-y-2 text-black">
                          {/* <label className='font-sans mb-2 block text-sm font-medium text-white'>
                        Get the latest deals and more.
                      </label> */}
                          <Label htmlFor="email" className="text-white">
                            {" "}
                            Get the latest News and More.
                          </Label>
                          <Input
                            type="email"
                            color="coopBlue"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div>
                          <Button
                            // variant={"outline"}
                            className="bg-coopOrange hover:bg-black font-sans"
                          >
                            SUBSCRIBE
                          </Button>
                        </div>
                      </div>
                    </form>

                    {/* <hr className="border-gray-200 dark:border-gray-600" /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container grid grid-cols-4 mt-8">
            <div>
              <h6 className="mb-4 text-xl font-sans font-extrabold text-white">
                Divisions
              </h6>
              <ul className="space-y-3 font-sans text-white">
                {FooterItems?.divisions.map((divisionItem) => (
                  <li key={divisionItem.href}>
                    <Link
                      href={divisionItem.href}
                      title=""
                      className="text-gray-200 hover:text-gray-300"
                    >
                      {divisionItem.link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h6 className="mb-4 text-xl font-sans font-extrabold text-white">
                Collaboration
              </h6>
              <ul className="space-y-3 font-sans text-white">
                {FooterItems?.collaboration.map((collaboration) => (
                  <li key={collaboration.href}>
                    <Link
                      href={collaboration.href}
                      title=""
                      className="text-gray-200 hover:text-gray-300"
                    >
                      {collaboration.link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h6 className="mb-4 text-xl font-sans font-extrabold text-white">
                Events
              </h6>
              <ul className="space-y-3 font-sans text-white">
                {FooterItems?.events.map((event) => (
                  <li key={event.href}>
                    <Link
                      href={event.href}
                      title=""
                      className="text-gray-200 hover:text-gray-300"
                    >
                      {event.link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h6 className="mb-4 text-xl font-sans font-extrabold text-white">
                Other Links
              </h6>
              <ul className="space-y-3 font-sans text-white">
                {FooterItems?.otherlinks.map((otherLinks) => (
                  <li key={otherLinks.href}>
                    <Link
                      href={otherLinks.href}
                      title=""
                      className="text-gray-200 hover:text-gray-300"
                    >
                      {otherLinks.link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="py-6 md:py-8">
          <div className="gap-4 space-y-5 xl:flex xl:items-center xl:justify-between xl:space-y-0">
            <Link href="/" className="flex items-center">
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                D <span className="text-orange-500">X</span> VALLEY
              </span>
            </Link>

            <p className="text-sm">
              © { new Date().getFullYear() } {" "}
              <Link href="https://coopbankoromia.com.et/" className="hover:underline">
                Cooperative Bank of Oromia
              </Link>
              , Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
