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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const expertiseOptions = [
  "Tech Sales",
  "Leadership",
  "Marketing",
  "Development",
  "Data Analysis",
];

const professionOptions = [
  "Trainer",
  "Consultant",
  "Manager",
  "Developer",
  "Analyst",
];

const scheduleOptions = [
  {
    value: "2hr/week",
    description: "Available for a commitment of 2 hours per week.",
  },
  {
    value: "On Call",
    description: "Available to respond as needed on an on-call basis.",
  },
  { value: "Other", description: "Custom schedule arrangement." },
];

const titleOptions = ["Dr", "Prof", "Mr", "Mrs", "Other"];

const CollabForm = () => {
  const [title, setTitle] = useState<string>("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [expertise, setExpertise] = useState("");
  const [profession, setProfession] = useState("");
  const [schedule, setSchedule] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const response = await fetch("/api/collaboration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        fullname,
        email,
        phoneno,
        expertise,
        profession,
        schedule,
        description,
      }),
    });

    if (response.ok) {
      alert("Submitted successfully!");
      setTitle("");
      setFullname("");
      setEmail("");
      setPhoneno("");
      setExpertise("");
      setProfession("");
      setSchedule("");
      setDescription("");
    } else {
      alert("Failed to submit");
    }
  };

  return (
    <div
      className="admin-event mx-8 flex w-3/4 justify-center p-6"
      id="collab-form"
    >
      <Card className="w-auto items-center p-10">
        <CardHeader>
          <CardTitle className="flex-col justify-center items-center mb-10">
            <span className="flex justify-center text-3xl tracking-tight mb-2 font-bold leading-tight underline-offset-auto dark:text-white">
              Trainer Registration Form
            </span>
            <div className="flex justify-center">
              <div className="w-20 h-1 bg-coopOrange"></div>
            </div>
          </CardTitle>
          <CardDescription className="flex mb-10">
            Write for Us!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full gap-4 md:grid-cols-2 mb-4">
              {/* Title Section */}
              <div className="flex flex-col space-y-1.5 mb-4">
                <Label>Title</Label>
                <div className="flex flex-wrap gap-2">
                  {titleOptions.map((option) => (
                    <div key={option} className="flex items-center gap-2">
                      <Checkbox
                        id={option}
                        checked={title === option}
                        onChange={() => setTitle(option)}
                      />
                      <Label htmlFor={option}>{option}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  type="text"
                  id="fullname"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="phoneno">Phone Number</Label>
                <Input
                  type="text"
                  id="phoneno"
                  value={phoneno}
                  onChange={(e) => setPhoneno(e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="expertise">Expertise</Label>
                <Select value={expertise} onValueChange={setExpertise}>
                  <SelectTrigger id="expertise">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {expertiseOptions.map((option, index) => (
                      <SelectItem key={index} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="profession">Profession</Label>
                <Select value={profession} onValueChange={setProfession}>
                  <SelectTrigger id="profession">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {professionOptions.map((option, index) => (
                      <SelectItem key={index} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="schedule">Schedule</Label>
                <Select value={schedule} onValueChange={setSchedule}>
                  <SelectTrigger id="schedule">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {scheduleOptions.map((option, index) => (
                      <SelectItem
                        key={index}
                        value={option.value}
                        title={option.description}
                      >
                        {option.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-1.5 md:col-span-2">
                <Label htmlFor="description">Motivation</Label>
                <Textarea
                  placeholder="Why do you want to work with us?"
                  id="description"
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
