import { MenuItemApiResponse } from "@/types/strapi-types";
import axios from "axios";

export const MenuItemFetch = async ()=>{
    const res = await axios.get<MenuItemApiResponse>(`${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}/api/menu-items?populate[0]=highlight.img&populate[1]=highlight.links`);

    const data = res.data;
    const menuItems = data.data.map(item => ({
        trigger: item.trigger,
        highlight: {
            href: item.highlight?.href || '',
            title: item.highlight?.title || '',
            description: item.highlight?.description,
            img: item.highlight.img.formats.medium.url || '',
        },
        links: item.highlight?.links?.map(link => ({
            href: link?.href || '',
            title: link?.title || '',
            description: link?.description || '',
        })) || []
    }));
    return menuItems
  }