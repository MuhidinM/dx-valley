"use client"; // Ensure this component is client-side

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

export type Event = {
  id: string;
  name: string;
  description: string;
  category: "tech-expo" | "contest";
  targetDate: Date;
};

export const columns: ColumnDef<Event>[] = [
  {
    accessorKey: "name",
    header: "Event",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "targetDate",
    header: "Target Date",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const event = row.original;
      const [isMounted, setIsMounted] = useState(false);

      useEffect(() => {
        if (typeof window !== "undefined") {
          setIsMounted(true);
        }
      }, []);

      const handleViewTeam = (eventId: string) => {
        if (isMounted) {
          // Use window.location.href to navigate
          window.location.href = `/admin/dashboard/event/${eventId}`;
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleViewTeam(event.id)}>
              View Team
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
