// 'use client';

// import { useState } from 'react';

// const steps = [
//   { id: 'organization', title: 'Organization info' },
//   { id: 'contact-info', title: 'Contact' },
//   { id: 'confirm', title: 'Confirm' },
// ];

// const industryOptions = ["Agriculture", "AI", "Fintech"];
// const focusAreaOptions = ["Agriculture", "AI", "Fintech"];
// const interestOptions = ["Invest", "Buy startup", "Support vision", "Sponsor"];
// const organizationTypeOptions = ["Private", "NGO", "Gov't"];

// type FormData = {
//   organizationName: string;
//   industry: string;
//   focusArea: string[];
//   interestedIn: string[];
//   tradeLicense: string;
//   organizationType: string;
//   city: string;
//   state: string;
//   country: string;
//   email: string;
//   phone1: string;
//   phone2: string;
//   tradeLicenseUpload: File | null;
// };

// export default function OrganizationRegistrationForm() {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [formData, setFormData] = useState<FormData>({
//     organizationName: "",
//     industry: "",
//     focusArea: [],
//     interestedIn: [],
//     tradeLicense: "",
//     organizationType: "",
//     city: "",
//     state: "",
//     country: "",
//     email: "",
//     phone1: "",
//     phone2: "",
//     tradeLicenseUpload: null,
//   });
//   const [showDropdown, setShowDropdown] = useState(false);

//   const handleCheckboxChange = (name: keyof FormData, value: string) => {
//     setFormData((prev) => {
//       const updatedValues = (prev[name] as string[]).includes(value)
//         ? (prev[name] as string[]).filter((item) => item !== value)
//         : [...(prev[name] as string[]), value];
//       return { ...prev, [name]: updatedValues };
//     });
//   };

