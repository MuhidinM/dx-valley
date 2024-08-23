/** @format */

import CollabForm from "@/components/collab/call-for-collab-form";
import CTA from "@/components/cta";
import Objectives from "@/components/collab/objectives";
import PageTitle from "@/components/collab/pageTitle";
import { SectionLeft, SectionRight } from "@/components/section";
import { objectives, Organizaion } from "@/constants";
import Head from "next/head";
import React from "react";
import Overview from "@/components/collab/overview";

const Page = () => {
  return (
    <div>
      <PageTitle />
      <SectionLeft
        svg={<Organizaion />}
        title='Ignite Innovation: Partner with Us'
        description="This is an invitation to visionary organizations to join forces with us and make a significant difference. Whether you want to sponsor, invest, or integrate, your help may turn developing ideas into profitable businesses.
                  By working with us, you will be at the vanguard of innovation, helping to shape the next generation of trailblazers. Your collaboration will not only help these entrepreneurs, but will also promote advancement across industries. Together, we can create a healthy ecosystem in which ideas thrive and aspirations come true.
                  Join us on this exciting adventure to invent, inspire, and grow together!"
        buttonText={"hidden"}
        href={" "}
      />
      <CTA
        title='Want to Work with Us?'
        buttonText='Apply For Call'
        href={"#collab-form"}
      />
      <Objectives items={objectives} />
      {/* <InputForm /> */}
      <div id='collab-form'>
        <CollabForm />
      </div>
    </div>
  );
};
export default Page;
