"use client";

import CollabForm from "@/components/collab/call-for-collab-form-media";
import CTA from "@/components/cta";
import PageTitle from "@/components/collab/pageTitle";
import { SectionLeft, SectionRight } from "@/components/section";
import { useEffect, useState } from "react";
import ProfessionalOverview from "@/components/ProfessionalOverview";
import { OrgData } from "@/types/strapi-types";
import { MediaItemFetch } from "@/services/media";
import Image from "next/image";
import SkeletonLoader from "@/components/SkeletonLoader";

const Page = () => {
  const [mediaItems, setmediaItems] = useState<OrgData>();

  useEffect(() => {
    const fetchmediaItems = async () => {
      const data = await MediaItemFetch();
      setmediaItems(data);
    }; 

    fetchmediaItems();
  }, []);

 if (!mediaItems) {
   return <SkeletonLoader />;
 }
  
  return (
    <div>
      <PageTitle />
      {mediaItems?.cards.map((cards, indx) => {
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
        title="Want to Work With Us?"
        buttonText="Apply For Call"
        href={"#collab-form"}
      />
      <ProfessionalOverview overview={mediaItems?.overview || ""} />
      <div id="collab-form">
        <CollabForm type="media" />
      </div>
    </div>
  );
};
export default Page;