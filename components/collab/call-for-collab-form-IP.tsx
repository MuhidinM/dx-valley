/** @format */

import React, { useState, useEffect } from "react";
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

const steps = [
  { id: "organization", title: "Tell us about yourself" },
  { id: "confirm", title: "Confirm details" },
];

const focusAreaOptions = ["Agriculture", "AI", "Fintech"];
const interestOptions = ["Invest", "Buy startup", "Support vision", "Sponsor"];

type FormData = {
  firstName: string;
  lastName: string;
  motivation: string;
  focusArea: string[];
  interestedArea: string[];
  city: string;
  state: string;
  country: string;
  email: string;
  phoneNumberOne: string;

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
        <Button variant="outline" className="w-full justify-between">
          {selectedOptions.length > 0
            ? selectedOptions.join(", ")
            : placeholder}
          <ChevronRight className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option}
            checked={selectedOptions.includes(option)}
            onCheckedChange={(checked) => {
              if (checked) onOptionChange(option);
            }}
          >
            {option}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default function IndependentRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    motivation: "",
    focusArea: [],
    interestedArea: [],
    city: "",
    state: "",
    country: "",
    email: "",
    phoneNumberOne: "",
     });


  const handleCheckboxChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => {
      const updatedValues = (prev[name] as string[]).includes(value)
        ? (prev[name] as string[]).filter((item) => item !== value)
        : [...(prev[name] as string[]), value];
      return { ...prev, [name]: updatedValues };
    });
  };

  const [errors, setErrors] = useState<{ [key: string]: string }>({});


     const [alert, setAlert] = useState<{
       type: "success" | "error";
       message: string;
     } | null>(null);
     // On component mount, load saved form data from localStorage
     useEffect(() => {
       if (typeof window !== "undefined") {
         const savedFormData = localStorage.getItem("formData");

         // console.log("saved form data this: 1", savedFormData);
         if (savedFormData) {
           setFormData(JSON.parse(savedFormData));
           localStorage.setItem(
             "formData savedFormData",
             JSON.stringify(savedFormData)
           );
         }

         // To check if 'testKey' is persisted after refresh
         const testKey = localStorage.getItem("formData");
         if (testKey) {
           // console.log("testKey:", testKey); // Optional check for testKey
         }
       }
     }, []);

     // Submission success logic, if alert is success, set submission state
     useEffect(() => {
       if (alert && alert?.type === "success") {
         const timer = setTimeout(() => {
           // Optional: Add some test data to localStorage
           localStorage.setItem("testKey", JSON.stringify(formData));
           // console.log("TestKey saved:", localStorage.getItem("testKey"));
         }, 2000);

         return () => clearTimeout(timer);
       }
     }, [alert]);

     const handleChange = (name: keyof FormData, value: string) => {
       // Update the formData state
       setFormData((prevState) => {
         const updatedFormData = {
           ...prevState,
           [name]: value,
         };

         // Synchronize the updated formData with localStorage
         localStorage.setItem("formData", JSON.stringify(updatedFormData));

         return updatedFormData; // Return the updated state
       });
     };




  // const handleChange = (name: keyof FormData, value: string) => {
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

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

      if (!formData.email) {
        newErrors.email = "Email is required.";
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          newErrors.email = "Invalid email format.";
        }
      }

      if (!formData.phoneNumberOne) {
        newErrors.phoneNumberOne = "Phone number is required.";
      }

      if (formData.phoneNumberOne.length < 10) {
        newErrors.phoneNumberOne = "phone number cannot be less than.";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
        const response = await fetch("/newapi/independentpartner", {
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
          setFormData({
            firstName: "",
            lastName: "",
            motivation: "",
            focusArea: [],
            interestedArea: [],
            city: "",
            state: "",
            country: "",
            email: "",
            phoneNumberOne: "",
          });
          handleNext();
        } else {
          console.error("Error:", result);
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
    <div className='flex items-center justify-center min-h-screen bg-background p-4 '>
      <Toaster position='top-right' richColors />
      <Card className='w-full max-w-2xl  min-h-[700px]'>
        <CardHeader>
          <CardTitle className='text-2xl lg:text-3xl md:text-3xl font-bold text-center'>
            {/* <span className='flex justify-center text-3xl tracking-tight mb-2 font-bold leading-tight underline-offset-auto dark:text-white'> */}
            <span className='flex justify-center text-xl lg:text-2xl md:text-2  xl tracking-tight mb-2 font-bold leading-tight underline-offset-auto dark:text-white'>
              Partner Registration Form
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

          <div className=''>
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
                    <div className='flex flex-col lg:flex-row gap-4'>
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
                          onChange={(e) =>
                            handleChange("email", e.target.value)
                          }
                          placeholder='Enter your email'
                        />
                        {errors.email && (
                          <p className='text-red-500 text-sm'>{errors.email}</p>
                        )}
                      </div>
                      <div className='flex-1'>
                        <Label htmlFor='phoneNumberOne'>Phone</Label>
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

                    <div className='flex-1'>
                      <Label htmlFor='country'>City</Label>
                      <Input
                        id='city'
                        value={formData.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                        placeholder='Enter your city'
                      />
                    </div>
                    <div className='flex gap-4 flex-col lg:flex-row'>
                      <div className='flex-1'>
                        <Label className='mb-2 block'>Focus Area</Label>
                        <MultiSelectDropdown
                          options={focusAreaOptions}
                          selectedOptions={formData.focusArea}
                          onOptionChange={(option) =>
                            handleCheckboxChange("focusArea", option)
                          }
                          placeholder='Select focus area'
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
                          placeholder='Select interest area'
                        />
                      </div>
                    </div>

                    <div className='flex-col lg:flex-row'>
                      <Label className='mb-2 block'>Motivation for Collaboration</Label>
                      <Textarea
                        id='motivation'
                        value={formData.motivation}
                        onChange={(e) =>
                          handleChange("motivation", e.target.value)
                        }
                        placeholder='What motivates you to work with us'
                      />
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className='space-y-2'>
                    {/* Confirm Details */}

                    {/* <h2 className='text-xl font-semibold text-center'>Confirm Details</h2>
                
                    <p className='text-sm text-center'>
                      Please confirm that all your details are correct.
                    </p> */}

                    <div className='text-sm'>
                      <p className='p-3'>
                        <strong>First Name:</strong> {formData.firstName}
                      </p>
                      <p className='p-3'>
                        <strong>Second Name:</strong> {formData.lastName}
                      </p>
                      <p className='p-3'>
                        <strong>Email:</strong> {formData.email}
                      </p>
                      <p className='p-3'>
                        <strong>Phone Number:</strong> {formData.phoneNumberOne}
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
                      <p className='p-3'>
                        <strong>Motivation:</strong> {formData.motivation}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className='flex justify-between mt-8 self-end align-bottom'>
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
