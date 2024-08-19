import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import incubationPhoto from "@/public/image/incubation-center.png";

const Page = () => {
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
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Relevance AI</CardTitle>
              <CardDescription>
                Relevance AI is a machine learning startup on mission to help
                companies build an AI workforce that automates workflows with no
                code.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Image src={incubationPhoto} alt="incubation" />
              <div className="flex justify-between my-2">
                <div className="">
                  <h3 className="font-bold">Founders</h3>
                  <ul className="text-gray-500">
                    <li>Name</li>
                    <li>Name</li>
                    <li>Name</li>
                  </ul>
                </div>
                <div className="">
                  <h3 className="font-bold">Co-Investors</h3>
                  <ul className="text-gray-500">
                    <li>Name</li>
                    <li>Name</li>
                    <li>Name</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className=""></div>
              <Button className="bg-coopBlue hover:bg-coopBlueHover">
                Read More
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
