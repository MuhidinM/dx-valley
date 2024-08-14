import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const CTA = () => {
  return (
    <section className="dark:bg-gray-900 lg:px-80 lg:mx-4 sm:px-10 sm:mx-2 md:px-2 rounded-lg   bg-white">
      <div className="container px-4 py-16 mx-auto flex  lg:items-center  sm:items-start sm:justify-between sm:flex-wrap md:px-6 sm:px-2 sm:mx-1 sm:py-12">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-800 xl:text-3x  dark:text-white">
          Have a start-up idea?
        </h2>
        <div className="mt-8 lg:mt-0">
          <Button size={"lg"} className="bg-coopBlue hover:bg-coopBlueHover py-6 px-24 text-xl">
            Apply
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
