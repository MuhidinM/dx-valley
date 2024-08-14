import CTA from "@/components/cta";
import { Feature } from "@/components/feature";
import { SectionRight } from "@/components/section";
import { SVG1 } from "@/constants";
import React from "react";

const Page = () => {
  return (
    <div className="space-y-8">
      <SectionRight
        svg={<SVG1 />}
        title="Let's create more tools and ideas that brings us together."
        description={
          <>
            Lorem ipsum dolor sit amet consectetur adipisicing quidem possimus
            dolorum sed est facilis eaque Vitae ea unde ex molestiae labore sint
            aperiam reprehenderit officia voluptatum <br /> <br />
            <ul>
              <li>Facility 1</li>
              <li>Facility 2</li>
              <li>Facility 3</li>
            </ul>
          </>
        }
        buttonText="Call to Action"
      />
      <Feature />
      <CTA buttonText="Apply for Call" title="Have a start-up idea?" />
    </div>
  );
};

export default Page;
