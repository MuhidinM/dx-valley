'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { CheckCircle2, Plus, X, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Confetti from 'react-confetti'
import SubmissionSuccess from '../submissionSuccess'
import { ChangeEvent, FormEvent, MouseEvent } from "react";

const steps = [
  { id: 'startup', title: 'Startup Info' },
  { id: 'founder', title: 'Founder Info' },
  { id: 'idea', title: 'Your Idea' },
]

const startupNameSuggestions = [
  "TechNova", "InnoVenture", "FuturePulse", "QuantumLeap", "NexusWave",
  "ZenithSpark", "PixelPioneer", "EcoSphere", "CyberForge", "BioSync"
]

type FileType = "video" | "document";

interface FormData {
  startupName: string;
  stage: string;
  founderNames: string[];
  email: string;
  phone: string;
  idea: string;
  video: File | null;
  documents: File[];
}

interface Errors {
  startupName?: string;
  stage?: string;
  founderNames?: string;
  email?: string;
  phone?: string;
  idea?: string;
  video?: string;
  documents?: string;
}



const ApplyForIncubation = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    startupName: "",
    stage: "",
    founderNames: [""],
    email: "",
    phone: "",
    idea: "",
    video: null,
    documents: [],
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
  const videoInputRef = useRef<HTMLInputElement | null>(null);
  const documentInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (
    name: keyof FormData,
    value: string,
    index: number | null = null
  ) => {
    if (index !== null) {
      const newFounderNames = [...formData.founderNames];
      newFounderNames[index] = value;
      setFormData((prevState) => ({
        ...prevState,
        founderNames: newFounderNames,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleAddFounder = () => {
    setFormData((prevState) => ({
      ...prevState,
      founderNames: [...prevState.founderNames, ""],
    }));
  };

  const handleRemoveFounder = (index: number) => {
    const newFounderNames = formData.founderNames.filter((_, i) => i !== index);
    setFormData((prevState) => ({
      ...prevState,
      founderNames: newFounderNames,
    }));
  };

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    type: FileType
  ) => {
    const files = Array.from(event.target.files || []);
    if (type === "video") {
      if (files[0] && files[0].size > 100 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          video: "Video file size must be less than 100MB",
        }));
        return;
      }
      setFormData((prev) => ({ ...prev, video: files[0] || null }));
    } else if (type === "document") {
      const validFiles = files.filter((file) => file.size <= 10 * 1024 * 1024);
      if (validFiles.length < files.length) {
        setErrors((prev) => ({
          ...prev,
          documents: "Some documents exceeded 10MB limit and were not added",
        }));
      }
      setFormData((prev) => ({
        ...prev,
        documents: [...prev.documents, ...validFiles],
      }));
    }
  };

  const handleRemoveVideo = () => {
    setFormData((prev) => ({ ...prev, video: null }));
    if (videoInputRef.current) {
      videoInputRef.current.value = "";
    }
  };

  const handleRemoveDocument = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index),
    }));
  };

  const validateStep = (step: number): Errors => {
    let stepErrors: Errors = {};
    switch (step) {
      case 0:
        if (!formData.startupName.trim())
          stepErrors.startupName = "Startup name is required";
        if (!formData.stage) stepErrors.stage = "Current stage is required";
        break;
      case 1:
        if (formData.founderNames.some((name) => !name.trim()))
          stepErrors.founderNames = "All founder names are required";
        if (!formData.email.trim()) stepErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email))
          stepErrors.email = "Email is invalid";
        if (!formData.phone.trim())
          stepErrors.phone = "Phone number is required";
        break;
      case 2:
        if (!formData.idea.trim()) stepErrors.idea = "Startup idea is required";
        break;
    }
    return stepErrors;
  };

  const handleNext = () => {
    const stepErrors = validateStep(currentStep);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const stepErrors = validateStep(currentStep);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setShowConfirmDialog(true);
  };

  const confirmSubmit = async () => {
    setShowConfirmDialog(false);
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setShowConfetti(true);
  };

  const generateStartupName = () => {
    const randomIndex = Math.floor(
      Math.random() * startupNameSuggestions.length
    );
    setFormData((prev) => ({
      ...prev,
      startupName: startupNameSuggestions[randomIndex],
    }));
  };

  if (submitSuccess) {
    return (
      <div className=' bg-gray-50 py-28  px-4 sm:px-6 lg:px-8 '>
        <div>
          {showConfetti && <Confetti colors={["#00adef"]} />}
          <SubmissionSuccess
            title={" Submission Successful!"}
            icon={<CheckCircle2 className='w-8 h-8 text-coopOrange' />}
            desc={" Good luck! Stay tuned for our email."}
          />
        </div>
      </div>
    );
  }

  return (
    <div className=' bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 h-1/2'>
      <Card className='max-w-2xl mx-auto'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl font-bold'>
            Apply for Startup Incubation
          </CardTitle>
          <CardDescription>
            Join Dx Valley's Incubation Program and turn your idea into reality!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='mb-8'>
            <div className='flex justify-between'>
              {steps.map((step, index) => (
                <div key={step.id} className='flex flex-col items-center'>
                  <div
                    className={`rounded-full h-8 w-8 flex items-center justify-center ${
                      index <= currentStep
                        ? "bg-[#00adef] text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}>
                    {index + 1}
                  </div>
                  <div className='text-xs mt-2'>{step.title}</div>
                </div>
              ))}
            </div>
            <div className='mt-4 h-2 bg-gray-200 rounded-full'>
              <div
                className='h-full bg-[#00adef] rounded-full transition-all duration-300 ease-in-out'
                style={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                }}></div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            {currentStep === 0 && (
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='startupName'>Startup Name</Label>
                  <div className='flex space-x-2'>
                    <Input
                      id='startupName'
                      placeholder='Enter your startup name'
                      value={formData.startupName}
                      onChange={(e) =>
                        handleChange("startupName", e.target.value)
                      }
                    />
                    <Button type='button' onClick={generateStartupName}>
                      Generate
                    </Button>
                  </div>
                  {errors.startupName && (
                    <p className='text-sm text-red-500'>{errors.startupName}</p>
                  )}
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='stage'>Current Stage</Label>
                  <Select
                    onValueChange={(value) => handleChange("stage", value)}
                    value={formData.stage}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select your current stage' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='idea'>Idea</SelectItem>
                      <SelectItem value='prototype'>Prototype</SelectItem>
                      <SelectItem value='mvp'>MVP</SelectItem>
                      <SelectItem value='early-revenue'>
                        Early Revenue
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.stage && (
                    <p className='text-sm text-red-500'>{errors.stage}</p>
                  )}
                </div>
              </div>
            )}
            {currentStep === 1 && (
              <div className='space-y-4'>
                {formData.founderNames.map((name, index) => (
                  <div key={index} className='space-y-2'>
                    <Label htmlFor={`founderName-${index}`}>
                      Founder's Name
                    </Label>
                    <div className='flex space-x-2'>
                      <Input
                        id={`founderName-${index}`}
                        placeholder="Enter founder's name"
                        value={name}
                        onChange={(e) =>
                          handleChange("founderNames", e.target.value, index)
                        }
                      />
                      {index > 0 && (
                        <Button
                          type='button'
                          variant='outline'
                          onClick={() => handleRemoveFounder(index)}>
                          <X className='h-4 w-4' />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                <Button
                  type='button'
                  variant='outline'
                  onClick={handleAddFounder}>
                  <Plus className='h-4 w-4 mr-2' /> Add Founder
                </Button>
                {errors.founderNames && (
                  <p className='text-sm text-red-500'>{errors.founderNames}</p>
                )}
                <div className='space-y-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='Enter your email'
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                  {errors?.email && (
                    <p className='text-sm text-red-500'>{errors.email}</p>
                  )}
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='phone'>Phone Number</Label>
                  <Input
                    id='phone'
                    type='tel'
                    placeholder='Enter your phone number'
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
                  {errors.phone && (
                    <p className='text-sm text-red-500'>{errors.phone}</p>
                  )}
                </div>
              </div>
            )}
            {currentStep === 2 && (
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='video'>
                    Video Pitch (Optional, Max 100MB)
                  </Label>
                  <div className='flex items-center space-x-2'>
                    <Input
                      id='video'
                      type='file'
                      accept='video/*'
                      onChange={(e) => handleFileChange(e, "video")}
                      ref={videoInputRef}
                    />
                    {formData.video && (
                      <Button
                        type='button'
                        variant='outline'
                        onClick={handleRemoveVideo}>
                        <X className='h-4 w-4' />
                      </Button>
                    )}
                  </div>
                  {formData.video && (
                    <p className='text-sm text-gray-500'>
                      {formData.video.name}
                    </p>
                  )}
                  {errors.video && (
                    <p className='text-sm text-red-500'>{errors.video}</p>
                  )}
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='documents'>
                    Documents (Optional, Max 10MB each)
                  </Label>
                  <Input
                    id='documents'
                    type='file'
                    multiple
                    accept='.pdf,.doc,.docx,.txt'
                    onChange={(e) => handleFileChange(e, "document")}
                    ref={documentInputRef}
                  />
                  {formData.documents.map((doc, index) => (
                    <div
                      key={index}
                      className='flex items-center justify-between'>
                      <span>{doc.name}</span>
                      <Button
                        type='button'
                        variant='ghost'
                        onClick={() => handleRemoveDocument(index)}>
                        <X className='h-4 w-4' />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => documentInputRef.current?.click()}>
                    <Plus className='h-4 w-4 mr-2' /> Add Document
                  </Button>
                  {errors.documents && (
                    <p className='text-sm text-red-500'>{errors.documents}</p>
                  )}
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='idea'>Startup Idea</Label>
                  <Textarea
                    id='idea'
                    placeholder='Describe your startup idea'
                    value={formData.idea}
                    onChange={(e) => handleChange("idea", e.target.value)}
                    rows={5}
                  />
                  {errors.idea && (
                    <p className='text-sm text-red-500'>{errors.idea}</p>
                  )}
                </div>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button
            variant='outline'
            onClick={handlePrevious}
            disabled={currentStep === 0}>
            Previous
          </Button>
          {currentStep < steps.length - 1 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button onClick={handleSubmit } disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          )}
        </CardFooter>
      </Card>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Submission</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit your application? Please review
              all information before confirming.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              ) : null}
              {isSubmitting ? "Submitting..." : "Confirm Submission"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplyForIncubation;