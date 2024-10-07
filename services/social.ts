
import { SocialResponse } from "@/types/strapi-types";
import axios from "axios";

export const SocialItemFetch = async () => {
  const res = await axios.get<SocialResponse>(
    `${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}/api/socials?populate=socials`
  );
  const data = res.data.data;
  
  const socialItems = data[0].socials.map((item) => ({
    media: item.media,
    url: item.url,
    is_visible: item.is_visible,
  }));

  return socialItems;
};
