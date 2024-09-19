/** @format */

"use client";
import { HomepageItemFetch } from "@/services/homepage";
import AllNewsPage from "@/components/viewAllNews";
import { HomePageData } from "@/types/strapi-types";
import { useEffect, useState } from "react";

const Page = () => {
  const [homepageItems, setHomepageItems] = useState<HomePageData | null>(null);

  useEffect(() => {
    const fetchHomepageItems = async () => {
      const data = await HomepageItemFetch();
      setHomepageItems(data);
    };

    fetchHomepageItems();
  }, []);
  // console.log("news article news homepage page", homepageItems?.news);
  return (
    <div>
      {" "}
      <AllNewsPage newsArticles={homepageItems?.news || []} />{" "}
    </div>
  );
};

export default Page;
