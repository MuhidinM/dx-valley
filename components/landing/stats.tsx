import { StatsProps } from "@/types/general";
import React from "react";

const Stats: React.FC<StatsProps> = ({ items }) => {
  return (
    <section className="dark:bg-gray-900">
      <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
        <dl className="grid gap-8 mx-auto text-gray-900 sm:grid-cols-5 dark:text-white">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center"
            >
              <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                {item.value}
              </dt>
              <dd className="font-light text-gray-500 dark:text-gray-400">
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
