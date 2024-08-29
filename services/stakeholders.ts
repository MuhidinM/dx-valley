import { overview } from "@/constants";
import { OrgResponse } from "@/types/strapi-types";
import axios from "axios";

export const StakeHolderItemFetch = async ()=>{
    const res = await axios.get<OrgResponse>('http://10.1.151.64:1337/api/stakeholder?populate=cards.link,cards.img');

    const data = res.data.data;
    const stakeItems = {
        overview: data.attributes.overview,
        cards: data.attributes?.cards?.map(card => ({
            title: card.title,
            description: card.description,
            link: {
                title: card?.link?.title,
                href: card?.link?.href
            },
            img: card.img.data?.attributes.url || ""
        })) || {}
    }
    return stakeItems
}