/** @format */

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Call for StartUp proposal - DX-Valley",
  description: "Apply for a start up call .",
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
