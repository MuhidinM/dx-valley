import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Mail, MapPinCheckInside, Phone } from "lucide-react";

const ContactUs = () => {
  return (
    <section className="dark:bg-gray-900">
      <div className="container px-6 py-12 mx-auto">
        <div className="lg:flex lg:items-center lg:-mx-6">
          <div className="lg:w-1/2 lg:mx-6">
            <h1 className="text-2xl font-semibold text-gray-800 capitalize dark:text-white lg:text-3xl">
              Connect with Us
            </h1>
            <div className="mt-6 space-y-8 md:mt-8">
              <p>
                We&apos;d love to hear from you! Have a question about our
                products or services? Need help with an order? Our friendly
                customer support team is here to assist you.
              </p>
              <p className="flex items-start -mx-2">
                <Phone />
                <span className="mx-2 text-gray-700 truncate w-72 dark:text-gray-400">
                  +251-90-000-0000
                </span>
              </p>

              <p className="flex items-start -mx-2">
                <Mail />
                <span className="mx-2 text-gray-700 truncate w-72 dark:text-gray-400">
                  info@coopbank.com
                </span>
              </p>
              <p className="flex items-start -mx-2">
                <MapPinCheckInside />
                <span className="mx-2 text-gray-700 truncate w-72 dark:text-gray-400">
                  Get House Building, Africa Ave, Addis Ababa
                </span>
              </p>
            </div>
          </div>

          <div className="mt-8 lg:w-1/2 lg:mx-6">
            <div className="w-full px-8 py-10 mx-auto overflow-hidden bg-white rounded-lg shadow-2xl dark:bg-gray-900 lg:max-w-xl shadow-gray-300/50 dark:shadow-black/50">
              <form className="mt-6">
                <div className="flex-1">
                  <Label htmlFor="name">Full Name</Label>
                  <Input placeholder="Name" />
                </div>
                <div className="flex-1 mt-6">
                  <Label htmlFor="email">Your email address</Label>
                  <Input type="email" placeholder="Email" />
                </div>
                <div className="w-full mt-6">
                  <Label htmlFor="email">Your Message</Label>
                  <Textarea />
                </div>
                <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600">
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
