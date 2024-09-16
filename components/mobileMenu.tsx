/** @format */
"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  CircleUser,
  Home,
  Menu,
  Package,
  ShieldCheck,
  BookUser,
} from "lucide-react";
import { MenuItemFetch } from "@/services/menu";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";
// import { MenuItem } from "@/types/strapi-types";

interface Links {
  href: string;
  title: string;
  // description: string;
}

interface MenuItem {
  trigger: string;
  // highlight: Highlight;
  links: Links[];
}
const SidebarNavItem = ({
  href,
  label,
  icon: Icon,
  active = false,
}: {
  href: string;
  label: string;
  icon: React.ElementType | " ";
  active?: boolean;
}) => (
  <Link
    href={href}
    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
      active
        ? "bg-muted text-primary"
        : "text-muted-foreground hover:text-primary"
    }`}>
    {/* <Icon className='h-4 w-4' /> */}
    {label}
  </Link>
);

// export function MobileMenu() {
//   const [menuItems, setMenuItems] = useState<MenuItem[]>([]); // Initialize as an empty array

//   useEffect(() => {
//     const fetchMenuItems = async () => {
//       const data = await MenuItemFetch();
//       setMenuItems(data);
//     };

//     fetchMenuItems();
//   }, []);
//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
//           <Menu className='h-5 w-5' />
//           <span className='sr-only'>Toggle navigation menu</span>
//         </Button>
//       </SheetTrigger>
//       <SheetContent side='left' className='flex flex-col'>
//         <nav className='grid gap-2 text-lg font-medium'>
//           {/* <SidebarNavItem href='#' label='Home' icon={Home} active />
//         <SidebarNavItem href='#' label='About US' icon={BookUser} /> */}
//           <SidebarNavItem href='#' label='Home' icon={Home} active />

//           {menuItems &&
//             menuItems.map((item, index) => (
//               <div>
//                 <SidebarNavItem
//                   href={" "}
//                   label={item.links[index].title}
//                   icon={null}
//                 />
//                 {item.links.map((link, i) => (
//                   <ul>
//                     <ListItem key={i} href={link.href} title={link.title}>
//                       {link.description}
//                     </ListItem>
//                   </ul>
//                 ))}
//                 {/* <SidebarNavItem href='#' label='About US' icon={BookUser} /> */}
//               </div>
//             ))}
//         </nav>
//       </SheetContent>
//     </Sheet>
//   );

// }


// codeium suggestion
export default function MobileMenu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      const data = await MenuItemFetch();
      setMenuItems(data);
    };

    fetchMenuItems();
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
          <Menu className='h-5 w-5' />
          <span className='sr-only'>Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='flex flex-col'>
        <Image
          src={"/image/dx_sm.png"}
          alt='dxvalley logo'
          width={80} // adjust the width for smaller devices
          height={200}
          className='block sm:hidden p-2' // shown on smaller screens, hidden on larger ones
        />
        <SidebarNavItem href='#' label='Home' icon={Home} active />
        <nav className='grid gap-2 text-lg font-medium'>
          {menuItems &&
            menuItems.map((item, index) => (
              <div key={index}>
                <SidebarNavItem href={" "} label={item.trigger} icon={" "} />
                <ul>
                  {item.links.map((link, i) => (
                    <ListItem key={i} href={link.href} title={link.title} />
                  ))}
                </ul>
              </div>
            ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <a
        ref={ref}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className
        )}
        {...props}>
        <div className='text-sm font-medium leading-none'>{title}</div>
        <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
          {children}
        </p>
      </a>
    </li>
  );
});
ListItem.displayName = "ListItem";

