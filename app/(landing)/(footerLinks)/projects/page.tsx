"use client"

import { CardComponent } from "@/components/section";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
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
        return (
         <SkeletonLoaderAboutInnovationPage />
        );
      }
    return (
      <div className='mt-16'>
        <Card className='contest-title'>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
          </CardHeader>
        </Card>
        <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-6  my-14'>
          {innovationItems?.gallery.map((item, indx) => {
            return (
              <CardComponent
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
      </div>
    );
}

export default Page;