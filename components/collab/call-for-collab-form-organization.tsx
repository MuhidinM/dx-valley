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

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
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

const focusAreaOptions = ["Agritech", "Fintech", "Other"];
const interestAreaOptions = ["Support", "Invest", "Sponsor", "Other"];

const CollabForm = () => {
  const [countryOptions, setCountryOptions] = useState<
    { name: string; code: string }[]
  >([]);
  const [country, setCountry] = useState<string>("");
  const [cityOptions, setCityOptions] = useState<string[]>([]);
  const [city, setCity] = useState<string>("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [tinNumber, setTinNumber] = useState("");
  const [phoneNo1, setPhoneNo1] = useState("");
  const [phoneNo2, setPhoneNo2] = useState("");
  const [focusArea, setFocusArea] = useState<string[]>([]);
  const [interestArea, setInterestArea] = useState<string>("");
  const [otherInterestArea, setOtherInterestArea] = useState<string>("");

  const toggleFocusArea = (area: string) => {
    setFocusArea((prev) =>
      prev.includes(area)
        ? prev.filter((item) => item !== area)
        : [...prev, area]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/collaboration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        email,
        description,
        tinNumber,
        phoneNo1,
        phoneNo2,
        focusArea,
        interestArea,
        otherInterestArea,
      }),
    });

    if (response.ok) {
      alert("Submitted successfully!");
      setFullName("");
      setEmail("");

      setDescription("");
      setTinNumber("");
      setPhoneNo1("");
      setPhoneNo2("");
      setFocusArea([]);
      setInterestArea("");
      setOtherInterestArea("");
    } else {
      alert("Failed to submit");
    }
  };

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map(
          (country: { name: { common: string }; cca2: string }) => ({
            name: country.name.common,
            code: country.cca2,
          })
        );
        setCountryOptions(countries);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  useEffect(() => {
    if (country) {
      fetch("https://countriesnow.space/api/v0.1/countries/cities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ country }),
      })
        .then((response) => response.json())
        .then((data) => {
          setCityOptions(data.data || []);
        })
        .catch((error) => console.error("Error fetching cities:", error));
    }
  }, [country]);

  return (
    <div
      className="admin-event mx-8 flex w-3/4 justify-center p-6"
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
          <form onSubmit={handleSubmit}>
            <div className="grid w-full gap-4 md:grid-cols-2 mb-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
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
                <Label htmlFor="tinNumber">TIN Number</Label>
                <Input
                  type="text"
                  id="tinNumber"
                  value={tinNumber}
                  onChange={(e) => setTinNumber(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="phoneNo1">Phone Number 1</Label>
                <Input
                  type="text"
                  id="phoneNo1"
                  value={phoneNo1}
                  onChange={(e) => setPhoneNo1(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="phoneNo2">Phone Number 2 (Optional)</Label>
                <Input
                  type="text"
                  id="phoneNo2"
                  value={phoneNo2}
                  onChange={(e) => setPhoneNo2(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="country">Country</Label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {countryOptions.map((option) => (
                      <SelectItem key={option.code} value={option.name}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="city">City</Label>
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger id="city">
                    <SelectValue placeholder="Select City" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {cityOptions.map((cityName, index) => (
                      <SelectItem key={index} value={cityName}>
                        {cityName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5 md:col-span-2">
                <Label>Focus Area</Label>
                <div className="flex flex-wrap gap-2">
                  {focusAreaOptions.map((option) => (
                    <div key={option} className="flex items-center gap-2">
                      <Checkbox
                        id={option}
                        checked={focusArea.includes(option)}
                        onChange={() => toggleFocusArea(option)}
                      />
                      <Label htmlFor={option}>{option}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="interestArea">Interest Area</Label>
                <Select value={interestArea} onValueChange={setInterestArea}>
                  <SelectTrigger id="interestArea">
                    <SelectValue placeholder="Select Interest Area" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {interestAreaOptions.map((option, index) => (
                      <SelectItem key={index} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {interestArea === "Other" && (
                <div className="flex flex-col space-y-1.5 md:col-span-2">
                  <Label htmlFor="otherInterestArea">Other Interest Area</Label>
                  <Textarea
                    id="otherInterestArea"
                    value={otherInterestArea}
                    onChange={(e) => setOtherInterestArea(e.target.value)}
                    className="w-full"
                  />
                </div>
              )}
            </div>
            <Button type="submit" className="w-full bg-coopOrange">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CollabForm;
