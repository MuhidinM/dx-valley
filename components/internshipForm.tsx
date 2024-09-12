/** @format */

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

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
import { X, CheckCircle, Loader2, CheckCircle2 } from "lucide-react";
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
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Cloud Computing",
  "DevOps",
  "Cybersecurity",
  "UI/UX Design",
  "Artificial Intelligence",
  "Internet of Things",
  "Robotics",
];

const ProgressIndicator = ({ currentStep }: { currentStep: number }) => {
  const steps = [
    { number: 1, title: "Personal Info" },
    { number: 2, title: "Education" },
    { number: 3, title: "Internship Details" },
    { number: 4, title: "Additional Info" },
  ];

  return (
    <div className='mb-8'>
      <div className='flex justify-between mb-2'>
        {steps.map((step) => (
          <div key={step.number} className='flex flex-col items-center'>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                step.number === currentStep
                  ? "bg-coopBlue text-white"
                  : step.number < currentStep
                  ? "bg-coopBlue text-white"
                  : "bg-gray-200 text-gray-600"
              }`}>
              {step.number}
            </div>
            <span className='mt-2 text-xs text-center'>{step.title}</span>
          </div>
        ))}
      </div>
      <div className='relative'>
        <div className='absolute top-0 left-0 h-2 rounded-full bg-gray-200 w-full'></div>
        <div
          className='absolute top-0 left-0 h-2 bg-coopBlue  rounded-full transition-all duration-300 ease-in-out'
          style={{
            // width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            width: `${((currentStep ) / steps.length) * 100}%`,
          }}></div>
      </div>
    </div>
  );
};


export default function InternshipForm() {
  const [step, setStep] = useState(1);
  const [documents, setDocuments] = useState<FileWithPreview[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );
      setDocuments((prev) => [...prev, ...newFiles]);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
     setIsSubmitted(false);
    // Simulate API call
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    // setIsSubmitting(false);
    // setIsSubmitted(false);
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  if (isSubmitted) {
    return (
      <div className=' bg-gray-50 py-28  px-4 sm:px-6 lg:px-8 '>
        <div>
          <SubmissionSuccess
            title={"Submission Successful!"}
            icon={<CheckCircle2 className='w-8 h-8 text-green' />}
            desc={"Application submitted successfully. We will get back to you shortly."}
          />
        </div>
      </div>
    );
  }

  return (
    <div className=' bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 h-1/2'>
      <Card className='w-full max-w-4xl mx-auto'>
        <CardHeader>
          <CardTitle>Internship Application</CardTitle>
          <CardDescription>
            Apply for an internship and be empowered by the mentorship and
            support of the dynamic DX Valley family.
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
                  <div className='space-y-2'>
                    <Label htmlFor='fullName'>Full Name</Label>
                    <Input
                      id='fullName'
                      name='fullName'
                      placeholder='Enter your full name'
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                      id='email'
                      name='email'
                      type='email'
                      placeholder='Enter your email'
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='phone'>Phone Number</Label>
                    <Input
                      id='phone'
                      name='phone'
                      type='tel'
                      placeholder='Enter your phone number'
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='city'>City</Label>
                    <Input
                      id='city'
                      name='city'
                      placeholder='Enter your city'
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='gender'>Gender</Label>
                    <Select name='gender'>
                      <SelectTrigger id='gender'>
                        <SelectValue placeholder='Select your gender' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='male'>Male</SelectItem>
                        <SelectItem value='female'>Female</SelectItem>
                        <SelectItem value='non-binary'>Non-binary</SelectItem>
                        <SelectItem value='other'>Other</SelectItem>
                        <SelectItem value='prefer-not-to-say'>
                          Prefer not to say
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='aboutYourself'>Tell us about yourself</Label>
                  <Textarea
                    id='aboutYourself'
                    name='aboutYourself'
                    placeholder='Share a brief introduction about yourself, your background, and your career aspirations'
                    rows={4}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className='space-y-4'>
                <h3 className='text-xl font-semibold'>2. Education</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {/* <div className='space-y-2'>
                  <Label htmlFor='educationLevel'>Education Level</Label>
                  <RadioGroup
                    defaultValue='undergrad'
                    id='educationLevel'
                    name='educationLevel'>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='undergrad' id='undergrad' />
                      <Label htmlFor='undergrad'>Undergraduate</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='grad' id='grad' />
                      <Label htmlFor='grad'>Graduate</Label>
                    </div>
                  </RadioGroup>
                </div> */}
                  <div className='space-y-2'>
                    <Label htmlFor='university'>University</Label>
                    <Input
                      id='university'
                      name='university'
                      placeholder='Enter your university'
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='department'>Department</Label>
                    {/* <Select name='department'>
                      <SelectTrigger id='department'>
                        <SelectValue placeholder='Select department' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='software'>
                          Software Development
                        </SelectItem>
                        <SelectItem value='data'>Data Science</SelectItem>
                        <SelectItem value='design'>UX/UI Design</SelectItem>
                        <SelectItem value='marketing'>
                          Digital Marketing
                        </SelectItem>
                        <SelectItem value='business'>
                          Business Development
                        </SelectItem>
                      </SelectContent>
                    </Select> */}
                    <Input
                      id='department'
                      name='department'
                      placeholder='Enter your Department'
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='major'>Major/Field of Study</Label>
                    <Input
                      id='major'
                      name='major'
                      placeholder='Enter your major'
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='year'>Year of Study</Label>
                    <Select name='year'>
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
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='graduationDate'>
                      Expected Graduation Date
                    </Label>
                    <Input
                      id='graduationDate'
                      name='graduationDate'
                      type='month'
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className='space-y-4'>
                <h3 className='text-xl font-semibold'>3. Internship Details</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='internshipStart'>
                      Internship Start Date
                    </Label>
                    <Input
                      id='internshipStart'
                      name='internshipStart'
                      type='date'
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='internshipEnd'>Internship End Date</Label>
                    <Input
                      id='internshipEnd'
                      name='internshipEnd'
                      type='date'
                      required
                    />
                  </div>
                </div>
                <div className='space-y-2'>
                  <Label>Tech Stack</Label>
                  <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
                    {techStackOptions.map((tech) => (
                      <div key={tech} className='flex items-center space-x-2'>
                        <Checkbox
                          id={`tech-${tech}`}
                          name='techStack'
                          value={tech}
                        />
                        <Label htmlFor={`tech-${tech}`}>{tech}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='space-y-2'>
                  <Label>Areas of Interest</Label>
                  <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
                    {interestAreaOptions.map((interest) => (
                      <div
                        key={interest}
                        className='flex items-center space-x-2'>
                        <Checkbox
                          id={`interest-${interest}`}
                          name='interestAreas'
                          value={interest}
                        />
                        <Label htmlFor={`interest-${interest}`}>
                          {interest}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='otherInterests'>
                    Other Areas of Interest
                  </Label>
                  <Input
                    id='otherInterests'
                    name='otherInterests'
                    placeholder='Enter any other areas of interest not listed above'
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='project-idea'>Project Idea</Label>
                  <Textarea
                    id='project-idea'
                    name='project-idea'
                    placeholder="Describe a project idea you'd like to work on during your internship"
                    rows={4}
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className='space-y-4'>
                <h3 className='text-xl font-semibold'>
                  4. Additional Information
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='portfolio'>Portfolio URL</Label>
                    <Input
                      id='portfolio'
                      name='portfolio'
                      type='url'
                      placeholder='https://your-portfolio.com'
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='linkedin'>LinkedIn Profile URL</Label>
                    <Input
                      id='linkedin'
                      name='linkedin'
                      type='url'
                      placeholder='https://www.linkedin.com/in/your-profile'
                    />
                  </div>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='documents'>Upload Documents</Label>
                  <Input
                    id='documents'
                    name='documents'
                    type='file'
                    multiple
                    onChange={handleFileChange}
                    className='file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90'
                  />
                  {documents.length > 0 && (
                    <ul className='mt-2 space-y-2'>
                      {documents.map((doc, index) => (
                        <li
                          key={index}
                          className='flex items-center justify-between p-2 bg-muted rounded-md'>
                          <span className='text-sm text-muted-foreground truncate'>
                            {doc.name}
                          </span>
                          <Button
                            type='button'
                            variant='ghost'
                            size='icon'
                            onClick={() => removeFile(index)}
                            className='h-8 w-8'>
                            <X className='h-4 w-4' />
                            <span className='sr-only'>Remove file</span>
                          </Button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}

            <div className='flex justify-between'>
              {step > 1 && (
                <Button type='button' onClick={prevStep} variant='outline'>
                  Previous
                </Button>
              )}
              {step < 4 ? (
                <Button type='button' onClick={nextStep} className='ml-auto'>
                  Next
                </Button>
              ) : (
                <Button
                  type='button'
                  onClick={handleSubmit}
                  className='ml-auto bg-coopBlue'>
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              )}
            </div>
          </form>

          <Dialog open={isSubmitting} onOpenChange={setIsSubmitting}>
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
                  variant='outline'
                  onClick={() => setIsSubmitting(false)}>
                  Cancel
                </Button>

                <Button
                  onClick={() => {
                    //   document.querySelector("form")?.requestSubmit();
                    //   setIsSubmitting(false); // Reset isSubmitting state to false
                    setIsSubmitted(true);
                  }}>
                  {!isSubmitting ? (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  ) : null}
                  {!isSubmitting ? "Submitting..." : "Confirm Submission"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}