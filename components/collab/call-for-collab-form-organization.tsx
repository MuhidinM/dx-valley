/** @format */

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "../ui/textarea";
import { Toaster } from "sonner";
import { toast } from "sonner";

const steps = [
  { id: "organization", title: "Organization Info" },
  { id: "contact", title: "Organization Info" },
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
  interestedArea: string[];
  organizationType: string;
  city: string;
  state: string;
  country: string;
  email: string;
  phoneNumberOne: string;
  addressType: string;
  tradeLicence: string;
};

const MultiSelectDropdown = ({
  options,
  selectedOptions,
  onOptionChange,
  placeholder,
}: {
  options: string[];
  selectedOptions: string[];
  onOptionChange: (option: string) => void;
  placeholder: string;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='w-full justify-between'>
          {selectedOptions.length > 0
            ? selectedOptions.join(", ")
            : placeholder}
          <ChevronRight className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option}
            checked={selectedOptions.includes(option)}
            onCheckedChange={(checked) => {
              if (checked) onOptionChange(option);
            }}>
            {option}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default function OrganizationRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    organizationName: "",
    industry: "",
    focusArea: [],
    interestedArea: [],
    organizationType: "",
    city: "",
    state: "",
    country: "",
    email: "",
    phoneNumberOne: "",
    addressType: "",
    tradeLicence: "",
  });

  const handleCheckboxChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => {
      const updatedValues = (prev[name] as string[]).includes(value)
        ? (prev[name] as string[]).filter((item) => item !== value)
        : [...(prev[name] as string[]), value];
      return { ...prev, [name]: updatedValues };
    });
  };

  const handleChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDropdownChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/organization", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("Organization registered successfully!");
      } else {
        const errorData = await response.json();
        toast.error("Failed to register organization.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-background p-4'>
      <Toaster position='top-right' richColors />
      <Card className='w-full max-w-2xl min-w-[700px] '>
        <CardHeader>
          <CardTitle className='text-2xl font-bold text-center'>
            <span className='flex justify-center text-3xl tracking-tight mb-2 font-bold leading-tight underline-offset-auto dark:text-white'>
              Organization Registration Form
            </span>
            <div className='flex justify-center'>
              <div className='w-20 h-1 bg-coopOrange'></div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='mb-8 '>
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
                  {/* Form fields */}
                  <div className='flex gap-4'>
                    <div className='flex-1'>
                      <Label htmlFor='organizationName'>
                        Organization Name
                      </Label>
                      <Input
                        id='organizationName'
                        value={formData.organizationName}
                        onChange={(e) =>
                          handleChange("organizationName", e.target.value)
                        }
                        placeholder='Enter Organization name'
                      />
                    </div>
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
                    <Label htmlFor='phoneNumberOne'>Phone</Label>
                    <Input
                      id='phoneNumberOne'
                      type='tel'
                      value={formData.phoneNumberOne}
                      onChange={(e) =>
                        handleChange("phoneNumberOne", e.target.value)
                      }
                      placeholder='Enter your primary phone number'
                    />
                  </div>

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
                </div>
              )}

              {currentStep === 1 && (
                <div>
                  <div className='flex flex-col gap-4'>
                    <div className='flex gap-4'>
                      <div className='flex-1'>
                        <Label className='mb-2 block'>Focus Area</Label>
                        <MultiSelectDropdown
                          options={focusAreaOptions}
                          selectedOptions={formData.focusArea}
                          onOptionChange={(option) =>
                            handleCheckboxChange("focusArea", option)
                          }
                          placeholder='Select focusArea'
                        />
                      </div>

                      <div className='flex-1'>
                        <Label className='mb-2 block'>Interest Area</Label>
                        <MultiSelectDropdown
                          options={interestOptions}
                          selectedOptions={formData.interestedArea}
                          onOptionChange={(option) =>
                            handleCheckboxChange("interestedArea", option)
                          }
                          placeholder='Select Interest area'
                        />
                      </div>
                    </div>
                    <div className='flex gap-4'>
                      <div className='flex-1'>
                        <Label htmlFor='organizationType'>
                          Organization Type
                        </Label>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant='outline'
                              className='w-full text-left'>
                              {formData.organizationType || "Select "}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            {organizationTypeOptions.map((option) => (
                              <DropdownMenuCheckboxItem
                                key={option}
                                onCheckedChange={() =>
                                  handleDropdownChange(
                                    "organizationType",
                                    option
                                  )
                                }>
                                {option}
                              </DropdownMenuCheckboxItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className='flex-1'>
                        <Label htmlFor='organizationType'>Industry</Label>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant='outline'
                              className='w-full text-left'>
                              {formData.industry || "Select "}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            {industryOptions.map((option) => (
                              <DropdownMenuCheckboxItem
                                key={option}
                                onCheckedChange={() =>
                                  handleDropdownChange("industry", option)
                                }>
                                {option}
                              </DropdownMenuCheckboxItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor='tradeLicence'>Trade licence</Label>
                      <Input
                        id='tradeLicence'
                        value={formData.tradeLicence}
                        onChange={(e) =>
                          handleChange("tradeLicence", e.target.value)
                        }
                        placeholder='Enter your trade license'
                      />
                    </div>

                    <div>
                      <Label htmlFor='organizationType'>Motivation</Label>
                      <Textarea placeholder='can we know why you choose us?' />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className='space-y-2'>
                  <h2 className='text-xl font-semibold text-center'>
                    Confirm Details
                  </h2>
                  {/* Confirmation details */}
                  <p className='text-sm text-center'>
                    Please confirm that all your details are correct.
                  </p>

                  <div className='text-sm'>
                    <p className='p-3'>
                      <strong>Media Name:</strong> {formData.organizationName}
                    </p>

                    <p className='p-3'>
                      <strong>Email:</strong> {formData.email}
                    </p>
                    <p className='p-3'>
                      <strong>Phone Number:</strong> {formData.phoneNumberOne}
                    </p>
                    <p className='p-3'>
                      <strong>Country:</strong> {formData.country}
                    </p>
                    <p className='p-3'>
                      <strong>State:</strong> {formData.state}
                    </p>
                    <p className='p-3'>
                      <strong>City:</strong> {formData.city}
                    </p>
                    <p className='p-3'>
                      <strong>Focus Areas:</strong>{" "}
                      {formData.focusArea.join(", ")}
                    </p>
                    <p className='p-3'>
                      <strong>Interest Areas:</strong>{" "}
                      {formData.interestedArea.join(", ")}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className='flex justify-between mt-8'>
            {currentStep > 0 && (
              <Button variant='outline' onClick={handlePrevious}>
                <ChevronLeft className='mr-2 h-4 w-4' />
                Previous
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button onClick={handleNext}>
                Next
                <ChevronRight className='ml-2 h-4 w-4' />
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button onClick={handleSubmit} className='w-24'>
                Submit
                <Check className='ml-2 h-4 w-4' />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
