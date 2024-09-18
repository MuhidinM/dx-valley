import { overview } from "@/constants";
import { IncubationResponse } from "@/types/strapi-types";
import axios from "axios";

export const IncubationItemFetch = async ()=>{
    const res = await axios.get<IncubationResponse>(`${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}/api/incubation?populate=intro.img,focus.img,offers.img,training.img,incubation_process.img,proposal`);

    const data = res.data.data;
    const incubationItems = {
        intro: {
            title: data.attributes.intro.title,
            description: data.attributes.intro.description,
            img: data.attributes.intro.img.data?.attributes?.url || ""
        },
        focus: data.attributes?.focus?.map(elmnt => ({
            title: elmnt.title,
            description: elmnt.description,
            img: elmnt.img.data?.attributes?.url || ""
        })) || [],
        offers: data.attributes?.offers?.map(elmnt => ({
            title: elmnt.title,
            description: elmnt.description,
            img: elmnt.img.data?.attributes?.url || ""
        })) || [],
        training: data.attributes?.training?.map(elmnt => ({
            title: elmnt.title,
            description: elmnt.description,
            img: elmnt.img.data?.attributes?.url || ""
        })) || [],
        incubation_process: data.attributes?.incubation_process?.map(elmnt => ({
            title: elmnt.title,
            description: elmnt.description,
            img: elmnt.img.data?.attributes?.url || ""
        })) || [],
        proposal: {
            title: data.attributes.proposal.title || "",
            description: data.attributes.proposal.description || "",
            button_name: data.attributes.proposal.button_name || "",
            href: data.attributes.proposal.href || ""
        }
    }
    // console.log("incubation-items: ", incubationItems)
    return incubationItems 
}