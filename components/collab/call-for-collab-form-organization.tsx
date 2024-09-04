'use client';

import { useState } from 'react';

const steps = [
  { id: 'organization', title: 'Tell us about your company' },
  { id: 'contact-info', title: 'Tell us about your company' },
  { id: 'confirm', title: 'Confirm ' },
];

const industryOptions = ["Agriculture", "AI", "Fintech"];
const focusAreaOptions = ["Agriculture", "AI", "Fintech"];
const interestOptions = ["Invest", "Buy startup", "Support vision", "Sponsor"];
const organizationTypeOptions = ["Private", "NGO", "Gov't"];

type FormData = {
  organizationName: string;
  industry: string;
  focusArea: string[];
  interestedIn: string[];
  tradeLicense: string;
  organizationType: string;
  city: string;
  state: string;
  country: string;
  email: string;
  phoneNumberOne: string;
  phone2: string;
  tradeLicenseUpload: File | null;
};

export default function OrganizationRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    organizationName: "",
    industry: "",
    focusArea: [],
    interestedIn: [],
    tradeLicense: "",
    organizationType: "",
    city: "",
    state: "",
    country: "",
    email: "",
    phoneNumberOne: "",
    phone2: "",
    tradeLicenseUpload: null,
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    try {
      const response = await fetch('/api/organization', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.organizationName,
          industry: formData.industry,
          focusArea: formData.focusArea,
          interestArea: formData.interestedIn,
          tradeLicense: formData.tradeLicense,
          organizationType: formData.organizationType,
          contactInfo: [
            {
              email: formData.email,
              phoneNumberOne: formData.phoneNumberOne,
              // phoneNumberTwo: formData.phoneNumberTwo,
            },
          ],
          addressInfo: [
            {
              city: formData.city,
              state: formData.state,
              country: formData.country,
            },
          ],
          documentInfo: [
            {
              documentType: formData.tradeLicenseUpload, // Handle file upload separately if needed
              documentNumber:"hdfagj"
            },
          ],
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Form data saved:', data);
        // Optionally reset form or show success message
      } else {
        console.error('Error saving form data:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  

  return (
    <div className="flex items-center justify-center dark:bg-background bg-background p-6">
      <div className="w-full max-w-2xl px-6 mx-4 dark:bg-gray-800 p-6 rounded-lg shadow-xl">
        <div className="text-center font-bold text-2xl mb-6">
          {steps[currentStep].title}
        </div>

        {/* Organization Info */}
        {currentStep === 0 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="organization-name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Organization Name</label>
              <input
                id="organization-name"
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-sm"
                value={formData.organizationName}
                onChange={(e) => handleChange("organizationName", e.target.value)}
                placeholder="Enter your organization name"
              />
            </div>

            <div className="flex space-x-4">
              <div className="flex-1">
                <label htmlFor="industry" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Industry</label>
                <select
                  id="industry"
                  className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-sm"
                  value={formData.industry}
                  onChange={(e) => handleChange("industry", e.target.value)}
                >
                  <option value="">Select industry</option>
                  {industryOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label htmlFor="organization-type" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Organization Type</label>
                <select
                  id="organization-type"
                  className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-sm"
                  value={formData.organizationType}
                  onChange={(e) => handleChange("organizationType", e.target.value)}
                >
                  <option value="">Select organization type</option>
                  {organizationTypeOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="trade-license" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Trade License</label>
              <input
                id="trade-license"
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-sm"
                value={formData.tradeLicense}
                onChange={(e) => handleChange("tradeLicense", e.target.value)}
                placeholder="Enter your trade license number"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Email</label>
              <input
                id="email"
                type="email"
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-sm"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="phoneNumberOne" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Phone</label>
              <input
                id="phoneNumberOne"
                type="tel"
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-sm"
                value={formData.phoneNumberOne}
                onChange={(e) => handleChange("phoneNumberOne", e.target.value)}
                placeholder="Enter your primary phone number"
              />
            </div>
          </div>
        )}

        {/* Contact Info */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="country" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Country</label>
              <input
                id="country"
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-sm"
                value={formData.country}
                onChange={(e) => handleChange("country", e.target.value)}
                placeholder="Enter your country"
              />
            </div>

            <div className="flex space-x-4">
              <div className="flex-1">
                <label htmlFor="state" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">State</label>
                <input
                  id="state"
                  className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-sm"
                  value={formData.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                  placeholder="Enter your state"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="city" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">City</label>
                <input
                  id="city"
                  className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-sm"
                  value={formData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  placeholder="Enter your city"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Focus Area</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {focusAreaOptions.map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-500"
                      checked={formData.focusArea.includes(option)}
                      onChange={() => handleCheckboxChange("focusArea", option)}
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Interest Area</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {interestOptions.map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-500"
                      checked={formData.interestedIn.includes(option)}
                      onChange={() => handleCheckboxChange("interestedIn", option)}
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Confirm Info */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-center">Confirm Your Information</h2>
            <div className="space-y-2">
              <p><span className='font-semibold text-gray-700 dark:text-gray-300'>Organization Name: </span>{formData.organizationName}</p>
              <p><span className='font-semibold text-gray-700 dark:text-gray-300'>Industry: </span>{formData.industry}</p>
              <p><span className='font-semibold text-gray-700 dark:text-gray-300'>Focus Area: </span>{formData.focusArea.join(', ')}</p>
              <p><span className='font-semibold text-gray-700 dark:text-gray-300'>Interested In: </span>{formData.interestedIn.join(', ')}</p>
              <p><span className='font-semibold text-gray-700 dark:text-gray-300'>Email: </span>{formData.email}</p>
              <p><span className='font-semibold text-gray-700 dark:text-gray-300'>Phone: </span>{formData.phoneNumberOne}</p>
              {/* <p><span className='font-semibold text-gray-700 dark:text-gray-300'>Phone 2: </span>{formData.phone2}</p> */}
              <p><span className='font-semibold text-gray-700 dark:text-gray-300'>City: </span>{formData.city}</p>
              <p><span className='font-semibold text-gray-700 dark:text-gray-300'>State: </span>{formData.state}</p>
              <p><span className='font-semibold text-gray-700 dark:text-gray-300'>Country: </span>{formData.country}</p>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button
            className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Previous
          </button>
          {currentStep < steps.length - 1 ? (
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
              onClick={handleNext}
            >
              Next
            </button>
          ) : (
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
