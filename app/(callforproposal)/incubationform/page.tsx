'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast, useToast } from "@/components/ui/use-toast"
import { ArrowRight, ArrowLeft, Send, Building, User, Mail, Phone, Lightbulb, Target } from 'lucide-react'

const formSteps = [
  { title: 'Startup Details', icon: Building },
  { title: 'Contact Information', icon: User },
  { title: 'Startup Idea', icon: Lightbulb },
]

export default function Page() {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    startupName: '',
    founderName: '',
    email: '',
    phone: '',
    idea: '',
    stage: ''
  })

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const isStepValid = () => {
    switch (step) {
      case 0:
        return !!formData.startupName
      case 1:
        return !!formData.founderName && !!formData.email && !!formData.phone
      case 2:
        return !!formData.idea && !!formData.stage
      default:
        return false
    }
  }

  const handleNext = () => {
    if (isStepValid()) {
      setStep(prev => Math.min(prev + 1, formSteps.length - 1))
    } else {
      toast({
        title: "Please fill all required fields",
        variant: "destructive",
      })
    }
  }

  const handlePrevious = () => {
    setStep(prev => Math.max(prev - 1, 0))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isStepValid()) {
      // Here you would typically send the form data to your backend
      // For this example, we'll simulate an API call with a timeout
      toast({
        title: "Submitting your application...",
        description: "Please wait while we process your information.",
      })
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast({
        title: "Application submitted successfully!",
        description: "Thank you for applying to our incubation program. We'll be in touch soon.",
        variant: "success",
      })
      // Redirect to a thank you page after 2 seconds
      setTimeout(() => {
        router.push('/thank-you')
      }, 2000)
    } else {
      toast({
        title: "Please fill all required fields",
        variant: "destructive",
      })
    }
  }

  const StepIcon = formSteps[step].icon

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <StepIcon className="w-6 h-6 text-[#00adef]" />
            <CardTitle>{formSteps[step].title}</CardTitle>
          </div>
          <CardDescription>
            Step {step + 1} of {formSteps.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {step === 0 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="startupName">Startup Name</Label>
                  <Input
                    id="startupName"
                    value={formData.startupName}
                    onChange={(e) => handleChange('startupName', e.target.value)}
                    placeholder="Enter your startup name"
                  />
                </div>
              </div>
            )}
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="founderName">Founder's Name</Label>
                  <Input
                    id="founderName"
                    value={formData.founderName}
                    onChange={(e) => handleChange('founderName', e.target.value)}
                    placeholder="Enter founder's name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="idea">Startup Idea</Label>
                  <Textarea
                    id="idea"
                    value={formData.idea}
                    onChange={(e) => handleChange('idea', e.target.value)}
                    placeholder="Describe your startup idea"
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stage">Current Stage</Label>
                  <Select value={formData.stage} onValueChange={(value) => handleChange('stage', value)}>
                    <SelectTrigger id="stage">
                      <SelectValue placeholder="Select your current stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="idea">Idea</SelectItem>
                      <SelectItem value="prototype">Prototype</SelectItem>
                      <SelectItem value="mvp">MVP</SelectItem>
                      <SelectItem value="early-revenue">Early Revenue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 0 && (
            <Button variant="outline" onClick={handlePrevious}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Previous
            </Button>
          )}
          {step < formSteps.length - 1 ? (
            <Button className="ml-auto" onClick={handleNext}>
              Next <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button className="ml-auto" onClick={handleSubmit}>
              Submit <Send className="w-4 h-4 ml-2" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}