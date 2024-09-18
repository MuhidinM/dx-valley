import { overview } from "@/constants";
import { OrgResponse } from "@/types/strapi-types";
import axios from "axios";
import { title } from "process";

export const OrgItemFetch = async ()=>{
    const res = await axios.get<OrgResponse>(`${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}/api/organization?populate=cards.img,proposal`);

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

        })) || {}
    }
    return orgItems
}