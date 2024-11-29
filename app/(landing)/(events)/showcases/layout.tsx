/** @format */

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Showcase ",
  description: "StartUp works",
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