//   const handleChange = (name: keyof FormData, value: string | File | null) => {
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleNext = () => {
//     setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
//   };

//   const handlePrevious = () => {
//     setCurrentStep((prev) => Math.max(prev - 1, 0));
//   };

//   const handleSubmit = () => {
//     console.log("Submitting form data", formData);
//   };

//   return (
//     <div className="flex  items-center justify-center dark:bg-background bg-background p-4">

//       <div className="w-full max-w-xl dark:bg-gray-800 p-6 rounded-lg shadow-lg h-[600px] flex flex-col justify-between">
//         <div className=''>
//           <div className='flex justify-center font-bold text-2xl py-2'>Tell us about your organization</div>


//           {/* Organization Info */}
//           {currentStep === 0 && (
//             <div className="mb-4">
//               <label htmlFor="organization-name" className="block mb-1  text-slate-700 dark:text-slate-300">Organization Name</label>
//               <input
//                 id="organization-name"
//                 className="w-full p-1.5 dark:bg-gray-800 rounded bg-slate-100  border-[1px] dark:border-slate-200 border-slate-300 text-[15px]"
//                 value={formData.organizationName}
//                 onChange={(e) => handleChange("organizationName", e.target.value)}
//                 placeholder="Enter your organization name"
//               />

//               <div className='flex justify-between '>

//                 <div className='flex flex-col w-4/12'>

//                   <label htmlFor="industry" className="block mt-4 mb-1  text-slate-700 dark:text-slate-300 ">Industry</label>
//                   <select
//                     id="industry"
//                     className=" w-full p-1.5 text-[15px] dark:bg-gray-800 rounded bg-slate-100  border-[1px] dark:border-slate-200 border-slate-300"
//                     value={formData.industry}
//                     onChange={(e) => handleChange("industry", e.target.value)}
//                   >
//                     <option value="">Select industry</option>
//                     {industryOptions.map((option) => (
//                       <option key={option} value={option}>{option}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className='flex flex-col w-4/12'>
//                   <label htmlFor="organization-type" className="block mt-4 mb-1  text-slate-700 dark:text-slate-300">Organization Type</label>
//                   <select
//                     id="organization-type"
//                     className="w-full p-1.5 text-[15px] dark:bg-gray-800 rounded bg-slate-100  border-[1px] dark:border-slate-200 border-slate-300"
//                     value={formData.organizationType}
//                     onChange={(e) => handleChange("organizationType", e.target.value)}
//                   >
//                     <option value="">Select organization type</option>
//                     {organizationTypeOptions.map((option) => (
//                       <option key={option} value={option}>{option}</option>
//                     ))}
//                   </select>
//                 </div>

//               </div>

//               <label htmlFor="trade-license" className="block mt-4 mb-1  text-slate-700 dark:text-slate-300">Trade License</label>
//               <input
//                 id="trade-license"
//                 className=" w-full p-1.5 text-[15px] dark:bg-gray-800 rounded bg-slate-100  border-[1px] dark:border-slate-200 border-slate-300"
//                 value={formData.tradeLicense}
//                 onChange={(e) => handleChange("tradeLicense", e.target.value)}
//                 placeholder="Enter your trade license number"
//               />
//               <label htmlFor="email" className="block mt-4 mb-1  text-slate-700 dark:text-slate-300">Email</label>
//               <input
//                 id="email"
//                 type="email"
//                 className="w-full p-1.5 text-[15px] dark:bg-gray-800 rounded bg-slate-100  border-[1px] dark:border-slate-200 border-slate-300"
//                 value={formData.email}
//                 onChange={(e) => handleChange("email", e.target.value)}
//                 placeholder="Enter your email"
//               />

//               <label htmlFor="phone1" className="block mt-4 mb-1  text-slate-700 dark:text-slate-300">Phone</label>
//               <input
//                 id="phone1"
//                 type="tel"
//                 className="w-full p-1.5 text-[15px] dark:bg-gray-800 rounded bg-slate-100  border-[1px] dark:border-slate-200 border-slate-300"
//                 value={formData.phone1}
//                 onChange={(e) => handleChange("phone1", e.target.value)}
//                 placeholder="Enter your primary phone number"
//               />
//             </div>
//           )}

//           {/* Contact Info */}
//           {currentStep === 1 && (
//             <div className="mb-4">

//               <label htmlFor="country" className="block mt-4 mb-1  text-slate-700 dark:text-slate-300">Country</label>
//               <input
//                 id="country"
//                 className="w-full p-1.5 text-[15px] dark:bg-gray-800 rounded bg-slate-100  border-[1px] dark:border-slate-200 border-slate-300"
//                 value={formData.country}
//                 onChange={(e) => handleChange("country", e.target.value)}
//                 placeholder="Enter your country"
//               />
//               <div className='flex justify-between w-full'>
//                 <div className='flex flex-col'>
//                   <label htmlFor="state" className="block mt-4 mb-1  text-slate-700 dark:text-slate-300">State</label>
//                   <input
//                     id="state"
//                     className="w-full p-1.5 text-[15px] dark:bg-gray-800 rounded bg-slate-100  border-[1px] dark:border-slate-200 border-slate-300"
//                     value={formData.state}
//                     onChange={(e) => handleChange("state", e.target.value)}
//                     placeholder="Enter your state"
//                   />
//                 </div>
//                 <div className='flex flex-col'>
//                   <label htmlFor="city" className="block mt-4 mb-1  text-slate-700 dark:text-slate-300 ">City</label>
//                   <input
//                     id="city"
//                     className="w-full p-1.5 text-[15px] dark:bg-gray-800 rounded bg-slate-100  border-[1px] dark:border-slate-200 border-slate-300"
//                     value={formData.city}
//                     onChange={(e) => handleChange("city", e.target.value)}
//                     placeholder="Enter your city"
//                   />
//                 </div>

//               </div>
//               <label htmlFor="focus-area" className="block mb-3 mt-4 text-slate-700 dark:text-slate-300">Focus Area</label>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                 {focusAreaOptions.map((option) => (
//                   <label key={option} className="inline-flex items-center">
//                     <input
//                       type="checkbox"
//                       className="form-checkbox h-5 w-5 text-[#00adef]"
//                       checked={formData.focusArea.includes(option)}
//                       onChange={() => handleCheckboxChange("focusArea", option)}
//                     />
//                     <span className="ml-2">{option}</span>
//                   </label>
//                 ))}
//               </div>

//               <label htmlFor="interest-area" className="block mb-3 mt-4 text-slate-700 dark:text-slate-300">Interest Area</label>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                 {interestOptions.map((option) => (
//                   <label key={option} className="inline-flex items-center">
//                     <input
//                       type="checkbox"
//                       className="form-checkbox h-5 w-5 text-[#00adef]"
//                       checked={formData.interestedIn.includes(option)}
//                       onChange={() => handleCheckboxChange("interestedIn", option)}
//                     />
//                     <span className="ml-2">{option}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>
//           )}
//           {/* Confirm Info */}
//           {currentStep === 2 && (
//             <div className="mb-4">
//               <h2 className="text-center text-lg font-bold">Confirm Your Information</h2>
//               <p className="mt-4"><span className=' text-slate-700 dark:text-slate-300'>Organization Name: </span>{formData.organizationName}</p>
//               <p className="mt-2"><span className=' text-slate-700 dark:text-slate-300'>Industry: </span>{formData.industry}</p>
//               <p className="mt-2"><span className=' text-slate-700 dark:text-slate-300'>Focus Area: </span>{formData.focusArea.join(', ')}</p>
//               <p className="mt-2"><span className=' text-slate-700 dark:text-slate-300'>Interested In: </span>{formData.interestedIn.join(', ')}</p>
//               <p className="mt-2"><span className=' text-slate-700 dark:text-slate-300'>Email: </span>{formData.email}</p>
//               <p className="mt-2"><span className=' text-slate-700 dark:text-slate-300'>Phone 1: </span>{formData.phone1}</p>
//               <p className="mt-2"><span className=' text-slate-700 dark:text-slate-300'>Phone 2: </span>{formData.phone2}</p>
//               <p className="mt-2"><span className=' text-slate-700 dark:text-slate-300'>City: </span>{formData.city}</p>
//               <p className="mt-2"><span className=' text-slate-700 dark:text-slate-300'>State: </span>{formData.state}</p>
//               <p className="mt-2"><span className=' text-slate-700 dark:text-slate-300'>Country: </span>{formData.country}</p>
//             </div>
//           )}
//         </div>

//         <div className="flex justify-between mt-6 ">
//           <button
//             className="bg-gray-700 text-white py-2 px-4 rounded-lg w-24"
//             onClick={handlePrevious}
//             disabled={currentStep === 0}
//           >
//             Previous
//           </button>
//           {currentStep < steps.length - 1 ? (
//             <button
//               className="bg-[#00adef] text-white py-2 px-4 rounded-lg w-24"
//               onClick={handleNext}
//             >
//               Next
//             </button>
//           ) : (
//             <button
//               className="bg-green-500 text-white py-2 px-4 rounded-lg w-24"
//               onClick={handleSubmit}
//             >
//               Submit
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";

const steps = [
  { id: "organization", title: "Organization Info" },
  { id: "contact-info", title: "Contact" },
  { id: "confirm", title: "Confirm" },
];

const industryOptions = ["Agriculture", "AI", "Fintech"];
const focusAreaOptions = ["Agriculture", "AI", "Fintech"];
const interestOptions = ["Invest", "Buy startup", "Support vision", "Sponsor"];
const organizationTypeOptions = ["Private", "NGO", "Gov't"];

type FormData = {
  organizationName: string;
  industry: string;
  focusArea: string[];
  interestedIn: string[];
  tradeLicense: string;
  organizationType: string;
  city: string;
  state: string;
  country: string;
  email: string;
  phone1: string;
  phone2: string;
  tradeLicenseUpload: File | null;
};

export default function OrganizationRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    organizationName: "",
    industry: "",
    focusArea: [],
    interestedIn: [],
    tradeLicense: "",
    organizationType: "",
    city: "",
    state: "",
    country: "",
    email: "",
    phone1: "",
    phone2: "",
    tradeLicenseUpload: null,
  });

  const handleCheckboxChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => {
      const updatedValues = (prev[name] as string[]).includes(value)
        ? (prev[name] as string[]).filter((item) => item !== value)
        : [...(prev[name] as string[]), value];
      return { ...prev, [name]: updatedValues };
    });
  };

  const handleChange = (name: keyof FormData, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    console.log("Submitting form data", formData);
    // Here you would typically send the data to your backend
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-background p-4'>
      <Card className='w-full max-w-2xl'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold text-center'>
            Tell us about your organization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='mb-8'>
            <div className='flex justify-between items-center'>
              {steps.map((step, index) => (
                <div key={step.id} className='flex flex-col items-center'>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index <= currentStep
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}>
                    {index < currentStep ? (
                      <Check className='w-4 h-4' />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className='text-xs mt-1'>{step.title}</span>
                </div>
              ))}
            </div>
            <div className='h-2 bg-secondary mt-2 rounded-full'>
              <div
                className='h-full bg-primary rounded-full transition-all duration-300 ease-in-out'
                style={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                }}></div>
            </div>
          </div>

          <AnimatePresence mode='wait'>
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}>
              {currentStep === 0 && (
                <div className='space-y-4'>
                  <div>
                    <Label htmlFor='organization-name'>Organization Name</Label>
                    <Input
                      id='organization-name'
                      value={formData.organizationName}
                      onChange={(e) =>
                        handleChange("organizationName", e.target.value)
                      }
                      placeholder='Enter your organization name'
                    />
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <Label htmlFor='industry'>Industry</Label>
                      <Select
                        onValueChange={(value) =>
                          handleChange("industry", value)
                        }>
                        <SelectTrigger>
                          <SelectValue placeholder='Select industry' />
                        </SelectTrigger>
                        <SelectContent>
                          {industryOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor='organization-type'>
                        Organization Type
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          handleChange("organizationType", value)
                        }>
                        <SelectTrigger>
                          <SelectValue placeholder='Select organization type' />
                        </SelectTrigger>
                        <SelectContent>
                          {organizationTypeOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor='trade-license'>Trade License</Label>
                    <Input
                      id='trade-license'
                      value={formData.tradeLicense}
                      onChange={(e) =>
                        handleChange("tradeLicense", e.target.value)
                      }
                      placeholder='Enter your trade license number'
                    />
                  </div>

                  <div>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                      id='email'
                      type='email'
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder='Enter your email'
                    />
                  </div>

                  <div>
                    <Label htmlFor='phone1'>Phone</Label>
                    <Input
                      id='phone1'
                      type='tel'
                      value={formData.phone1}
                      onChange={(e) => handleChange("phone1", e.target.value)}
                      placeholder='Enter your primary phone number'
                    />
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className='space-y-4'>
                  <div>
                    <Label htmlFor='country'>Country</Label>
                    <Input
                      id='country'
                      value={formData.country}
                      onChange={(e) => handleChange("country", e.target.value)}
                      placeholder='Enter your country'
                    />
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <Label htmlFor='state'>State</Label>
                      <Input
                        id='state'
                        value={formData.state}
                        onChange={(e) => handleChange("state", e.target.value)}
                        placeholder='Enter your state'
                      />
                    </div>
                    <div>
                      <Label htmlFor='city'>City</Label>
                      <Input
                        id='city'
                        value={formData.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                        placeholder='Enter your city'
                      />
                    </div>
                  </div>

                  <div>
                    <Label className='mb-2 block'>Focus Area</Label>
                    <div className='grid grid-cols-2 gap-2'>
                      {focusAreaOptions.map((option) => (
                        <div
                          key={option}
                          className='flex items-center space-x-2'>
                          <Checkbox
                            id={`focus-${option}`}
                            checked={formData.focusArea.includes(option)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                handleCheckboxChange("focusArea", option);
                              } else {
                                handleCheckboxChange("focusArea", option);
                              }
                            }}
                          />
                          <Label htmlFor={`focus-${option}`}>{option}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className='mb-2 block'>Interest Area</Label>
                    <div className='grid grid-cols-2 gap-2'>
                      {interestOptions.map((option) => (
                        <div
                          key={option}
                          className='flex items-center space-x-2'>
                          <Checkbox
                            id={`interest-${option}`}
                            checked={formData.interestedIn.includes(option)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                handleCheckboxChange("interestedIn", option);
                              } else {
                                handleCheckboxChange("interestedIn", option);
                              }
                            }}
                          />
                          <Label htmlFor={`interest-${option}`}>{option}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className='space-y-2'>
                  <h2 className='text-xl font-semibold mb-4'>
                    Confirm Your Information
                  </h2>
                  {Object.entries(formData).map(([key, value]) => (
                    <p key={key} className='flex justify-between'>
                      <span className='font-medium'>
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                      </span>
                      <span>
                        {Array.isArray(value)
                          ? value.join(", ")
                          : value?.toString() || "N/A"}
                      </span>
                    </p>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className='flex justify-between mt-8'>
            <Button
              variant='outline'
              onClick={handlePrevious}
              disabled={currentStep === 0}>
              <ChevronLeft className='w-4 h-4 mr-2' />
              Previous
            </Button>
            {currentStep < steps.length - 1 ? (
              <Button onClick={handleNext}>
                Next
                <ChevronRight className='w-4 h-4 ml-2' />
              </Button>
            ) : (
              <Button className="bg-coopBlue hover:bg-coopBlueHover" onClick={handleSubmit}>
                Submit
                <Check className='w-4 h-4 ml-2' />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}