/** @format */

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply for Incubation - DX-Valley",
  description: "Apply for a start up call.",
};

export default function IncubationCenterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div >
      <main>{children}</main>
    </div>
  );
}
