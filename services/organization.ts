import { overview } from "@/constants";
import { OrgResponse } from "@/types/strapi-types";
import axios from "axios";
import { title } from "process";

export const OrgItemFetch = async ()=>{
    const res = await axios.get<OrgResponse>('http://10.1.151.64:1337/api/organization?populate=cards.img,proposal');

    const data = res.data.data;
    // console.log("org-data: ", data)
    const orgItems = {
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
    return orgItems
}