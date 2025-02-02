import React, { useState } from "react";
import { Button } from "./ui/button";
import { SectionProps } from "@/types/general";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const SectionRight: React.FC<SectionProps> = ({
  svg,
  title,
  description,
  buttonText,
  href,
}) => {
  return (
    <section className="dark:bg-gray-900">
      <div className="gap-8 items-center py-4 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-10 lg:px-6">
        {svg}
        <div className="mt-4 md:mt-0">
          <h2 className="mb-4 text-3xl md:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            {title}
          </h2>
          <div className="prose mb-6 font-light text-gray-900 md:text-lg dark:text-gray-400">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {description?.toString()}
            </ReactMarkdown>
          </div>
          {buttonText !== "hidden" && href && (
            <Link href={href}>
              <Button className="bg-coopBlue hover:bg-coopBlueHover">
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
  href,
}) => {
  return (
    <section className="dark:bg-gray-900">
      <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
        <div className="mt-4 md:mt-0">
          <h2 className="mb-4 text-3xl md:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            {title}
          </h2>
          <div className="prose mb-6 font-light text-gray-900 md:text-lg dark:text-gray-400">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {description?.toString()}
            </ReactMarkdown>
          </div>

          {buttonText !== "hidden" && href && (
            <Link href={href}>
              <Button className="bg-coopBlue hover:bg-coopBlueHover mb-4 md:mb-0">
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

export const CardComponent: React.FC<SectionProps> = ({
  svg,
  title,
  description,
  buttonText,
  href,
}) => {
  const truncatedDescription =
    description.length > 200
      ? description.substring(0, 200) + "..."
      : description;

  return (
    <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col h-full'>
      {svg && <div className='p-6 flex items-center justify-center'>{svg}</div>}

      <div className='flex flex-col flex-1 p-6'>
        <h2 className='mb-4 text-2xl tracking-tight font-extrabold text-gray-900 dark:text-white'>
          {title}
        </h2>
        <div className='prose mb-6 font-light text-gray-900 md:text-lg dark:text-gray-400'>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {truncatedDescription}
          </ReactMarkdown>
        </div>

        {!href && description.length > 200 && (
          <Dialog>
            <DialogTrigger>
              <div className='grid grid-cols-2 gap-32'>
                <Button className='bg-[#0f172a] dark:bg-gray-700 w-full hover:bg-gray-700 dark:text-gray-300'>
                  Read More
                </Button>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                {svg && (
                  <div className='p-6 flex items-center justify-center'>
                    {svg}
                  </div>
                )}
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {description}
                </ReactMarkdown>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
        {href && (
          <div className='grid grid-cols-2 gap-28'>
            {description.length > 200 && (
              <Dialog>
                <DialogTrigger>
                  <Button className='bg-[#0f172a] w-full hover:bg-gray-700'>
                    Read More
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {svg && (
                      <div className='p-6 flex items-center justify-center'>
                        {svg}
                      </div>
                    )}

                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {description}
                    </ReactMarkdown>
                  </DialogHeader>
                  <Link href={href} target='_blank'>
                    <Button className='bg-[#0f172a] w-full mt-5 hover:bg-gray-700'>
                      {buttonText || "Learn More"}
                    </Button>
                  </Link>
                </DialogContent>
              </Dialog>
            )}
            <Link href={href} target='_blank'>
              <Button className='bg-[#0f172a] w-full hover:bg-gray-700'>
                {buttonText || "Learn More"}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
