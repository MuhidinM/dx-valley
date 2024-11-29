/** @format */

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "News",
  description: "What's Happening at Dx-Valley",
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
