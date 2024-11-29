/** @format */

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Innovation Center - DX-Valley",
  description: "Learn more about our Innovation center.",
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
