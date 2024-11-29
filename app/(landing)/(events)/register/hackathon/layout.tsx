/** @format */

import { Metadata } from "next";

export const metadata: Metadata = {
  title: " Hackathone ",
  description: "Register to be part of hackathone",
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
