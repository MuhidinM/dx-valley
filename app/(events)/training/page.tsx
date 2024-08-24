"use client"

import CTA from "@/components/cta";
import { SectionRight } from "@/components/section";
import { SectionLeft } from "@/components/section";
import { SVG1 } from "@/constants";
import { TrainingItemFetch } from "@/services/training";
import React, { useEffect, useState } from "react";
import { CardData } from "@/types/strapi-types"

const Page = () => {
  const [trainingItems, setTrainingItems] = useState<CardData[]>([]);

    useEffect(() => {
      const fetchTrainngItems = async () => {
        const data = await TrainingItemFetch();
        setTrainingItems(data);
      };

      fetchTrainngItems();
    }, []);

    // useEffect(() => {console.log("final ", trainingItems)}, [trainingItems])
  return (
    <div>
      {trainingItems.map((cards, indx ) => {
        return indx % 2 ? 
        <SectionLeft svg={<SVG1 />}
        key={indx}
        title={cards.title}
        href={cards.link.href}
        description={cards.description}
        buttonText={cards.link.title} /> :

      <SectionRight svg={<SVG1 />}
      key={indx}
        title={cards.title}
        href={cards.link.href}
        description={cards.description}
        buttonText={cards.link.title} />
        
      })}
      <CTA title={"Want To Give a Training?"} buttonText={"Apply"}  href=""/>

    </div>
  );
};

export default Page;
