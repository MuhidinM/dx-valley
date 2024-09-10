/** @format */

"use client";

import { useState, useEffect } from "react";
import {
  ArrowRightIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { News} from "@/types/strapi-types";


export default function News({ news }: { news: News[] }) {

  const sortedNews = [...news].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const latestNews = sortedNews.slice(0, 3);

  return (
    <div className='relative right-0 w-full sm:w-96  space-y-4 mb-1'>
      <Card className='border-none shadow-none'>
        <CardHeader className='pb-2'>
          <CardTitle className='text-lg font-semibold'>Popular News</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4 pt-0'>
          {latestNews.map((item, index) => (
            <div key={index} className={index === 0 ? "mb-4" : "mb-2"}>
              <Link href={item.news_link} className='group' target='_blank'>
                <div className='flex items-start space-x-2'>
                  <img
                    src={item.img_link}
                    alt={item.title}
                    className={`object-contain rounded-sm  dark:bg-gray-400 ${
                      index === 0 ? "w-12 h-12" : "w-10 h-10"
                    }`}
                  />
                  <div>
                    <h3
                      className={`font-semibold group-hover:text-primary hover:underline transition-colors  ${
                        index === 0 ? "text-sm " : "text-xs"
                      }`}>
                      {item.title}
                    </h3>
                    <p className='text-xs text-muted-foreground'>
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                    {index === 0 && (
                      <p className='text-sm mt-1'>{item.description}</p>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
          <Link
            href='/news'
            className='text-sm font-semibold text-primary hover:underline flex items-center'>
            View All News
            <ArrowRightIcon className='ml-1 h-3 w-3' />
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
