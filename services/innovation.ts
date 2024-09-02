import { overview } from "@/constants";
import { InnovationResponse } from "@/types/strapi-types";
import axios from "axios";

export const InnovationItemFetch = async ()=>{
    const res = await axios.get<InnovationResponse>('http://10.1.151.64:1337/api/innovation?populate=intro.img,companies.img,howeworks.img,gallery.img,connect');

    const data = res.data.data;
    const innovationItems = {
        intro: {
            title: data.attributes.intro.title,
            description: data.attributes.intro.description,
            img: data.attributes.intro.img.data?.attributes?.url || ""
        },
        companies: data.attributes?.companies?.map(elmnt => ({
            title: elmnt.title,
            description: elmnt.description,
            img: elmnt.img.data?.attributes?.url || ""
        })) || [],
        howeworks: data.attributes?.howeworks?.map(elmnt => ({
            title: elmnt.title,
            description: elmnt.description,
            img: elmnt.img.data?.attributes?.url || ""
        })) || [],
        gallery: data.attributes?.gallery?.map(elmnt => ({
            title: elmnt.title,
            description: elmnt.description,
            img: elmnt.img.data?.attributes?.url || ""
        })) || [],
        connect: {
            description: data.attributes.connect.description,
            phone: data.attributes.connect.phone,
            email: data.attributes.connect.email,
            address: data.attributes.connect.address,
        },
    }
    // console.log("innovation-items: ", innovationItems)
    return innovationItems 
}