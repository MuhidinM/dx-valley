"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Toaster } from "sonner";

interface TeamMember {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  jobTitle: string;
  participantType: string;
  setupRequirements: string;
  presentationTitle: string;
  presentationAbstract: string;
  productName: string;
  productDescription: string;
  websiteUrl: string;
  eventId: string;
  haveATeam: boolean;
  teamMembers: TeamMember[];
}

const TechExpoRegistrationForm: React.FC = () => {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId") || "";

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    jobTitle: "",
    participantType: "",
    setupRequirements: "",
    presentationTitle: "",
    presentationAbstract: "",
    productName: "",
    productDescription: "",
    websiteUrl: "",
    eventId: eventId,
    haveATeam: false,
    teamMembers: [{ firstName: "", lastName: "", email: "", phoneNumber: "" }],
  });

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [confirming, setConfirming] = useState<boolean>(false);

  const handleTeamMemberChange = (
    index: number,
    field: keyof TeamMember,
    value: string
  ) => {
    const updatedTeamMembers = [...formData.teamMembers];
    updatedTeamMembers[index] = {
      ...updatedTeamMembers[index],
      [field]: value,
    };
    setFormData({ ...formData, teamMembers: updatedTeamMembers });
  };

  const addTeamMember = () => {
    setFormData({
      ...formData,
      teamMembers: [
        ...formData.teamMembers,
        { firstName: "", lastName: "", email: "", phoneNumber: "" },
      ],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/techexpo", {
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
          haveATeam: formData.haveATeam,
          teamMembers: formData.haveATeam
            ? formData.teamMembers.map((member) => ({
                personalInfo: {
                  firstName: member.firstName,
                  lastName: member.firstName,
                },

                contactInfo: {
                  email: member.email,
                  phoneNumberOne: member.phoneNumber,
                },
              }))
            : [],
          project: {
            productName: formData.productName,
            productDescription: formData.productDescription,
            websiteUrl: formData.websiteUrl,
          },
          companyName: formData.companyName,
          jobTitle: formData.jobTitle,
          participantType: formData.participantType,
          setup: {
            setupRequirements: formData.setupRequirements,
          },
          presentation: {
            presentationTitle: formData.presentationTitle,
            presentationAbstract: formData.presentationAbstract,
          },
          eventId: formData.eventId,
          // teamMembers: formData.haveATeam ? formData.teamMembers : [{ firstName: "", lastName: "", email: "", phoneNumber: "" },],
        }),
      });

      if (response.ok) {
        alert("Registration successful!");
        toast.success("Registration successful!", {
          description: "Your details have been submitted successfully.",
        });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          companyName: "",
          jobTitle: "",
          participantType: "",
          setupRequirements: "",
          presentationTitle: "",
          presentationAbstract: "",
          productName: "",
          productDescription: "",
          websiteUrl: "",
          eventId: "",
          haveATeam: false,
          teamMembers: [
            { firstName: "", lastName: "", email: "", phoneNumber: "" },
          ],
        });
        setCurrentStep(0);
      } else {
        const errorMessage = await response.json();
        console.error("Error:", errorMessage);
        toast.error("Registration failed", {
          description:
            errorMessage?.error || "An error occurred during registration.",
        });
      }
    } catch (error) {
      console.error("Error registering:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleBack = () => {
    setConfirming(false);
    setCurrentStep(currentStep - 1);
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const steps = [
    { id: 0, title: "Personal Info" },
    {
      id: 1,
      title:
        formData.participantType === "Exhibitor"
          ? "Project Details"
          : formData.participantType === "Speaker"
          ? "Presentation Details"
          : "",
    },
    {
      id: 2,
      title:
        formData.participantType === "Exhibitor"
          ? "Team Info"
          : formData.participantType === "Speaker"
          ? "Additional Info"
          : "",
    },
    { id: 3, title: "Confirmation" },
  ];

  return (
    <div>
      <Toaster position="top-right" richColors />
      <Card className="admin-event w-[900px]">
        <CardHeader>
          <CardTitle className="text-center">
            Tech Expo Registration Form
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 text-center">
            {steps.map((step, index) => (
              <span
                key={step.id}
                className={`mx-2 ${
                  index <= currentStep ? "text-[#00ADEF]" : "text-gray-500"
                }`}
              >
                {step.title}
              </span>
            ))}
          </div>

          {currentStep === 0 && (
            <form onSubmit={handleNext}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    type="text"
                    placeholder="e.g., Jane Smith"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    type="text"
                    placeholder="e.g., Smith"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    type="email"
                    placeholder="e.g., janesmith@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    type="tel"
                    placeholder="e.g., +1234567890"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="companyName">Company/Organization Name</Label>
                  <Input
                    type="text"
                    placeholder="e.g., Tech Innovators Inc."
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    type="text"
                    placeholder="e.g., Software Engineer"
                    value={formData.jobTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, jobTitle: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label>Type of Participant</Label>
                  <Select
                    value={formData.participantType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, participantType: value })
                    }
                    required
                  >
                    <SelectTrigger id="participantType">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="Exhibitor">Exhibitor</SelectItem>
                      <SelectItem value="Speaker">Speaker</SelectItem>
                      <SelectItem value="Attendee">Attendee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <Button type="submit">Next</Button>
              </div>
            </form>
          )}

          {currentStep === 1 && (
            <form onSubmit={handleNext}>
              {formData.participantType === "Attendee" && (
                <>
                  <div>
                    <h2 className="text-xl font-bold mb-4">
                      Review Your Details
                    </h2>
                    <div className="mb-4">
                      <p>First Name: {formData.firstName}</p>
                      <p>Last Name: {formData.lastName}</p>
                      <p>Email: {formData.email}</p>
                      <p>Phone Number: {formData.phoneNumber}</p>
                      <p>Company/Organization Name: {formData.companyName}</p>
                      <p>Job Title: {formData.jobTitle}</p>
                    </div>
                  </div>
                  <div className="flex justify-between mt-4">
                    <Button type="button" onClick={handleBack}>
                      Back
                    </Button>
                    <Button type="button" onClick={handleSubmit}>
                      Confirm and Submit
                    </Button>
                  </div>
                </>
              )}
              {formData.participantType === "Speaker" && (
                <>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="presentationTitle">
                      Presentation Title
                    </Label>
                    <Input
                      type="text"
                      placeholder="e.g., The Future of AI"
                      value={formData.presentationTitle}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          presentationTitle: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="presentationAbstract">
                      Presentation Abstract
                    </Label>
                    <Textarea
                      placeholder="Provide a brief abstract of your presentation."
                      value={formData.presentationAbstract}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          presentationAbstract: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="flex justify-between mt-4">
                    <Button type="button" onClick={handlePrevious}>
                      Back
                    </Button>
                    <Button type="submit">Next</Button>
                  </div>
                </>
              )}
              {formData.participantType === "Exhibitor" && (
                <>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="setupRequirements">
                      Setup Requirements
                    </Label>
                    <Textarea
                      placeholder="Specify any setup requirements for your booth."
                      value={formData.setupRequirements}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          setupRequirements: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="productName">Product/Service Name</Label>
                    <Input
                      type="text"
                      placeholder="e.g., AI Chatbot"
                      value={formData.productName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          productName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="productDescription">
                      Product/Service Description
                    </Label>
                    <Textarea
                      placeholder="Provide a description of your product/service."
                      value={formData.productDescription}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          productDescription: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="websiteUrl">Website URL</Label>
                    <Input
                      type="url"
                      placeholder="e.g., https://www.yourcompany.com"
                      value={formData.websiteUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, websiteUrl: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="flex justify-between mt-4">
                    <Button type="button" onClick={handlePrevious}>
                      Back
                    </Button>
                    <Button type="submit">Next</Button>
                  </div>
                </>
              )}
            </form>
          )}

          {currentStep === 2 && (
            <form onSubmit={handleNext}>
              <div className="flex flex-col space-y-1.5">
                <Label>Do you have a team?</Label>
                <Checkbox
                  checked={formData.haveATeam}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, haveATeam: !!checked })
                  }
                />
              </div>
              {formData.haveATeam && (
                <>
                  <div className="flex flex-col space-y-1.5">
                    <Label>Team Members</Label>
                    {formData.teamMembers.map((member, index) => (
                      <div key={index} className="border p-4 mb-4">
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor={`teamMemberFirstName${index}`}>
                            First Name
                          </Label>
                          <Input
                            type="text"
                            id={`teamMemberFirstName${index}`}
                            placeholder="e.g., John"
                            value={member.firstName}
                            onChange={(e) =>
                              handleTeamMemberChange(
                                index,
                                "firstName",
                                e.target.value
                              )
                            }
                            required
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor={`teamMemberLastName${index}`}>
                            Last Name
                          </Label>
                          <Input
                            type="text"
                            id={`teamMemberLastName${index}`}
                            placeholder="e.g., Doe"
                            value={member.lastName}
                            onChange={(e) =>
                              handleTeamMemberChange(
                                index,
                                "lastName",
                                e.target.value
                              )
                            }
                            required
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor={`teamMemberEmail${index}`}>
                            Email
                          </Label>
                          <Input
                            type="email"
                            id={`teamMemberEmail${index}`}
                            placeholder="e.g., john@example.com"
                            value={member.email}
                            onChange={(e) =>
                              handleTeamMemberChange(
                                index,
                                "email",
                                e.target.value
                              )
                            }
                            required
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor={`teamMemberPhone${index}`}>
                            Phone Number
                          </Label>
                          <Input
                            type="tel"
                            id={`teamMemberPhone${index}`}
                            placeholder="e.g., +1234567890"
                            value={member.phoneNumber}
                            onChange={(e) =>
                              handleTeamMemberChange(
                                index,
                                "phoneNumber",
                                e.target.value
                              )
                            }
                            required
                          />
                        </div>
                      </div>
                    ))}
                    <Button type="button" onClick={addTeamMember}>
                      Add Team Member
                    </Button>
                  </div>
                </>
              )}
              <div className="flex justify-between mt-4">
                <Button type="button" onClick={handlePrevious}>
                  Back
                </Button>
                <Button type="submit">Next</Button>
              </div>
            </form>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Review Your Details</h2>
              <div className="mb-4">
                <h3 className="font-semibold">Personal Info</h3>
                <p>First Name: {formData.firstName}</p>
                <p>Last Name: {formData.lastName}</p>
                <p>Email: {formData.email}</p>
                <p>Phone Number: {formData.phoneNumber}</p>
                <p>Company/Organization Name: {formData.companyName}</p>
                <p>Job Title: {formData.jobTitle}</p>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold">Project Details</h3>

                {formData.participantType === "Speaker" && (
                  <>
                    <p>Presentation Title: {formData.presentationTitle}</p>
                    <p>
                      Presentation Abstract: {formData.presentationAbstract}
                    </p>
                  </>
                )}
                {formData.participantType === "Exhibitor" && (
                  <>
                    <p>Setup Requirements: {formData.setupRequirements}</p>
                    <p>Product/Service Name: {formData.productName}</p>
                    <p>
                      Product/Service Description: {formData.productDescription}
                    </p>
                    <p>Website URL: {formData.websiteUrl}</p>
                  </>
                )}
              </div>
              <div className="mb-4">
                {formData.haveATeam && (
                  <>
                    <h3 className="font-semibold">Team Members</h3>
                    {formData.teamMembers.map((member, index) => (
                      <div key={index}>
                        <p>Team Member {index + 1}:</p>
                        <p>First Name: {member.firstName}</p>
                        <p>Last Name: {member.lastName}</p>
                        <p>Email: {member.email}</p>
                        <p>Phone Number: {member.phoneNumber}</p>
                      </div>
                    ))}
                  </>
                )}
              </div>
              <div className="flex justify-between mt-4">
                <Button type="button" onClick={handleBack}>
                  Back
                </Button>
                <Button type="button" onClick={handleSubmit}>
                  Confirm and Submit
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TechExpoRegistrationForm;
