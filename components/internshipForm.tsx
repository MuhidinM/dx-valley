/** @format */

"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChangeEvent, useState, useRef, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast, Toaster } from "sonner";

import { X, Loader2, CheckCircle2 } from "lucide-react";
import SubmissionSuccess from "./submissionSuccess";

type FileWithPreview = File & { preview?: string };

const techStackOptions = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Java",
  "C++",
  "SQL",
  "NoSQL",
  "AWS",
  "Docker",
  "Kubernetes",
  "Machine Learning",
  "Artificial Intelligence",
  "Blockchain",
];

const interestAreaOptions = [
  "Frontend Development",
  "Backend Development",
  "Mobile Development",
  "Artificial Intelligence",
];

const ProgressIndicator = ({ currentStep }: { currentStep: number }) => {
  const steps = [
    { number: 1, title: "Personal Info" },
    { number: 2, title: "Education" },
    { number: 3, title: "Internship Details" },
  ];

  return (
    <div className='mb-10'>
      <div className='flex justify-between mb-2 gap-4'>
        {steps.map((step) => (
          <div key={step.number} className='flex flex-col items-center '>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold sm:w-3 sm:h-5 lg:w-10 lg:h-10 md:w-10 md:h-10  xs:w-5 xs:h-5 ${
                step.number === currentStep
                  ? "bg-coopBlue text-white"
                  : step.number < currentStep
                  ? "bg-coopBlue text-white"
                  : "bg-gray-200 text-gray-600"
              }`}>
              {step.number}
            </div>
            <span className='mt-2 text-xs text-center flex flex-warp'>
              {step.title}
            </span>
          </div>
        ))}
      </div>
      <div className='relative'>
        <div className='absolute top-0 left-0 h-2 rounded-full bg-gray-200 w-full'></div>
        <div
          className='absolute top-0 left-0 h-2 bg-coopBlue  rounded-full transition-all duration-300 ease-in-out'
          style={{
            width: `${(currentStep / steps.length) * 100}%`,
          }}></div>
      </div>
    </div>
  );
};
interface Errors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  gender?: string;
  aboutYourself?: string;
  university?: string;
  department?: string;
  year?: string;
  internshipStart?: string;
  internshipEnd?: string;
  interestAreas?: string;
  portfolio?: string;
  documents?: string;
}
interface FormData {
  firstName: string;
  lastName: string;
  gender:string;
  email: string;
  phone: string;
  aboutYourself: string;
  university: string;
  department: string;
  year: string;
  internshipStart: string;
  internshipEnd: string;
  // interestAreas: [];
  interestAreas: string[];
  otherInterests: string;
  portfolio: string;
  linkedin: string;
  documents: File[];
}

export default function InternshipForm() {
  const [step, setStep] = useState(1);

  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const documentInputRef = useRef<HTMLInputElement | null>(null);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    aboutYourself: "",
    university: "",
    department: "",
    year: "",
    internshipStart: "",
    internshipEnd: "",
    interestAreas: [],
    otherInterests: "",
    portfolio: "",
    linkedin: "",
    documents: [],
  });

  // On component mount, load saved form data from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedFormData = localStorage.getItem("formData");

     if (savedFormData) {
       // Check if savedFormData is a valid JSON string before parsing
       try {
         setFormData(JSON.parse(savedFormData));
       } catch (error) {
         console.error("Error parsing saved form data:", error);
         // Handle the error, possibly setting formData to a default state
       }
     } else {
       console.warn("No saved form data found.");
     } 
      // To check if 'testKey' is persisted after refresh
      const testKey = localStorage.getItem("formData");
      if (testKey) {
        //  console.log("testKey:", testKey); // Optional check for testKey
      }
    }
  }, []);

  // Submission success logic, if alert is success, set submission state
  useEffect(() => {
    if (alert && alert?.type === "success") {
      const timer = setTimeout(() => {
        setIsSubmitted(true);

        // Optional: Add some test data to localStorage
        localStorage.setItem("testKey to set submission state", JSON.stringify(formData));
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
const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
  const { name, value, checked } = e.target;

  setFormData((prevState) => {
    // Ensure interestAreas is an array
    const interestAreas = prevState.interestAreas || [];

    const updatedInterests = checked
      ? [...interestAreas, value]
      : interestAreas.filter((interest) => interest !== value);

    return { ...prevState, [name]: updatedInterests };
  });
};


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files || []);

      // Filter out files larger than 5MB (5 * 1024 * 1024 bytes)
      const validFiles = newFiles.filter(
        (file) => file.size <= 5 * 1024 * 1024
      );

      if (validFiles.length !== newFiles.length) {
        // Optionally, you can alert the user or display a message for invalid files
        toast.error(
          "Some files were too large (over 5MB) and have been excluded."
        );
      }

      // Update state with valid files
   setFormData((prev) => ({
     ...prev,
     documents: [...(prev.documents || []), ...validFiles], // Ensure documents is an array
   }));

    }
  };

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index),
    }));
  };
  //validation

  const validateStep = (step: number): Errors => {
    let stepErrors: Errors = {};

    switch (step) {
      case 1: // Step 1: Personal Information
        if (!formData.firstName?.trim()) {
          stepErrors.firstName = "First name is required";
        }
        if (!formData.lastName?.trim()) {
          stepErrors.lastName = "Last name is required";
        }
        if (!formData.email.trim()) {
          stepErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          stepErrors.email = "Email is invalid";
        }
        if (!formData.phone?.trim()) {
          stepErrors.phone = "Phone number is required";
        }
        if (!formData.gender?.trim()) {
          stepErrors.gender = "Gender is required";
        }
        if (!formData.aboutYourself?.trim()) {
          stepErrors.aboutYourself = "Information about yourself is required";
        }
        break;

      case 2: // Step 2: Education
        if (!formData.university?.trim()) {
          stepErrors.university = "University is required";
        }
        if (!formData.department?.trim()) {
          stepErrors.department = "Department is required";
        }
        if (!formData.year?.trim()) {
          stepErrors.year = "Year of study is required";
        }
        break;

      case 3: // Step 3: Internship Details
        if (!formData.internshipStart?.trim()) {
          stepErrors.internshipStart = "Internship start date is required";
        }
        if (!formData.internshipEnd?.trim()) {
          stepErrors.internshipEnd = "Internship end date is required";
        }
        if (formData.interestAreas?.length === 0) {
          stepErrors.interestAreas =
            "At least one area of interest must be selected";
        }

        if (!formData.documents || formData.documents?.length === 0) {
          stepErrors.documents = "At least one document is required";
        }
        break;

      default:
        break;
    }

    return stepErrors;
  };

  const handleNext = () => {
    const stepErrors = validateStep(step);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setErrors({});
    setStep((prevStep) => Math.min(prevStep + 1, 4));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setIsSubmitting(true);

    const stepErrors = validateStep(step);

    // If there are validation errors, display them and prevent submission
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setErrors({});

    const formValues = new FormData();
    formValues.append("firstName", formData.firstName);
    formValues.append("lastName", formData.lastName);
    formValues.append("email", formData.email);
    formValues.append("phone", formData.phone);
    formValues.append("gender", formData.gender);
    formValues.append("aboutYourself", formData.aboutYourself);
    formValues.append("university", formData.university);
    formValues.append("department", formData.department);
    formValues.append("year", formData.year);
    formValues.append("internshipStart", formData.internshipStart);
    formValues.append("internshipEnd", formData.internshipEnd);
    formValues.append("otherInterests", formData.otherInterests);
    formValues.append("portfolio", formData.portfolio);
    // formValues.append("linkedin", formData.linkedin);

    formData.documents.forEach((doc, index) => {
      formValues.append(`documents[${index}]`, doc);
    });

    formData.interestAreas?.forEach((area) => {
      formValues.append("interestAreas", area);
    });

    // try {
    //   // Send the data to the server or API
    //   const response = await fetch("/newapi/internship", {
    //      method: "POST",
    //      body: formValues,
    //     // headers: {
    //     //   "Content-Type": "application/json",
    //     // },
    //     // body: JSON.stringify(formData),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Failed to submit application");
    //   }

    //   // Handle successful submission
    //   setIsSubmitted(true);
    //   setIsSubmitting(false);
    // } catch (error) {
    //   console.error(error);
    //   setIsSubmitting(false);
    // }

    try {
      const response = await fetch("/newapi/internship", {
        method: "POST",
        body: formValues, // No need to set Content-Type, the browser does it automatically
      });

      const result = await response.json();
      if (response.status === 200) {
        localStorage.setItem("formData", "");
        setIsSubmitted(true);
        toast.success("Registration successful!", {
          description: "Your details have been submitted successfully.",
        });
        localStorage.setItem("formData", "");
        //  console.log("Internship form was successfully submitted");
      } else {
        toast.error("Registration failed", {
          description: result?.error,
        });
        setIsSubmitted(false);
        // console.log("Internship form error on submission");
      }
      // console.log(result);
    } catch (error) {
      console.error("Error submitting form", error);
      setIsSubmitted(false);
    }
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  if (isSubmitted) {
    return (
      <div className=' bg-gray-50  py-28  dark:bg-gray-900 px-4 sm:px-6 lg:px-8 '>
        <div>
          <SubmissionSuccess
            title={"Submission Successful!"}
            icon={<CheckCircle2 className='w-8 h-8 text-green' />}
            desc={
              "Application submitted successfully. We will get back to you shortly."
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className='bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 h-1/2'>
      <Card className='w-full max-w-4xl mx-auto  dark:bg-gray-950'>
        <CardHeader>
          <CardTitle>Internship Application</CardTitle>
          <CardDescription>
            Apply for an internship and be empowered by the mentorship and
            support of the dynamic DxValley family.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProgressIndicator currentStep={step} />
          <form onSubmit={handleSubmit} className='space-y-8'>
            {step === 1 && (
              <div className='space-y-4'>
                <h3 className='text-xl font-semibold'>
                  1. Personal Information
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {/* First Name */}
                  <div className='space-y-2'>
                    <Label htmlFor='firstName'>First Name</Label>
                    <Input
                      id='firstName'
                      name='firstName'
                      value={formData.firstName}
                      onChange={(e) =>
                        handleChange("firstName", e.target.value)
                      }
                      placeholder='Enter your first name'
                      required
                    />
                    {errors.firstName && (
                      <p className='text-sm text-red-500'>{errors.firstName}</p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className='space-y-2'>
                    <Label htmlFor='lastName'>Last Name</Label>
                    <Input
                      id='lastName'
                      name='lastName'
                      value={formData.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      placeholder='Enter your last name'
                      required
                    />
                    {errors.lastName && (
                      <p className='text-sm text-red-500'>{errors.lastName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className='space-y-2'>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                      id='email'
                      name='email'
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      type='email'
                      placeholder='Enter your email'
                      required
                    />
                    {errors.email && (
                      <p className='text-sm text-red-500'>{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className='space-y-2'>
                    <Label htmlFor='phone'>Phone Number</Label>
                    <Input
                      id='phone'
                      name='phone'
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      type='tel'
                      placeholder='Enter your phone number'
                      required
                    />
                    {errors.phone && (
                      <p className='text-sm text-red-500'>{errors.phone}</p>
                    )}
                  </div>

                  {/* Gender */}
                  <div className='space-y-2'>
                    <Label htmlFor='gender'>Gender</Label>
                    <Select
                      onValueChange={(value) => handleChange("gender", value)}
                      value={formData.gender}>
                      <SelectTrigger id='gender'>
                        <SelectValue placeholder='Select your gender' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='male'>Male</SelectItem>
                        <SelectItem value='female'>Female</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.gender && (
                      <p className='text-sm text-red-500'>{errors.gender}</p>
                    )}
                  </div>
                </div>
               

                {/* About Yourself */}
                <div className='space-y-2'>
                  <Label htmlFor='aboutYourself'>Tell us about yourself</Label>
                  <Textarea
                    id='aboutYourself'
                    name='aboutYourself'
                    value={formData.aboutYourself}
                    onChange={(e) =>
                      handleChange("aboutYourself", e.target.value)
                    }
                    placeholder='Tell us about yourself'
                    rows={4}
                  />
                  {errors.aboutYourself && (
                    <p className='text-sm text-red-500'>
                      {errors.aboutYourself}
                    </p>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className='space-y-4'>
                <h3 className='text-xl font-semibold'>2. Education</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {/* University */}
                  <div className='space-y-2'>
                    <Label htmlFor='university'>University</Label>
                    <Input
                      id='university'
                      name='university'
                      value={formData.university}
                      onChange={(e) =>
                        handleChange("university", e.target.value)
                      }
                      placeholder='Enter your university'
                      required
                    />
                    {errors.university && (
                      <p className='text-sm text-red-500'>
                        {errors.university}
                      </p>
                    )}
                  </div>

                  {/* Department */}
                  <div className='space-y-2'>
                    <Label htmlFor='department'>Department</Label>
                    <Input
                      id='department'
                      name='department'
                      value={formData.department}
                      onChange={(e) =>
                        handleChange("department", e.target.value)
                      }
                      placeholder='Enter your Department'
                      required
                    />
                    {errors.department && (
                      <p className='text-sm text-red-500'>
                        {errors.department}
                      </p>
                    )}
                  </div>

                  {/* Year */}
                  <div className='space-y-2'>
                    <Label htmlFor='year'>Year of Study</Label>
                    <Select
                      onValueChange={(value) => handleChange("year", value)}
                      value={formData.year}>
                      <SelectTrigger id='year'>
                        <SelectValue placeholder='Select your year of study' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='1'>First Year</SelectItem>
                        <SelectItem value='2'>Second Year</SelectItem>
                        <SelectItem value='3'>Third Year</SelectItem>
                        <SelectItem value='4'>Fourth Year</SelectItem>
                        <SelectItem value='5'>Fifth Year or above</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.year && (
                      <p className='text-sm text-red-500'>{errors.year}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className='space-y-4'>
                <h3 className='text-xl font-semibold'>3. Internship Details</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {/* Internship Start */}
                  <div className='space-y-2'>
                    <Label htmlFor='internshipStart'>
                      Internship Start Date
                    </Label>
                    <Input
                      id='internshipStart'
                      name='internshipStart'
                      value={formData.internshipStart}
                      onChange={(e) =>
                        handleChange("internshipStart", e.target.value)
                      }
                      type='date'
                      required
                    />
                    {errors.internshipStart && (
                      <p className='text-sm text-red-500'>
                        {errors.internshipStart}
                      </p>
                    )}
                  </div>

                  {/* Internship End */}
                  <div className='space-y-2'>
                    <Label htmlFor='internshipEnd'>Internship End Date</Label>
                    <Input
                      id='internshipEnd'
                      name='internshipEnd'
                      value={formData.internshipEnd}
                      onChange={(e) =>
                        handleChange("internshipEnd", e.target.value)
                      }
                      type='date'
                      required
                    />
                    {errors.internshipEnd && (
                      <p className='text-sm text-red-500'>
                        {errors.internshipEnd}
                      </p>
                    )}
                  </div>
                </div>

                {/* Interest Areas */}
                <div className='space-y-2'>
                  <Label>Areas of Interest</Label>
                  <div className='grid grid-cols-2 md:grid-cols-2 gap-5 mb-2'>
                    {interestAreaOptions.map((interest) => (
                      <div
                        key={interest}
                        className='flex items-center space-x-2'>
                        <Input
                       
                          type='checkbox'
                          id={`interest-${interest}`}
                          name='interestAreas'
                          value={interest}
                          checked={formData.interestAreas?.includes(interest)}
                          onChange={handleCheckboxChange} // Make sure this is only for checkboxes
                        />
                        <Label htmlFor={`interest-${interest}`}>
                          {interest}
                        </Label>
                        {errors.interestAreas && (
                          <p className='text-sm text-red-500'>
                            {errors.interestAreas}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Other Interests */}

                <div className='grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-3'>
                  <div className='space-y-2'>
                    <Label htmlFor='otherInterests'>
                      Other Areas of Interest
                    </Label>
                    <Input
                      id='otherInterests'
                      name='otherInterests'
                      value={formData.otherInterests}
                      onChange={(e) =>
                        handleChange("otherInterests", e.target.value)
                      }
                      placeholder='Enter any other areas of interest not listed above'
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='lastName'>Portfolio URL</Label>
                    <Input
                      id='portfolio'
                      name='portfolio url'
                      value={formData.portfolio}
                      onChange={(e) =>
                        handleChange("portfolio", e.target.value)
                      }
                      placeholder='http://yourportfolio.com'
                      required
                    />
                    {errors.portfolio && (
                      <p className='text-sm text-red-500'>{errors.portfolio}</p>
                    )}
                  </div>
                </div>
                <div className='space-y-2'>
                  <Label>Upload Request Letter from your university</Label>
                  <Input
                    type='file'
                    multiple
                    accept='.pdf'
                    onChange={handleFileChange}
                    ref={documentInputRef}
                  />
                  {errors.documents && (
                    <p className='text-sm text-red-500'>{errors.documents}</p>
                  )}

                  <ul>
                    {formData.documents?.map((doc, index) => (
                      <div
                        key={index}
                        className='flex items-center justify-between'>
                        <span>{doc.name}</span>
                        <Button
                          type='button'
                          variant='ghost'
                          onClick={() => removeFile(index)}>
                          <X className='h-4 w-4' />
                        </Button>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}

            <div className='flex justify-between'>
              {step > 1 && (
                <Button type='button' onClick={prevStep} variant='outline'>
                  Previous
                </Button>
              )}
              {step < 3 ? (
                <Button type='button' onClick={handleNext} className='ml-auto'>
                  Next
                </Button>
              ) : (
                <Button
                  type='button'
                  onClick={handleSubmit}
                  className='ml-auto bg-coopBlue'>
                  Submit Application
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
