/** @format */

import { Vision } from "@/types/strapi-types";
import { Users, Quote, Sparkles, Handshake } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const CooperativeVision = ({vision, motto_title}:{vision:Vision, motto_title:string}) => {
  return (
    <section className="mt-4">
      <div className="relative bg-white dark:bg-gray-950 rounded-xl shadow-xl p-6 sm:p-8 overflow-hidden">
        <Quote className="absolute top-3 left-3 text-blue-100 w-8 h-8 sm:w-10 sm:h-10" />
        <div className="absolute bottom-0 right-0 text-orange-100 w-16 h-16 sm:w-20 sm:h-20">
          <Sparkles className="w-full h-full" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Handshake
            className="w-4/5 h-4/5 text-blue-200 opacity-40 dark:text-gray-400"
            strokeWidth={0.5}
          />
        </div>
        <div className="relative z-10">
          <div className="flex items-center mb-4">
            <Users className="text-coopBlue w-6 h-6 sm:w-8 sm:h-8 mr-3" />
            <h2 className="text-sm sm:text-3xl font-bold text-gray-800 dark:text-gray-300 font-['Open Sans']">
              {vision?.title ?? ""}
            </h2>
          </div>
          <div className="prose text-base sm:text-lg text-gray-600 leading-relaxed dark:text-gray-300 mb-3 font-['Open Sans']">
            <ReactMarkdown children={vision?.description?? ""} remarkPlugins={[remarkGfm]} />
          </div>
          
          <div className="flex justify-end">
            <div className="bg-orange-100 text-orange-800 text-xs sm:text-sm font-semibold py-1.5 px-3 rounded-full inline-block font-['Open Sans'] shadow-md">
              {motto_title}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CooperativeVision;
