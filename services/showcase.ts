import { overview } from "@/constants";
import { ShowCaseResponse } from "@/types/strapi-types";
import axios from "axios";

export const ShowCaseItemFetch = async ()=>{
    const res = await axios.get<ShowCaseResponse>(`${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}/api/incubateds?populate=incubated.link,incubated.img_1,incubated.img_2,incubated.founders,incubated.investors`);

    const data = res.data.data;
    const showCaseItems = data[0].attributes.incubated.map(item => ({ 
        projectName: item.projectName,
        small_description: item.small_description,
        long_description: item.long_description,
        launched: item.launched,
        published: item.published,
        link: {
            href: item.link?.href || '',
            title: item.link?.title || '',
        },
        investors: item.investors.map(investor => ({
            name: investor.name
        })) || {},
        founders: item.founders.map(investor => ({
            name: investor.name
        })) || {},
        img_1: item.img_1.data?.attributes.url || "",
        img_2: item.img_2.data?.attributes.url || ""
        
    }));
    //console.log("showCaseItems: ", showCaseItems)
    return showCaseItems
}