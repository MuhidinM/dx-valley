import React from "react";
import { stats, SVG1, SVG2 } from "@/constants";
import { SectionRight, SectionLeft } from "@/components/section";
import CTA from "@/components/cta";

const Page = () => {
  return (
    // <div>
    //   <SectionLeft
    //     svg={<SVG1 />}
    //     title="Training Area 1"
    //     description=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
    //         quidem possimus dolorum sed est facilis eaque laborum. Vitae ea unde
    //         eaque, ex molestiae labore sint aperiam reprehenderit officia
    //         voluptatum esse!"
    //     buttonText="Apply to give the training"
    //   />
    //   <SectionRight
    //     svg={<SVG2 />}
    //     title="Training Area 2"
    //     description=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
    //       quidem possimus dolorum sed est facilis eaque laborum. Vitae ea unde
    //       eaque, ex molestiae labore sint aperiam reprehenderit officia
    //       voluptatum esse!"
    //     buttonText="Apply to give the training"
    //   />
    // </div>
    <div>
    <SectionRight svg={<SVG1 />}
      title={"Traning"}
      description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
      buttonText={"Apply To Give Training"} />

    <SectionLeft svg={<SVG1 />}
      title={"Traning"}
      description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
      buttonText={"Apply To Give Training"} />

    <CTA title={"Want To Give a Training?"} buttonText={"Apply"} />
  </div>
  );
};

export default Page;
