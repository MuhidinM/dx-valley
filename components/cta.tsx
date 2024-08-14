import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const CTA = () => {
  return (
    <section className="dark:bg-gray-900 lg:px-80 lg:mx-6 rounded-lg bg-white">
      <div className="container px-4 py-16 mx-auto flex flex-col items-center justify-center md:flex-row md:justify-between">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-800 xl:text-3xl dark:text-white">
          Have a start-up idea?
        </h2>
        <div className="mt-8 lg:mt-0">
          <Button size={"lg"} className="bg-coopBlue hover:bg-coopBlueHover">
            Apply
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
