/** @format */
"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// Define a type for the news article data
interface NewsArticle {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
}

// Mock data for news articles
const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: "New AI Breakthrough in Natural Language Processing",
    description:
      "Researchers have developed a new AI model that can understand and generate human-like text with unprecedented accuracy, potentially revolutionizing how we interact with machines.",
    image: "/placeholder.svg?height=200&width=300",
    date: "2023-06-15",
  },
  {
    id: 2,
    title: "SpaceX Successfully Launches 60 More Starlink Satellites",
    description:
      "SpaceX has successfully launched another batch of 60 Starlink satellites, bringing the total number of satellites in orbit to over 1,500 as part of its plan to provide global internet coverage.",
    image: "/placeholder.svg?height=200&width=300",
    date: "2023-06-14",
  },
  {
    id: 3,
    title: "Global Efforts to Combat Climate Change Intensify",
    description:
      "World leaders have agreed to more ambitious targets to reduce carbon emissions following a landmark summit, signaling a renewed commitment to addressing the climate crisis.",
    image: "/placeholder.svg?height=200&width=300",
    date: "2023-06-13",
  },
  {
    id: 4,
    title: "Breakthrough in Quantum Computing Achieved",
    description:
      "Scientists have made a significant breakthrough in quantum computing, demonstrating a new method that could lead to more stable and powerful quantum computers in the near future.",
    image: "/placeholder.svg?height=200&width=300",
    date: "2023-06-12",
  },
  {
    id: 5,
    title: "New Cancer Treatment Shows Promising Results in Clinical Trials",
    description:
      "A novel immunotherapy treatment for advanced-stage cancer has shown remarkable results in early clinical trials, offering hope for patients with previously untreatable forms of the disease.",
    image: "/placeholder.svg?height=200&width=300",
    date: "2023-06-11",
  },
];

export default function NewsPage() {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(
    null
  );
  const [sliderIndex, setSliderIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false); // Track hover state
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const handleArticleClick = (article: NewsArticle) => {
    setSelectedArticle(article);
    setSliderIndex(0);
  };

  const handleCloseArticle = () => {
    setSelectedArticle(null);
  };

  const handlePrevSlide = () => {
    setSliderIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : newsArticles.length - 1
    );
  };

  const handleNextSlide = () => {
    setSliderIndex((prevIndex) =>
      prevIndex < newsArticles.length - 1 ? prevIndex + 1 : 0
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
              <CardTitle>{selectedArticle.title}</CardTitle>
              <p className='text-sm text-muted-foreground'>
                {selectedArticle.date}
              </p>
            </CardHeader>
            <CardContent>
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className='w-full h-64 object-cover rounded-md mb-4'
              />
              <p>{selectedArticle.description}</p>
            </CardContent>
          </Card>

          {/* News slider */}
          <div className='relative overflow-hidden h-48 mb-8' ref={sliderRef}>
            <h2 className='text-2xl font-bold mb-4'>More News</h2>
            <div
              className='flex transition-transform duration-500 ease-in-out'
              style={{ transform: `translateX(-${sliderIndex * 33.33}%)` }}>
              {newsArticles.concat(newsArticles).map((article, index) => (
                <div
                  key={`${article.id}-${index}`}
                  className='w-1/3 flex-shrink-0 px-2 cursor-pointer'
                  onClick={() => handleArticleClick(article)}>
                  <Card className='h-full hover:shadow-lg transition-shadow duration-300'>
                    <CardContent className='p-4'>
                      <img
                        src={article.image}
                        alt={article.title}
                        className='w-full h-24 object-cover rounded-md mb-2'
                      />
                      <h3 className='text-sm font-semibold line-clamp-2'>
                        {article.title}
                      </h3>
                      <p className='text-xs text-muted-foreground mt-1'>
                        {article.date}
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
        </>
      ) : (
        /* News list */
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {newsArticles.map((article) => (
            <Card
              key={article.id}
              className='cursor-pointer hover:shadow-lg transition-shadow duration-300'
              onClick={() => handleArticleClick(article)}>
              <CardHeader>
                <CardTitle className='text-lg'>{article.title}</CardTitle>
                <p className='text-sm text-muted-foreground'>{article.date}</p>
              </CardHeader>
              <CardContent>
                <img
                  src={article.image}
                  alt={article.title}
                  className='w-full h-48 object-cover rounded-md'
                />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
