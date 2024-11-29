/** @format */

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description: "Explore Dx-Valley",
};

export default function IncubationCenterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
