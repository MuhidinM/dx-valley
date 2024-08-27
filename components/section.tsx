
// import React from "react";
// import { Button } from "./ui/button";
// import { SectionProps } from "@/types/general";
// import Link from "next/link";

export const SectionRight: React.FC<SectionProps> = ({
  svg,
  title,
  description,
  buttonText,
  href
}) => {
  return (
    <section className='dark:bg-gray-900'>
      <div className='gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6'>
        {svg}
        <div className='mt-4 md:mt-0'>
          <h2 className='mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white'>
            {title}
          </h2>
          <div className='mb-6 font-light text-gray-900 md:text-lg dark:text-gray-400'>
            {description}
          </div>
          {buttonText !== "hidden" && (
            <Link href={href}>
              <Button className='bg-coopBlue hover:bg-coopBlueHover '>
                {buttonText}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export const SectionLeft: React.FC<SectionProps> = ({
  svg,
  title,
  description,
  buttonText,
  href
}) => {
  return (
    <section className='dark:bg-gray-900'>
      <div className='gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6'>
        <div className='mt-4 md:mt-0'>
          <h2 className='mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white'>
            {title}
          </h2>
          <p className='mb-6 font-light text-gray-900 md:text-lg dark:text-gray-400'>
            {description}
          </p>

          {
            buttonText !== "hidden" && (<Button
            className="bg-coopBlue hover:bg-coopBlueHover "
           >
            {buttonText}
          </Button> )
          }
        </div>
        {svg}
      </div>
    </section>
  );
};


import React from "react";
import { Button } from "./ui/button";
import { SectionProps } from "@/types/general";
import Link from "next/link";

export const SectionRight: React.FC<SectionProps> = ({
  svg,
  title,
  description,
  buttonText,
  href
}) => {
  return (
    <section className='dark:bg-gray-900'>
      <div className='gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6'>
        {svg}
        <div className='mt-4 md:mt-0'>
          <h2 className='mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white'>
            {title}
          </h2>
          <div className='mb-6 font-light text-gray-900 md:text-lg dark:text-gray-400'>
            {description}
          </div>
          {buttonText !== "hidden" && (
            <Link href={href}>
              <Button className='bg-coopBlue hover:bg-coopBlueHover '>
                {buttonText}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export const SectionLeft: React.FC<SectionProps> = ({
  svg,
  title,
  description,
  buttonText,
  href
}) => {
  return (
    <section className='dark:bg-gray-900'>
      <div className='gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6'>
        <div className='mt-4 md:mt-0'>
          <h2 className='mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white'>
            {title}
          </h2>
          <p className='mb-6 font-light text-gray-900 md:text-lg dark:text-gray-400'>
            {description}
          </p>

          {buttonText !== "hidden" && (
            <Link href={href}>
              <Button className='bg-coopBlue hover:bg-coopBlueHover '>
                {buttonText}
              </Button>
            </Link>
          )}
        </div>
        {svg}
      </div>
    </section>
  );
};


interface CardProps extends SectionProps {
  // Add any additional props if needed
}

export const Card: React.FC<CardProps> = ({
  svg,
  title,
  description,
  buttonText,
  href
}) => {
  return (
    <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden'>
      {/* Image (SVG) on top */}
      <div className='p-6'>
        {svg}
      </div>

      {/* Content below the image */}
      <div className='p-6'>
        <h2 className='mb-4 text-2xl tracking-tight font-extrabold text-gray-900 dark:text-white'>
          {title}
        </h2>
        <p className='mb-6 font-light text-gray-900 md:text-lg dark:text-gray-400'>
          {description}
        </p>
        {buttonText && buttonText !== "hidden" && (
          <Link href={href}>
            <Button className='bg-coopBlue hover:bg-coopBlueHover'>
              {buttonText}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};


