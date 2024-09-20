import { HomePageResponse } from "@/types/strapi-types";
import axios from "axios";

export const HomepageItemFetch = async () => {
  const res = await axios.get<HomePageResponse>(
    `${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}/api/homepage?populate=slider.img&populate=slider.link&populate=stats.img&populate=delivered.img&populate=delivered.link&populate=update.img&populate=update.events&populate=connect&populate=vision&populate=videos&populate=news&populate=proposal&populate=joinus.buttons`
  );

  const data = res.data.data;
  const homepageItems = {
    motto_title: data.motto_title,
    slider:
      data?.slider?.map((elmnt) => ({
        title: elmnt.title,
        description: elmnt.description,
        link: {
          title: elmnt.link?.title,
          href: elmnt.link?.href,
        },
        img: elmnt.img?.url || "",
      })) || [],
    stats:
      data?.stats?.map((elmnt) => ({
        title: elmnt.title,
        description: elmnt.description,
        img: elmnt.img?.url || "",
      })) || [],
    delivered:
      data?.delivered?.map((elmnt) => ({
        title: elmnt.title,
        description: elmnt.description,
        link: {
          title: elmnt?.link?.title,
          href: elmnt?.link?.href,
        },
        img: elmnt.img?.url || "",
      })) || [],
    update:
      data?.update?.map((elmnt) => ({
        title: elmnt.title,
        description: elmnt.description,
        link: elmnt.link || "",
        img: elmnt.img?.url || "",
        events:
          elmnt.events?.map((elmnt) => ({
            title: elmnt.title,
            date: elmnt.date,
            link: elmnt.link || "",
          })) || [],
      })) || [],
    videos:
      data?.videos?.map((elmnt) => ({
        title: elmnt.title,
        youtubeId: elmnt.youtubeId,
        thumbnail_link: elmnt.thumbnail_link || "",
      })) || [],
    news:
      data?.news?.map((elmnt) => ({
        title: elmnt.title,
        description: elmnt.description,
        img_link: elmnt.img_link || "",
        news_link: elmnt.news_link,
        date: elmnt.date,
      })) || [],
    vision: {
      title: data.vision.title,
      description: data.vision.description,
    },
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
    joinus: {
      text_1: data.joinus.text_1 || "",
      text_2: data.joinus.text_2 || "",
      text_3: data.joinus.text_3 || "",
      buttons:
        data?.joinus.buttons?.map((elmnt) => ({
          title: elmnt.title,
          href: elmnt.href,
          background_is_orange: elmnt.background_is_orange,
        })) || [],
    },
  };
  console.log("homepage-items: ", homepageItems);
  return homepageItems;
};
