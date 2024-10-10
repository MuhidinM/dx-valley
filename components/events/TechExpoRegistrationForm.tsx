/** @format */

"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast, Toaster } from "sonner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Link from "next/link";
import SubmissionSuccess from "../submissionSuccess";
import { CheckCircle2 } from "lucide-react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  jobTitle: string;
  participantType: string;
  eventId: string;
}

const TechExpoRegistrationForm: React.FC = () => {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId") ?? "";

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    jobTitle: "",
    participantType: "",
    eventId: eventId || "",
  });
const [alert, setAlert] = useState<{
  type: "success" | "error";
  message: string;
} | null>(null);

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

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
        setIsSubmitted(true);

        // Optional: Add some test data to localStorage
        localStorage.setItem("testKey", JSON.stringify(formData));
        // console.log("TestKey saved:", localStorage.getItem("testKey"));
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [alert]);
  
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//  const temp = {
//    ...formData,
//    [e.target.name]: e.target.value,
//  };
//  localStorage.setItem("formData", JSON.stringify(temp));
//  setFormData(temp);
//   };




  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const temp = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    localStorage.setItem("formData", JSON.stringify(temp));
    setFormData(temp);
  };


  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (formData.firstName.length < 2)
      newErrors.firstName = "First name must be at least 2 characters";
    if (formData.lastName.length < 2)
      newErrors.lastName = "Last name must be at least 2 characters";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email address";
    if (!/^(\+251\d{9}|\d{10})$/.test(formData.phoneNumber))
      newErrors.phoneNumber =
        "Invalid phone number. Use +251 format or 10 digits";
    if (!formData.participantType)
      newErrors.participantType = "Please select a participant type";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch("/newapi/techexpo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expo: {
            personalInfo: {
              firstName: formData.firstName,
              lastName: formData.lastName,
            },
            contactInfo: {
              email: formData.email,
              phoneNumberOne: formData.phoneNumber,
            },
          },
          companyName: formData.companyName,
          jobTitle: formData.jobTitle,
          participantType: formData.participantType,
          eventId: formData.eventId,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast.success("Registration successful!", {
          description:
            "Your details have been submitted successfully.".toString(),
        });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          companyName: "",
          jobTitle: "",
          participantType: "",
          eventId: eventId,
        });
      } else {
        const errorMessage = await response.json();
        console.error("Error:", errorMessage);
        toast.error("Registration failed", {
          description:
            errorMessage?.error?.message ||
            "An error occurred during registration.",
        });
      }
    } catch (error) {
      console.error("Error registering:", error);
      toast.error("An error occurred", {
        description: "Please try again.",
      });
    }
  };

  const handleValueChange = (name: string) => (value: string) => {
    const temp = {
      ...formData,
      [name]: value, // Dynamically update the specific field in formData
    };
    localStorage.setItem("formData", JSON.stringify(temp));
    setFormData(temp);
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setCurrentStep(1);
    }
  };

  const handleBack = () => {
    setCurrentStep(0);
  };

  const steps = [
    { id: 0, title: "Personal Info" },
    { id: 1, title: "Confirmation" },
  ];

  if (isSubmitted) {
    return (
      // <div className='min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900  p-4'>
      //   <Card className='w-full max-w-md'>
      //     <CardHeader>
      //       <CardTitle className='text-center'>Submission Successful</CardTitle>
      //     </CardHeader>
      //     <CardContent>
      //       <p className='text-center mb-4'>
      //         Thank you for registering for the Tech Expo!
      //       </p>
      //       <Link href='/'>
      //         <Button className='mt-8'>Go Back to Home</Button>
      //       </Link>
      //     </CardContent>
      //   </Card>
      // </div>
      <div
        className=' bg-gray-50  py-28  dark:bg-gray-900 px-4 sm:px-6 lg:px-8 '
        //  className='flex items-center dark:bg-gray-900  justify-center min-h-screen bg-gray-100'
      >
        {/* <div className='bg-white p-8 rounded-lg shadow-md max-w-md w-full'>
          <CheckCircle2 className='w-16 h-16 text-green-500 mx-auto mb-4' />
          <h2 className='text-2xl font-bold text-center mb-4'>
            Registration Successful!
          </h2>
          <p className='text-center text-gray-600'>
            Thank you for registering. Your details have been submitted
            successfully.
          </p>
          <Button
            className='w-full mt-6'
            onClick={() => (window.location.href = "/")}>
            Return to Home
          </Button>
        </div> */}
        <SubmissionSuccess
          title={"Submission Successful!"}
          icon={<CheckCircle2 className='w-8 h-8 text-green' />}
          desc={
            "Thank you for registering. Your details have been submitted successfully."
          }
        />
      </div>
    );
  }

  return (
    <div className='w-full flex items-center justify-center dark:bg-gray-900  bg-gray-100 p-4'>
      <Toaster position='top-right' richColors />
      <Card className='w-full max-w-2xl'>
        <CardHeader>
          <CardTitle className='text-center'>
            Tech Expo Registration Form
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='mb-8'>
            <h2 className='text-2xl font-bold mb-4'>
              {steps[currentStep].title}
            </h2>
            <div className='flex justify-between mb-2'>
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex items-center ${
                    index <= currentStep
                      ? "text-gray-700 dark:text-gray-900"
                      : "text-gray-800 dark:text-gray-950"
                  }`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                      index <= currentStep
                        ? "bg-coopBlue text-white dark:text-gray-900"
                        : "bg-gray-400 text-gray-300 dark:text-gray-900"
                    }`}>
                    {index + 1}
                  </div>
                  <span className='text-md dark:text-gray-300'>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={currentStep === 0 ? handleNext : handleSubmit}>
            {currentStep === 0 && (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <Label htmlFor='firstName'>First Name</Label>
                  <Input
                    id='firstName'
                    name='firstName'
                    value={formData.firstName}
                    // onChange={(e) =>
                    //   setFormData({ ...formData, firstName: e.target.value })
                    // }
                    onChange={handleChange}
                    placeholder='e.g., Jane'
                  />
                  {errors.firstName && (
                    <p className='text-red-500 text-sm mt-1'>
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor='lastName'>Last Name</Label>
                  <Input
                    id='lastName'
                    name='lastName'
                    value={formData.lastName}
                    // onChange={(e) =>
                    //   setFormData({ ...formData, lastName: e.target.value })
                    // }

                    onChange={handleChange}
                    placeholder='e.g., Smith'
                  />
                  {errors.lastName && (
                    <p className='text-red-500 text-sm mt-1'>
                      {errors.lastName}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor='email'>Email Address</Label>
                  <Input
                    id='email'
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='e.g., jane@example.com'
                  />
                  {errors.email && (
                    <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor='phoneNumber'>Phone Number</Label>
                  <Input
                    id='phoneNumber'
                    name='phoneNumber'
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder='e.g., +251123456789 or 0123456789'
                  />
                  {errors.phoneNumber && (
                    <p className='text-red-500 text-sm mt-1'>
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor='companyName'>Company/Organization Name</Label>
                  <Input
                    id='companyName'
                    name='companyName'
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder='e.g., Tech Innovators Inc.'
                  />
                </div>
                <div>
                  <Label htmlFor='jobTitle'>Job Title</Label>
                  <Input
                    id='jobTitle'
                    name='jobTitle'
                    value={formData.jobTitle}
                    onChange={handleChange}
                    placeholder='e.g., Software Engineer'
                  />
                </div>
                <div className='md:col-span-2'>
                  <Label htmlFor='participantType'>Type of Participant</Label>
                  <Select
                    value={formData.participantType}
                    name='participantType'
                    onValueChange={(value) =>
                      setFormData({ ...formData, participantType: value })
                    }>
                    <SelectTrigger id='participantType'>
                      <SelectValue placeholder='Select participant type' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='Exhibitor'>Exhibitor</SelectItem>
                      <SelectItem value='Speaker'>Speaker</SelectItem>
                      <SelectItem value='Attendee'>Attendee</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.participantType && (
                    <p className='text-red-500 text-sm mt-1'>
                      {errors.participantType}
                    </p>
                  )}
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 '>
                <div>
                  {/* <h3 className='font-semibold mb-2'>Personal Info</h3> */}
                  <p>
                    {" "}
                    <strong> First Name:</strong> {formData.firstName}
                  </p>
                  <p>
                    {" "}
                    <strong>Last Name: </strong> {formData.lastName}
                  </p>
                  <p>
                    {" "}
                    <strong>Email:</strong> {formData.email}
                  </p>
                  <p>
                    {" "}
                    <strong>Phone Number: </strong>
                    {formData.phoneNumber}
                  </p>
                  <p>
                    {" "}
                    <strong>Company/Organization Name: </strong>
                    {formData.companyName}
                  </p>
                  <p>
                    <strong>Job Title: </strong>
                    {formData.jobTitle}
                  </p>
                  <p>
                    <strong>Participant Type:</strong>{" "}
                    {formData.participantType}
                  </p>
                </div>
              </div>
            )}

            <div className='flex justify-between mt-8'>
              {currentStep > 0 && (
                <Button type='button' onClick={handleBack} variant='outline'>
                  Back
                </Button>
              )}
              <Button type='submit'>
                {currentStep === steps.length - 1 ? "Submit" : "Next"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TechExpoRegistrationForm;
