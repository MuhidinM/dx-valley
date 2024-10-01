/** @format */
"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { FooterItemFetch } from "@/services/footer";
import { FooterData } from "@/types/strapi-types";
import { toast, Toaster } from "sonner";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/newapi/subscriber", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json(); // Parse the response only once

      if (response.ok) {
        if (data.subscribed) {
          // Successful subscription
          toast.success(data.message3 || "Subscribed Successfully!");
        } else {
          // Already subscribed
          toast.error(data.message2 || "Already subscribed!");
        }
      } else {
        
        if (data.message === "User already subscribed") {
          toast.error("You are already subscribed!");
        } else {
          toast.error("Failed to subscribe!", {
            description: "Please try again later.",
          });
        }
      }
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error("An unexpected error occurred", {
        description: "Please try again later.",
      });
    } finally {
      setEmail(""); // Clear the form input in all cases
    }
  };

  const [FooterItems, setFooterItems] = useState<FooterData>();

  useEffect(() => {
    const fetchMenuItems = async () => {
      const data = await FooterItemFetch();
      setFooterItems(data);
    };

    fetchMenuItems();
  }, []);

  return (
    <footer className='bg-coopBlue text-white font-sans'>
      <Toaster position='top-right' richColors />
      <div className='mx-auto max-w-screen-xl px-4'>
        <div className='border-b border-gray-100 py-6 md:py-8 lg:py-12'>
          <div className='lg:flex lg:gap-8 lg:items-start'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:flex-1 p-6'>
              <div>
                <h6 className='mb-4 text-xl font-extrabold'>
                  {FooterItems?.title}
                  <span className='mx-2 text-gray-800 font-bold'>
                    D <span className='text-coopOrange'> X </span>VALLEY
                  </span>
                </h6>
                <p className='text-white'>{FooterItems?.description}</p>
              </div>

              <div className='flex justify-end'>
                <div className='w-full md:max-w-md lg:max-w-lg'>
                  <div className='space-y-2 p-2'>
                    <form onSubmit={handleSubmit}>
                      <div className='space-y-4 sm:flex flex-col '>
                        <div className='w-auto flex-grow space-y-2'>
                          <Label htmlFor='email' className='text-white'>
                            Get the latest News and More.
                          </Label>
                        </div>
                        <div className='sm:ml-1 flex gap-2'>
                          <Input
                            type='email'
                            placeholder='Email'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='text-black dark:text-white'
                          />
                          <Button className='bg-coopOrange hover:bg-black'>
                            <span className='text-white '>SUBSCRIBE</span>
                          </Button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-6 sm:grid-cols-4 mt-8 text-sm'>
            {FooterItems?.divisions && (
              <div>
                <h6 className='mb-4 text-xl font-extrabold'>Divisions</h6>
                <ul className='space-y-3'>
                  {FooterItems?.divisions.map((divisionItem) => (
                    <li key={divisionItem.href}>
                      <Link
                        href={divisionItem.href}
                        className='text-gray-200 hover:text-gray-300'>
                        {divisionItem.link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {FooterItems?.collaboration && (
              <div>
                <h6 className='mb-4 text-xl font-extrabold'>Collaboration</h6>
                <ul className='space-y-3'>
                  {FooterItems?.collaboration.map((collaborationItem) => (
                    <li key={collaborationItem.href}>
                      <Link
                        href={collaborationItem.href}
                        className='text-gray-200 hover:text-gray-300'>
                        {collaborationItem.link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {FooterItems?.events && (
              <div>
                <h6 className='mb-4 text-xl font-extrabold'>Events</h6>
                <ul className='space-y-3'>
                  {FooterItems?.events.map((eventItem) => (
                    <li key={eventItem.href}>
                      <Link
                        href={eventItem.href}
                        className='text-gray-200 hover:text-gray-300'>
                        {eventItem.link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {FooterItems?.otherlinks && (
              <div>
                <h6 className='mb-4 text-xl font-extrabold'>Other Links</h6>
                <ul className='space-y-3'>
                  {FooterItems?.otherlinks.map((otherLinksItem) => (
                    <li key={otherLinksItem.href}>
                      <Link
                        href={otherLinksItem.href}
                        className='text-gray-200 hover:text-gray-300'>
                        {otherLinksItem.link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className='py-6 md:py-8 text-center sm:text-center md:text-center'>
          <div className='space-y-4 xl:flex xl:items-center xl:justify-between xl:space-y-0'>
            <Link href='/' className='flex items-center justify-center'>
              <span className='text-xl font-semibold'>
                D <span className='text-orange-500'>X</span> VALLEY
              </span>
            </Link>

            <p className='text-sm'>
              © {new Date().getFullYear()}{" "}
              <Link
                href='https://coopbankoromia.com.et/'
                className='hover:underline'>
                Cooperative Bank of Oromia
              </Link>
              Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
