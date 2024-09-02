import { HomePageResponse } from "@/types/strapi-types";
import axios from "axios";

export const HomepageItemFetch = async ()=>{
    const res = await axios.get<HomePageResponse>('http://10.1.151.64:1337/api/homepage?populate=slider.img,slider.link,stats.img,delivered.img,delivered.link,update.img,update.events,connect,vision,videos,news');
    
    const data = res.data.data;
    const homepageItems = {
        motto_title: data.attributes.motto_title,
        slider: data.attributes?.slider?.map(elmnt => ({
            title: elmnt.title,
            description: elmnt.description,
            link: {
                title: elmnt.link?.title,
                href: elmnt.link?.href
            },
            img: elmnt.img.data?.attributes.url || ""
        })) || [],
        stats: data.attributes?.stats?.map(elmnt => ({
            title: elmnt.title,
            description: elmnt.description,
            img: elmnt.img.data?.attributes.url || ""
        })) || [],
        delivered: data.attributes?.delivered?.map(elmnt => ({
            title: elmnt.title,
            description: elmnt.description,
            link: {
                title: elmnt?.link?.title,
                href: elmnt?.link?.href
            },
            img: elmnt.img.data?.attributes.url || ""
        })) || [],
        update: data.attributes?.update?.map(elmnt => ({
            title: elmnt.title,
            description: elmnt.description,
            link: elmnt.link || "",
            img: elmnt.img.data?.attributes.url || "",
            events: elmnt.events?.map(elmnt => ({
                title: elmnt.title,
                date: elmnt.date,
                link: elmnt.link || "",
            })) || []
        })) || [],
        videos: data.attributes?.videos?.map(elmnt => ({
            title: elmnt.title,
            youtubeId: elmnt.youtubeId,
            thumbnail_link: elmnt.thumbnail_link || ""
        })) || [],
        news: data.attributes?.news?.map(elmnt => ({
            title: elmnt.title,
            description: elmnt.description,
            img_link: elmnt.img_link || "",
            news_link: elmnt.news_link,
            date: elmnt.date
        })) || [],
        vision: {
            title: data.attributes.vision.title,
            description: data.attributes.vision.description,
        },
        connect: {
            description: data.attributes.connect.description,
            phone: data.attributes.connect.phone,
            email: data.attributes.connect.email,
            address: data.attributes.connect.address,
        },
    }
    // console.log("homepage-items: ", homepageItems)
    return homepageItems
}