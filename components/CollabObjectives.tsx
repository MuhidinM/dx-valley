/** @format */

import {
  BrainCircuitIcon,
  RocketIcon,
  UsersIcon,
  TrendingUpIcon,
} from "lucide-react";

interface ObjectiveItem {
  title: string;
  content: string;
  icon: React.ReactNode;
  color: string;
}

const objectiveItems: ObjectiveItem[] = [
  {
    title: "Knowledge Transfer",
    content:
      "Facilitate expertise and industry insights to build strong foundations.",
    icon: <BrainCircuitIcon className='w-6 text-coopOrange  h-6' />,
    color: "text-blue-600",
  },
  {
    title: "Skill Development",
    content:
      "Enhance practical skills through targeted workshops and training.",
    icon: <RocketIcon className='w-6  text-coopOrange  h-6' />,
    color: "text-purple-600",
  },
  {
    title: "Mentorship",
    content: "Provide personalized guidance to navigate business challenges.",
    icon: <UsersIcon className='w-6  text-coopOrange  h-6' />,
    color: "text-orange-600",
  },
  {
    title: "Growth Acceleration",
    content: "Equip with strategies and tools to accelerate business growth.",
    icon: <TrendingUpIcon className='w-6  text-coopOrange  h-6' />,
    color: "text-green-600",
  },
];

export default function Component() {
  return (
    <div className='bg-gray-50 py-8 px-4 mt-10 rounded-lg dark:bg-gray-900'>
      <div className='max-w-7xl mx-auto'>
        {/* <h2 className='text-3xl font-extrabold text-gray-900 text-center mb-10 dark:text-white'>
          Training Objectives
        </h2> */}
        <span className='flex justify-center text-3xl lg:3xl tracking-tight mb-2 font-bold leading-tight underline-offset-auto dark:text-white'>
          Training Objectives
        </span>
        <div className='flex justify-center  mb-5'>
          <div className='w-20 h-1 bg-coopOrange'></div>
        </div>
        <div className='flex flex-wrap justify-center gap-6'>
          {objectiveItems.map((item, index) => (
            <div key={index} className='flex flex-col items-center w-[220px]'>
              <div
                className={`w-12 h-12 mb-3 rounded-full bg-gray-100 dark:bg-gray-800 ${item.color} flex items-center justify-center`}>
                {item.icon}
              </div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white text-center mb-2'>
                {item.title}
              </h3>
              <p className='text-md text-gray-600 dark:text-gray-500 text-center'>
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
