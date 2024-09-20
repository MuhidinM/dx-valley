import { TrainingResponse } from "@/types/strapi-types";
import axios from "axios";

export const TrainingItemFetch = async () => {
  const res = await axios.get<TrainingResponse>(
    `${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}/api/training?populate=cards.img,cards.link,proposal`
  );

  const data = res.data.data;
  const trainingItems = {
    cards:
      data?.cards?.map((card) => ({
        title: card.title,
        description: card.description,
        link: {
          title: card.link.title,
          href: card.link.href,
        },
        img: card.img.data?.url || "",
      })) || [],
    proposal: {
      title: data.proposal.title || "",
      description: data.proposal.description || "",
      button_name: data.proposal.button_name || "",
      href: data.proposal.href || "",
    },
  };

  return trainingItems;
};
