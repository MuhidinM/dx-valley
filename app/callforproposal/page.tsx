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

const Page = () => {
  return (
    <Card style={{ marginTop: "40px", marginBottom: "40px" }}>
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-center flex-grow">
          Call for Proposal
        </CardTitle>
        <div
          className="border p-4 rounded shadow ml-auto flex items-center relative"
          style={{ top: "-2.5rem" }}
        >
          <p className="text-lg text-red-500 m-0 leading-none">Countdown:</p>
        </div>
      </CardHeader>

      <CardContent>
        <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, quidem
          possimus dolorum sed est facilis eaque laborum. Vitae ea unde eaque,
          ex molestiae labore sint aperiam reprehenderit officia voluptatum
          esse! Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
          quidem possimus dolorum sed est facilis eaque laborum. Vitae ea unde
          eaque, ex molestiae labore sint aperiam reprehenderit officia
          voluptatum esse! Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Fugit, quidem possimus dolorum sed est facilis eaque laborum.
          Vitae ea unde eaque, ex molestiae labore sint aperiam reprehenderit
          officia voluptatum esse!
        </p>
        <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, quidem
          possimus dolorum sed est facilis eaque laborum. Vitae ea unde eaque,
          ex molestiae labore sint aperiam reprehenderit officia voluptatum
          esse! Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
          quidem possimus dolorum sed est facilis eaque laborum. Vitae ea unde
          eaque, ex molestiae labore sint aperiam reprehenderit officia
          voluptatum esse! Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Fugit, quidem possimus dolorum sed est facilis eaque laborum.
          Vitae ea unde eaque, ex molestiae labore sint aperiam reprehenderit
          officia voluptatum esse!
        </p>
        <Button className="bg-coopBlue text-white font-bold cursor-pointer px-6 py-2 hover:bg-amber-500">
          Apply
        </Button>
      </CardContent>
    </Card>
  );
};

export default Page;
