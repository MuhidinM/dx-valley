"use client";
import React from "react";
import {useState, useEffect} from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { cn } from "@/lib/utils";
// import { menuItems } from "@/constants";
import { MenuItemFetch } from "@/services/menu";
// import { MenuItem } from "@/types/strapi-types";

interface Links {
  href: string;
  title: string;
  description: string;
}

interface Highlight {
  href: string;
  title: string;
  description: string;
  img: string; // Adjust this type as per your actual image data structure
}

interface MenuItem {
  trigger: string;
  highlight: Highlight;
  links: Links[];
}

export function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]); // Initialize as an empty array

  useEffect(() => {
    const fetchMenuItems = async () => {
      const data = await MenuItemFetch();
      setMenuItems(data);
    };

    fetchMenuItems();
  }, []);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {menuItems && menuItems.map((item, index) => (
          <NavigationMenuItem key={index}>
            <NavigationMenuTrigger>{item.trigger}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-4">
                  <NavigationMenuLink asChild>
                    <a
                      href={item.highlight.href}
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        {item.highlight.title}
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        {item.highlight.description}
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                {item.links.map((link, i) => (
                  <ListItem key={i} href={link.href} title={link.title}>
                    {link.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
