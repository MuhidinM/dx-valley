import { Button } from "@/components/ui/button";
import Link from "next/link";
import { JoinUs } from "@/types/strapi-types";

export default function CTAComponent({JoinUs}:{JoinUs: JoinUs}) {
  console.log(": ", JoinUs)
  return (
    <section className='w-full px-2 py-2 md:py-10 lg:py-10'>
      <div className='container mx-auto max-w-7xl px-4  sm:px-6 lg:px-8 flex flex-col justify-between h-full'>
        <div className='flex-grow space-y-6'>
          <h2 className="text-4xl sm:text-4xl lg:text-4xl font-bold tracking-tight text-coopOrange font-['Arial']">
            {JoinUs.text_1}
          </h2>
          <p className='text-xl sm:text-lg lg:text-xl text-coopBlue '>
            <em>
              {JoinUs.text_2}
            </em>
          </p>
          <p className="text-base font-semibold sm:text-lg text-gray-800 dark:text-gray-300 font-['Arial']">
            {JoinUs.text_3}
          </p>
        </div>
        <div className='grid grid-cols-2 gap-3 mt-8'>
          {
            JoinUs.buttons.map((item, indx) => (
              <Link href={item.href}>
                <Button className={`w-full ${item.background_is_orange ? 'bg-coopOrange' : 'bg-gray-800 hover:bg-gray-700'} hover:bg-gray-700 text-white font-['Arial'] text-lg py-0 transition-colors duration-300`}>
                  {item.title}
                </Button>
              </Link>
            ))
          }
        </div>
      </div>
    </section>
  );
}
