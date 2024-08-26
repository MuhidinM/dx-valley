"use client"

import CollabForm from "@/components/collab/call-for-collab-form";
import CTA from "@/components/cta";
import Objectives from "@/components/collab/objectives";
import PageTitle from "@/components/collab/pageTitle";
import { SectionLeft, SectionRight } from "@/components/section";
import { objectives, Organizaion } from "@/constants";
import Head from "next/head";
import React, {useState, useEffect} from "react";
import Overview from "@/components/collab/overview";
import CollabObjectives from "@/components/CollabObjectives";
import ProfessionalOverview from "@/components/ProfessionalOverview";
import { OrgItemFetch } from "@/services/organization";
import { CardData, OrgData } from "@/types/strapi-types";

import Image from "next/image";
const Page = () => {
  const [orgItems, setOrgItems] = useState<OrgData>();

    useEffect(() => {
      const fetchOrgItems = async () => {
        const data = await OrgItemFetch();
        setOrgItems(data);
      };

      fetchOrgItems();
    }, []);
    useEffect(() => {
      console.log("org items: ", orgItems)
    })
  return (
    <div>
      <PageTitle />

      {orgItems?.cards.map((cards, indx ) => {
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

      <ProfessionalOverview overview={orgItems?.overview || ""} />

      <CTA
        title='Want to Work with Us?'
        buttonText='Apply For Call'
        href={"#collab-form"}
      />
      {/* <Objectives items={objectives} /> */}
      <CollabObjectives/>
      {/* <InputForm /> */}
      <div id='collab-form'>
        <CollabForm />
      </div>
    </div>
  );
};
export default Page;
