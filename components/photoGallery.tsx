"use client"

import Image from "next/image";
import Link from "next/link";
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

type GalleryItem = {
  title: string;
  description: string;
  img: string;
  type: string;
};

export default function PhotoGallery() {
  const [filter, setFilter] = useState<string>("all");
  const [galleryItems, setGalleryItems] = useState<GalleryData[]>([]);

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

  return (
    <div className='container mx-auto py-10'>
      <div className='mb-8'>
        <Select onValueChange={setFilter} defaultValue='all'>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Select filter' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All</SelectItem>
            <SelectItem value='innovation'>Innovation Hub</SelectItem>
            <SelectItem value='incubation'>Incubation</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <GalleryGrid items={filteredItems} />
    </div>
  );
}

type GalleryGridProps = {
  items: GalleryItem[];
};

function GalleryGrid({ items }: Readonly<GalleryGridProps>) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {items.map((item, indx) => (
        <Card key={indx} className='overflow-hidden group'>

          <CardContent className='p-0 relative'>
            <AspectRatio ratio={3 / 2}>
              <Image
                src={`http://10.1.151.64:1337${item.img}`}
                alt={item.title}
                fill
                className='object-cover transition-opacity group-hover:opacity-20'
              />
            </AspectRatio>
            <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
              <div className='text-center p-4'>
                <h3 className='text-lg font-bold text-gray-900 mb-2'>
                  {item.title}
                </h3>
                <p className='text-md  text-gray-900'>{item.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
