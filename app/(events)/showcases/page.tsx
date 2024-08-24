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
import AIImage from "@/public/image/ai-image.png"
import { Popup } from "@/components/popup";

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
          {/* <Card className="w-full">
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
              <Popup />
            </CardFooter>
          </Card>
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
              <Popup />
            </CardFooter>
          </Card> */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Relevance AI</CardTitle>
              <CardDescription>
              <span className="text-orange-500 font-bold">Relevance AI</span> leverages AI to provide businesses with the most relevant insights, 
              helping them make smarter decisions and stay competitive.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Image src={AIImage} alt="incubation" />
              <div className="flex justify-between my-2">
                <div className="">
                  <h3 className="font-bold">Founders</h3>
                  <ul className="text-gray-500">
                    <li>Gadaa Jarraa</li>
                    <li>Danuu Bulchaa</li>
                    <li>Daba Wayesa</li>
                  </ul>
                </div>
                <div className="">
                  <h3 className="font-bold">Co-Investors</h3>
                  <ul className="text-gray-500">
                    <li>Gamechu Wakjira</li>
                    <li>Kulani Obsa</li>
                    <li>Kanani Misbah</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className=""></div>
              <Popup />
            </CardFooter>
          </Card>
          <div className="col-span-3">
            <Button className="bg-coopBlue hover:bg-coopBlueHover">
              Load More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
