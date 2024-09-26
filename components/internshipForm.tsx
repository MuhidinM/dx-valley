/** @format */

"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChangeEvent, useState } from "react";
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
    <div className="mb-10">
      <div className="flex justify-between mb-2 gap-4">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center ">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold sm:w-3 sm:h-5 lg:w-10 lg:h-10 md:w-10 md:h-10  xs:w-5 xs:h-5 ${
                step.number === currentStep
                  ? "bg-coopBlue text-white"
                  : step.number < currentStep
                  ? "bg-coopBlue text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {step.number}
            </div>
            <span className="mt-2 text-xs text-center flex flex-warp">
              {step.title}
            </span>
          </div>
        ))}
      </div>
      <div className="relative">
        <div className="absolute top-0 left-0 h-2 rounded-full bg-gray-200 w-full"></div>
        <div
          className="absolute top-0 left-0 h-2 bg-coopBlue  rounded-full transition-all duration-300 ease-in-out"
          style={{
            width: `${(currentStep / steps.length) * 100}%`,
          }}
        ></div>
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
  gender: string;
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
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [step, setStep] = useState(1);
  const [documents, setDocuments] = useState<FileWithPreview[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleChange = (
    name: keyof FormData,
    value: string,
    index: number | null = null
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData((prevState) => {
      const updatedInterests = checked
        ? [...prevState.interestAreas, value]
        : prevState.interestAreas.filter((interest) => interest !== value);
      return { ...prevState, [name]: updatedInterests };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );
      setFormData((prev) => ({
        ...prev,
        documents: [...prev.documents, ...newFiles],
      }));
    }
  };

  const removeFile = (index: number) => {
    setDocuments((prev) => {
      const newDocs = [...prev];
      URL.revokeObjectURL(newDocs[index].preview as string);
      newDocs.splice(index, 1);
      return newDocs;
    });
  };

  //validation

  const validateStep = (step: number): Errors => {
    let stepErrors: Errors = {};

    switch (step) {
      case 1: // Step 1: Personal Information
        if (!formData.firstName.trim()) {
          stepErrors.firstName = "First name is required";
        }
        if (!formData.lastName.trim()) {
          stepErrors.lastName = "Last name is required";
        }
        if (!formData.email.trim()) {
          stepErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          stepErrors.email = "Email is invalid";
        }
        if (!formData.phone.trim()) {
          stepErrors.phone = "Phone number is required";
        }
        if (!formData.gender.trim()) {
          stepErrors.gender = "Gender is required";
        }
        if (!formData.aboutYourself.trim()) {
          stepErrors.aboutYourself = "Information about yourself is required";
        }
        break;

      case 2: // Step 2: Education
        if (!formData.university.trim()) {
          stepErrors.university = "University is required";
        }
        if (!formData.department.trim()) {
          stepErrors.department = "Department is required";
        }
        if (!formData.year.trim()) {
          stepErrors.year = "Year of study is required";
        }
        break;

      case 3: // Step 3: Internship Details
        if (!formData.internshipStart.trim()) {
          stepErrors.internshipStart = "Internship start date is required";
        }
        if (!formData.internshipEnd.trim()) {
          stepErrors.internshipEnd = "Internship end date is required";
        }
        if (formData.interestAreas.length === 0) {
          stepErrors.interestAreas =
            "At least one area of interest must be selected";
        }

        if (!formData.documents || formData.documents.length === 0) {
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
    setIsSubmitting(true);

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
    formValues.append("linkedin", formData.linkedin);

    formData.documents.forEach((doc, index) => {
      formValues.append(`documents[${index}]`, doc);
    });

    formData.interestAreas.forEach((area) => {
      formValues.append("interestAreas", area);
    });

    try {
      // Send the data to the server or API
      const response = await fetch("/newapi/internship", {
        method: "POST",
        body: formValues,
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      // Handle successful submission
      setIsSubmitted(true);
      setIsSubmitting(false);
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  if (isSubmitted) {
    return (
      <div className=" bg-gray-50  py-28  dark:bg-gray-900 px-4 sm:px-6 lg:px-8 ">
        <div>
          <SubmissionSuccess
            title={"Submission Successful!"}
            icon={<CheckCircle2 className="w-8 h-8 text-green" />}
            desc={
              "Application submitted successfully. We will get back to you shortly."
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 h-1/2">
      <Card className="w-full max-w-4xl mx-auto  dark:bg-gray-950">
        <CardHeader>
          <CardTitle>Internship Application</CardTitle>
          <CardDescription>
            Apply for an internship and be empowered by the mentorship and
            support of the dynamic DX Valley family.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProgressIndicator currentStep={step} />
          <form onSubmit={handleSubmit} className="space-y-8">
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">
                  1. Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleChange("firstName", e.target.value)
                      }
                      placeholder="Enter your first name"
                      required
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-500">{errors.firstName}</p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      placeholder="Enter your last name"
                      required
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-500">{errors.lastName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      type="email"
                      placeholder="Enter your email"
                      required
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      type="tel"
                      placeholder="Enter your phone number"
                      required
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>

                  {/* Gender */}
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      onValueChange={(value) => handleChange("gender", value)}
                      value={formData.gender}
                    >
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select your gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.gender && (
                      <p className="text-sm text-red-500">{errors.gender}</p>
                    )}
                  </div>
                </div>

                {/* About Yourself */}
                <div className="space-y-2">
                  <Label htmlFor="aboutYourself">Tell us about yourself</Label>
                  <Textarea
                    id="aboutYourself"
                    name="aboutYourself"
                    value={formData.aboutYourself}
                    onChange={(e) =>
                      handleChange("aboutYourself", e.target.value)
                    }
                    placeholder="Tell us about yourself"
                    rows={4}
                  />
                  {errors.aboutYourself && (
                    <p className="text-sm text-red-500">
                      {errors.aboutYourself}
                    </p>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">2. Education</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* University */}
                  <div className="space-y-2">
                    <Label htmlFor="university">University</Label>
                    <Input
                      id="university"
                      name="university"
                      value={formData.university}
                      onChange={(e) =>
                        handleChange("university", e.target.value)
                      }
                      placeholder="Enter your university"
                      required
                    />
                    {errors.university && (
                      <p className="text-sm text-red-500">
                        {errors.university}
                      </p>
                    )}
                  </div>

                  {/* Department */}
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={(e) =>
                        handleChange("department", e.target.value)
                      }
                      placeholder="Enter your Department"
                      required
                    />
                    {errors.department && (
                      <p className="text-sm text-red-500">
                        {errors.department}
                      </p>
                    )}
                  </div>

                  {/* Year */}
                  <div className="space-y-2">
                    <Label htmlFor="year">Year of Study</Label>
                    <Select
                      onValueChange={(value) => handleChange("year", value)}
                      value={formData.year}
                    >
                      <SelectTrigger id="year">
                        <SelectValue placeholder="Select your year of study" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">First Year</SelectItem>
                        <SelectItem value="2">Second Year</SelectItem>
                        <SelectItem value="3">Third Year</SelectItem>
                        <SelectItem value="4">Fourth Year</SelectItem>
                        <SelectItem value="5">Fifth Year or above</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.year && (
                      <p className="text-sm text-red-500">{errors.year}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">3. Internship Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Internship Start */}
                  <div className="space-y-2">
                    <Label htmlFor="internshipStart">
                      Internship Start Date
                    </Label>
                    <Input
                      id="internshipStart"
                      name="internshipStart"
                      value={formData.internshipStart}
                      onChange={(e) =>
                        handleChange("internshipStart", e.target.value)
                      }
                      type="date"
                      required
                    />
                    {errors.internshipStart && (
                      <p className="text-sm text-red-500">
                        {errors.internshipStart}
                      </p>
                    )}
                  </div>

                  {/* Internship End */}
                  <div className="space-y-2">
                    <Label htmlFor="internshipEnd">Internship End Date</Label>
                    <Input
                      id="internshipEnd"
                      name="internshipEnd"
                      value={formData.internshipEnd}
                      onChange={(e) =>
                        handleChange("internshipEnd", e.target.value)
                      }
                      type="date"
                      required
                    />
                    {errors.internshipEnd && (
                      <p className="text-sm text-red-500">
                        {errors.internshipEnd}
                      </p>
                    )}
                  </div>
                </div>

                {/* Interest Areas */}
                <div className="space-y-2">
                  <Label>Areas of Interest</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {interestAreaOptions.map((interest) => (
                      <div
                        key={interest}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          id={`interest-${interest}`}
                          name="interestAreas"
                          value={interest}
                          checked={formData.interestAreas.includes(interest)}
                          onChange={handleCheckboxChange} // Make sure this is only for checkboxes
                        />
                        <Label htmlFor={`interest-${interest}`}>
                          {interest}
                        </Label>
                        {errors.interestAreas && (
                          <p className="text-sm text-red-500">
                            {errors.interestAreas}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Other Interests */}
                <div className="space-y-2">
                  <Label htmlFor="otherInterests">
                    Other Areas of Interest
                  </Label>
                  <Input
                    id="otherInterests"
                    name="otherInterests"
                    value={formData.otherInterests}
                    onChange={(e) =>
                      handleChange("otherInterests", e.target.value)
                    }
                    placeholder="Enter any other areas of interest not listed above"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Portfolio</Label>
                  <Input
                    id="portfolio"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={(e) => handleChange("portfolio", e.target.value)}
                    placeholder="http://yourportfolio.com"
                    required
                  />
                  {errors.portfolio && (
                    <p className="text-sm text-red-500">{errors.portfolio}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Upload Request Letter from your university</Label>
                  <Input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                  />
                  {errors.documents && (
                    <p className="text-sm text-red-500">{errors.documents}</p>
                  )}

                  <ul>
                    {documents.map((file, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <span>{file.name}</span>
                        <button type="button" onClick={() => removeFile(index)}>
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}

            <div className="flex justify-between">
              {step > 1 && (
                <Button type="button" onClick={prevStep} variant="outline">
                  Previous
                </Button>
              )}
              {step < 3 ? (
                <Button type="button" onClick={handleNext} className="ml-auto">
                  Next
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  className="ml-auto bg-coopBlue"
                >
                  Submit Application
                  {/* {isSubmitting ? "Submitting..." : "Submit Application"} */}
                </Button>
              )}
            </div>
          </form>
          {/* <Dialog open={isSubmitting} onOpenChange={setIsSubmitting}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Submission</DialogTitle>
                <DialogDescription>
                  Are you sure you want to submit your application? Please
                  review all information before confirming.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsSubmitting(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    //   document.querySelector("form")?.requestSubmit();
                    //   setIsSubmitting(false); // Reset isSubmitting state to false
                    setIsSubmitted(true);
                  }}
                >
                  {!isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {!isSubmitting ? "Submitting..." : "Confirm Submission"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog> */}
        </CardContent>
      </Card>
    </div>
  );
}
