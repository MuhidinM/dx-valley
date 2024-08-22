import { FooterItems } from "@/types/strapi-types";
import axios from "axios";

export const FooterItemFetch = async ()=>{
    const res = await axios.get<FooterItems>('http://10.1.151.64:1337/api/footer?populate=divisions,collaboration,events,otherlinks,logo_white,logo_black');

    const data = res.data.data;

    const footerItems = {
        title: data.attributes?.title,
        description: data.attributes?.description,
        divisions: data.attributes?.divisions?.map(link => ({
            link: link?.link || '',
            href: link?.href || '',
        })) || [],
        collaboration: data.attributes?.collaboration?.map(link => ({
            link: link?.link || '',
            href: link?.href || '',
        })) || [],
        events: data.attributes?.events?.map(link => ({
            link: link?.link || '',
            href: link?.href || '',
        })) || [],
        otherlinks: data.attributes?.otherlinks?.map(link => ({
            link: link?.link || '',
            href: link?.href || '',
        })) || [],
        logo_black: {
            small: data.attributes?.logo_black.data?.attributes.formats.small.url || "",
            medium: data.attributes?.logo_black.data?.attributes.formats.medium.url || "",
            large: data.attributes?.logo_black.data?.attributes.formats.large.url || ""
        },
        logo_white: {
            small: data.attributes?.logo_white.data?.attributes.formats.small.url || "",
            medium: data.attributes?.logo_white.data?.attributes.formats.medium.url || "",
            large: data.attributes?.logo_white.data?.attributes.formats.large.url || ""
        },
    }
    return footerItems
  }