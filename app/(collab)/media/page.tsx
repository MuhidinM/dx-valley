/** @format */

import CollabForm from "@/components/collab/call-for-collab-form";
import CTA from "@/components/cta";
import Objectives from "@/components/collab/objectives";
import PageTitle from "@/components/collab/pageTitle";
import { SectionLeft, SectionRight } from "@/components/section";
import { objectives, Media1 } from "@/constants";
import Head from "next/head";
import React from "react";
import Overview from "@/components/collab/overview";
import ProfessionalOverview from "@/components/ProfessionalOverview";
import CollabObjectives from "@/components/CollabObjectives";

const Page = () => {
  return (
    <div>
      <PageTitle />
      <SectionLeft
        svg={<Media1 />}
        title='Be the Voice of Innovation: Partner with Us!'
        description="We're inviting dynamic media partners to join us in showcasing the future of innovation! Register on our platform to stay updated on our upcoming events and discover how you can support and amplify the startup ideas coming through our incubation hub.

          Your role is pivotal in promoting these groundbreaking ventures to the community and beyond. By collaborating with us, you'll gain exclusive access to exciting events, be first to know about emerging trends, and help bring visionary ideas to the forefront.

          Let's work together to spotlight innovation, inspire audiences, and drive impactful stories. Register today and be part of this transformative journey!"
        buttonText={"hidden"}
        href={" "}
      />
      <ProfessionalOverview />
      <CTA
        title='Want to Work with Us?'
        buttonText='Apply For Call'
        href={"#collab-form"}
      />

      <CollabObjectives />
      {/* <Objectives items={objectives} /> */}
      {/* <InputForm /> */}
      <div id='collab-form'>
        <CollabForm />
      </div>
    </div>
  );
};
export default Page;
