import { overview } from "@/constants";
import { OrgResponse } from "@/types/strapi-types";
import axios from "axios";
import { title } from "process";

export const OrgItemFetch = async () => {
  const res = await axios.get<OrgResponse>(
    `${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}/api/organization?populate=cards.img&populate=proposal`
  );

  const data = res.data.data;
  // console.log("org-data: ", data)
  const orgItems = {
    overview: data.overview,
    cards:
      data?.cards?.map((card) => ({
        title: card.title,
        description: card.description,
        link: {
          title: card?.link?.title,
          href: card?.link?.href,
        },
        img: card.img?.url || "",
      })) || {},
    proposal: {
      title: data.proposal.title || "",
      description: data.proposal.description || "",
      button_name: data.proposal.button_name || "",
      href: data.proposal.href || "",
    },
  };
  return orgItems;
};
