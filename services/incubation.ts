import { overview } from "@/constants";
import { IncubationResponse } from "@/types/strapi-types";
import axios from "axios";

export const IncubationItemFetch = async ()=>{
    const res = await axios.get<IncubationResponse>('http://10.1.151.64:1337/api/incubation?populate=intro.img,focus.img,offers.img,training.img,incubation_process.img');

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
        training: data.attributes?.focus?.map(elmnt => ({
            title: elmnt.title,
            description: elmnt.description,
            img: elmnt.img.data?.attributes?.url || ""
        })) || [],
        incubation_process: data.attributes?.focus?.map(elmnt => ({
            title: elmnt.title,
            description: elmnt.description,
            img: elmnt.img.data?.attributes?.url || ""
        })) || [],
    }
    console.log("incubation-items: ", incubationItems)
    return incubationItems 
}