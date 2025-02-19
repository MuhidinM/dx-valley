/** @format */

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects By Innovation Hub",
  description: "Explore what DxValley Delivered",
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
