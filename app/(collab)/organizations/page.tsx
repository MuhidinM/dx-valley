"use client";

import CollabForm from "@/components/collab/call-for-collab-form";
import CTA from "@/components/cta";
import PageTitle from "@/components/collab/pageTitle";
import { SectionLeft, SectionRight } from "@/components/section";
import { Organizaion } from "@/constants";
import React, { useState, useEffect } from "react";
import CollabObjectives from "@/components/CollabObjectives";
import ProfessionalOverview from "@/components/ProfessionalOverview";
import { OrgItemFetch } from "@/services/organization";
import { OrgData } from "@/types/strapi-types";

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
    console.log("org items: ", orgItems);
  });
  return (
    <div>
      <PageTitle />

      <SectionLeft
        svg={<Organizaion />}
        title="Ignite Innovation: Partner with Us"
        description="This is an invitation to visionary organizations to join forces with us and make a significant difference. Whether you want to sponsor, invest, or integrate, your help may turn developing ideas into profitable businesses.
                  By working with us, you will be at the vanguard of innovation, helping to shape the next generation of trailblazers. Your collaboration will not only help these entrepreneurs, but will also promote advancement across industries. Together, we can create a healthy ecosystem in which ideas thrive and aspirations come true.
                  Join us on this exciting adventure to invent, inspire, and grow together!"
        buttonText={"hidden"}
        href={" "}
      />
      <ProfessionalOverview />

      {orgItems?.cards.map((cards, indx) => {
        return indx % 2 ? (
          <SectionLeft
            svg={
              <Image
                src={`http://10.1.151.64:1337${cards.img.large}`}
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
                src={`http://10.1.151.64:1337${cards.img.large}`}
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

      <ProfessionalOverview overview={orgItems?.overview || ""} />

      <CTA
        title="Want to Work with Us?"
        buttonText="Apply For Call"
        href={"#collab-form"}
      />
      <CollabObjectives />
      <div id="collab-form">
        <CollabForm type="organization" />
      </div>
    </div>
  );
};
export default Page;
