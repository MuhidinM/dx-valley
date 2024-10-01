/** @format */

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ctaProps } from "@/types/general";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const CTA: React.FC<ctaProps> = ({ buttonText, title, href, description }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Mark the component as client-side after mounting
  }, []);

  return (
    <section className="dark:bg-gray-950 rounded-b-lg bg-white">
      <div className="px-4 sm:container sm:mx-auto flex flex-col items-center justify-center space-y-6 text-center md:px-0">
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
        <div>
          {" "}
          <div
            className="prose text-gray-700 px-10 flex items-center justify-center"
            suppressHydrationWarning
          >
            {isClient && (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {description?.toString() ?? ""}
              </ReactMarkdown>
            )}
          </div>{" "}
        </div>
      </div>
    </section>
  );
};
export default CTA;
