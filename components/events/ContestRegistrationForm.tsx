"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

const steps = [
  { id: "team-info", title: "Team Information" },
  { id: "project-details", title: "Project Details" },
  { id: "confirm", title: "Confirm Info" },
];
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export default function ContestRegistrationForm() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");

  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState({
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
    eventId: eventId || "",
  });

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
    field: string,
    value: string
  ) => {
    const updatedMembers = [...formData.teamMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setFormData({ ...formData, teamMembers: updatedMembers });
  };

  const handleNumberOfMembersChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const numberOfMembers = parseInt(e.target.value, 10);
    setFormData({
      ...formData,
      numberOfMembers,
      teamMembers: Array(numberOfMembers).fill({
        name: "",
        email: "",
        phoneNumber: "",
      }),
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
              lastName: member.firstName,
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
        alert("Contest registration successful!");
        // Clear the form
        setFormData({
          LeaderFirstName: "",
          LeaderLastName: "",
          email: "",
          phoneNumber: "",
          teamName: "",
          numberOfMembers: 1,
          teamMembers: [
            { firstName: "", lastName: "", email: "", phoneNumber: "" },
          ],
          projectTitle: "",
          projectDescription: "",
          techStack: "",
          projectUrl: "",
          eventId: "",
        });
      } else {
        const errorData = await response.json();
        console.error("Failed to register contest:", errorData);
        alert("Failed to register contest");
      }
    } catch (error) {
      console.error("Error registering contest:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-94 mt-8 mb-8 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-8 text-center text-2xl font-bold">
          Register Contest Info
        </div>
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
          <div className="mb-4">
            <Label htmlFor="LeaderFirstName" className="block mb-4 mt-4">
              Team Leader First Name
            </Label>
            <Input
              id="LeaderFirstName"
              name="LeaderFirstName"
              className="w-full p-2 rounded"
              value={formData.LeaderFirstName}
              onChange={handleChange}
              placeholder="Enter the team leader's name"
            />
            <Label htmlFor="LeaderLastName" className="block mb-4 mt-4">
              Team Leader Last Name
            </Label>
            <Input
              id="LeaderLastName"
              name="LeaderLastName"
              className="w-full p-2 rounded"
              value={formData.LeaderLastName}
              onChange={handleChange}
              placeholder="Enter the team leader's name"
            />
            <Label htmlFor="email" className="block mb-4 mt-4">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              className="w-full p-2 rounded"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter the email"
            />
            <Label htmlFor="phoneNumber" className="block mb-4 mt-4">
              Phone Number
            </Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              className="w-full p-2 rounded"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter the phone number"
            />
            <Label htmlFor="teamName" className="block mb-4 mt-4">
              Team Name
            </Label>
            <Input
              id="teamName"
              name="teamName"
              className="w-full p-2 rounded"
              value={formData.teamName}
              onChange={handleChange}
              placeholder="Enter the team name"
            />
            <Label htmlFor="numberOfMembers" className="block mb-4 mt-4">
              Number of Members
            </Label>
            <Input
              id="numberOfMembers"
              type="number"
              name="numberOfMembers"
              className="w-full p-2 rounded"
              value={formData.numberOfMembers}
              onChange={handleNumberOfMembersChange}
              min={1}
              placeholder="Enter the number of team members"
            />
            {/* {formData.teamMembers.map((member, index) => (
              <div key={index} className="mt-4 mb-4 flex space-x-4">
                <div className="w-1/3">
                  <Label className="block mb-2">Member Name</Label>
                  <Input
                    type="text"
                    className="w-full p-2 rounded"
                    value={member.name}
                    onChange={(e) =>
                      handleTeamMemberChange(index, "name", e.target.value)
                    }
                    placeholder="Enter team member's name"
                  />
                </div>
                <div className="w-1/3">
                  <Label className="block mb-2">Member Email</Label>
                  <Input
                    type="email"
                    className="w-full p-2 rounded"
                    value={member.email}
                    onChange={(e) =>
                      handleTeamMemberChange(index, "email", e.target.value)
                    }
                    placeholder="Enter team member's email"
                  />
                </div>
                <div className="w-1/3">
                  <Label className="block mb-2">Member Phone Number</Label>
                  <Input
                    type="text"
                    className="w-full p-2 rounded"
                    value={member.phoneNumber || ""}
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
            ))} */}
            {formData.teamMembers.map((member, index) => (
              <div key={index} className="mt-4 mb-4">
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <Label className="block mb-2">First Name</Label>
                    <Input
                      type="text"
                      className="w-full p-2 rounded"
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
                  <div className="w-1/2">
                    <Label className="block mb-2">Last Name</Label>
                    <Input
                      type="text"
                      className="w-full p-2 rounded"
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
                <div className="flex space-x-4 mt-4">
                  <div className="w-1/2">
                    <Label className="block mb-2">Member Email</Label>
                    <Input
                      type="email"
                      className="w-full p-2 rounded"
                      value={member.email}
                      onChange={(e) =>
                        handleTeamMemberChange(index, "email", e.target.value)
                      }
                      placeholder="Enter team member's email"
                    />
                  </div>
                  <div className="w-1/2">
                    <Label className="block mb-2">Member Phone Number</Label>
                    <Input
                      type="text"
                      className="w-full p-2 rounded"
                      value={member.phoneNumber || ""}
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
          <div className="mb-4">
            <Label htmlFor="projectTitle" className="block mb-2">
              Project Title
            </Label>
            <Input
              id="projectTitle"
              name="projectTitle"
              className="w-full p-2 rounded"
              value={formData.projectTitle}
              onChange={handleChange}
              placeholder="Enter the project title"
            />
            <Label htmlFor="projectDescription" className="block mb-2">
              Project Description
            </Label>
            <Textarea
              id="projectDescription"
              name="projectDescription"
              className="w-full p-2 rounded"
              value={formData.projectDescription}
              onChange={handleChange}
              placeholder="Enter the project description"
              rows={4}
            />
            <Label htmlFor="techStack" className="block mb-2">
              Tech Stack
            </Label>
            <Input
              id="techStack"
              name="techStack"
              className="w-full p-2 rounded"
              value={formData.techStack}
              onChange={handleChange}
              placeholder="Enter the tech stack"
            />
            <Label htmlFor="projectUrl" className="block mb-2">
              Project URL
            </Label>
            <Input
              id="projectUrl"
              name="projectUrl"
              className="w-full p-2 rounded"
              value={formData.projectUrl}
              onChange={handleChange}
              placeholder="Enter the project URL"
            />
          </div>
        )}

        {currentStep === 2 && (
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-4">
              Confirm Your Information
            </h3>
            <p>
              <strong>Team Leader Name:</strong> {formData.LeaderFirstName}
            </p>
            <p>
              <strong>Team Leader Name:</strong> {formData.LeaderLastName}
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
            <ul className="list-disc list-inside">
              {formData.teamMembers.map((member, index) => (
                <li key={index}>
                  {member.firstName} - {member.lastName} - {member.email} -{" "}
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

        <div className="flex justify-between">
          {currentStep > 0 && (
            <Button
              onClick={handlePrevious}
              className="bg-[#00ADEF] text-white"
            >
              Previous
            </Button>
          )}
          {currentStep < steps.length - 1 && (
            <Button onClick={handleNext} className="bg-[#00ADEF] text-white">
              Next
            </Button>
          )}
          {currentStep === steps.length - 1 && (
            <Button onClick={handleSubmit} className="bg-[#00ADEF] text-white">
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
