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
import { Dx1_Team, SVG1 } from "@/constants";

const CardContainer: React.FC = () => {
  const cards = [
    {
      image: <SVG1 />,
      title: "Our Incubation Center",
      description:
        "Nurturing entrepreneurs with tailored training and investor access.",
      buttonText: "Explore Incubation Center",
      href: "/incubationcenter",
      article: {
        title: "New AI Startup Joins Incubation Program",
        date: "2024-03-15",
        link: "#",
      },
    },
    {
      image: <Dx1_Team />,
      title: "Our Innovation Hub",
      description:
        "Driving industry advancements with cutting-edge products and partnerships.",
      buttonText: "Explore Innovation Hub",
      href: "/innovationhub",
      article: [
        {
          title: "Breakthrough in Quantum Computing Research",
          date: "2024-03-10",
          link: "#",
        },
        {
          title: "New Advances in Artificial Intelligence",
          date: "2024-05-15",
          link: "#",
        },
      ],
    },
  ];

  return (
    <section className='py-2 px-2 mx-auto max-w-screen-xl sm:py-6 lg:px-6'>
      <div className='grid gap-2 md:grid-cols-2'>
        {cards.map((card, index) => (
          <Card key={index} className='flex flex-col'>
            <CardHeader>
              <div className='mb-4'>
                {/* <Image
                  src={card.image}
                  alt={card.title}
                  width={100}
                  height={100}
                  className='rounded-lg'
                /> */}
                {card.image}
              </div>
              <CardTitle className='text-2xl font-bold'>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardContent className='flex-grow'>
              {Array.isArray(card.article) ? ( 
                card.article.map((article, index) => (
                  <div key={index} className='bg-muted p-4 rounded-lg mb-2'>
                    <span className='text-muted-foreground ml-0 text-xs flex flex-row gap-2 my-2'>
                      <Calendar className='ml-2 h-4 w-4' />
                      {article.date}
                    </span>
                    <a
                      href={article.link}
                      className='text-sm text-primary hover:underline block italic'>
                      <span className='font-semibold'>{article.title}</span>
                    </a>
                  </div>
                ))
              ) : (
                <div className='bg-muted p-4 rounded-lg'>
                  <span className='text-muted-foreground ml-0 text-xs flex flex-row gap-2 my-2'>
                    <Calendar className='ml-2 h-4 w-4' />
                    {card.article.date}
                  </span>
                  <a
                    href={card.article.link}
                    className='text-sm text-primary hover:underline block italic'>
                    <span className='font-semibold'>{card.article.title}</span>
                  </a>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button asChild className='w-full'>
                <a
                  href={card.href}
                  className='inline-flex items-center justify-center'>
                  {card.buttonText}
                  <ArrowRight className='ml-2 h-4 w-4' />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default CardContainer;
