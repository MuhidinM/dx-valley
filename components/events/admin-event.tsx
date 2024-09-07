"use client";
import { useRouter } from "next/router";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";

import { Button } from "../ui/button";
import { format } from "date-fns";

import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

export default function AdminEvent() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  //   const [targetDate, setTargetDate] = useState("");
  const [targetDate, setTargetDate] = useState<Date | undefined>(undefined);

  const [category, setCategory] = useState("");

  //   const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const response = await fetch("/api/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, targetDate, category }),
    });

    if (response.ok) {
      alert("Registration successful!");
      toast.success("Registration successful!", {
        description: "Event has been submitted successfully.",
      });
      setName("");
      setDescription("");
      setTargetDate(undefined);
      setCategory("");
    } else {
      const errorMessage = await response.json();
      console.error("Error:", errorMessage);
      toast.error("Registration failed", {
        description:
          errorMessage?.error.message ||
          "An error occurred during registration.",
      });
    }
  };

  return (
    <Card className=" w-[500px]">
      <CardHeader>
        <CardTitle>Event</CardTitle>
        <CardDescription>Description</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                placeholder="Event Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Description</Label>
              <Textarea
                placeholder="Event Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Target date</Label>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[450px] justify-start text-left font-normal",
                      !targetDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {targetDate ? (
                      format(targetDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={targetDate}
                    onSelect={(date) => setTargetDate(date || undefined)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Event Catagory</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="contest">Contest</SelectItem>
                  <SelectItem value="tech expo">Tech Expo</SelectItem>
                  <SelectItem value="call for proposal">
                    Call for Proposal
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="admin-event-btn bg-coopBlue text-white font-bold cursor-pointer px-6 py-2 hover:bg-amber-500">
            Create event
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
