/** @format */
"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";
import { News } from "@/types/strapi-types";
import { ScrollArea } from "./ui/scroll-area";
import Link from "next/link";
import Image from "next/image";

// Example usage of the `News` interface

export default function AllNewsPage({
  newsArticles,
}: {
  newsArticles: News[];
}) {
  const [selectedArticle, setSelectedArticle] = useState<News | null>(null);
  const [sliderIndex, setSliderIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false); // Track hover state
  const sliderRef = useRef<HTMLDivElement | null>(null);

  // if (!newsArticles || newsArticles.length === 0) {
  //   return (
  //     <div>
  //       <p>No news articles available.</p>
  //     </div>
  //   );
  // }

  // const sortedNewsArticles: any[] = [...newsArticles].sort((a, b) => {
  //   console.log("a.date", a.date, "b.date", b.date);
  //   return new Date(a.date).getTime() - new Date(b.date).getTime();
  // });

  const sortedNewsArticles: any[] = useMemo(() => {
    return newsArticles.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  }, [newsArticles]); //use memo code

  const handleArticleClick = (article: News) => {
    setSelectedArticle(article);
    setSliderIndex(0);
  };

  // console.log("newArticles", sortedNewsArticles);

  const handleCloseArticle = () => {
    setSelectedArticle(null);
  };

  const handlePrevSlide = () => {
    setSliderIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : sortedNewsArticles.length - 1
    );
  };

  const handleNextSlide = () => {
    setSliderIndex((prevIndex) =>
      prevIndex < sortedNewsArticles.length - 1 ? prevIndex + 1 : 0
    );
  };

  useEffect(() => {
    if (!selectedArticle) return;

    const slider = sliderRef.current;
    let timer: NodeJS.Timeout;

    const startAutoSlide = () => {
      timer = setInterval(() => {
        if (!isHovered) {
          // Only slide if not hovered
          handleNextSlide();
        }
      }, 5000);
    };

    const stopAutoSlide = () => {
      clearInterval(timer);
    };

    startAutoSlide();

    if (slider) {
      slider.addEventListener("mouseenter", () => setIsHovered(true));
      slider.addEventListener("mouseleave", () => setIsHovered(false));
    }

    return () => {
      clearInterval(timer);
      if (slider) {
        slider.removeEventListener("mouseenter", () => setIsHovered(true));
        slider.removeEventListener("mouseleave", () => setIsHovered(false));
      }
    };
  }, [handleNextSlide, selectedArticle, isHovered]);

  return (
    <div className='lg:container lg:my-5 mx-auto p-4'>
      {selectedArticle ? (
        <>
          {/* Selected news content */}
          <Card className='mb-8 relative'>
            <Button
              variant='ghost'
              size='icon'
              className='absolute right-2 top-2'
              onClick={handleCloseArticle}
              aria-label='Close article'>
              <X className='h-4 w-4' />
            </Button>
            <CardHeader className='flex flex-row'>
              <Link
                href={selectedArticle.news_link}
                target='_blank'
                className='hover:underline'>
                <CardTitle>{selectedArticle.title}</CardTitle>
              </Link>
            </CardHeader>

            <CardContent>
              <div className='flex flex-row'>
                <p className='text-sm text-muted-foreground flex gap-1 font-semibold text-black mr-5'>
                  <Calendar className='ml-2 h-5  w-4' />{" "}
                  {new Date(selectedArticle.date).toLocaleDateString()}
                </p>
                <Link href={selectedArticle.news_link} target='_blank'>
                  <Image
                    src={selectedArticle.img_link}
                    alt={selectedArticle.title}
                    height={200}
                    width={200}
                    className='lg:w-1/6  w-2/6 h-15 object-cover rounded-md mb-4 hover:opacity-45'
                  />
                </Link>
              </div>

              <div>
                <p className='lg:px-8 py-5 px-2'>
                  {selectedArticle.description}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* News slider */}
          <div className='relative overflow-hidden h-48 mb-8' ref={sliderRef}>
            <h2 className='text-2xl font-bold mb-4'>More News</h2>
            <div
              className='flex transition-transform duration-500 ease-in-out'
              style={{ transform: `translateX(-${sliderIndex * 33.33}%)` }}>
              {sortedNewsArticles
                .concat(sortedNewsArticles)
                .map((article, index) => (
                  <div
                    key={`${article.title}-${index}`}
                    className='w-1/3 flex-shrink-0 px-2 cursor-pointer'
                    onClick={() => handleArticleClick(article)}>
                    <Card className='h-full hover:shadow-lg transition-shadow duration-300'>
                      <CardContent className='p-4'>
                        <Image
                          src={article.img_link}
                          alt={article.title}
                          height={200}
                          width={200}
                          className='lg:w-1/2 lg:h-24  object-cover rounded-md mb-2'
                        />
                        <h3 className='text-sm font-semibold line-clamp-2'>
                          {article.title}
                        </h3>
                        <p className='text-xs text-muted-foreground mt-1'>
                          {new Date(article.date).toLocaleDateString()}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
            </div>
            <button
              onClick={handlePrevSlide}
              className='absolute left-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md'
              aria-label='Previous slide'>
              <ChevronLeft className='h-6 w-6' />
            </button>
            <button
              onClick={handleNextSlide}
              className='absolute right-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md'
              aria-label='Next slide'>
              <ChevronRight className='h-6 w-6' />
            </button>
          </div>
        </>
      ) : (
        /* News all list */

        <div className='mb-8'>
          {/* <h2 className='text-2xl font-bold mb-4'>All News</h2> */}
          <ScrollArea>
            <h1 className='text-3xl font-bold my-6'>Latest News</h1>
            {sortedNewsArticles.map((article, index) => (
              <Card
                key={index}
                onClick={() => handleArticleClick(article)}
                className='mb-4 hover:pointer'>
                <CardHeader>
                  <CardTitle className='text-lg'>{article.title}</CardTitle>

                  <p className='text-sm text-muted-foreground flex gap-1 font-semibold text-black mr-5'>
                    {" "}
                    <Calendar className='ml-2 h-5  w-4' />{" "}
                    {new Date(article.date).toLocaleDateString()}
                  </p>
                </CardHeader>
                <CardContent>
                  <Image
                    src={article.img_link}
                    alt={article.title}
                    height={200}
                    width={200}
                    className='w-1/2 h-28 object-contain rounded-md'
                  />
                </CardContent>
              </Card>
            ))}
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
