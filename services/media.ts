import { overview } from "@/constants";
import { OrgResponse } from "@/types/strapi-types";
import axios from "axios";

export const MediaItemFetch = async ()=>{
    const res = await axios.get<OrgResponse>('http://10.1.151.64:1337/api/media?populate=cards.link,cards.img');

    const data = res.data.data;
    const mediaItems = {
        overview: data.attributes.overview,
        cards: data.attributes?.cards?.map(card => ({
            title: card.title,
            description: card.description,
            link: {
                title: card?.link?.title,
                href: card?.link?.href
            },
            img: {
                small: card.img.data?.attributes.formats.small.url || "",
                medium: card.img.data?.attributes.formats.medium.url || "",
                large: card.img.data?.attributes.formats.large.url || ""
            }
        })) || {}
    }
    return mediaItems
}