/** @format */

"use client";

import CTA from "@/components/cta";
import { SectionRight, SectionLeft } from "@/components/section";
import { TrainingItemFetch } from "@/services/training";
import React, { useEffect, useState } from "react";
import { TrainingData } from "@/types/strapi-types";
import { SkeletonLoaderTrainingPage } from "@/components/SkeletonLoader";

const Page = () => {
  const [trainingItems, setTrainingItems] = useState<TrainingData>();

  useEffect(() => {
    const fetchTrainngItems = async () => {
      const data = await TrainingItemFetch();
      setTrainingItems(data);
    };

    fetchTrainngItems();
  }, []);

  if (!trainingItems) {
    return <SkeletonLoaderTrainingPage />;
  }

  return (
    <div>
      {trainingItems?.cards.map((cards, indx) => {
        return indx % 2 ? (
          <SectionLeft
            svg={
              <img
                src={`${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}${cards.img}`}
                alt="Image Left Not Found"
              />
            }
            key={indx}
            title={cards.title}
            href={cards.link.href}
            description={cards.description}
          />
        ) : (
          <SectionRight
            svg={
              <img
                src={`${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}${cards.img}`}
                alt="Image Left Not Found"
              />
            }
            key={indx}
            title={cards.title}
            href={cards.link.href}
            description={cards.description}
          />
        );
      })}
      <div className=" lg:container my-3 mx-3">
        <CTA
          title={trainingItems.proposal.title}
          buttonText={trainingItems.proposal.button_name}
          href={trainingItems.proposal.href}
          description={trainingItems.proposal.description}
        />
      </div>
    </div>
  );
};

export default Page;
