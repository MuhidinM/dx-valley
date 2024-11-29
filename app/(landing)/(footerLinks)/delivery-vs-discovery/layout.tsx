/** @format */

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delivery vs Discovery",
  description: "Know which one you are ",
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
