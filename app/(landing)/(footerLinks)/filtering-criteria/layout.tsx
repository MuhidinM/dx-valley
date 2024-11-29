/** @format */

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Filtering Criterias",
  description: "Startup and Internship filtering criteria",
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
