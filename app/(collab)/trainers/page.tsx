"use client"

import CollabForm from "@/components/collab/call-for-collab-form";
import CTA from "@/components/cta";
import Objectives from "@/components/collab/objectives";
import PageTitle from "@/components/collab/pageTitle";
import { SectionLeft, SectionRight } from "@/components/section";
import { objectives, Vusi, Trainer } from "@/constants";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Overview from "@/components/collab/overview";
import ProfessionalOverview from "@/components/ProfessionalOverview";
import CollabObjectives from "@/components/CollabObjectives";
import { OrgData } from "@/types/strapi-types";
import { TrainerItemFetch } from "@/services/trainers";
import Image from "next/image";

const Page = () => {
  const [trainersItems, setTrainersItems] = useState<OrgData>();

    useEffect(() => {
      const fetchTrainersItems = async () => {
        const data = await TrainerItemFetch();
        setTrainersItems(data);
      };

      fetchTrainersItems();
    }, []);
  return (
    <div>
      <PageTitle />

      <SectionLeft
        svg={<Trainer />}
        title="Empower the Next Generation: Become a Volunteer Trainer"
        description={`Become a volunteer trainer and help shape the future. At our incubation center, we value education and mentorship to unlock potential. We're looking for professionals to share their expertise in hard and soft skills, guiding young minds toward success. Your impact will help them thrive. Join us in making a difference and inspire the next generation. Become a volunteer trainer today and make dreams come true!`}
        buttonText={"hidden"}

      {trainersItems?.cards.map((cards, indx ) => {
        return indx % 2 ? 
        <SectionLeft svg={<Image src={`http://10.1.151.64:1337${cards.img.large}`} alt="Image Left Not Found" width={500} height={800}/>}
        key={indx}
        title={cards.title}

        href={""}
        description={cards.description}
        buttonText={"hidden"} /> :

      <SectionRight svg={<Image src={`http://10.1.151.64:1337${cards.img.large}`} alt="Image Left Not Found" width={500} height={800}/>}
      key={indx}
        title={cards.title}
        href={""}
        description={cards.description}
        buttonText={"hidden"} />
        
      })}
      <ProfessionalOverview overview={trainersItems?.overview || ""}/>
      <CTA
        title="Want to be a Trainer?"
        buttonText="Apply"
        href={"#collab-form"}
      />
      {/* <Objectives items={objectives} /> */}
      <CollabObjectives />
      {/* <InputForm /> */}
      <div id="collab-form">
        <CollabForm type="trainer" />
      </div>
    </div>
  );
};
export default Page;
