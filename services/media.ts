import { overview } from "@/constants";
import { OrgResponse } from "@/types/strapi-types";
import axios from "axios";

export const MediaItemFetch = async () => {
  const res = await axios.get<OrgResponse>(
    `${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}/api/media?populate=cards.link,cards.img,proposal`
  );

  const data = res.data.data;
  const mediaItems = {
    overview: data.overview,
    cards:
      data?.cards?.map((card) => ({
        title: card.title,
        description: card.description,
        link: {
          title: card?.link?.title,
          href: card?.link?.href,
        },
        img: card.img.data?.url || "",
      })) || {},
    proposal: {
      title: data.proposal.title || "",
      description: data.proposal.description || "",
      button_name: data.proposal.button_name || "",
      href: data.proposal.href || "",
    },
  };
  return mediaItems;
};
