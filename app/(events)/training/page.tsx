import React from "react";
import { stats, SVG1, SVG2 } from "@/constants";
import { SectionRight, SectionLeft } from "@/components/section";

const Page = () => {
  return (
    <div>
      <SectionLeft
        svg={<SVG1 />}
        title="Training Area 1"
        description=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
            quidem possimus dolorum sed est facilis eaque laborum. Vitae ea unde
            eaque, ex molestiae labore sint aperiam reprehenderit officia
            voluptatum esse!"
        buttonText="Apply to give the training"
      />
      <SectionRight
        svg={<SVG2 />}
        title="Training Area 2"
        description=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
          quidem possimus dolorum sed est facilis eaque laborum. Vitae ea unde
          eaque, ex molestiae labore sint aperiam reprehenderit officia
          voluptatum esse!"
        buttonText="Apply to give the training"
      />
    </div>
  );
};

export default Page;
