/** @format */

"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const steps = [
  { id: "team-info", title: "Team Information" },
  { id: "project-details", title: "Project Details" },
  { id: "confirm", title: "Confirm Info" },
];

interface TeamMember {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

interface FormData {
  LeaderFirstName: string;
  LeaderLastName: string;
  email: string;
  phoneNumber: string;
  teamName: string;
  numberOfMembers: number;
  teamMembers: TeamMember[];
  projectTitle: string;
  projectDescription: string;
  techStack: string;
  projectUrl: string;
  eventId: number;
}

export default function ContestRegistrationForm() {
  const searchParams = useSearchParams();
  // const eventId = searchParams.get("eventId");
  const eventId = 1;

  const [currentStep, setCurrentStep] = useState(0);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    LeaderFirstName: "",
    LeaderLastName: "",
    email: "",
    phoneNumber: "",
    teamName: "",
    numberOfMembers: 1,
    teamMembers: [{ firstName: "", lastName: "", email: "", phoneNumber: "" }],
    projectTitle: "",
    projectDescription: "",
    techStack: "",
    projectUrl: "",
    eventId: eventId,
   
  });

  useEffect(() => {
    if (alert && alert.type === "success") {
      const timer = setTimeout(() => {
        setIsSubmitted(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTeamMemberChange = (
    index: number,
    field: keyof TeamMember,
    value: string
  ) => {
    const updatedMembers = [...formData.teamMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setFormData({ ...formData, teamMembers: updatedMembers });
  };

  const handleNumberOfMembersChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const numberOfMembers = Math.max(
      1,
      Math.min(10, parseInt(e.target.value, 10) || 1)
    );
    setFormData({
      ...formData,
      numberOfMembers,
      teamMembers: Array(numberOfMembers)
        .fill(null)
        .map((_, index) =>
          index < formData.teamMembers.length
            ? formData.teamMembers[index]
            : { firstName: "", lastName: "", email: "", phoneNumber: "" }
        ),
    });
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teamLeader: {
            personalInfo: {
              firstName: formData.LeaderFirstName,
              lastName: formData.LeaderLastName,
            },
            contactInfo: {
              email: formData.email,
              phoneNumberOne: formData.phoneNumber,
            },
          },
          teamName: formData.teamName,
          numberOfMembers: formData.numberOfMembers,
          teamMembers: formData.teamMembers.map((member) => ({
            personalInfo: {
              firstName: member.firstName,
              lastName: member.lastName,
            },
            contactInfo: {
              email: member.email,
              phoneNumberOne: member.phoneNumber,
            },
          })),
          project: {
            projectTitle: formData.projectTitle,
            projectDescription: formData.projectDescription,
            techStack: formData.techStack,
            projectUrl: formData.projectUrl,
          },
          eventId: formData.eventId,
        }),
      });

      if (response.ok) {
        setAlert({
          type: "success",
          message:
            "Registration successful! Your details have been submitted successfully.",
        });
      } else {
        const errorData = await response.json();
        setAlert({
          type: "error",
          message: errorData.error || "An error occurred during registration.",
        });
      }
    } catch (error) {
      console.error("Error registering contest:", error);
      setAlert({
        type: "error",
        message: "An error occurred. Please try again.",
      });
    }
  };

  if (isSubmitted) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gray-100'>
        <div className='bg-white p-8 rounded-lg shadow-md max-w-md w-full'>
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
        </div>
      </div>
    );
  }

  return (
    <div className='w-94 mt-8 mb-8 flex items-center justify-center'>
      <div className='w-full max-w-xl bg-white p-6 rounded-lg shadow-lg'>
        <div className='mb-8 text-center text-2xl font-bold'>
          Register Contest Info
        </div>
        <div className='mb-8 flex justify-between items-center'>
          {steps.map((step, index) => (
            <div key={step.id} className='flex flex-col items-center'>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= currentStep
                    ? "bg-primary text-primary-foreground"
                    : "bg-gray-200 text-gray-500"
                }`}>
                {index + 1}
              </div>
              <span
                className={`mt-2 text-sm ${
                  index <= currentStep
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}>
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={`h-1 w-24 mt-4 ${
                    index < currentStep ? "bg-primary" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {alert && (
          <Alert
            variant={alert.type === "success" ? "default" : "destructive"}
            className='mb-4'>
            {alert.type === "success" ? (
              <CheckCircle2 className='h-4 w-4' />
            ) : (
              <AlertCircle className='h-4 w-4' />
            )}
            <AlertTitle>
              {alert.type === "success" ? "Success" : "Error"}
            </AlertTitle>
            <AlertDescription>{alert.message}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          {currentStep === 0 && (
            <div className='mb-4 space-y-4'>
              <div>
                <Label htmlFor='LeaderFirstName'>Team Leader First Name</Label>
                <Input
                  id='LeaderFirstName'
                  name='LeaderFirstName'
                  value={formData.LeaderFirstName}
                  onChange={handleChange}
                  placeholder="Enter the team leader's first name"
                />
              </div>
              <div>
                <Label htmlFor='LeaderLastName'>Team Leader Last Name</Label>
                <Input
                  id='LeaderLastName'
                  name='LeaderLastName'
                  value={formData.LeaderLastName}
                  onChange={handleChange}
                  placeholder="Enter the team leader's last name"
                />
              </div>
              <div>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='Enter the email'
                />
              </div>
              <div>
                <Label htmlFor='phoneNumber'>Phone Number</Label>
                <Input
                  id='phoneNumber'
                  name='phoneNumber'
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder='Enter the phone number'
                />
              </div>
              <div>
                <Label htmlFor='teamName'>Team Name</Label>
                <Input
                  id='teamName'
                  name='teamName'
                  value={formData.teamName}
                  onChange={handleChange}
                  placeholder='Enter the team name'
                />
              </div>
              <div>
                <Label htmlFor='numberOfMembers'>Number of Members</Label>
                <Input
                  id='numberOfMembers'
                  type='number'
                  name='numberOfMembers'
                  value={formData.numberOfMembers}
                  onChange={handleNumberOfMembersChange}
                  min={1}
                  max={10}
                  placeholder='Enter the number of team members'
                />
              </div>
              {formData.teamMembers.map((member, index) => (
                <div key={index} className='space-y-4'>
                  <h4 className='font-semibold'>Team Member {index + 1}</h4>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <Label>First Name</Label>
                      <Input
                        type='text'
                        value={member.firstName}
                        onChange={(e) =>
                          handleTeamMemberChange(
                            index,
                            "firstName",
                            e.target.value
                          )
                        }
                        placeholder="Enter team member's first name"
                      />
                    </div>
                    <div>
                      <Label>Last Name</Label>
                      <Input
                        type='text'
                        value={member.lastName}
                        onChange={(e) =>
                          handleTeamMemberChange(
                            index,
                            "lastName",
                            e.target.value
                          )
                        }
                        placeholder="Enter team member's last name"
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <Label>Member Email</Label>
                      <Input
                        type='email'
                        value={member.email}
                        onChange={(e) =>
                          handleTeamMemberChange(index, "email", e.target.value)
                        }
                        placeholder="Enter team member's email"
                      />
                    </div>
                    <div>
                      <Label>Member Phone Number</Label>
                      <Input
                        type='text'
                        value={member.phoneNumber}
                        onChange={(e) =>
                          handleTeamMemberChange(
                            index,
                            "phoneNumber",
                            e.target.value
                          )
                        }
                        placeholder="Enter team member's phone number"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {currentStep === 1 && (
            <div className='mb-4 space-y-4'>
              <div>
                <Label htmlFor='projectTitle'>Project Title</Label>
                <Input
                  id='projectTitle'
                  name='projectTitle'
                  value={formData.projectTitle}
                  onChange={handleChange}
                  placeholder='Enter the project title'
                />
              </div>
              <div>
                <Label htmlFor='projectDescription'>Project Description</Label>
                <Textarea
                  id='projectDescription'
                  name='projectDescription'
                  value={formData.projectDescription}
                  onChange={handleChange}
                  placeholder='Enter the project description'
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor='techStack'>Tech Stack</Label>
                <Input
                  id='techStack'
                  name='techStack'
                  value={formData.techStack}
                  onChange={handleChange}
                  placeholder='Enter the tech stack'
                />
              </div>
              <div>
                <Label htmlFor='projectUrl'>Project URL</Label>
                <Input
                  id='projectUrl'
                  name='projectUrl'
                  value={formData.projectUrl}
                  onChange={handleChange}
                  placeholder='Enter the project URL'
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className='mb-4 space-y-2'>
              <h3 className='text-xl font-semibold mb-4'>
                Confirm Your Information
              </h3>
              <p>
                <strong>Team Leader Name:</strong> {formData.LeaderFirstName}{" "}
                {formData.LeaderLastName}
              </p>
              <p>
                <strong>Email:</strong> {formData.email}
              </p>
              <p>
                <strong>Phone Number:</strong> {formData.phoneNumber}
              </p>
              <p>
                <strong>Team Name:</strong> {formData.teamName}
              </p>
              <p>
                <strong>Number of Members:</strong> {formData.numberOfMembers}
              </p>
              <p>
                <strong>Team Members:</strong>
              </p>
              <ul className='list-disc list-inside'>
                {formData.teamMembers.map((member, index) => (
                  <li key={index}>
                    {member.firstName} {member.lastName} - {member.email} -{" "}
                    {member.phoneNumber}
                  </li>
                ))}
              </ul>
              <p>
                <strong>Project Title:</strong> {formData.projectTitle}
              </p>
              <p>
                <strong>Project Description:</strong>{" "}
                {formData.projectDescription}
              </p>
              <p>
                <strong>Tech Stack:</strong> {formData.techStack}
              </p>
              <p>
                <strong>Project URL:</strong> {formData.projectUrl}
              </p>
            </div>
          )}

          <div className='flex justify-between'>
            {currentStep > 0 && (
              <Button type='button' onClick={handlePrevious} variant='outline'>
                Previous
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button type='button' onClick={handleNext}>
                Next
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button type='submit'>Submit</Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
