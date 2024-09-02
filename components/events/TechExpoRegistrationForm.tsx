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
import { useSearchParams } from "next/navigation";

const TechExpoRegistrationForm = () => {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");

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
    eventId: eventId || "",
  });

  const [confirming, setConfirming] = useState(false); // State to track if the user is in confirmation step

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
          eventId: "",
        });
        setConfirming(false); // Reset the confirmation step
      } else {
        alert("Failed to register");
      }
    } catch (error) {
      console.error("Error registering:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirming(true); // Move to the confirmation step
  };

  const handleBack = () => {
    setConfirming(false); // Go back to the form for editing
  };

  return (
    <Card className="admin-event w-[900px]">
      <CardHeader>
        <CardTitle className="text-center">
          Tech Expo Registration Form
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!confirming ? (
          <form onSubmit={handleConfirm}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="fullName">Full Name</Label>
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
              {formData.participantType === "Exhibitor" && (
                <>
                  <div className="flex flex-col space-y-1.5">
                    <Label>Setup Requirements</Label>
                    <Textarea
                      placeholder="e.g., power requirements, internet access, etc."
                      value={formData.setupRequirements}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          setupRequirements: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label>Product/Service Name</Label>
                    <Input
                      type="text"
                      placeholder="e.g., AI-powered Chatbot"
                      value={formData.productName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          productName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label>Product/Service Description</Label>
                    <Textarea
                      placeholder="Describe the product or service you'll be showcasing..."
                      value={formData.productDescription}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          productDescription: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label>Website URL</Label>
                    <Input
                      type="url"
                      placeholder="e.g., https://yourproduct.com"
                      value={formData.websiteUrl}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          websiteUrl: e.target.value,
                        })
                      }
                    />
                  </div>
                </>
              )}
              {formData.participantType === "Speaker" && (
                <>
                  <div className="flex flex-col space-y-1.5">
                    <Label>Presentation Title</Label>
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
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label>Presentation Abstract</Label>
                    <Textarea
                      placeholder="Provide a brief abstract of your presentation..."
                      value={formData.presentationAbstract}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          presentationAbstract: e.target.value,
                        })
                      }
                    />
                  </div>
                </>
              )}
            </div>
            <CardFooter className="pt-6">
              <Button
                type="submit"
                className="bg-[#00adef] hover:bg-[#E38524] text-white font-bold"
              >
                Proceed to Confirmation
              </Button>
            </CardFooter>
          </form>
        ) : (
          <div className="confirmation-step">
            <h2 className="text-xl font-bold mb-4">Confirm Your Information</h2>
            <div className="mb-4">
              <strong>Full Name:</strong> {formData.fullName}
            </div>
            <div className="mb-4">
              <strong>Email Address:</strong> {formData.email}
            </div>
            <div className="mb-4">
              <strong>Phone Number:</strong> {formData.phoneNumber}
            </div>
            <div className="mb-4">
              <strong>Company/Organization Name:</strong> {formData.companyName}
            </div>
            <div className="mb-4">
              <strong>Job Title:</strong> {formData.jobTitle}
            </div>
            <div className="mb-4">
              <strong>Type of Participant:</strong> {formData.participantType}
            </div>
            {formData.participantType === "Exhibitor" && (
              <>
                <div className="mb-4">
                  <strong>Setup Requirements:</strong>{" "}
                  {formData.setupRequirements}
                </div>
                <div className="mb-4">
                  <strong>Product/Service Name:</strong> {formData.productName}
                </div>
                <div className="mb-4">
                  <strong>Product/Service Description:</strong>{" "}
                  {formData.productDescription}
                </div>
                <div className="mb-4">
                  <strong>Website URL:</strong> {formData.websiteUrl}
                </div>
              </>
            )}
            {formData.participantType === "Speaker" && (
              <>
                <div className="mb-4">
                  <strong>Presentation Title:</strong>{" "}
                  {formData.presentationTitle}
                </div>
                <div className="mb-4">
                  <strong>Presentation Abstract:</strong>{" "}
                  {formData.presentationAbstract}
                </div>
              </>
            )}
            <CardFooter className="pt-6">
              <Button
                onClick={handleSubmit}
                className="bg-[#00adef] hover:bg-[#E38524] text-white font-bold mr-4"
              >
                Confirm and Submit
              </Button>
              <Button
                onClick={handleBack}
                className="bg-gray-800 hover:bg-[#E38524] text-white font-bold"
              >
                Back to Edit
              </Button>
            </CardFooter>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TechExpoRegistrationForm;
