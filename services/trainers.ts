import { overview } from "@/constants";
import { OrgResponse } from "@/types/strapi-types";
import axios from "axios";

export const TrainerItemFetch = async ()=>{
    const res = await axios.get<OrgResponse>(`${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}/api/trainer?populate=cards.link,cards.img,proposal`);

    const data = res.data.data;
    const trainerItems = {
        overview: data.attributes.overview,
        cards: data.attributes?.cards?.map(card => ({
            title: card.title,
            description: card.description,
            link: {
                title: card?.link?.title,
                href: card?.link?.href
            },
            img: card.img.data?.attributes.url || ""
        })) || {},
        proposal: {
            title: data.attributes.proposal.title || "",
            description: data.attributes.proposal.description || "",
            button_name: data.attributes.proposal.button_name || "",
            href: data.attributes.proposal.href || ""
        }

    }
    return trainerItems
}