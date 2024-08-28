"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Mail, MapPinCheckInside, Phone } from "lucide-react";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const response = await fetch("/api/contactus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    if (response.ok) {
      alert("submitted successfully please check your email for confirmation!");
      setName("");
      setEmail("");
      setMessage("");
    } else {
      alert("Failed to submit");
    }
  };

  return (
    <section className='dark:bg-gray-900'>
      <div className='container px-6 py-12 mx-auto'>
        <div className='lg:flex lg:items-center lg:-mx-6'>
          <div className='lg:w-1/2 lg:mx-6'>
            <h1 className='text-2xl font-semibold text-gray-800 capitalize dark:text-white lg:text-3xl'>
              Connect with Us
            </h1>
            <div className='mt-6 space-y-8 md:mt-8'>
              <p>
                We&apos;d love to hear from you! Have a question about our
                products or services? Need help with an order? Our friendly
                customer support team is here to assist you.
              </p>
              <p className='flex items-start -mx-2'>
                <Phone />
                <span className='mx-2 text-gray-700 truncate w-72 dark:text-gray-400'>
                  +251942100360
                </span>
              </p>

              <p className='flex items-start -mx-2'>
                <Mail />
                <span className='mx-2 text-gray-700 truncate w-72 dark:text-gray-400'>
                  info@coopbank.com
                </span>
              </p>
              <p className='flex items-start -mx-2'>
                <MapPinCheckInside />
                <span className='mx-2 text-gray-700  w-2/3 dark:text-gray-400'>
                  Coop THQ, Bole Rwanda, Africa Ave, 
                  Addis Ababa, Ethiopia
                </span>
              </p>
            </div>
          </div>

          <div className='mt-8 lg:w-1/2 lg:mx-6'>
            <div className='w-full px-8 py-10 mx-auto overflow-hidden bg-white rounded-lg shadow-2xl dark:bg-gray-900 lg:max-w-xl shadow-gray-300/50 dark:shadow-black/50'>
              <h1 className='text-2xl font-semibold text-gray-800 capitalize dark:text-white lg:text-3xl'>
                Contact <span className='text-coopBlue'> Us</span>
              </h1>
              <form onSubmit={handleSubmit} className='mt-6'>
                <div className='flex-1'>
                  <Label htmlFor='name'>Full Name</Label>
                  <Input
                    placeholder='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className='flex-1 mt-6'>
                  <Label htmlFor='email'>Your email address</Label>
                  <Input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className='w-full mt-6'>
                  <Label htmlFor='email'>Your Message</Label>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
                <Button className='w-full mt-4 bg-coopBlue hover:bg-coopBlueHover'>
                  Send
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
