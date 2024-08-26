import { CardResponse } from "@/types/strapi-types";
import { Description } from "@radix-ui/react-dialog";
import axios from "axios";
import { link } from "fs";

export const TrainingItemFetch = async ()=>{
    const res = await axios.get<CardResponse>('http://10.1.151.64:1337/api/training?populate=cards.img,cards.link');

    const data = res.data.data;
    const trainingItems = data.attributes?.cards?.map(card => ({
        title: card.title,
        description: card.description,
        link: {
            title: card.link.title,
            href: card.link.href
        },
        img: {
            small: card.img.data?.attributes.formats.small.url || "",
            medium: card.img.data?.attributes.formats.medium.url || "",
            large: card.img.data?.attributes.formats.large.url || ""
        }
        
    })) || []

    return trainingItems
}