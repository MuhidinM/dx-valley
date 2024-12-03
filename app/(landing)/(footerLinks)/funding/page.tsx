"use client";

// import CTA from "@/components/cta";
import { SectionRight, SectionLeft } from "@/components/section";
import { FundingItemFetch } from "@/services/funding";
import React, { useEffect, useState } from "react";
import { FundingData } from "@/types/strapi-types";
import { SkeletonLoaderFundingPage } from "@/components/SkeletonLoader";

const Page = () => {
  const [fundingItems, setFundingItems] = useState<FundingData>();

  useEffect(() => {
    const fetchTrainngItems = async () => {
      const data = await FundingItemFetch();
      setFundingItems(data);
    };

    fetchTrainngItems();
  }, []);

  if (!fundingItems) {
    return <SkeletonLoaderFundingPage />;
  }

  return (
    <div>
      {fundingItems?.funding_list.map((cards, indx) => {
        return indx % 2 ? (
          <SectionLeft
            svg={
              <img
                src={`${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}${cards.img}`}
                alt='Funding Image'
              />
            }
            key={indx}
            title={cards.title}
            description={cards.description}
          />
        ) : (
          <SectionRight
            svg={
              <img
                src={`${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}${cards.img}`}
                alt='Image Left Not Found'
              />
            }
            key={indx}
            title={cards.title}
            description={cards.description}
          />
        );
      })}
    </div>
  );
};

export default Page;
