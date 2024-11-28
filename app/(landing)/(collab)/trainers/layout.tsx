/** @format */

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collaborate with Trainers",
  description: "Apply to collaborate.",
};

export default function IncubationCenterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-screen bg-gray-50 text-black dark:bg-gray-900 dark:text-white'>
      <main>{children}</main>
    </div>
  );
}
