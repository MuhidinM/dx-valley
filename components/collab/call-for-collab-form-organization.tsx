import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const steps = [
  { id: 'organization', title: 'Organization Info' },
  { id: 'contact-info', title: 'Contact' },
  { id: 'confirm', title: 'Confirm' },
];

const industryOptions = ['Agriculture', 'AI', 'Fintech'];
const focusAreaOptions = ['Agriculture', 'AI', 'Fintech'];
const interestOptions = ['Invest', 'Buy startup', 'Support vision', 'Sponsor'];
const organizationTypeOptions = ['Private', 'NGO', "Gov't"];

type FormData = {
  organizationName: string;
  industry: string;
  focusArea: string[];
  interestedIn: string[];
  organizationType: string;
  city: string;
  state: string;
  country: string;
  email: string;
  phoneNumberOne: string;
  tradeLicenseUpload: File | null;
  addressType:string
};

const MultiSelectDropdown = ({
  options,
  selectedOptions,
  onOptionChange,
  placeholder,
}: {
  options: string[];
  selectedOptions: string[];
  onOptionChange: (option: string) => void;
  placeholder: string;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='w-full justify-between'>
          {selectedOptions.length > 0
            ? selectedOptions.join(', ')
            : placeholder}
          <ChevronRight className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option}
            checked={selectedOptions.includes(option)}
            onCheckedChange={() => onOptionChange(option)}>
            {option}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default function OrganizationRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    organizationName: '',
    industry: '',
    focusArea: [],
    interestedIn: [],
    organizationType: '',
    city: '',
    state: '',
    country: '',
    email: '',
    phoneNumberOne: '',
    tradeLicenseUpload: null,
    addressType:'residental'
  });

  const handleCheckboxChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => {
      const updatedValues = (prev[name] as string[]).includes(value)
        ? (prev[name] as string[]).filter((item) => item !== value)
        : [...(prev[name] as string[]), value];
      return { ...prev, [name]: updatedValues };
    });
  };

  const handleChange = (name: keyof FormData, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    const submissionData = new FormData();
  
    submissionData.append('organizationName', formData.organizationName);
    submissionData.append('industry', formData.industry);
    submissionData.append('focusArea', JSON.stringify(formData.focusArea));
    submissionData.append('interestedIn', JSON.stringify(formData.interestedIn));
    submissionData.append('organizationType', formData.organizationType);
    submissionData.append('city', formData.city);
    submissionData.append('state', formData.state);
    submissionData.append('country', formData.country);
    submissionData.append('email', formData.email);
    submissionData.append('phoneNumberOne', formData.phoneNumberOne);
  
    if (formData.tradeLicenseUpload) {
      submissionData.append('tradeLicenseUpload', formData.tradeLicenseUpload);
    }
  
    try {
      const response = await fetch('/api/organization', {
        method: 'POST',
        body: submissionData,
      });
  
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
      } else {
        alert('Submission failed: ' + result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  

  return (
    <div className='flex items-center justify-center min-h-screen bg-background p-4'>
      <Card className='w-full max-w-2xl'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold text-center'>
            <span className='flex justify-center text-3xl tracking-tight mb-2 font-bold leading-tight underline-offset-auto dark:text-white'>
              Organization Registration Form
            </span>
            <div className='flex justify-center'>
              <div className='w-20 h-1 bg-coopOrange'></div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='mb-8'>
            <div className='flex justify-between items-center'>
              {steps.map((step, index) => (
                <div key={step.id} className='flex flex-col items-center'>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${index <= currentStep
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                      }`}>
                    {index < currentStep ? (
                      <Check className='w-4 h-4' />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className='text-xs mt-1'>{step.title}</span>
                </div>
              ))}
            </div>
            <div className='h-2 bg-secondary mt-2 rounded-full'>
              <div
                className='h-full bg-primary rounded-full transition-all duration-300 ease-in-out'
                style={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                }}></div>
            </div>
          </div>

          <AnimatePresence mode='wait'>
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}>
              {currentStep === 0 && (
                <div className='space-y-4'>
                  <div>
                    <Label htmlFor='organization-name'>
                      Organization Name
                    </Label>
                    <Input
                      id='organization-name'
                      value={formData.organizationName}
                      onChange={(e) =>
                        handleChange('organizationName', e.target.value)
                      }
                      placeholder='Enter your organization name'
                    />
                  </div>

                  <div>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                      id='email'
                      type='email'
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder='Enter your email'
                    />
                  </div>

                  <div>
                    <Label htmlFor='phoneNumberOne'>Phone</Label>
                    <Input
                      id='phoneNumberOne'
                      type='tel'
                      value={formData.phoneNumberOne}
                      onChange={(e) =>
                        handleChange('phoneNumberOne', e.target.value)
                      }
                      placeholder='Enter your primary phone number'
                    />
                  </div>
                  <div>
                    <Label htmlFor='country'>Country</Label>
                    <Input
                      id='country'
                      value={formData.country}
                      onChange={(e) => handleChange('country', e.target.value)}
                      placeholder='Enter your country'
                    />
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <Label htmlFor='state'>State</Label>
                      <Input
                        id='state'
                        value={formData.state}
                        onChange={(e) => handleChange('state', e.target.value)}
                        placeholder='Enter your state'
                      />
                    </div>
                    <div>
                      <Label htmlFor='city'>City</Label>
                      <Input
                        id='city'
                        value={formData.city}
                        onChange={(e) => handleChange('city', e.target.value)}
                        placeholder='Enter your city'
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className='space-y-4'>
                  <div>
                    <Label className='mb-2 block'>Focus Area</Label>
                    <MultiSelectDropdown
                      options={focusAreaOptions}
                      selectedOptions={formData.focusArea}
                      onOptionChange={(option) =>
                        handleCheckboxChange('focusArea', option)
                      }
                      placeholder='Select focus area'
                    />
                  </div>

                  <div>
                    <Label className='mb-2 block'>Interest Area</Label>
                    <MultiSelectDropdown
                      options={interestOptions}
                      selectedOptions={formData.interestedIn}
                      onOptionChange={(option) =>
                        handleCheckboxChange('interestedIn', option)
                      }
                      placeholder='Select interest area'
                    />
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <Label htmlFor='industry'>Industry</Label>
                      <Select
                        onValueChange={(value) =>
                          handleChange('industry', value)
                        }>
                        <SelectTrigger>
                          <SelectValue placeholder='Select industry' />
                        </SelectTrigger>
                        <SelectContent>
                          {industryOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor='organization-type'>
                        Organization Type
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          handleChange('organizationType', value)
                        }>
                        <SelectTrigger>
                          <SelectValue placeholder='Select organization type' />
                        </SelectTrigger>
                        <SelectContent>
                          {organizationTypeOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="tradeLicenseUpload">Trade License</Label>
                    <Input
                    type="file"
                    id="tradeLicenseUpload"
                    accept=".pdf"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        const file = e.target.files[0];
                        if (file.type === 'application/pdf') {
                          handleChange('tradeLicenseUpload', file);
                        } else {
                          alert('Please upload a PDF file.');
                        }
                      }
                    }}
                  />

                  </div>


                </div>
              )}

              {currentStep === 2 && (
                <div className='space-y-2'>
                  <h2 className='text-xl font-semibold mb-4'>
                    Confirm Your Information
                  </h2>
                  {Object.entries(formData).map(([key, value]) => (
                    <p key={key} className='flex justify-between'>
                      <span className='font-medium'>
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                      </span>
                      <span>
                        {Array.isArray(value)
                          ? value.join(', ')
                          : value?.toString() || 'N/A'}
                      </span>
                    </p>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className='flex justify-between mt-8'>
            <Button
              variant='outline'
              onClick={handlePrevious}
              disabled={currentStep === 0}>
              <ChevronLeft className='w-4 h-4 mr-2' />
              Previous
            </Button>
            {currentStep < steps.length - 1 ? (
              <Button onClick={handleNext}>
                Next
                <ChevronRight className='w-4 h-4 ml-2' />
              </Button>
            ) : (
              <Button
                className='bg-coopBlue hover:bg-coopBlueHover'
                onClick={handleSubmit}>
                Submit
                <Check className='w-4 h-4 ml-2' />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
