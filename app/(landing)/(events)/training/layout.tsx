/** @format */

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trainign Areas",
  description: "What trainings do we offer ",
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
