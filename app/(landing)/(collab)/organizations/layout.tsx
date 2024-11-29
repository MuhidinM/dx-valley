/** @format */

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collaborate with Organization",
  description: "Apply to collaborate.",
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
