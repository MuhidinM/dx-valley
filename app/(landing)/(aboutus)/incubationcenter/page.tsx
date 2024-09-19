/** @format */

"use client";

import { Card } from "@/components/card";
import CTA from "@/components/cta";
import { Feature } from "@/components/feature";
import FocusAreas from "@/components/focusAreas";
import Offer from "@/components/landing/offer";
import Stats from "@/components/landing/stats";
import { SectionRight } from "@/components/section";
import { IncubationItemFetch } from "@/services/incubation";
import { IncubationData } from "@/types/strapi-types";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { getImageUrl } from "@/lib/utils";
import { useInView } from "react-intersection-observer"; // Install this hook using 'npm install react-intersection-observer'

import { SkeletonLoaderAboutPage } from "@/components/SkeletonLoader";
import A2DxV from "@/components/A2DxV";

const Page = () => {
  const [incubationItems, setIncubationItems] = useState<IncubationData | null>(
    null
  );

  useEffect(() => {
    const fetchIncubationItems = async () => {
      const data = await IncubationItemFetch();
      setIncubationItems(data);
    };

    fetchIncubationItems();
  }, []);

  const { ref: featureRef, inView: featureInView } = useInView({
    threshold: 0.2, // How much of the component should be visible to trigger (20% of the element in view)
    triggerOnce: true, // Only trigger once
  });

  // if (!incubationItems) {
  //   return <SkeletonLoaderAboutPage />;
  // }

  return (
    <div className='space-y-8 mb-8 justify-center'>
      <SectionRight
        svg={
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}${incubationItems?.intro?.img ?? ""}`}
            alt='Image Left Not Found'
            width={500}
            height={800}
          />
        }
        title={incubationItems?.intro.title ?? " "}
        description={incubationItems?.intro.description}
        buttonText={"hidden"}
        href={"/incubationcenter"}
      />
      <div className="items-center align-middle px-16">
        <A2DxV />
      </div>

      {/* <CTA
        title={incubationItems?.proposal.title || " "}
        buttonText={incubationItems?.proposal.button_name || " "}
        href={incubationItems?.proposal.href || " "}
        description={incubationItems?.proposal.description || " "}
      /> */}

      {/* Observe the feature component */}
      <div ref={featureRef}>
        {featureInView && (
          <Feature focus={incubationItems?.incubation_process || []} />
        )}
      </div>

      <FocusAreas items={incubationItems?.focus || []} />
      <Offer features={incubationItems?.offers || []} />
    </div>
  );
};

export default Page;
