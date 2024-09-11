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
import { Videos } from "@/types/strapi-types";


export default function VideosList({
  video}: {
  video: Videos[];
}) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videos = video.map((elmnt, indx) => ({
    id: indx,
    title: elmnt.title,
    thumbnail: elmnt.thumbnail_link,
    youtubeId: elmnt.youtubeId,
  }));

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
    <div className=' right-0 w-full sm:w-90 space-y-2'>
      <Card className='border-none shadow-none'>
        <CardHeader>
          <CardTitle className='text-lg flex items-center   '>
            <Play className='w-5 h-5 mr-2' />
            Top Videos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='aspect-video mb-4 line-clamp-1'>
            <iframe
              width='100%'
              height='100%'
              src={`https://www.youtube.com/embed/${
                videos[currentVideoIndex]?.youtubeId || ""
              }${isPlaying ? "?autoplay=1" : ""}`}
              title={videos[currentVideoIndex]?.title ?? ""}
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen></iframe>
          </div>
          <p className='text-sx font-sx text-muted-foreground mb-2 line-clamp-1'>
            {videos[currentVideoIndex]?.title ?? ""}
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
                  className={`w-full h-[45px] object-cover  dark:bg-gray-400 ${
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
