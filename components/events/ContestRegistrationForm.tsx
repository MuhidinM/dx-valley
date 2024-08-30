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
    teamLeaderName: "",
    email: "",
    phoneNumber: "",
    teamName: "",
    numberOfMembers: 1,
    teamMembers: [{ name: "", email: "" }],
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
      teamMembers: Array(numberOfMembers).fill({ name: "", email: "" }),
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
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Contest registration successful!");
        setFormData({
          teamLeaderName: "",
          email: "",
          phoneNumber: "",
          teamName: "",
          numberOfMembers: 1,
          teamMembers: [{ name: "", email: "" }],
          projectTitle: "",
          projectDescription: "",
          techStack: "",
          projectUrl: "",
          eventId: "",
        });
      } else {
        alert("Failed to register contest");
      }
    } catch (error) {
      console.error("Error registering contest:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="mt-8 mb-8 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-lg">
        {/* <div className="text-center flex justify-between p-2 m-3  rounded"> */}
        <div className="mb-8 text-center text-2xl font-bold">
          Register Contest Info
        </div>
        {/* <div>Help?</div> */}
        {/* </div> */}
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
            <Label htmlFor="teamLeaderName" className="block mb-4 mt-4">
              Team Leader Name
            </Label>
            <Input
              id="teamLeaderName"
              name="teamLeaderName"
              className="w-full p-2 rounded"
              value={formData.teamLeaderName}
              onChange={handleChange}
              placeholder="Enter the team leader's name"
            />
            <Label htmlFor="email" className="block mb-4 mt-4">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              className="w-full p-2  rounded"
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
              className="w-full p-2  rounded"
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
              className="w-full p-2  rounded"
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
              className="w-full p-2  rounded"
              value={formData.numberOfMembers}
              onChange={handleNumberOfMembersChange}
              min={1}
              placeholder="Enter the number of team members"
            />
            {formData.teamMembers.map((member, index) => (
              <div key={index} className="mt-4 mb-4 flex space-x-4">
                <div className="w-1/2">
                  <Label className="block mb-2">Member Name</Label>
                  <Input
                    type="text"
                    className="w-full p-2  rounded"
                    value={member.name}
                    onChange={(e) =>
                      handleTeamMemberChange(index, "name", e.target.value)
                    }
                    placeholder="Enter team member's name"
                  />
                </div>
                <div className="w-1/2">
                  <Label className="block mb-2">Member Email</Label>
                  <Input
                    type="email"
                    className="w-full p-2  rounded"
                    value={member.email}
                    onChange={(e) =>
                      handleTeamMemberChange(index, "email", e.target.value)
                    }
                    placeholder="Enter team member's email"
                  />
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
              className="w-full p-2  rounded"
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
              className="w-full p-2  rounded"
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
              className="w-full p-2  rounded"
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
              className="w-full p-2  rounded"
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
              <strong>Team Leader Name:</strong> {formData.teamLeaderName}
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
              <strong>Team Members:</strong> {formData.teamMembers.join(", ")}
            </p>
            <p>
              <strong>Project Title:</strong> {formData.projectTitle}
            </p>
            <p>
              <strong>Project Description:</strong>{" "}
              {formData.projectDescription}
            </p>
            <p>
              <strong>Technology Stack:</strong> {formData.techStack}
            </p>
            <p>
              <strong>Project URL:</strong> {formData.projectUrl}
            </p>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <Button
            type="button"
            className="py-2 px-4 bg-gray-800 text-white hover:bg-[#E38524] rounded"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          {currentStep === steps.length - 1 ? (
            <Button
              type="button"
              className="py-2 px-4 bg-[#00adef] text-white hover:bg-[#E38524] rounded"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          ) : (
            <Button
              type="button"
              className="py-2 px-4 bg-blue-500 text-white hover:bg-[#E38524] rounded"
              onClick={handleNext}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
