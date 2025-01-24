/** @format */

import { Metadata } from "next";

export const metadata: Metadata = {
  title: " Hackathon",
  description: "Register to be part of hackathon",
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
