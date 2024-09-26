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
import { toast, Toaster } from "sonner";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const steps = [
  { id: "organization", title: "Organization Info" },
  { id: "contact", title: "Organization Info" },
  { id: "confirm", title: "Confirm" },
];

const focusAreaOptions = ["Agriculture", "AI", "Fintech"];
const interestOptions = ["Invest", "Buy startup", "Support vision", "Sponsor"];
const organizationTypeOptions = ["Private", "NGO", "Govermental", "Other"];

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
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

  const handleRadioChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      organizationType: value,
    }));
  };

  const validateStep = () => {
    const newErrors: { [key: string]: string } = {};

    if (currentStep === 0) {
      if (!formData.organizationName) {
        newErrors.organizationName = "Organization name is required  ";
      }

      if (formData.organizationName.length < 4) {
        newErrors.organizationName =
          "Organization name must be at least 4 characters.";
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

      if (!formData.city) {
        newErrors.city = "City is required.";
      }

      if (formData.city.length < 4) {
        newErrors.city = "City must be at least 4 characters";
      }
    } else if (currentStep === 1) {
      if (!formData.focusArea.length) {
        newErrors.focusArea = "At least one focus area is required.";
      }
      if (!formData.interestedArea.length) {
        newErrors.interestedArea = "At least one interest area is required.";
      }
      if (!formData.organizationType) {
        newErrors.organizationType = "Organization type is required.";
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
        const response = await fetch("/newapi/organization", {
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
          // Display the error message received from the server, if available
          const errorMessage =
            errorData.message || "An error occurred. Please try again.";
          toast.error(errorMessage);
        }
      } catch (error) {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center bg-background lg:p-10 md:p-10 p-6">
      <Toaster position="top-right" richColors />
      <Card className="w-full max-w-2xl ">
        <CardHeader>
          {" "}
          <CardTitle className="text-2xl font-bold ">
            <span className="flex justify-center text-3xl md:xl lg:3xl tracking-tight mb-2 font-bold leading-tight underline-offset-auto dark:text-white">
              Organization Registration Form
            </span>
            <div className="flex justify-center">
              <div className="w-20 h-1 bg-coopOrange"></div>
            </div>
          </CardTitle>{" "}
          <div className="mb-8 ">
            <div className="flex justify-between items-center">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index <= currentStep
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {index < currentStep ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className="text-xs mt-1">{step.title}</span>
                </div>
              ))}
            </div>
            <div className="h-2 bg-secondary mt-2 rounded-full">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300 ease-in-out"
                style={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {currentStep === 0 && (
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Label htmlFor="organizationName">
                        Organization Name
                      </Label>
                      <Input
                        id="organizationName"
                        value={formData.organizationName}
                        onChange={(e) =>
                          handleChange("organizationName", e.target.value)
                        }
                        placeholder="Enter Organization name"
                      />
                      {errors.organizationName && (
                        <p className="text-red-500 text-sm">
                          {errors.organizationName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phoneNumberOne">Phone</Label>
                    <Input
                      id="phoneNumberOne"
                      type="tel"
                      value={formData.phoneNumberOne}
                      onChange={(e) =>
                        handleChange("phoneNumberOne", e.target.value)
                      }
                      placeholder="Enter your primary phone number"
                    />
                    {errors.phoneNumberOne && (
                      <p className="text-red-500 text-sm">
                        {errors.phoneNumberOne}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      placeholder="Enter your city"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm">{errors.city}</p>
                    )}
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div>
                  <div className="space-y-4">
                    <Label htmlFor="focusArea">Focus Area</Label>
                    <MultiSelectDropdown
                      options={focusAreaOptions}
                      selectedOptions={formData.focusArea}
                      onOptionChange={(option) =>
                        handleCheckboxChange("focusArea", option)
                      }
                      placeholder="Select focus areas"
                    />
                    {errors.focusArea && (
                      <p className="text-red-500 text-sm">{errors.focusArea}</p>
                    )}

                    <Label htmlFor="interestedArea">Interest Area</Label>
                    <MultiSelectDropdown
                      options={interestOptions}
                      selectedOptions={formData.interestedArea}
                      onOptionChange={(option) =>
                        handleCheckboxChange("interestedArea", option)
                      }
                      placeholder="Select areas of interest"
                    />
                    {errors.interestedArea && (
                      <p className="text-red-500 text-sm">
                        {errors.interestedArea}
                      </p>
                    )}

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="organizationType">
                        Organization Type
                      </Label>
                      <RadioGroup
                        className="m-4 mt gap-2"
                        onValueChange={handleRadioChange}
                        defaultValue={formData.organizationType}
                      >
                        {organizationTypeOptions.map((option) => (
                          <div key={option}>
                            <RadioGroupItem
                              value={option}
                              id={option}
                              className="mr-2"
                            />
                            <Label htmlFor={option}>{option}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                      {errors.organizationType && (
                        <p className="text-red-500 text-sm">
                          {errors.organizationType}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <h2 className="text-xl mb-4 text-center font-semibold">
                    Confirm your details
                  </h2>
                  {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}

                  <div className="space-y-2">
                    {/* Confirm Details */}
                    <div className="text-sm">
                      <p className="p-3">
                        <strong>Organization Name</strong>{" "}
                        {formData.organizationName}
                      </p>
                      <p className="p-3">
                        <strong>Email:</strong> {formData.email}
                      </p>
                      <p className="p-3">
                        <strong>Phone:</strong> {formData.phoneNumberOne}
                      </p>
                      <p className="p-3">
                        <strong>From:</strong> {formData.city}
                      </p>
                      <p className="p-3">
                        <strong>Focus on:</strong> {formData.focusArea}
                      </p>
                      <p className="p-3">
                        <strong>Want to:</strong> {formData.interestedArea}
                      </p>

                      <p className="p-3">
                        <strong>Organization Type:</strong>{" "}
                        {formData.organizationType}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-4">
                <Button
                  variant="secondary"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                {currentStep === steps.length - 1 ? (
                  <Button onClick={handleSubmit}>
                    <Check className="mr-2 h-4 w-4" />
                    Submit
                  </Button>
                ) : (
                  <Button onClick={handleNext}>
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
