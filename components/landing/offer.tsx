/** @format */

import { getImageUrl } from "@/lib/utils";
import { CardNoLinkData } from "@/types/strapi-types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Offer = ({ features }: { features: CardNoLinkData[] }) => {
  return (
    <section className='dark:bg-gray-900'>
      <div className='py-2 px-4 mx-auto max-w-screen-xl sm:py-5 lg:px-6'>
        <div className='mx-auto max-w-screen-sm text-center'>
          {/* <h2 className='mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white'>
            What We Offer
          </h2> */}
          <div className='text-center'>
            <h2 className='text-4xl font-bold'>
              What We
              <span className='text-coopBlue'> Offer</span>{" "}
            </h2>
            <div className='flex justify-center mt-2  mb-16'>
              <div className='w-20 h-1 bg-coopOrange'></div>
            </div>
          </div>
        </div>
        <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-4'>
          {features.map((item, index) => (
            <article
              key={index}
              className='overflow-hidden rounded-lg shadow transition hover:shadow-lg p-2'>
              <Image
                alt={`Image for ${item.title} not found`}
                width={1}
                height={10}
                src={`${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}${
                  item.img ?? ""
                }`}
                className='w-5/6 h-64 object-center items-center'
              />

              <div className='bg-white dark:bg-gray-950 p-4 sm:p-6'>
                <Link href='/'>
                  <h3 className='mt-0.5 text-lg text-gray-900 dark:text-gray-200'>
                    {item.title}
                  </h3>
                </Link>

                <div className='prose mt-2 text-sm/relaxed text-gray-500'>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {item?.description}
                  </ReactMarkdown>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offer;
