// /** @format */

// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { toast } from "@/components/ui/use-toast";

// const FormSchema = z.object({
//   username: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
// });

// export function InputForm() {
//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       username: "",
//     },
//   });

//   function onSubmit(data: z.infer<typeof FormSchema>) {
//     toast({
//       title: "You submitted the following values:",
//       description: (
//         <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
//           <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
//         </pre>
//       ),
//     });
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className='w-2/3 space-y-6'>
//         <FormField
//           control={form.control}
//           name='username'
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Username</FormLabel>
//               <FormControl>
//                 <Input placeholder='shadcn' {...field} />
//               </FormControl>
//               <FormDescription>
//                 This is your public display name.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type='submit'>Submit</Button>
//       </form>
//     </Form>
//   );
// }

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
import { Textarea } from "./ui/textarea";

import { Button } from "./ui/button";
import { format } from "date-fns";

import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const CollabForm = () => {
  return (
    <div className='admin-event mx-8  flex w-3/4 justify-center p-6 '>
      <Card className=' w-auto items-center p-10 '>
        <CardHeader>
          <CardTitle className='flex justify-center items-center mb-10'>
            Form for Collaboration
          </CardTitle>
          <CardDescription className='flex mb-10'>Description</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className='grid w-full gap-4 md:grid-cols-2'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='name'>Name</Label>
                <Input
                  type='text'
                  placeholder='Event Name'
                  value={"<div> hello </div>"}
                  onChange={(e) => <div> hello </div>}
                  required
                  className='w-full'
                />
              </div>
              <div className='flex flex-col space-y-1.5 md:col-span-2'>
                <Label htmlFor='description'>Description</Label>
                <Textarea
                  placeholder='Event Description'
                  value={"description"}
                  onChange={(e) => <div> hello </div>}
                  required
                  className='w-full'
                />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='target-date'>Target date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className='w-full justify-start text-left font-normal'>
                      <CalendarIcon className='mr-2 h-4 w-4' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0'></PopoverContent>
                </Popover>
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='category'>Event Category</Label>
                <Select value={"contest"} className='w-full'>
                  <SelectTrigger id='category'>
                    <SelectValue placeholder='Select' />
                  </SelectTrigger>
                  <SelectContent position='popper'>
                    <SelectItem value='contest'>Contest</SelectItem>
                    <SelectItem value='tech expo'>Tech Expo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className='admin-event-btn bg-coopBlue text-white font-bold cursor-pointer px-6 py-2 hover:bg-amber-500 mt-4'>
              Create event
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CollabForm;