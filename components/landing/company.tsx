/** @format */

import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
import { CardNoLinkData } from "@/types/strapi-types";
import Header from "@/components/header";

const Companies = ({ img }: { img: JSX.Element }) => {
  return (
    <figure
      className={cn(
        "relative cursor-pointer overflow-hidden rounded-xl p-4 md:ml-16"
      )}
    >
      <div className="flex flex-row items-center gap-2">{img}</div>
    </figure>
  );
};

export function SlidingCompanies(companies: { companies: CardNoLinkData[] }) {
  return (
    <div className="py-8 lg:py-16 mx-auto max-w-screen-xl px-4">
      <h2 className="mb-8 lg:mb-16 text-3xl font-extrabold tracking-tight leading-tight text-center text-gray-900 dark:text-white md:text-4xl">
        {/* Our Digital Showcase */}
        <Header />
      </h2>
      {/* <span> </span> */}

      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-background dark:bg-inherit">
        <Marquee pauseOnHover className="[--duration:20s]">
          {companies.companies.map((item, indx) => {
            return (
              <Companies
                key={indx}
                img={
                  <img
                    className='lg:h-14  h-10'
                    src={`${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}${
                      item?.img ?? ""
                    }`}
                    alt={item.title}
                    loading='lazy'
                  />
                }
              />
            );
          })}
        </Marquee>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-slate-50 dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-slate-50 dark:from-background"></div>
      </div>
    </div>
  );
}
