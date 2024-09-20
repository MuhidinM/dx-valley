import { FooterItems } from "@/types/strapi-types";
import axios from "axios";

export const FooterItemFetch = async () => {
  const res = await axios.get<FooterItems>(
    `${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}/api/footer?populate[divisions]=*&populate[collaboration]=*&populate[events]=*&populate[otherlinks]=*&populate[logo_white]=*&populate[logo_black]=*`
  );

  const data = res.data.data;

  const footerItems = {
    title: data?.title,
    description: data?.description,
    divisions:
      data?.divisions?.map((link) => ({
        link: link?.link || "",
        href: link?.href || "",
      })) || [],
    collaboration:
      data?.collaboration?.map((link) => ({
        link: link?.link || "",
        href: link?.href || "",
      })) || [],
    events:
      data?.events?.map((link) => ({
        link: link?.link || "",
        href: link?.href || "",
      })) || [],
    otherlinks:
      data?.otherlinks?.map((link) => ({
        link: link?.link || "",
        href: link?.href || "",
      })) || [],
    logo_black: {
      small: data?.logo_black?.formats?.small.url || "",
      medium: data?.logo_black?.formats?.medium.url || "",
      large: data?.logo_black?.formats?.large.url || "",
    },
    logo_white: {
      small: data?.logo_white?.formats?.small.url || "",
      medium: data?.logo_white?.formats?.medium.url || "",
      large: data?.logo_white?.formats?.large.url || "",
    },
  };
  return footerItems;
};
