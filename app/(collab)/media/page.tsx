"use client"

import CollabForm from "@/components/collab/call-for-collab-form";
import CTA from "@/components/cta";
import Objectives from "@/components/collab/objectives";
import PageTitle from "@/components/collab/pageTitle";
import { SectionLeft, SectionRight } from "@/components/section";
import { objectives, Media1 } from "@/constants";
import Head from "next/head";
import { useEffect, useState } from "react";
import React from "react";
import Overview from "@/components/collab/overview";
import ProfessionalOverview from "@/components/ProfessionalOverview";
import CollabObjectives from "@/components/CollabObjectives";
import { OrgData } from "@/types/strapi-types";
import { MediaItemFetch } from "@/services/media";
import Image from "next/image";

const Page = () => {
    const [mediaItems, setmediaItems] = useState<OrgData>();

    useEffect(() => {
      const fetchmediaItems = async () => {
        const data = await MediaItemFetch();
        setmediaItems(data);
      };

      fetchmediaItems();
    }, []);
    
  return (
    <div>
      <PageTitle />
      {mediaItems?.cards.map((cards, indx ) => {
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
      <ProfessionalOverview overview={mediaItems?.overview || ""}/>
      <CTA
        title='Want to Work with Us?'
        buttonText='Apply For Call'
        href={"#collab-form"}
      />

      <CollabObjectives />
      {/* <Objectives items={objectives} /> */}
      {/* <InputForm /> */}
      <div id='collab-form'>
        <CollabForm type="media" />
      </div>
    </div>
  );
};
export default Page;
