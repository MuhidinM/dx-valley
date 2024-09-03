'use client';

import { useState } from 'react';

const steps = [
  { id: 'organization', title: 'Organization info' },
  { id: 'contact-info', title: 'Contact' },
  { id: 'confirm', title: 'Confirm' },
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
  phone1: string;
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
    phone1: "",
    phone2: "",
    tradeLicenseUpload: null,
  });
  const [showDropdown, setShowDropdown] = useState(false);

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

  const handleSubmit = () => {
    console.log("Submitting form data", formData);
  };

  return (
    <div className="flex  items-center justify-center dark:bg-background bg-background p-4">

      <div className="w-full max-w-xl dark:bg-gray-800 p-6 rounded-lg shadow-lg h-[600px] flex flex-col justify-between">
        <div className=''>
          <div className='flex justify-center font-bold text-2xl py-2'>Tell us about your organization</div>


          {/* Organization Info */}
          {currentStep === 0 && (
            <div className="mb-4">
              <label htmlFor="organization-name" className="block mb-1  text-slate-700 dark:text-slate-300">Organization Name</label>
              <input
                id="organization-name"
                className="w-full p-1.5 dark:bg-gray-800 rounded bg-slate-100  border-[1px] dark:border-slate-200 border-slate-300 text-[15px]"
                value={formData.organizationName}
                onChange={(e) => handleChange("organizationName", e.target.value)}
                placeholder="Enter your organization name"
              />

              <div className='flex justify-between '>

                <div className='flex flex-col w-4/12'>

                  <label htmlFor="industry" className="block mt-4 mb-1  text-slate-700 dark:text-slate-300 ">Industry</label>
                  <select
                    id="industry"
                    className=" w-full p-1.5 text-[15px] dark:bg-gray-800 rounded bg-slate-100  border-[1px] dark:border-slate-200 border-slate-300"
                    value={formData.industry}
                    onChange={(e) => handleChange("industry", e.target.value)}
                  >
                    <option value="">Select industry</option>
                    {industryOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div className='flex flex-col w-4/12'>
                  <label htmlFor="organization-type" className="block mt-4 mb-1  text-slate-700 dark:text-slate-300">Organization Type</label>
                  <select
                    id="organization-type"
                    className="w-full p-1.5 text-[15px] dark:bg-gray-800 rounded bg-slate-100  border-[1px] dark:border-slate-200 border-slate-300"
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

              <label htmlFor="trade-license" className="block mt-4 mb-1  text-slate-700 dark:text-slate-300">Trade License</label>
              <input
                id="trade-license"
                className=" w-full p-1.5 text-[15px] dark:bg-gray-800 rounded bg-slate-100  border-[1px] dark:border-slate-200 border-slate-300"
                value={formData.tradeLicense}
                onChange={(e) => handleChange("tradeLicense", e.target.value)}
                placeholder="Enter your trade license number"
              />
              <label htmlFor="email" className="block mt-4 mb-1  text-slate-700 dark:text-slate-300">Email</label>
              <input
                id="email"
                type="email"
                className="w-full p-1.5 text-[15px] dark:bg-gray-800 rounded bg-slate-100  border-[1px] dark:border-slate-200 border-slate-300"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter your email"
              />

              <label htmlFor="phone1" className="block mt-4 mb-1  text-slate-700 dark:text-slate-300">Phone</label>
              <input
                id="phone1"
                type="tel"
                className="w-full p-1.5 text-[15px] dark:bg-gray-800 rounded bg-slate-100  border-[1px] dark:border-slate-200 border-slate-300"
                value={formData.phone1}
                onChange={(e) => handleChange("phone1", e.target.value)}
                placeholder="Enter your primary phone number"
              />
            </div>
          )}

          {/* Contact Info */}
          {currentStep === 1 && (
            <div className="mb-4">

              <label htmlFor="country" className="block mt-4 mb-1  text-slate-700 dark:text-slate-300">Country</label>
              <input
                id="country"
                className="w-full p-1.5 text-[15px] dark:bg-gray-800 rounded bg-slate-100  border-[1px] dark:border-slate-200 border-slate-300"
                value={formData.country}
                onChange={(e) => handleChange("country", e.target.value)}
                placeholder="Enter your country"
              />
              <div className='flex justify-between w-full'>
                <div className='flex flex-col'>
                  <label htmlFor="state" className="block mt-4 mb-1  text-slate-700 dark:text-slate-300">State</label>
                  <input
                    id="state"
                    className="w-full p-1.5 text-[15px] dark:bg-gray-800 rounded bg-slate-100  border-[1px] dark:border-slate-200 border-slate-300"
                    value={formData.state}
                    onChange={(e) => handleChange("state", e.target.value)}
                    placeholder="Enter your state"
                  />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="city" className="block mt-4 mb-1  text-slate-700 dark:text-slate-300 ">City</label>
                  <input
                    id="city"
                    className="w-full p-1.5 text-[15px] dark:bg-gray-800 rounded bg-slate-100  border-[1px] dark:border-slate-200 border-slate-300"
                    value={formData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    placeholder="Enter your city"
                  />
                </div>

              </div>
              <label htmlFor="focus-area" className="block mb-3 mt-4 text-slate-700 dark:text-slate-300">Focus Area</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {focusAreaOptions.map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-[#00adef]"
                      checked={formData.focusArea.includes(option)}
                      onChange={() => handleCheckboxChange("focusArea", option)}
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                ))}
              </div>

              <label htmlFor="interest-area" className="block mb-3 mt-4 text-slate-700 dark:text-slate-300">Interest Area</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {interestOptions.map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-[#00adef]"
                      checked={formData.interestedIn.includes(option)}
                      onChange={() => handleCheckboxChange("interestedIn", option)}
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
          {/* Confirm Info */}
          {currentStep === 2 && (
            <div className="mb-4">
              <h2 className="text-center text-lg font-bold">Confirm Your Information</h2>
              <p className="mt-4"><span className=' text-slate-700 dark:text-slate-300'>Organization Name: </span>{formData.organizationName}</p>
              <p className="mt-2"><span className=' text-slate-700 dark:text-slate-300'>Industry: </span>{formData.industry}</p>
              <p className="mt-2"><span className=' text-slate-700 dark:text-slate-300'>Focus Area: </span>{formData.focusArea.join(', ')}</p>
              <p className="mt-2"><span className=' text-slate-700 dark:text-slate-300'>Interested In: </span>{formData.interestedIn.join(', ')}</p>
              <p className="mt-2"><span className=' text-slate-700 dark:text-slate-300'>Email: </span>{formData.email}</p>
              <p className="mt-2"><span className=' text-slate-700 dark:text-slate-300'>Phone 1: </span>{formData.phone1}</p>
              <p className="mt-2"><span className=' text-slate-700 dark:text-slate-300'>Phone 2: </span>{formData.phone2}</p>
              <p className="mt-2"><span className=' text-slate-700 dark:text-slate-300'>City: </span>{formData.city}</p>
              <p className="mt-2"><span className=' text-slate-700 dark:text-slate-300'>State: </span>{formData.state}</p>
              <p className="mt-2"><span className=' text-slate-700 dark:text-slate-300'>Country: </span>{formData.country}</p>
            </div>
          )}
        </div>

        <div className="flex justify-between mt-6 ">
          <button
            className="bg-gray-700 text-white py-2 px-4 rounded-lg w-24"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Previous
          </button>
          {currentStep < steps.length - 1 ? (
            <button
              className="bg-[#00adef] text-white py-2 px-4 rounded-lg w-24"
              onClick={handleNext}
            >
              Next
            </button>
          ) : (
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-lg w-24"
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
