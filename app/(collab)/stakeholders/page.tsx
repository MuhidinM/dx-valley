"use client";

import CollabForm from "@/components/collab/call-for-collab-form";
import CTA from "@/components/cta";
import PageTitle from "@/components/collab/pageTitle";
import { SectionLeft, SectionRight } from "@/components/section";
import React, { useState, useEffect } from "react";
import ProfessionalOverview from "@/components/ProfessionalOverview";
import { OrgData } from "@/types/strapi-types";
import { StakeHolderItemFetch } from "@/services/stakeholders";
import Image from "next/image";

const Page = () => {
  const [stakeHolderItems, setStakeHolderItems] = useState<OrgData>();

  useEffect(() => {
    const fetchStakeHolderItems = async () => {
      const data = await StakeHolderItemFetch();
      setStakeHolderItems(data);
    };

    fetchStakeHolderItems();
  }, []); 
  return (
    <div>
      <PageTitle />
      {stakeHolderItems?.cards.map((cards, indx) => {
        return indx % 2 ? (
          <SectionLeft
            svg={
              <Image
                src={`http://10.1.151.64:1337${cards.img}`}
                alt="Image Left Not Found"
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
                src={`http://10.1.151.64:1337${cards.img}`}
                alt="Image Left Not Found"
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
      <ProfessionalOverview overview={stakeHolderItems?.overview || ""} />
      <CTA
        title="
      Want to Work with Us?"
        buttonText="Apply For Call"
        href={"#collab-form"}
      />
      <div id="collab-form">
        <CollabForm type="stakeholder" />
      </div>
    </div>
  );
};
export default Page;
