/** @format */

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast, Toaster } from "sonner"; // Import the toast function
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

const steps = [
  { id: "trainer", title: "Trainer Info" },
  { id: "confirm", title: "Confirm" },
];

const titleOptions = ["Mr", "Ms", "Dr", "Prof"];

type FormData = {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumberOne: string;
  expertise: string;
  profession: string;
  schedule: string;
  motivation: string;
  city: string;
  state: string;
  country: string;
};

export default function TrainerRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumberOne: "",
    expertise: "",
    profession: "",
    schedule: "",
    motivation: "",
    country: "",
    city: "",
    state: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDropdownChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep = () => {
    const newErrors: { [key: string]: string } = {};

    if (currentStep === 0) {
      // Validate first name
      if (!formData.firstName) {
        newErrors.firstName = "First name is required.";
      } else if (formData.firstName.length < 4) {
        newErrors.firstName = "First name must be at least 4 characters.";
      }

      // Validate last name
      if (!formData.lastName) {
        newErrors.lastName = "Last name is required.";
      } else if (formData.lastName.length < 4) {
        newErrors.lastName = "Last name must be at least 4 characters.";
      }

      // Validate email
      if (!formData.email) {
        newErrors.email = "Email is required.";
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          newErrors.email = "Invalid email format.";
        }
      }

      // Validate phone number
      if (!formData.phoneNumberOne) {
        newErrors.phoneNumberOne = "Phone number is required.";
      } else if (formData.phoneNumberOne.length < 10) {
        newErrors.phoneNumberOne = "Phone number must be at least 10 digits.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    if (validateStep()) {
      try {
        const response = await fetch("/api/trainer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();
        if (response.ok) {
          toast.success("Registration successful!", {
            description: "Your details have been submitted successfully.",
          });
        } else {
          toast.error("Registration failed", {
            description:
              result?.message || "An error occurred during registration.",
          });
        }
      } catch (error) {
        console.error("Request error:", error);
        toast.error("Registration failed", {
          description: "An error occurred. Please try again later.",
        });
      }
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-background p-4'>
      <Toaster position='top-right' richColors />
      <Card className='w-full max-w-2xl'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold text-center'>
            {/* <span className='flex justify-center text-3xl tracking-tight mb-2 font-bold leading-tight underline-offset-auto dark:text-white'> */}
            <span className='flex justify-center text-2xl lg:3xl tracking-tight mb-2 font-bold leading-tight underline-offset-auto dark:text-white'>
              Trainer Registration Form
            </span>
            <div className='flex justify-center'>
              <div className='w-20 h-1 bg-coopOrange'></div>
            </div>
          </CardTitle>
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
        </CardHeader>
        <CardContent>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}>
              {currentStep === 0 && (
                <div className='space-y-4'>
                  <div className='flex gap-4 flex-col lg:flex-row'>
                    <div className='flex-1'>
                      <Label htmlFor='firstName'>First Name</Label>
                      <Input
                        id='firstName'
                        value={formData.firstName}
                        onChange={(e) =>
                          handleChange("firstName", e.target.value)
                        }
                        placeholder='Enter your first name'
                      />
                      {errors.firstName && (
                        <p className='text-red-500 text-sm'>
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div className='flex-1'>
                      <Label htmlFor='lastName'>Last Name</Label>
                      <Input
                        id='lastName'
                        value={formData.lastName}
                        onChange={(e) =>
                          handleChange("lastName", e.target.value)
                        }
                        placeholder='Enter your last name'
                      />
                      {errors.lastName && (
                        <p className='text-red-500 text-sm'>
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className='flex gap-4 flex-col lg:flex-row'>
                    <div className='flex-1'>
                      <Label htmlFor='email'>Email</Label>
                      <Input
                        id='email'
                        type='email'
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder='Enter your email'
                      />
                      {errors.email && (
                        <p className='text-red-500 text-sm'>{errors.email}</p>
                      )}
                    </div>
                    <div className='flex-1'>
                      <Label htmlFor='phoneNumberOne'>Phone Number</Label>
                      <Input
                        id='phoneNumberOne'
                        type='tel'
                        value={formData.phoneNumberOne}
                        onChange={(e) =>
                          handleChange("phoneNumberOne", e.target.value)
                        }
                        placeholder='Enter your phone number'
                      />
                      {errors.phoneNumberOne && (
                        <p className='text-red-500 text-sm'>
                          {errors.phoneNumberOne}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className='flex gap-4'>
                    <div className='flex-1'>
                      <Label htmlFor='profession'>Profession</Label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant='outline'
                            className='w-full text-left'>
                            {formData.profession || "Select Profession"}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {professionOptions.map((option) => (
                            <DropdownMenuCheckboxItem
                              key={option}
                              onCheckedChange={() =>
                                handleDropdownChange("profession", option)
                              }>
                              {option}
                            </DropdownMenuCheckboxItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      {errors.profession && (
                        <p className='text-red-500 text-sm'>
                          {errors.profession}
                        </p>
                      )}
                    </div>

                    <div className='flex-1 flex-col lg:flex-row'>
                      <Label htmlFor='schedule'>Schedule</Label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant='outline'
                            className='w-full text-left'>
                            {formData.schedule || "Select Schedule"}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {scheduleOptions.map(({ value, description }) => (
                            <DropdownMenuCheckboxItem
                              key={value}
                              onCheckedChange={() =>
                                handleDropdownChange("schedule", value)
                              }>
                              {description}
                            </DropdownMenuCheckboxItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <div className='flex gap-4 flex-col lg:flex-row'>
                    <div className='flex-1'>
                      <Label htmlFor='expertise'>Expertise</Label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant='outline'
                            className='w-full text-left'>
                            {formData.expertise || "Select Expertise"}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {expertiseOptions.map((option) => (
                            <DropdownMenuCheckboxItem
                              key={option}
                              onCheckedChange={() =>
                                handleDropdownChange("expertise", option)
                              }>
                              {option}
                            </DropdownMenuCheckboxItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className='flex-1'>
                      <Label htmlFor='country'>City</Label>

                      <Input
                        id='city'
                        value={formData.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                        placeholder='Enter your city'
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {/* <div>
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
                    </div> */}
                  </div>

                  <div>
                    <Label htmlFor='motivation'>Description</Label>
                    <Textarea
                      id='motivation'
                      value={formData.motivation}
                      onChange={(e) =>
                        handleChange("motivation", e.target.value)
                      }
                      placeholder='Tell us about yourself'
                    />
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className='space-y-2'>
                  {/* Confirm Details */}
                  <div className='text-sm'>
                    <p className='p-3'>
                      {/* <strong>Title:</strong> {formData.title} */}
                    </p>
                    <p className='p-3'>
                      <strong>First Name:</strong> {formData.firstName}
                    </p>
                    <p className='p-3'>
                      <strong>Last Name:</strong> {formData.lastName}
                    </p>
                    <p className='p-3'>
                      <strong>Email:</strong> {formData.email}
                    </p>
                    <p className='p-3'>
                      <strong>Phone Number:</strong> {formData.phoneNumberOne}
                    </p>
                    <p className='p-3'>
                      <strong>City:</strong> {formData.country}
                    </p>

                    <p className='p-3'>
                      <strong>Expertise:</strong> {formData.expertise}
                    </p>
                    <p className='p-3'>
                      <strong>Profession:</strong> {formData.profession}
                    </p>
                    <p className='p-3'>
                      <strong>Schedule:</strong> {formData.schedule}
                    </p>
                    <p className='p-3'>
                      <strong>Description:</strong> {formData.motivation}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className='flex justify-between mt-8'>
            {currentStep > 0 && (
              <Button variant='outline' onClick={handlePrevious}>
                <ChevronLeft className='mr-2' /> Previous
              </Button>
            )}
            {currentStep < steps.length - 1 ? (
              <Button onClick={handleNext}>
                Next <ChevronRight className='ml-2' />
              </Button>
            ) : (
              <Button onClick={handleSubmit}>
                Submit <Check className='ml-2' />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
