/** @format */

import Link from "next/link";
import { Button } from "./ui/button";
import { CardProps } from "@/types/general";
import { ArrowRight } from "lucide-react";

export const Card: React.FC<CardProps> = ({
  buttonText,
  buttonText2,
  title,
  img,
  description,
}) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-4">
      <Link href="#">{img}</Link>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white hover:underline">
            {title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <Link href="#">
            {buttonText && (
              <Button variant={"link"} className="w-full sm:w-auto">
                {buttonText}
                <ArrowRight />
              </Button>
            )}
          </Link>
          <Link href="#">
            {buttonText2 && (
              <Button className="bg-coopBlue hover:bg-coopBlueHover w-full sm:w-auto">
                {buttonText2}
              </Button>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};
