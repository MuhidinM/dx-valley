import React from "react";
import { Button } from "./ui/button";
import { ctaProps } from "@/types/general";
import Link from "next/link";

const CTA: React.FC<ctaProps> = ({ buttonText, title, href }) => {
  return (
    <section className="dark:bg-gray-950 rounded-b-lg bg-white ">
      <div className="container px-1 py-14 mx-auto flex flex-col flex-wrap  items-center justify-center md:flex-col md:space-y-5 md:justify-between">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-800 xl:text-3xl  dark:text-white">
          {title}
        </h2>
        <div className="mt-6 lg:mt-2 mb-4">
          <Link href={href}>
            <Button className="bg-coopBlue hover:bg-coopBlueHover text-2xl py-6 px-12">
              {buttonText}
            </Button>
          </Link>
        </div>
        <p>
          {" "}
          <em className="text-gray-700">
            Let’s Walk Together Your Innovation Journey
          </em>{" "}
        </p>
      </div>
    </section>
  );
};
// <Button className='bg-coopBlue hover:bg-coopBlueHover text-2xl py-6 px-12'>
//   {buttonText}
// </Button>

export default CTA;
