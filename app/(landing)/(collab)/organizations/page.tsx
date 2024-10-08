/** @format */

"use client";

import CollabForm from "@/components/collab/call-for-collab-form-organization";
import CTA from "@/components/cta";
import { SectionLeft, SectionRight } from "@/components/section";
import React, { useState, useEffect } from "react";
import ProfessionalOverview from "@/components/ProfessionalOverview";
import { OrgItemFetch } from "@/services/organization";
import { OrgData } from "@/types/strapi-types";
import Image from "next/image";
import { SkeletonPageColloab } from "@/components/SkeletonLoader";
const Page = () => {
  const [orgItems, setOrgItems] = useState<OrgData>();

  useEffect(() => {
    const fetchOrgItems = async () => {
      const data = await OrgItemFetch();
      setOrgItems(data);
    };

    fetchOrgItems();
  }, []);

  if (!orgItems) {
    return <SkeletonPageColloab />;
  }
  return (
    <div>
      {orgItems?.cards.map((cards, indx) => {
        return indx % 2 ? (
          <SectionLeft
            svg={
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}${cards.img}`}
                alt='Image Left Not Found'
                width={500}
                height={800}
              />
            }
            key={indx}
            title={cards.title}
            href={""}
            description={cards.description}
            buttonText={"hidden"}
          />
        ) : (
          <SectionRight
            svg={
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}${cards.img}`}
                alt='Image Left Not Found'
                width={500}
                height={800}
              />
            }
            key={indx}
            title={cards.title}
            href={""}
            description={cards.description}
            buttonText={"hidden"}
          />
        );
      })}
      <div className='mx-2 p-3'>
        <CTA
          title={orgItems?.proposal.title || " "}
          buttonText={orgItems?.proposal.button_name || " "}
          href={orgItems?.proposal.href || " "}
          description={orgItems?.proposal.description || " "}
        />
      </div>

      <ProfessionalOverview overview={orgItems?.overview || ""} />
      <div id='collab-form'>
        <CollabForm />
      </div>
    </div>
  );
};
export default Page;
