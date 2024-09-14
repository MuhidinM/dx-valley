import { HomePageResponse } from "@/types/strapi-types";
import axios from "axios";

export const HomepageItemFetch = async ()=>{
    const res = await axios.get<HomePageResponse>('http://10.1.151.64:1337/api/homepage?populate=slider.img,slider.link,stats.img,delivered.img,delivered.link,update.img,update.events,connect,vision,videos,news,proposal,joinus.buttons');
    
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
        proposal: {
            title: data.attributes.proposal.title || "",
            description: data.attributes.proposal.description || "",
            button_name: data.attributes.proposal.button_name || "",
            href: data.attributes.proposal.href || ""
        },
        joinus: {
            text_1: data.attributes.joinus.text_1 || "",
            text_2: data.attributes.joinus.text_2 || "",
            text_3: data.attributes.joinus.text_3 || "",
            buttons: data.attributes?.joinus.buttons?.map(elmnt => ({
                title: elmnt.title,
                href: elmnt.href,
                background_is_orange: elmnt.background_is_orange,
            })) || []
        }
    }
    // console.log("homepage-items: ", homepageItems)
    return homepageItems
}