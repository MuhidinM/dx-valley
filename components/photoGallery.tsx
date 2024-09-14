/** @format */

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GalleryItemFetch } from "@/services/gallery";
import { GalleryData } from "@/types/strapi-types";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSwipeable } from "react-swipeable";

type GalleryItem = {
  title: string;
  description: string;
  img: string;
  type: string;
};

type GalleryGridProps = {
  items: GalleryItem[];
  onImageClick: (index: number) => void;
};

export default function PhotoGallery() {
  const [filter, setFilter] = useState<string>("all");
  const [galleryItems, setGalleryItems] = useState<GalleryData[]>([]);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      const data = await GalleryItemFetch();
      setGalleryItems(data);
    };

    fetchGalleryItems();
  }, []);

  const filteredItems =
    filter === "all"
      ? galleryItems
      : galleryItems.filter((item: GalleryItem) => item.type === filter);

  const openModal = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: "next" | "prev") => {
    if (selectedImage === null) return;
    const newIndex =
      direction === "next"
        ? (selectedImage + 1) % filteredItems.length
        : (selectedImage - 1 + filteredItems.length) % filteredItems.length;
    setSelectedImage(newIndex);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => navigateImage("next"),
    onSwipedRight: () => navigateImage("prev"),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className='container mx-auto py-10'>
      <div className='mb-8'>
        <Select onValueChange={setFilter} defaultValue='all'>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Select filter' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All</SelectItem>
            {/* {filteredItems.map((item, index) => (
              <div key={index}>
                <SelectItem value={item.type}>{item.type}</SelectItem>
               
              </div>
            ))} */}
            <SelectItem value='innovation'>Innovation Hub</SelectItem>
            <SelectItem value='incubation'>Incubation Lab</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <GalleryGrid items={filteredItems} onImageClick={openModal} />
      {selectedImage !== null && (
        <div
          className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'
          onClick={closeModal}>
          <div
            className='relative max-w-5xl w-full h-full'
            // onClick={closeModal}
            {...handlers}>
            <Button
              className='absolute top-4 right-4 z-10'
              size='icon'
              // variant='secondary'
              onClick={(e) => {
                // e.stopPropagation();
                closeModal();
              }}>
              <X className='h-4 w-4' />
            </Button>
            <Image
              src={`http://10.1.151.64:1337${filteredItems[selectedImage].img}`}
              alt={filteredItems[selectedImage].title}
              fill
              className='object-contain'
              onClick={(e) => e.stopPropagation()}
            />
            <div className='absolute bottom-4 left-4 right-4 bg-white bg-opacity-75 p-4 text-black'>
              <h3 className='text-lg font-bold mb-2'>
                {filteredItems[selectedImage].title}
              </h3>
              <p>{filteredItems[selectedImage].description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function GalleryGrid({ items, onImageClick }: Readonly<GalleryGridProps>) {
  return (
    <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2'>
      {items.map((item, index) => (
        <Card
          key={index}
          className='overflow-hidden group cursor-pointer'
          onClick={() => onImageClick(index)}>
          <CardContent className='p-0 relative'>
            <AspectRatio ratio={3 / 2}>
              <Image
                src={`http://10.1.151.64:1337${item.img}`}
                alt={item.title}
                fill
                className='object-cover transition-opacity lg:group-hover:opacity-20'
              />
            </AspectRatio>
            <div className='absolute inset-0 flex items-center justify-center opacity-0 lg:group-hover:opacity-100 transition-opacity'>
              <div className='text-center p-4'>
                <h3 className='text-lg font-bold text-gray-900 mb-2'>
                  {item.title}
                </h3>
                <p className='text-md text-gray-900'>{item.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
