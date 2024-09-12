/** @format */

"use client";

import CollabForm from "@/components/collab/call-for-collab-form-organization";
import CTA from "@/components/cta";
import PageTitle from "@/components/collab/pageTitle";
import { SectionLeft, SectionRight } from "@/components/section";
import { Organizaion } from "@/constants";
import React, { useState, useEffect } from "react";
import ProfessionalOverview from "@/components/ProfessionalOverview";
import { OrgItemFetch } from "@/services/organization";
import { OrgData } from "@/types/strapi-types";
import Image from "next/image";
import { SkeletonLoaderCollabForm } from "@/components/SkeletonLoader";
const Page = () => {
  const [orgItems, setOrgItems] = useState<OrgData>();

  useEffect(() => {
    const fetchOrgItems = async () => {
      const data = await OrgItemFetch();
      setOrgItems(data);
    };

    fetchOrgItems();
  }, []);
  // useEffect(() => {
  //   console.log("org items: ", orgItems);
  // });

  if (!orgItems) {
    return <SkeletonLoaderCollabForm />;
  }
  return (
    <div>
      <PageTitle />

      {orgItems?.cards.map((cards, indx) => {
        return indx % 2 ? (
          <SectionLeft
            svg={
              <Image
                src={`http://10.1.151.64:1337${cards.img}`}
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
                src={`http://10.1.151.64:1337${cards.img}`}
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
      <CTA
        title={orgItems.proposal.title}
        buttonText={orgItems.proposal.button_name}
        href={orgItems.proposal.href}
        description={orgItems.proposal.description}
      />

      <ProfessionalOverview overview={orgItems?.overview || ""} />

      {/* <CollabObjectives /> */}
      <div id='collab-form'>
        {/* <CollabForm type='organization' /> */}
        <CollabForm />
      </div>
    </div>
  );
};
export default Page;
