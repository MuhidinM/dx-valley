/** @format */

"use client";

import {
  CalendarIcon,
  ArrowRightIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { News, Videos } from "@/types/strapi-types";

// const videos = [
//   {
//     id: 1,
//     title: "የDx Valley እንቅስቃሴያችን በEBS ሲቃኝ",
//     thumbnail:
//       "https://shega.co/wp-content/uploads/2020/09/Shega-logo-22-e1601232255639.png",
//     youtubeId: "84-4C8X1vio?si=KORabFCho88NFHwo",
//   },
//   {
//     id: 2,
//     title: "Our CRM and DxValley 2.0 Inaguration",
//     thumbnail:
//       "https://shega.co/wp-content/uploads/2020/09/Shega-logo-22-e1601232255639.png",
//     youtubeId: "fEgG3F5Ce-c?si=zEy5Sr6QRVdlnfd_",
//   },
//   {
//     id: 3,
//     title: "Presentation by Mr. Aman Semir",
//     thumbnail: "https://shega.co/wp-content/uploads/2020/09/Shega-logo-22-e1601232255639.png",
//     youtubeId: "0OIhoVDCoX0?si=wQ5p2-h1-lMRzn7d",
//   },
//   // {
//   //   id: 4,
//   //   title: "Another Video",
//   //   thumbnail: "https://shega.co/wp-content/uploads/2020/09/Shega-logo-22-e1601232255639.png",
//   //   youtubeId: "J---aiyznGQ",
//   // },
// ];

// const news = [
//   {
//     id: 1,
//     title:
//       "New Guarantee Helps Coop Unlock Billions in Collateral-Free Loans for MSMEs",
//     date: "2023-07-15",
//     description: "SuoqPass secured loan from masterCard.",
//     image:
//       "https://shega.co/wp-content/uploads/2020/09/Shega-logo-22-e1601232255639.png",
//     link: "https://shega.co/post/coop-secures-570-million-br-guarantee-to-expand-collateral-free-lending/",
//   },
//   {
//     id: 2,
//     title: "DxValley 2.0 and CRM Inaguraion",
//     date: "2023-07-14",
//     description: "DxValley 2.0 and CRM Inaguraion",
//     image:
//       "https://shega.co/wp-content/uploads/2020/09/Shega-logo-22-e1601232255639.png",
//     link: "/news/ai-model-surpasses-humans",
//   },
//   {
//     id: 3,
//     title:
//       "ECMA Opens Door to Capital Market Innovation with Launch of Sandbox",
//     date: "2024-08-29 ",
//     description:
//       "Solar and wind power now account for over 50% of global energy production.",
//     image:
//       "https://shega.co/wp-content/uploads/2020/09/Shega-logo-22-e1601232255639.png",
//     link: "https://shega.co/post/ecma-opens-door-to-capital-market-innovation-with-launch-of-sandbox/",
//   },
// ];

const events = [
  {
    id: 1,
    title: "Annual Tech Innovation Summit",
    date: "2023-08-15",
    link: "/contests",
  },
  {
    id: 2,
    title: "AI Ethics Workshop",
    date: "2023-08-22",
    link: "/contests",
  },
  {
    id: 3,
    title: "Startup Pitch Competition",
    date: "2023-08-30",
    link: "/contests",
  },
];

export default function EventsSider() {
  return (
    <div className='relative right-0 w-full sm:w-96 pace-y-4  mb-2'>
      <Card className='border-none shadow-none'>
        <CardHeader className='pb-2'>
          <CardTitle className='text-lg     '>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent className='space-y-2 pt-0'>
          {events.map((event) => (
            <div key={event.id} className='text-sm'>
              <h3 className='font-medium'>{event.title}</h3>
              <div className='flex justify-between items-center text-sm'>
                <p className='text-muted-foreground flex items-center'>
                  <CalendarIcon className='mr-1 h-3 w-3' />
                  {event.date}
                </p>
                <Link
                  href={event.link}
                  className='text-primary text-sm font-semibold hover:underline  text-md'>
                  Register
                </Link>
              </div>
            </div>
          ))}
          <Link
            href='/contests'
            className='text-sm font-semibold text-primary hover:underline flex items-center'>
            View All Events
            <ArrowRightIcon className='ml-1 h-3 w-3' />
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
