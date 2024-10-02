/** @format */

"use client";

import { CardComponent } from "@/components/section";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { InnovationItemFetch } from "@/services/innovation";
import { InnovationData } from "@/types/strapi-types";
import { SkeletonLoaderAboutInnovationPage } from "@/components/SkeletonLoader";

const Page = () => {
  const [innovationItems, setInnovationItems] = useState<InnovationData | null>(
    null
  );

  useEffect(() => {
    const fetchInnovationItems = async () => {
      const data = await InnovationItemFetch();
      setInnovationItems(data);
    };

    fetchInnovationItems();
  }, []);

  if (!innovationItems) {
    return <SkeletonLoaderAboutInnovationPage />;
  }

  return (
    <div className="mt-5 lg:my-0 md:my-0 mx-3">
      <Card className="contest-title">
        <CardHeader>
          <CardTitle>Projects</CardTitle>
        </CardHeader>
      </Card>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-6  my-14">
        {innovationItems?.gallery.map((item, indx) => {
          return (
            <CardComponent
              key={indx}
              svg={
                <img
                  src={`${process.env.NEXT_PUBLIC_STRAPI_IP_DEV}${
                    item?.img ?? " "
                  }`}
                  alt="Image Left Not Found"
                  className="h-24"
                />
              }
              title={item.title}
              buttonText={item.link.title}
              description={item.description}
              href={item.link.href}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Page;
