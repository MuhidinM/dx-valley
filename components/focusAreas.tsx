/** @format */

"use client";
import { useState } from "react";
import { focusAreaProps } from "@/types/general";
import { getImageUrl } from "@/lib/utils";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";

const FocusAreas: React.FC<focusAreaProps> = ({ items }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="bg-gray-50 text-gray-900">
      <div className="mx-auto max-w-screen-sm text-center mt-24">
        <h2 className=" text-4xl tracking-tight mb-2 font-extrabold leading-tight underline-offset-auto dark:text-white">
          <span className="text-coopBlue"> Focus</span> Areas
        </h2>
        <div className="flex justify-center ">
          <div className="w-20 h-1 bg-coopOrange"></div>
        </div>
      </div>
      <ul className="tabs flex  flex-row w-full md:w-5/5 h-auto md:h-12 mx-auto mt-6 mb-4 md:mt-10 justify-center lg:gap-12 px-4 ">
        {items?.map((item, index) => (
          <li
            key={index}
            onClick={() => setActiveTab(index)}
            className={`cursor-pointer flex-1 md:flex-none text-center py-2 px-3 md:px-4 transition duration-900 ease-in-out ${
              activeTab === index
                ? "border-b-2 border-coopOrange font-semibold"
                : "border-b-2 border-transparent hover:border-gray-300"
            }`}
          >
            {item.title === "Agricultural Technology"
              ? "Agrotech"
              : item.title === "Financial Technology"
              ? "Fintech"
              : item.title}
          </li>
        ))}
      </ul>

      <div className="contents w-half md:w-4/5 mx-auto mt-6 md:mt-12  flex-wrap justify-between gap-4 md:gap-8">
        {items?.map((item, index) => (
          <div
            key={index}
            className={`box flex flex-col md:flex-row gap-4 p-4 md:p-6 bg-white shadow-sm rounded-lg transition-transform duration-800 ease-in-out ${
              activeTab === index ? "opacity-100" : "hidden opacity-0"
            }`}
          >
            <img
              className="w-full md:w-2/5 rounded-lg"
              src={`${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}${item?.img ?? ""}`}
              alt={"image"}
              height={300}
              width={400}
            />
            <div className="text-left md:text-left ml-10 space-y-3">
              <h3 className="text-lg md:text-l font-bold">{item.title}</h3>
              <div className="text-gray-700 space-y-10 prose">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {item.description}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FocusAreas;
