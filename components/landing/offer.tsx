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
          <h2 className='mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white'>
            What We Offer
          </h2>
        </div>
        <div className='grid gap-4 grid-cols-4'>
          {features.map((item, index) => (
            <article
              key={index}
              className='overflow-hidden rounded-lg shadow transition hover:shadow-lg'>
              <img
                alt={`Image for ${item.title} not found`}
                width={1}
                height={10}
                src={`http://10.1.151.64:1337${item.img ?? ""}`}
                className='w-5/6 h-64 object-center items-center'
              />

              <div className='bg-white dark:bg-gray-950 p-4 sm:p-6'>
                <Link href='/'>
                  <h3 className='mt-0.5 text-lg text-gray-900 dark:text-gray-200'>
                    {item.title}
                  </h3>
                </Link>

                <div className='prose mt-2 text-sm/relaxed text-gray-500'>
                  <ReactMarkdown
                    children={item.description}
                    remarkPlugins={[remarkGfm]}
                  />
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
