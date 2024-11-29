/** @format */

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Internship application form",
  description: "Apply for internship at DxValley internship",
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
