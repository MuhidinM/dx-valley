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
    <div className='min-h-screen bg-gray-50 text-black dark:bg-gray-900 dark:text-white'>
      <main className='container mx-auto px-4 py-8'>{children}</main>
    </div>
  );
}