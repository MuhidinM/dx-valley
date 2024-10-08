import { InnovationResponse } from "@/types/strapi-types";
import axios from "axios";

export const InnovationItemFetch = async () => {
  const res = await axios.get<InnovationResponse>(
    `${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}/api/innovation?populate=intro.img&populate=companies.img&populate=howeworks.img&populate=gallery.img&populate=gallery.link&populate=connect&populate=proposal`
  );

  const data = res.data.data;
  const innovationItems = {
    intro: {
      title: data.intro.title,
      description: data.intro.description,
      img: data.intro.img?.url || "",
    },
    companies:
      data?.companies?.map((elmnt) => ({
        title: elmnt.title,
        description: elmnt.description,
        img: elmnt.img?.url || "",
      })) || [],
    howeworks:
      data?.howeworks?.map((elmnt) => ({
        title: elmnt.title,
        description: elmnt.description,
        img: elmnt.img?.url || "",
      })) || [],
    gallery:
      data?.gallery?.map((elmnt) => ({
        title: elmnt.title,
        description: elmnt.description,
        img: elmnt.img?.url || "",
        link: {
          title: elmnt?.link?.title || "",
          href: elmnt?.link?.href || "",
        },
      })) || [],
    connect: {
      description: data.connect.description,
      phone: data.connect.phone,
      email: data.connect.email,
      address: data.connect.address,
    },
    proposal: {
      title: data.proposal.title || "",
      description: data.proposal.description || "",
      button_name: data.proposal.button_name || "",
      href: data.proposal.href || "",
    },
  };
  // console.log("innovation-items: ", innovationItems)
  return innovationItems;
};
