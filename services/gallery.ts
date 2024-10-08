import { GalleryResponse } from "@/types/strapi-types";
import axios from "axios";

export const GalleryItemFetch = async () => {
  const res = await axios.get<GalleryResponse>(
    `${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}/api/galleries?populate=gallery.img`
  );

  const data = res.data;
  const galleryItems = data.data.map((item) => ({
    type: item.type || "",
    title: item.gallery.title,
    description: item.gallery.description,
    img: item.gallery.img?.url || "",
  }));
  console.log(galleryItems);
  return galleryItems;
};
