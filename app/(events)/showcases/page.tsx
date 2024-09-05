"use client"

import React, {useState, useEffect} from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Image from "next/image";
import { Popup } from "@/components/popup";
import { ShowCaseData } from "@/types/strapi-types";
import { ShowCaseItemFetch } from "@/services/showcase";
const Page = () => {
  const [showcaseItems, setShowCaseItems] = useState<ShowCaseData[]>([]);

    useEffect(() => {
      const fetchShowCaseItems = async () => {
        const data = await ShowCaseItemFetch();
        setShowCaseItems(data);
      };

      fetchShowCaseItems();
    }, []);

    useEffect(() => {
      console.log("showcases-log: ", showcaseItems)
    })
    if (!showcaseItems) {
      return null;
    }
  return (
    <div className="flex items-center justify-center">
      <div className="text-center my-8">
        <div className="">
          <h2 className="text-4xl font-bold">
            <span className="text-coopBlue">Incubated</span> Products
          </h2>
          <div className="flex justify-center mt-2  mb-12">
            <div className="w-20 h-1 bg-coopOrange"></div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {
            showcaseItems.map((projects, idx) => {
              return <Card className="w-full">
                  <CardHeader key={idx}>
                    <CardTitle>{projects.projectName}</CardTitle>
                    <CardDescription>
                    <span className="text-orange-500 font-bold">{projects.projectName}</span> {projects.small_description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image src={`http://10.1.151.64:1337${projects.img_1}`} width={800} height={800} alt="incubation" />
                    <div className="flex justify-between my-2">
                      <div className="">
                        <h3 className="font-bold">Founders</h3> 
                        <ul className="text-gray-500">

                          {projects.founders.map((founder, inx) => {
                            return <li key={inx}>{founder.name}</li>
                          })}

                        </ul>
                      </div>
                      <div className="">
                        <h3 className="font-bold">Co-Investors</h3>
                        <ul className="text-gray-500">
                          {projects.investors.map((investor, inx) => {
                            return <li key={inx}>{investor.name}</li>
                          })}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className=""></div>
                    <Popup details={projects}/>
                  </CardFooter>
                </Card>
            })
          }
        </div>

      </div>
    </div>
  );
};

export default Page;
