"use client"

import { FundingResponse } from "@/types/strapi-types";
import axios from "axios";
import { useEffect } from "react";


export const FundingItemFetch = async () => {
  const res = await axios.get<FundingResponse>(
    `${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}/api/funding?populate=funding_list.img`
  );

  
  const data = res.data.data;

  console.log(data);
  const FundingItems = {
    funding_list:
      data?.funding_list?.map((card) => ({
        title: card.title,
        description: card.description,
        img: card.img?.url || "",
      })) || [],
    // proposal: {
    //   title: data.proposal.title || "",
    //   description: data.proposal.description || "",
    //   button_name: data.proposal.button_name || "",
    //   href: data.proposal.href || "",
    // },
  };

  console.log(FundingItems);
  return FundingItems;
};
