import { TrainingResponse } from "@/types/strapi-types";
import axios from "axios";

export const TrainingItemFetch = async ()=>{
    const res = await axios.get<TrainingResponse>('http://10.1.151.64:1337/api/training?populate=cards.img,cards.link,proposal');

    const data = res.data.data;
    const trainingItems = {
        cards: data.attributes?.cards?.map(card => ({
            title: card.title,
            description: card.description,
            link: {
                title: card.link.title,
                href: card.link.href
            },
            img: card.img.data?.attributes.url || ""
            
        })) || [],
        proposal: {
            title: data.attributes.proposal.title || "",
            description: data.attributes.proposal.description || "",
            button_name: data.attributes.proposal.button_name || "",
            href: data.attributes.proposal.href || ""
        }
    }

    return trainingItems
}