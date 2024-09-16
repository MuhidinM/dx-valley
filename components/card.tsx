/** @format */

import React from "react";
import { Button } from "./ui/button";
import { SectionProps } from "@/types/general";
import Link from "next/link";
import classNames from "classnames";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface CardProps extends SectionProps {
  // Add any additional props if needed
}

export const Card: React.FC<CardProps> = ({
  svg,
  title,
  description,
  buttonText,
  href,
}) => {
  return (
    <div
      className='relative bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 shadow-lg overflow-hidden group transition-all duration-300 ease-in-out'
      style={{ minHeight: "150px" }} // Adjust the minHeight as needed
    >
      {/* Image (SVG) on top */}
      <div className='p-0'>{svg}</div>

      {/* Title, always visible */}
      <div
        className={classNames("p-2 transition-all duration-300 ease-in-out", {
          "h-24": !description, // Adjust height when description is not visible
          "group-hover:h-auto": description, // Expand height when description is visible
        })}>
        <h2 className='mb-4 text-2xl tracking-tight font-extrabold text-gray-900 dark:text-white'></h2>

        {/* Description, hidden until hover */}
        <div
          className={classNames(
            "font-light text-gray-900 md:text-lg dark:text-gray-400 transition-opacity duration-300 ease-in-out overflow-hidden",
            {
              "opacity-0 max-h-0": !description, // Hide description initially
              "group-hover:opacity-100 group-hover:max-h-full": description, // Show description on hover
            }
          )}
          suppressHydrationWarning>
          <div className='prose'>
            <ReactMarkdown
              children={description?.toString() || ""}
              remarkPlugins={[remarkGfm]}
            />
          </div>
        </div>

        {/* Button, always visible */}
        {buttonText && buttonText !== "hidden" && (
          <Link href={href}>
            <Button className='bg-coopBlue hover:bg-coopBlueHover text-lg  py-3 px-6 rounded-lg transition-colors duration-300 mt-6'>
              {buttonText}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

// export default Card;
