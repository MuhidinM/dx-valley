"use client";
import { StatsProps } from "@/types/general";
import React from "react";
import CountUp from "react-countup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SVG1 } from "@/constants";

const Stats: React.FC<StatsProps> = ({ items }) => {
  return (
    <section className='dark:bg-gray-900 max-w-screen-xl md:w-full '>
      <div className='max-w-screen-xl md:w-full px-4 py-8 mx-auto text-center lg:py-16 lg:px-6'>
        <dl className='grid gap-8 mx-auto text-gray-900 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 dark:text-white  '>
          {items.map((item, index) => (
            <div
              key={index}
              className='flex flex-col items-center justify-center p-6 bg-gray-600 dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 '>

                <dt
                className='mb-3 text-4xl font-bold text-white dark:text-white'
                data-to='300'
                data-speed='1500'>
                <CountUp
                  start={0}
                  end={items.length}
                  duration={2.5}
                  delay={0.5}
                />
              </dt>
              <dd className='text-lg font-medium text-white dark:text-gray-300'>
                {item.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default Stats;




