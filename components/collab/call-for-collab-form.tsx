/** @format */

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

type CollaborationType = "trainer" | "organization" | "media" | "stakeholder";
const categoryOptions: Record<CollaborationType, string[]> = {
  trainer: [
    "Digital Farming Consultants",
    "IoT in Agriculture Trainers",
    "Tech-Driven Leadership Coaches",
    "Data-Driven Decision-Making Coaches",
  ],
  organization: ["Non-Profit", "Corporate", "Educational", "tech"],
  media: ["Television", "podcast", "Webinars"],
  stakeholder: ["Investor", "Partner", "Advisor", "Customer"],
};

interface RegistrationFormProps {
  type: CollaborationType;
}

const CollabForm = ({ type }: RegistrationFormProps) => {
  const [Fullname, setName] = useState("");
  const [email, setEmail] = useState("");
  const [Phonenumber, setPhoneNo] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const response = await fetch("/api/collaboration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Fullname,
        email,
        Phonenumber,
        description,
        category,
        type,
      }),
    });

    if (response.ok) {
      alert("submitted successfully!");
      setName("");
      setEmail("");
      setPhoneNo("");
      setDescription("");
      setCategory("");
    } else {
      alert("Failed to submit");
    }
  };

  return (
    <div
      className="admin-event mx-8 flex w-3/4 justify-center p-6 "
      id="collab-form"
    >
      <Card className="w-auto items-center p-10">
        <CardHeader>
          <CardTitle className="flex-col justify-center items-center mb-10">
            <span className="flex justify-center text-3xl tracking-tight mb-2 font-bold leading-tight underline-offset-auto dark:text-white">
              Collaboration Form
            </span>
            <div className="flex justify-center">
              <div className="w-20 h-1 bg-coopOrange"></div>
            </div>
          </CardTitle>
          <CardDescription className="flex mb-10">Write to Us!</CardDescription>
        </CardHeader>
        <CardContent>
          {/* <form onSubmit={(e) => e.preventDefault()}> */}
          <form onSubmit={handleSubmit}>
            <div className="grid w-full gap-4 md:grid-cols-2 mb-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  type="text"
                  value={Fullname}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="phoneNo">Phone Number</Label>
                <Input
                  type="text"
                  value={Phonenumber}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {categoryOptions[type].map((category, index) => (
                      <SelectItem key={index} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  placeholder="Why do you want to work with us?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
            </div>
            <div className="md:items-center md:justify-center">
              <Button
                type="submit"
                className="bg-coopBlue text-white font-bold cursor-pointer px-6 py-2 hover:bg-amber-500 mt-4"
              >
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CollabForm;
