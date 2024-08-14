import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const Footer = () => {
  return (
    <footer className="antialiased bg-coopBlue text-white">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="border-b border-gray-100 py-6 dark:border-gray-700 md:py-8 lg:py-16">
          <div className="items-start gap-6 md:gap-8 lg:flex 2xl:gap-24">
            <div className="grid min-w-0 flex-1 grid-cols-2 gap-6 md:gap-8 xl:grid-cols-3">
              <div>
                <h6 className="mb-4 text-sm font-semibold uppercase">Test</h6>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="#"
                      title=""
                      className="text-gray-300 hover:text-white"
                    >
                      test
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      title=""
                      className="text-gray-300 hover:text-white"
                    >
                      test
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      title=""
                      className="text-gray-300 hover:text-white"
                    >
                      test
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h6 className="mb-4 text-sm font-semibold uppercase">Test</h6>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="#"
                      title=""
                      className="text-gray-300 hover:text-white"
                    >
                      test
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h6 className="mb-4 text-sm font-semibold uppercase">Test</h6>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="#"
                      title=""
                      className="text-gray-300 hover:text-white"
                    >
                      test
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 w-full md:mt-8 lg:mt-0 lg:max-w-lg">
              <div className="space-y-5 rounded-lg p-6">
                <form action="#">
                  <div className="items-end space-y-4 sm:flex sm:space-y-0">
                    <div className="relative mr-3 w-full sm:w-96 lg:w-full space-y-2">
                      <label className="mb-2 block text-sm font-medium text-white">
                        Get the latest deals and more.
                      </label>
                      <Label htmlFor="email">Your email address</Label>
                      <Input type="email" color="blue" placeholder="Email" />
                    </div>
                    <div>
                      <Button variant={"outline"} className="bg-coopBlue">
                        Subscribe
                      </Button>
                    </div>
                  </div>
                </form>

                {/* <hr className="border-gray-200 dark:border-gray-600" /> */}
              </div>
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
              © 2024
              <Link href="#" className="hover:underline">
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
