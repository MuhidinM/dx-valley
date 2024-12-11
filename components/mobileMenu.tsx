/** @format */

import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Home, Menu } from "lucide-react";
import { MenuItemFetch } from "@/services/menu";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

interface Links {
  href: string;
  title: string;
}

interface MenuItem {
  trigger: string;
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
    {label}
  </Link>
);

export default function MobileMenu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    const fetchMenuItems = async () => {
      const data = await MenuItemFetch();
      setMenuItems(data);
    };

    fetchMenuItems();
  }, []);

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      [section]: !prev[section], // Toggle the clicked section
      ...Object.keys(prev).reduce((acc, key) => {
        // Ensure all other sections are closed
        if (key !== section) {
          acc[key] = false; // Close other sections
        }
        return acc;
      }, {} as { [key: string]: boolean }),
    }));
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='outline' size='icon' className='shrink-0 '>
            <Menu className='h-5 w-5' />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='flex flex-col'>
            <Link href='/'>
          <Image
            src={"/image/dx_sm.png"}
            alt='dxvalley logo'
            width={80}
            height={200}
            className='block  p-2'
          />
          </Link>
          <SidebarNavItem href='/' label='Home' icon={Home} active />
          <div className='flex-grow'>
            <nav className='grid gap-2 text-lg font-medium'>
              {menuItems.map((item, index) => (
                <div key={index}>
                  <button
                    className='flex w-full justify-between items-center py-2 px-3 text-left'
                    onClick={() => toggleSection(item.trigger)}>
                    {item.trigger}
                    <span className='ml-2'>
                      {openSections[item.trigger] ? (
                        <ChevronUp />
                      ) : (
                        <ChevronDown />
                      )}
                    </span>
                  </button>

                  {openSections[item.trigger] && (
                    <ul className='pl-6 space-y-2'>
                      {item.links.map((link, i) => (
                        <ListItem key={i} href={link.href} title={link.title} />
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </nav>
          </div>
          <footer className='text-gray-900 py-4 text-center dark:text-gray-400'>
            <p>
              © {new Date().getFullYear()}{" "}
              <Link
                href='https://coopbankoromia.com.et/'
                className='hover:underline'>
                Cooperative Bank of Oromia.
              </Link>{" "}
              All Rights Reserved
            </p>
          </footer>
        </SheetContent>
      </Sheet>
    </div>
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
