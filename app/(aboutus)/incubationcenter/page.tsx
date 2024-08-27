/** @format */

import { Card } from "@/components/card";
import CTA from "@/components/cta";
import { Feature } from "@/components/feature";
import FocusAreas from "@/components/focusAreas";
import Offer from "@/components/landing/offer";
import Stats from "@/components/landing/stats";
import { SectionRight } from "@/components/section";
import { stats, SVG1, focusArea } from "@/constants";
import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div className="space-y-8 mb-8 justify-center">
      <SectionRight
        svg={<SVG1 />}
        title="Incubation center:  Your Gateway to Startup Success."
        description={
          <>
            Welcome to our incubation center, where startups grow and turn their
            boldest dreams into reality. We fill every gap and handle essential
            elements, allowing you to focus on innovation. Our comprehensive
            support includes investor networking, market strategy development,
            financial coaching, and training. With our expert guidance, we
            transform potential into performance, helping you succeed faster and
            shine brighter. Your startup’s success is our passion and ultimate
            goal. Our support includes:
            <br />
            <ul className=" pl-12 space-y-4 mt-3 list-disc">
              <li>Investor networking</li>
              <li>Market strategy development</li>
              <li>Financial coaching</li>
              <li>Comprehensive training</li>
            </ul>
          </>
        }
        buttonText={"hidden"}
        href={"/innovationhub"}
      />
      <CTA
        buttonText="Apply for Call"
        title="Have a Start-Up Idea?"
        href="/callforproposal"
      />
      <Feature />
      <FocusAreas items={focusArea} />
      <Offer />

      <div className="mx-auto max-w-screen-sm text-center">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white">
          <span className=" text-coopBlue"> Training</span> Areas
        </h2>
        <div className="flex justify-center mt-2  mb-12">
          <div className="w-20 h-1 bg-coopOrange"></div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Card
          title="Leadership and Management"
          description="Training in this area focuses on developing skills to inspire and guide teams, manage resources effectively, and make strategic decisions to drive startup success."
          img={
            <Image
              className="rounded-t-lg"
              src="https://media.istockphoto.com/id/1473642411/photo/happy-business-leader-talking-to-group-of-his-colleagues-on-a-seminar-in-board-room.jpg?s=612x612&w=0&k=20&c=wrMbY6cJmqSukmZACmfrkHcas5S9L8VCyeppKcOMXpo="
              alt=""
              width={1000}
              height={0}
            />
          }
        />

        <Card
          title="Marketing and Sales"
          description="This training covers strategies to promote products, generate leads, and convert them into sales, helping startups build their brand and drive revenue growth."
          img={
            <Image
              className="rounded-t-lg"
              src="https://media.istockphoto.com/id/1473642411/photo/happy-business-leader-talking-to-group-of-his-colleagues-on-a-seminar-in-board-room.jpg?s=612x612&w=0&k=20&c=wrMbY6cJmqSukmZACmfrkHcas5S9L8VCyeppKcOMXpo="
              alt=""
              width={1000}
              height={0}
            />
          }
        />
        <Card
          title="Product Development"
          description="We provide guidance on creating and refining products, from ideation and design to testing and launch, ensuring they meet market needs and drive innovation."
          img={
            <Image
              className="rounded-t-lg"
              src="https://media.istockphoto.com/id/1322157962/photo/groups-of-young-man-who-talking-together-to-discuss-the-work-in-the-workplace.jpg?s=612x612&w=0&k=20&c=33t8hk1NDm2DHuQFyY-m9NaPkFmdEsOeFFQX4LgqXNU="
              alt=""
              width={1000}
              height={0}
            />
          }
        />
      </div>
      {/* <div className='flex items-center justify-center'>
        <Button className='bg-coopBlue hover:bg-coopBlueHover'>
          Load More
        </Button>
      </div> */}

      <Stats items={stats} />
    </div>
  );
};

export default Page;
