/** @format */

import { CardNoLinkData } from "@/types/strapi-types";
import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const HowWeWorkSection = ({ works }: { works: CardNoLinkData[] }) => {
  return (
    <div className='lg:px-0 px-12 flex mx-auto items-center justify-center'>
      <section className='relative py-2 lg:py-2 '>
        <div className=' mx-auto py-2'>
          <div className='text-center'>
            <h2 className='text-4xl font-bold'>
              <span className='text-coopBlue'>How</span> We Work
            </h2>
            <div className='flex justify-center mt-2  mb-16'>
              <div className='w-20 h-1 bg-coopOrange'></div>
            </div>
          </div>
          <div className='max-w-5xl mx-auto'>
            {works.map((item, indx) =>
              indx % 2 == 0 ? (
                <div
                  key={indx}
                  className='grid grid-cols-1 md:grid-cols-2 items-center justify-center'>
                  <div className='lg:w-3/5 w-full mb-8 lg:mb-3 items-center justify-center '>
                    <img
                      src={`${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}${item.img}`}
                      alt=''
                      className='rounded-full '
                      width={300}
                      height={300}
                      id='image1'
                      loading='lazy'
                    />
                  </div>
                  <div className='w-full '>
                    <div className='flex items-center mb-4'>
                      <span className='h-4 w-4 bg-coopBlue rounded-full'></span>
                      <h4 className='text-2xl font-semibold ml-4' id='title1'>
                        {item.title}
                      </h4>
                    </div>

                    <div className='prose mt-5 mb-3 w-full text-left dark:text-gray-400'>
                      <div id='description_11 dark:text-gray-300'>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {item.description}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  key={indx}
                  className='flex flex-col-reverse lg:grid md:grid-cols-2 items-center justify-center my-5'>
                  <div className='w-full relative lg:order-1'>
                    <div className='flex items-center mt-6 mb-4'>
                      <h4 className='text-2xl  font-semibold mr-4' id='title2'>
                        {item.title}
                      </h4>
                      <span className='h-4 w-4 bg-coopBlue rounded-full'></span>
                    </div>
                    <div className='prose mt-5 mb-3 w-full text-left list-dis dark:text-gray-400'>
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {item.description}
                      </ReactMarkdown>
                    </div>
                  </div>
                  <div className='lg:w-3/5 w-full lg:order-2'>
                    <img
                      src={`${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}${item.img}`}
                      alt=''
                      className='rounded-full'
                      width={300}
                      height={300}
                      id='image2'
                      loading='lazy'
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowWeWorkSection;
