'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const steps = [
  { id: 'startup', title: 'Startup Info' },
  { id: 'founder', title: 'Founder Info' },
  { id: 'idea', title: 'Your Idea' },
]

export default function ApplyForIncubation() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    startupName: '',
    stage: '',
    founderName: '',
    email: '',
    phone: '',
    idea: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const validateStep = (step) => {
    let stepErrors = {}
    switch (step) {
      case 0:
        if (!formData.startupName.trim()) stepErrors.startupName = 'Startup name is required'
        if (!formData.stage) stepErrors.stage = 'Current stage is required'
        break
      case 1:
        if (!formData.founderName.trim()) stepErrors.founderName = 'Founder\'s name is required'
        if (!formData.email.trim()) stepErrors.email = 'Email is required'
        else if (!/\S+@\S+\.\S+/.test(formData.email)) stepErrors.email = 'Email is invalid'
        if (!formData.phone.trim()) stepErrors.phone = 'Phone number is required'
        break
      case 2:
        if (!formData.idea.trim()) stepErrors.idea = 'Startup idea is required'
        break
    }
    return stepErrors
  }

  const handleNext = () => {
    const stepErrors = validateStep(currentStep)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      return
    }
    setErrors({})
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const stepErrors = validateStep(currentStep)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      return
    }
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSubmitSuccess(true)
    // Redirect to a thank you page after 2 seconds
    setTimeout(() => {
      router.push('/thank-you')
    }, 2000)
  }

  if (submitSuccess) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Alert className="w-full max-w-md">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            Your application has been submitted successfully. We'll be in touch soon!
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Apply for Startup Incubation</CardTitle>
          <CardDescription>
            Join Dx Valley's Incubation Program and turn your idea into reality!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <div className="flex justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`rounded-full h-8 w-8 flex items-center justify-center ${index <= currentStep ? 'bg-[#00adef] text-white' : 'bg-gray-200 text-gray-600'}`}>
                    {index + 1}
                  </div>
                  <div className="text-xs mt-2">{step.title}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-[#00adef] rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            {currentStep === 0 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="startupName">Startup Name</Label>
                  <Input
                    id="startupName"
                    placeholder="Enter your startup name"
                    value={formData.startupName}
                    onChange={(e) => handleChange('startupName', e.target.value)}
                  />
                  {errors.startupName && (
                    <p className="text-sm text-red-500">{errors.startupName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stage">Current Stage</Label>
                  <Select onValueChange={(value) => handleChange('stage', value)} value={formData.stage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your current stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="idea">Idea</SelectItem>
                      <SelectItem value="prototype">Prototype</SelectItem>
                      <SelectItem value="mvp">MVP</SelectItem>
                      <SelectItem value="early-revenue">Early Revenue</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.stage && (
                    <p className="text-sm text-red-500">{errors.stage}</p>
                  )}
                </div>
              </div>
            )}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="founderName">Founder's Name</Label>
                  <Input
                    id="founderName"
                    placeholder="Enter founder's name"
                    value={formData.founderName}
                    onChange={(e) => handleChange('founderName', e.target.value)}
                  />
                  {errors.founderName && (
                    <p className="text-sm text-red-500">{errors.founderName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>
              </div>
            )}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="idea">Startup Idea</Label>
                  <Textarea
                    id="idea"
                    placeholder="Describe your startup idea"
                    value={formData.idea}
                    onChange={(e) => handleChange('idea', e.target.value)}
                    rows={5}
                  />
                  {errors.idea && (
                    <p className="text-sm text-red-500">{errors.idea}</p>
                  )}
                </div>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          {currentStep < steps.length - 1 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}