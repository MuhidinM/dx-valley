import { overview } from "@/constants";
import { IncubationResponse } from "@/types/strapi-types";
import axios from "axios";

export const IncubationItemFetch = async ()=>{
    const res = await axios.get<IncubationResponse>(`${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}/api/incubation?populate=intro.img,focus.img,offers.img,training.img,incubation_process.img,proposal`);

    const data = res.data.data;
    const incubationItems = {
        intro: {
            title: data.intro.title,
            description: data.intro.description,
            img: data.intro.img.data??.url || ""
        },
        focus: data?.focus?.map(elmnt => ({
            title: elmnt.title,
            description: elmnt.description,
            img: elmnt.img.data??.url || ""
        })) || [],
        offers: data?.offers?.map(elmnt => ({
            title: elmnt.title,
            description: elmnt.description,
            img: elmnt.img.data??.url || ""
        })) || [],
        training: data?.training?.map(elmnt => ({
            title: elmnt.title,
            description: elmnt.description,
            img: elmnt.img.data??.url || ""
        })) || [],
        incubation_process: data?.incubation_process?.map(elmnt => ({
            title: elmnt.title,
            description: elmnt.description,
            img: elmnt.img.data??.url || ""
        })) || [],
        proposal: {
            title: data.proposal.title || "",
            description: data.proposal.description || "",
            button_name: data.proposal.button_name || "",
            href: data.proposal.href || ""
        }
    }
    // console.log("incubation-items: ", incubationItems)
    return incubationItems 
}