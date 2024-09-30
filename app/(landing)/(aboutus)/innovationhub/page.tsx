/** @format */

"use client";

import { CardComponent } from "@/components/section";
import CTA from "@/components/cta";
import HowWeWorkSection from "@/components/howWeWork";
import { SlidingCompanies } from "@/components/landing/company";
import ContactUs from "@/components/landing/contactus";
import { SectionLeft } from "@/components/section";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { InnovationItemFetch } from "@/services/innovation";
import { Address, InnovationData } from "@/types/strapi-types";
import Image from "next/image";
import { SkeletonLoaderAboutInnovationPage } from "@/components/SkeletonLoader";
import Link from "next/link";
import { Globe } from "lucide-react";

const Page = () => {
  const [innovationItems, setInnovationItems] = useState<InnovationData | null>(
    null
  );

  useEffect(() => {
    const fetchInnovationItems = async () => {
      const data = await InnovationItemFetch();
      setInnovationItems(data);
    };

    fetchInnovationItems();
  }, []);

  if (!innovationItems) {
    return <SkeletonLoaderAboutInnovationPage />;
  }

  return (
    <div className='space-y-8 mb-8 justify-center'>
      <SectionLeft
        svg={
          <img
            src={`${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}${
              innovationItems?.intro?.img ?? ""
            }`}
            alt='Image Left Not Found'
            width={500}
            height={800}
          />
        }
        title={innovationItems?.intro.title || ""}
        description={innovationItems?.intro.description || ""}
        buttonText={"hidden"}
        href={"/innovationhub"}
      />
      <CTA
        title={innovationItems?.proposal.title || " "}
        buttonText={innovationItems?.proposal.button_name || " "}
        href={innovationItems?.proposal.href || " "}
        description={innovationItems?.proposal.description || " "}
      />
      <HowWeWorkSection works={innovationItems?.howeworks || []} />
      <SlidingCompanies companies={innovationItems?.companies || []} />

      <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-4 p-5'>
        {innovationItems?.gallery.slice(0, 3).map((item, indx) => {
          return (
            <CardComponent
              key={indx}
              svg={
                <img
                  src={`${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}${
                    item.img ?? ""
                  }`}
                  alt='Image Left Not Found'
                  width={200}
                  height={200}
                  className='h-24'
                />
              }
              title={item.title}
              buttonText={item.link.title}
              description={item.description}
              href={item.link.href}
            />
          );
        })}
      </div>
      <Link href='/projects' className='flex justify-center'>
        <div className='flex justify-center p-4'>
          <Button
            variant='outline'
            className='w-full h-20 bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 hover:text-slate-100 text-white font-bold text-2xl py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 flex items-center justify-center space-x-3'
            aria-label='View all websites and apps'>
            <Globe className='h-8 w-8' aria-hidden='true' />
            <span className='dark:text-slate-100'>Explore More Projects</span>
          </Button>
        </div>
      </Link>

      <div id='collab-form'>
        <ContactUs address={innovationItems?.connect as Address} />
      </div>
    </div>
  );
};

export default Page;
