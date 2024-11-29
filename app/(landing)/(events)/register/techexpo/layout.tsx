/** @format */

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Appy for TechExpo Event",
  description: "Take Part in a TechExpo Event",
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
