/** @format */

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
  description: "Register for an Event",
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
