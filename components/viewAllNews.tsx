/** @format */
"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";
import { News } from "@/types/strapi-types";
import { ScrollArea } from "./ui/scroll-area";
import Link from "next/link";

// Example usage of the `News` interface


export default function AllNewsPage({ newsArticles }: { newsArticles: News[] }) {
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


  // const sortedNewsArticles = newsArticles.sort((a, b) => {
  //   return new Date(a.date).getTime() - new Date(b.date).getTime();})


 const sortedNewsArticles = useMemo(() => {
   return newsArticles.sort((a, b) => {
     return new Date(a.date).getTime() - new Date(b.date).getTime();
   });
 }, [newsArticles]); //use memo code 



  const handleArticleClick = (article: News) => {
    setSelectedArticle(article);
    setSliderIndex(0);
  };

  console.log("newArticles", sortedNewsArticles);

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
  }, [selectedArticle, isHovered]);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6'>Latest News</h1>

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
            <CardHeader>
              <Link
                href={selectedArticle.news_link}
                target='_blank'
                className='hover:underline'>
                <CardTitle>{selectedArticle.title}</CardTitle>
              </Link>

              <p className='text-sm text-muted-foreground flex gap-1 font-semibold text-black'>
                <Calendar className='ml-2 h-4 w-4' />{" "}
                {new Date(selectedArticle.date).toLocaleDateString()}
              </p>
            </CardHeader>

            <CardContent>
              <div>
                <img
                  src={selectedArticle.img_link}
                  alt={selectedArticle.title}
                  className='w-1/12 h-15 object-cover rounded-md mb-4'
                />
              </div>
              <div>
                <p>{selectedArticle.description}</p>
              </div>{" "}
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
                        <img
                          src={article.img_link}
                          alt={article.title}
                          className='w-full h-24 object-cover rounded-md mb-2'
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
              className='absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md'
              aria-label='Previous slide'>
              <ChevronLeft className='h-6 w-6' />
            </button>
            <button
              onClick={handleNextSlide}
              className='absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md'
              aria-label='Next slide'>
              <ChevronRight className='h-6 w-6' />
            </button>
          </div>
          {/* <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {sortedNewsArticles.map((article) => (
              <Card
                key={article.title}
                className='cursor-pointer hover:shadow-lg transition-shadow duration-300'
                onClick={() => handleArticleClick(article)}>
                <CardHeader>
                  <CardTitle className='text-lg'>{article.title}</CardTitle>
                  <p className='text-sm text-muted-foreground'>
                    {new Date(article.date).toLocaleDateString()}
                  </p>
                </CardHeader>
                <CardContent>
                  <img
                    src={article.img_link}
                    alt={article.title}
                    className='w-full h-48 object-cover rounded-md'
                  />
                </CardContent>
              </Card>
            ))}
          </div> */}
        </>
      ) : (
        /* News all list */

        <div className='mb-8'>
          {/* <h2 className='text-2xl font-bold mb-4'>All News</h2> */}
          <ScrollArea>
            {sortedNewsArticles.map((article, index) => (
              <Card
                key={index}
                className={`mb-4 cursor-pointer ${
                  selectedArticle?.title === article.title
                    ? "border-primary"
                    : ""
                }`}
                onClick={() => handleArticleClick(article)}>
                <CardHeader>
                  <CardTitle className='text-lg'>{article.title}</CardTitle>
                  <p className='text-sm text-muted-foreground'>
                    {" "}
                    {new Date(article.date).toLocaleDateString()}
                  </p>
                </CardHeader>
                <CardContent>
                  <img
                    src={article.img_link}
                    alt={article.title}
                    className='w-full h-32 object-cover rounded-md'
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
