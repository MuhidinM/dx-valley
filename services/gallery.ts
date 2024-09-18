import { GalleryResponse } from "@/types/strapi-types";
import axios from "axios";

export const GalleryItemFetch = async ()=>{
    const res = await axios.get<GalleryResponse>(`${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}/api/galleries?populate=gallery.img`);
    
    const data = res.data;   
    const galleryItems = data.data.map(item => ({
        type: item.attributes.type || "",
        title: item.attributes.gallery.title,
        description: item.attributes.gallery.description,
        img: item.attributes.gallery.img.data?.attributes.url || ""
    }))
    
    return galleryItems
}