import { MenuItemApiResponse } from "@/types/strapi-types";
import axios from "axios";

export const menuItemFetch = async ()=>{
    const res = await axios.get<MenuItemApiResponse>('http://10.1.151.64:1337/api/menu-items?populate[0]=highlight.img&populate[1]=highlight.links');

    const data = res.data;
    const menuItems = data.data.map(item => ({
        trigger: item.attributes?.trigger,
        highlight: {
            href: item.attributes.highlight?.href || '',
            title: item.attributes.highlight?.title || '',
            description: item.attributes.highlight?.description,
            img: item.attributes.highlight.img.data?.attributes.formats.medium.url || '',
        },
        links: item.attributes?.highlight?.links?.map(link => ({
            href: link?.href || '',
            title: link?.title || '',
            description: link?.description || '',
        })) || []
    }));
    return menuItems
  }