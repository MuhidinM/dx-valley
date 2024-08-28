"use client";
import React, { useState } from "react";
import { PrismaClient } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
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

const prisma = new PrismaClient();

const TechExpoRegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
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

    dietaryPreferences: "",
    specialAccommodations: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/techexpo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration successful!");
        setFormData({
          fullName: "",
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

          dietaryPreferences: "",
          specialAccommodations: "",
        });
      } else {
        alert("Failed to register");
      }
    } catch (error) {
      console.error("Error registering:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <Card className="admin-event w-[900px]">
      <CardHeader>
        <CardTitle className="text-center">
          Tech Expo Registration Form
        </CardTitle>
        {/* <CardDescription>Description</CardDescription> */}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="teamLeaderName">Full Name</Label>

              <Input
                type="text"
                placeholder="e.g., Jane Smith"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
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
              <Label htmlFor="company">Company/Organization Name</Label>
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
              <Label htmlFor="jobtitle">Job Title</Label>
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
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Exhibitor">Exhibitor</SelectItem>
                  <SelectItem value="Speaker">Speaker</SelectItem>
                  <SelectItem value="Attendee">Attendee</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Exhibitor */}
            {formData.participantType === "Exhibitor" && (
              <>
                <div className="flex flex-col space-y-1.5">
                  <Label>Setup Requirements:</Label>
                  <Textarea
                    placeholder="e.g., power requirements, internet access, etc."
                    value={formData.setupRequirements}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        setupRequirements: e.target.value,
                      })
                    }
                  ></Textarea>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label>Product/Service Name:</Label>
                  <Input
                    type="text"
                    placeholder="e.g., AI-powered Chatbot"
                    value={formData.productName}
                    onChange={(e) =>
                      setFormData({ ...formData, productName: e.target.value })
                    }
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label>Product/Service Description:</Label>
                  <Textarea
                    placeholder="Describe the product or service you'll be showcasing..."
                    value={formData.productDescription}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        productDescription: e.target.value,
                      })
                    }
                  ></Textarea>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label>Website URL:</Label>
                  <Input
                    type="url"
                    placeholder="e.g., https://yourproduct.com"
                    value={formData.websiteUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, websiteUrl: e.target.value })
                    }
                  />
                </div>
              </>
            )}
            {formData.participantType === "Speaker" && (
              <>
                <div className="flex flex-col space-y-1.5">
                  <Label>Presentation Title:</Label>
                  <Input
                    type="text"
                    placeholder="e.g., The Future of AI in Healthcare"
                    value={formData.presentationTitle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        presentationTitle: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label>Abstract/Summary of Presentation:</Label>
                  <Textarea
                    placeholder="Brief summary of your presentation..."
                    value={formData.presentationAbstract}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        presentationAbstract: e.target.value,
                      })
                    }
                  ></Textarea>
                </div>
              </>
            )}
          </div>

          <Button className="admin-event-btn bg-coopBlue text-white font-bold cursor-pointer px-6 py-2 hover:bg-amber-500">
            Register
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TechExpoRegistrationForm;
