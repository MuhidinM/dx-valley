"use client";

import { Feature } from "@/components/feature";
import FocusAreas from "@/components/focusAreas";
import Offer from "@/components/landing/offer";
import { SectionRight } from "@/components/section";
import { IncubationItemFetch } from "@/services/incubation";
import { IncubationData } from "@/types/strapi-types";
import React, { useEffect, useState } from "react";

import { useInView } from "react-intersection-observer"; // Install this hook using 'npm install react-intersection-observer'

import { SkeletonLoaderAboutPage } from "@/components/SkeletonLoader";
import A2DxV from "@/components/A2DxV";
import { MultiStepFormComponent } from "@/components/multi-step-form";

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
    threshold: 0.2,
    triggerOnce: true,
  });

  if (!incubationItems) {
    return <SkeletonLoaderAboutPage />;
  }
  return (
    <div className="space-y-8 mb-4 justify-center">
      <SectionRight
        svg={
          <img
            src={`${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}${
              incubationItems?.intro?.img ?? ""
            }`}
            alt='Image Not Found'
            width={500}
            height={800}
          />
        }
        title={incubationItems?.intro.title ?? " "}
        description={incubationItems?.intro.description}
        buttonText={"hidden"}
        href={"/incubationcenter"}
      />
      <div className="items-center align-middle lg:px-16 md:px-14 px-3">
        <A2DxV />
      </div>
      <div ref={featureRef}>
        {featureInView && (
          <div className="lg:mb-28">
            <Feature focus={incubationItems?.incubation_process || []} />
          </div>
        )}
      </div>

      <div className="items-center align-middle lg:px-36 md:px-20 px-3">
        <MultiStepFormComponent />
      </div>

      <FocusAreas items={incubationItems?.focus || []} />
      <Offer features={incubationItems?.offers || []} />
    </div>
  );
};

export default Page;
