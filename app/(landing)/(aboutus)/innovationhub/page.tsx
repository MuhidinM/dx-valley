/** @format */

"use client";

import { CardComponent } from "@/components/section";
import CTA from "@/components/cta";
import Header from "@/components/header";
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

  //  if (!innovationItems) {
  //    return <SkeletonLoaderAboutInnovationPage />;
  //  }

  return (
    <div className='space-y-8 mb-8 justify-center'>
      <SectionLeft
        svg={
          <Image
            src={`http://10.1.151.64:1337${innovationItems?.intro?.img ?? ""}`}
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
                <Image
                  src={`http://10.1.151.64:1337${item.img ?? ""}`}
                  alt='Image Left Not Found'
                  width={400}
                  height={400}
                  className='h-28'
                />
              }
              title={item.title}
              buttonText={"Visit Site"}
              description={item.description}
              href={" "}
            />
          );
        })}
      </div>
      <div className='m-1 mx-28 justify-center'>
        <Link href='/projects' passHref>
          <div className='flex justify-center text-black'>
            <Button
              variant='outline'
              className=' w-60 h-16 bg-slate-300 hover:bg-slate-400  hover:underline text-xl font-semibold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105'>
              List All Products
            </Button>
          </div>
        </Link>
      </div>

      <div id='collab-form'>
        <ContactUs address={innovationItems?.connect as Address} />
      </div>
    </div>
  );
};

export default Page;
