/** @format */

"use client";

import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  CalendarIcon,
  ArrowRightIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const videos = [
  {
    id: 1,
    title: "የDx Valley እንቅስቃሴያችን በEBS ሲቃኝ",
    thumbnail: "/placeholder.svg?height=90&width=160",
    youtubeId: "84-4C8X1vio?si=KORabFCho88NFHwo",
  },
  {
    id: 2,
    title: "Our CRM and DxValley 2.0 Inaguration",
    thumbnail: "/placeholder.svg?height=90&width=160",
    youtubeId: "fEgG3F5Ce-c?si=zEy5Sr6QRVdlnfd_",
  },
  {
    id: 3,
    title: "Presentation by Mr. Aman Semir",
    thumbnail: "/placeholder.svg?height=90&width=160",
    youtubeId: "0OIhoVDCoX0?si=wQ5p2-h1-lMRzn7d",
  },
  // {
  //   id: 4,
  //   title: "Another Video",
  //   thumbnail: "/placeholder.svg?height=90&width=160",
  //   youtubeId: "J---aiyznGQ",
  // },
];

const news = [
  {
    id: 1,
    title:
      "New Guarantee Helps Coop Unlock Billions in Collateral-Free Loans for MSMEs",
    date: "2023-07-15",
    description: "SuoqPass secured loan from masterCard.",
    image: "/placeholder.svg?height=120&width=200",
    link: "https://shega.co/post/coop-secures-570-million-br-guarantee-to-expand-collateral-free-lending/",
  },
  {
    id: 2,
    title: "DxValley 2.0 and CRM Inaguraion",
    date: "2023-07-14",
    description:
      "GPT-4 demonstrates unprecedented language understanding and generation capabilities.",
    image: "/placeholder.svg?height=60&width=100",
    link: "/news/ai-model-surpasses-humans",
  },
  {
    id: 3,
    title: "The Launch of Michu 2.0",
    date: "2023-07-13",
    description:
      "Solar and wind power now account for over 50% of global energy production.",
    image: "/placeholder.svg?height=60&width=100",
    link: "/news/renewable-energy-milestone",
  },
];

const events = [
  {
    id: 1,
    title: "Annual Tech Innovation Summit",
    date: "2023-08-15",
    link: "/events/tech-innovation-summit",
  },
  {
    id: 2,
    title: "AI Ethics Workshop",
    date: "2023-08-22",
    link: "/events/ai-ethics-workshop",
  },
  {
    id: 3,
    title: "Startup Pitch Competition",
    date: "2023-08-30",
    link: "/events/startup-pitch-competition",
  },
];

export default function MediaAndNews() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) {
      const interval = setInterval(() => {
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const nextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentVideoIndex(
      (prevIndex) => (prevIndex - 1 + videos.length) % videos.length
    );
  };

  const selectVideo = (index: number) => {
    setCurrentVideoIndex(index);
    setIsPlaying(true);
  };

  return (
    <div className='relative right-0 w-full sm:w-96 shadow-lg  space-y-4'>
      <Card className='border-none shadow-none'>
        <CardHeader className='pb-2'>
          <CardTitle className='text-lg   '>Popular News</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4 pt-0'>
          {news.map((item, index) => (
            <div key={item.id} className={index === 0 ? "mb-4" : "mb-2"}>
              <Link href={item.link} className='group'>
                <div className='flex items-start space-x-2 '>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`object-cover rounded-sm ${
                      index === 0 ? "w-20 h-20" : "w-12 h-12"
                    }`}
                  />
                  <div>
                    <h3
                      className={`font-semibold group-hover:text-primary hover:underline transition-colors  ${
                        index === 0 ? "text-sm " : "text-xs"
                      }`}>
                      {item.title}
                    </h3>
                    <p className='text-xs text-muted-foreground'>{item.date}</p>
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

      <Card className='border-none shadow-none'>
        <CardHeader className='pb-2'>
          <CardTitle className='text-lg     '>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent className='space-y-2 pt-0'>
          {events.map((event) => (
            <div key={event.id} className='text-sm'>
              <h3 className='font-medium'>{event.title}</h3>
              <div className='flex justify-between items-center text-sm'>
                <p className='text-muted-foreground flex items-center'>
                  <CalendarIcon className='mr-1 h-3 w-3' />
                  {event.date}
                </p>
                <Link
                  href={event.link}
                  className='text-primary text-sm font-semibold hover:underline  text-md'>
                  Register
                </Link>
              </div>
            </div>
          ))}
          <Link
            href='/events'
            className='text-sm font-semibold text-primary hover:underline flex items-center'>
            View All Events
            <ArrowRightIcon className='ml-1 h-3 w-3' />
          </Link>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className='text-lg flex items-center   '>
            <Play className='w-5 h-5 mr-2' />
            Top Videos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='aspect-video mb-4'>
            <iframe
              width='100%'
              height='100%'
              src={`https://www.youtube.com/embed/${
                videos[currentVideoIndex].youtubeId
              }${isPlaying ? "?autoplay=1" : ""}`}
              title={videos[currentVideoIndex].title}
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen></iframe>
          </div>
          <p className='text-sx font-medium text-muted-foreground mb-2'>
            {videos[currentVideoIndex].title}
          </p>
          <div className='flex space-x-2 mb-2'>
            {videos.map((video, index) => (
              <button
                key={video.id}
                onClick={() => selectVideo(index)}
                className='flex-shrink-0 w-1/4 focus:outline-none focus:ring-2 focus:ring-primary'>
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className={`w-full h-[45px] object-cover ${
                    index === currentVideoIndex ? "border-2 border-primary" : ""
                  }`}
                />
              </button>
            ))}
          </div>
          <div className='flex justify-between'>
            <Button
              variant='outline'
              size='sm'
              onClick={prevVideo}
              aria-label='Previous video'>
              <ChevronLeft className='h-4 w-4 mr-1' /> Prev
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={nextVideo}
              aria-label='Next video'>
              Next <ChevronRight className='h-4 w-4 ml-1' />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
