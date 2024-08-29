"use client"

import { Card } from "@/components/card";
import CTA from "@/components/cta";
import { Feature } from "@/components/feature";
import FocusAreas from "@/components/focusAreas";
import Offer from "@/components/landing/offer";
import Stats from "@/components/landing/stats";
import { SectionRight } from "@/components/section";
import { stats, SVG1, focusArea } from "@/constants";
import { IncubationItemFetch } from "@/services/incubation";
import { IncubationData } from "@/types/strapi-types";
import Image from "next/image";
import React, {use, useEffect, useState} from "react";
import { getImageUrl } from "@/lib/utils";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'

const Page = () => {
  const [incubationItems, setIncubationItems] = useState<IncubationData | null>(null);

  useEffect(() => {
    const fetchIncubationItems = async () => {
      const data = await IncubationItemFetch();
      setIncubationItems(data);
    };

    fetchIncubationItems();
  }, []);

  // useEffect(() => {
  //   console.log("first: ", incubationItems)
  // }, [incubationItems])

  return (
    <div className="space-y-8 mb-8 justify-center">
      <SectionRight
        svg={<Image src={`http://10.1.151.64:1337${incubationItems?.intro?.img ?? ""}`} alt="Image Left Not Found" width={500} height={800}/>}
        // <Image src={`http://10.1.151.64:1337${incubationItems?.intro?.img}`} alt="Image Left Not Found" width={500} height={800}/>
        title={incubationItems?.intro.title || ""}
        description={incubationItems?.intro.description}
        buttonText={"hidden"}
        href={"/innovationhub"}
      />
      <CTA
        buttonText="Apply for Call"
        title="Have a Start-Up Idea?"
        href="/callforproposal"
      />
      <Feature focus={incubationItems?.incubation_process || []}/>
      <FocusAreas items={incubationItems?.focus || []} />
      <Offer features={incubationItems?.offers || []}/>

      <div className="mx-auto max-w-screen-sm text-center">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white">
          <span className=" text-coopBlue"> Training</span> Areas
        </h2>
        <div className="flex justify-center mt-2  mb-12">
          <div className="w-20 h-1 bg-coopOrange"></div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {
          incubationItems?.training.map((elmnt, indx) => {
            return <Card
            key={indx}
            title={elmnt.title}
            description={elmnt.description}
            svg = {""}
            buttonText = {"hidden"}
            href = {" "} 
          />
          })
        }
      </div>

      {/* <div className='flex items-center justify-center'>
        <Button className='bg-coopBlue hover:bg-coopBlueHover'>
          Load More
        </Button>
      </div> */}

      {/* <Stats items={stats} /> */}
    </div>
  );
};

export default Page;
