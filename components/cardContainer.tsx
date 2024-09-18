/** @format */

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
import { ArrowRight, Calendar } from "lucide-react";

import Image from "next/image";
import { UpdateData } from "@/types/strapi-types";

export default function cardContainer({ update }: { update: UpdateData[] }) {
  return (
    <section className=''>
      <div className='grid gap-2 md:grid-cols-2'>
        {update.map((card, index) => (
          <Card key={index} className='flex flex-col'>
            <CardHeader>
              <div className='mb-4'>
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}${card.img}`}
                  alt={card.title}
                  width={200}
                  height={100}
                  className='rounded-lg w-full h-56'
                />
              </div>
              <CardTitle className='text-2xl font-bold'>
                Our {card.title}
              </CardTitle>
              <CardDescription className='text-lg'>
                {card.description}
              </CardDescription>
            </CardHeader>
            <CardContent className='flex-grow'>
              {card.events.map((article, index) => (
                <div key={index} className='bg-muted p-4 rounded-lg mb-2'>
                  <span className='text-muted-foreground ml-0 text-xs flex flex-row gap-2 my-2'>
                    <Calendar className='ml-2 h-4 w-4' />
                    {new Date(article.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <a
                    href={article.link}
                    className='text-sm text-primary hover:underline block italic'>
                    <span className='font-semibold'>{article.title}</span>
                  </a>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button asChild className='w-full dark:bg-gray-800'>
                <a
                  href={card.link}
                  className='inline-flex items-center justify-center dark:text-gray-300'>
                  Explore {card.title}
                  <ArrowRight className='ml-2 h-4 w-4' />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
