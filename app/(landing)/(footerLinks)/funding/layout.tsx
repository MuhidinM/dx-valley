/** @format */

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fundings",
  description: "Fundings for Dx-Valley incubations",
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
