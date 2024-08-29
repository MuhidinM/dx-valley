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

import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const prisma = new PrismaClient();

const ContestRegistrationForm = () => {
  const [formData, setFormData] = useState({
    teamLeaderName: "",
    email: "",
    phoneNumber: "",
    teamName: "",
    numberOfMembers: 1,
    teamMembers: [""],
    projectTitle: "",
    projectDescription: "",
    techStack: "",
    projectUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTeamMemberChange = (index: number, value: string) => {
    const updatedMembers = [...formData.teamMembers];
    updatedMembers[index] = value;
    setFormData({ ...formData, teamMembers: updatedMembers });
  };

  const handleNumberOfMembersChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const numberOfMembers = parseInt(e.target.value, 10);
    setFormData({
      ...formData,
      numberOfMembers,
      teamMembers: Array(numberOfMembers).fill(""),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const {
      teamLeaderName,
      email,
      phoneNumber,
      teamName,
      numberOfMembers,
      teamMembers,
      projectTitle,
      projectDescription,
      techStack,
      projectUrl,
    } = formData;

    try {
      const response = await fetch("/api/contest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teamLeaderName,
          email,
          phoneNumber,
          teamName,
          numberOfMembers,
          teamMembers, // This will send the array as is
          projectTitle,
          projectDescription,
          techStack,
          projectUrl,
        }),
      });

      if (response.ok) {
        alert("Contest registration successful!");
        setFormData({
          teamLeaderName: "",
          email: "",
          phoneNumber: "",
          teamName: "",
          numberOfMembers: 1,
          teamMembers: [""],
          projectTitle: "",
          projectDescription: "",
          techStack: "",
          projectUrl: "",
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
    <Card className='admin-event w-[900px]'>
      <CardHeader>
        <CardTitle className='text-center'>Contest Registration Form</CardTitle>
        {/* <CardDescription>Description</CardDescription> */}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className='grid w-full items-center gap-4'>
            <h2 className='font-extrabold text-xl'> Team Leader Information</h2>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='teamLeaderName'>Full Name</Label>

              <Input
                type='text'
                id='teamLeaderName'
                name='teamLeaderName'
                placeholder='e.g., John Doe'
                value={formData.teamLeaderName}
                onChange={handleChange}
                required
                minLength={3}
              />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='email'>Email Address</Label>
              <Input
                type='email'
                id='email'
                name='email'
                placeholder='e.g., johndoe@example.com'
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='phoneNumber'>Phone Number</Label>
              <Input
                type='tel'
                id='phoneNumber'
                name='phoneNumber'
                placeholder='e.g., +1234567890'
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                pattern='^\+?\d{10,15}$'
              />
            </div>
            <h2 className='font-extrabold text-xl'>Team Information</h2>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='teamName'>Team Name</Label>
              <Input
                type='text'
                id='teamName'
                name='teamName'
                placeholder='e.g., Innovators'
                value={formData.teamName}
                onChange={handleChange}
                required
              />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='numberOfMembers'>Number of Team Members</Label>
              <Input
                type='number'
                id='numberOfMembers'
                name='numberOfMembers'
                placeholder='e.g., 5'
                value={formData.numberOfMembers}
                onChange={handleNumberOfMembersChange}
                required
                min={1}
                max={10}
              />
            </div>
            <h3 className='font-extrabold text-xl'>List of Team Members</h3>
            {formData.teamMembers.map((member, index) => (
              <div className='flex flex-col space-y-1.5' key={index}>
                <Label htmlFor={`teamMember${index + 1}`}>
                  Team Member {index + 1}:
                </Label>
                <Input
                  type='text'
                  id={`teamMember${index + 1}`}
                  placeholder={`e.g., Member ${index + 1}`}
                  value={member}
                  onChange={(e) =>
                    handleTeamMemberChange(index, e.target.value)
                  }
                  required
                />
              </div>
            ))}
            <h2 className='font-extrabold text-xl'>Project Information</h2>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='projectTitle'>Project Title</Label>
              <Input
                type='text'
                id='projectTitle'
                name='projectTitle'
                placeholder='e.g., AI-powered Traffic Management System'
                value={formData.projectTitle}
                onChange={handleChange}
                required
              />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='projectDescription'>Project Description</Label>
              <Textarea
                id='projectDescription'
                name='projectDescription'
                placeholder='Briefly describe your project...'
                value={formData.projectDescription}
                onChange={handleChange}
                required
                minLength={50}
                maxLength={500}
              />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='techStack'>Preferred Technology Stack</Label>
              <Input
                type='text'
                id='techStack'
                name='techStack'
                placeholder='e.g., React, Node.js, MongoDB'
                value={formData.techStack}
                onChange={handleChange}
              />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='projectUrl'>Project URL (if any):</Label>
              <Input
                type='url'
                id='projectUrl'
                name='projectUrl'
                placeholder='e.g., https://github.com/your-project'
                value={formData.projectUrl}
                onChange={handleChange}
              />
            </div>
          </div>
          <Button className='admin-event-btn bg-coopBlue text-white font-bold cursor-pointer px-6 py-2 hover:bg-amber-500'>
            Register
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContestRegistrationForm;
