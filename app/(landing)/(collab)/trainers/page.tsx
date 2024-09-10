"use client";

import CollabForm from "@/components/collab/call-for-collab-form-trainer";
import CTA from "@/components/cta";
import PageTitle from "@/components/collab/pageTitle";
import { SectionLeft, SectionRight } from "@/components/section";
import { Trainer } from "@/constants";
import React, { useEffect, useState } from "react";
import ProfessionalOverview from "@/components/ProfessionalOverview";
import CollabObjectives from "@/components/CollabObjectives";
import { OrgData } from "@/types/strapi-types";
import { TrainerItemFetch } from "@/services/trainers";
import Image from "next/image";
import { SkeletonLoaderCollabForm, SkeletonPageColloab } from "@/components/SkeletonLoader";

const Page = () => {
  const [trainersItems, setTrainersItems] = useState<OrgData>();

  useEffect(() => {
    const fetchTrainersItems = async () => {
      const data = await TrainerItemFetch();
      setTrainersItems(data);
    };

    fetchTrainersItems();
  }, []);

 if (!trainersItems) {
   return <SkeletonPageColloab />;
 }

  return (
    <div>
      <PageTitle />
      {trainersItems?.cards.map((cards, indx) => {
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
      <CTA
        title="Want to be a Trainer?"
        buttonText="Apply"
        href={"#collab-form"}
      />
      <ProfessionalOverview overview={trainersItems?.overview || ""} />
      {/* <Objectives items={objectives} /> */}
      <CollabObjectives />
      {/* <InputForm /> */}
      <div id="collab-form">
        <CollabForm/>
      </div>
    </div>
  );
};
export default Page;
