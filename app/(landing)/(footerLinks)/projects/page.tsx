"use client"

import { Card } from "@/components/section";

import React, { useEffect,useState } from "react";
import { InnovationItemFetch } from "@/services/innovation";
import {  InnovationData } from "@/types/strapi-types";
import Image from "next/image";
import { SkeletonLoaderAboutInnovationPage } from "@/components/SkeletonLoader";



const Page = () =>{
      const [innovationItems, setInnovationItems] = useState<InnovationData | null>(null);

        useEffect(() => {
          const fetchInnovationItems = async () => {
            const data = await InnovationItemFetch();
            setInnovationItems(data);
          };

          fetchInnovationItems();
        }, []);
      if(!innovationItems)
      {
        return <SkeletonLoaderAboutInnovationPage />;
      }
    return (
         <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-4 p-10'>
        {innovationItems?.gallery.map((item, indx) => {
          return (
            <Card
              key={indx}
              svg={
                <Image
                  src={`http://10.1.151.64:1337${item.img ?? ""}`}
                  alt='Image Left Not Found'
                  width={400}
                  height={400}
                  className='h-28'
                />
              }
              title={item.title}
              buttonText={"Visit Site"}
              description={item.description}
              href={" "}
            />
          );
        })}
      </div>
    )
}

export default Page;