/** @format */

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Incubation Center - DXValley",
  description: "Learn more about our incubation center.",
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
