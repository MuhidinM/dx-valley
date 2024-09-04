'use client';

import { useState } from 'react';

const steps = [
  { id: 'trainer-info', title: 'Trainer Info' },
  { id: 'contact-info', title: 'Contact' },
  { id: 'confirm', title: 'Confirm' },
];

const expertiseAreas = ["AI", "Machine Learning", "Web Development", "Data Science"];
const certifications = ["Certified Data Scientist", "Certified AI Engineer", "Certified Web Developer"];

type FormData = {
  firstName: string;
  lastName: string;
  expertise: string[];
  certifications: string[];
  email: string;
  phone1: string;
  phone2: string;
  city: string;
  state: string;
  country: string;
  linkedin: string;
};

export default function TrainerRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    expertise: [],
    certifications: [],
    email: "",
    phone1: "",
    phone2: "",
    city: "",
    state: "",
    country: "",
    linkedin: "",
  });

  const handleCheckboxChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => {
      const updatedValues = (prev[name] as string[]).includes(value)
        ? (prev[name] as string[]).filter((item) => item !== value)
        : [...(prev[name] as string[]), value];
      return { ...prev, [name]: updatedValues };
    });
  };

  const handleChange = (name: keyof FormData, value: string) => {
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
    <div className="flex items-center justify-center dark:bg-background bg-background p-6">
      <div className="w-full max-w-2xl px-6 mx-4 dark:bg-gray-800 p-6 rounded-lg shadow-xl">
        <div className="text-center font-bold text-2xl mb-6">
          {steps[currentStep].title}
        </div>

        {/* Trainer Info */}
        {currentStep === 0 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="first-name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">First Name</label>
              <input
                id="first-name"
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-sm"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                placeholder="Enter your first name"
              />
            </div>

            <div>
              <label htmlFor="last-name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Last Name</label>
              <input
                id="last-name"
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-sm"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                placeholder="Enter your last name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Expertise Areas</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {expertiseAreas.map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-500"
                      checked={formData.expertise.includes(option)}
                      onChange={() => handleCheckboxChange("expertise", option)}
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Certifications</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {certifications.map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-500"
                      checked={formData.certifications.includes(option)}
                      onChange={() => handleCheckboxChange("certifications", option)}
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                ))}
              </div>
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
              <label htmlFor="phone1" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Phone</label>
              <input
                id="phone1"
                type="tel"
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-sm"
                value={formData.phone1}
                onChange={(e) => handleChange("phone1", e.target.value)}
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
              <label htmlFor="linkedin" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">LinkedIn Profile</label>
              <input
                id="linkedin"
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-sm"
                value={formData.linkedin}
                onChange={(e) => handleChange("linkedin", e.target.value)}
                placeholder="Enter your LinkedIn profile URL"
              />
            </div>
          </div>
        )}

        {/* Confirm Info */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-center">Confirm Your Information</h2>
            <div className="space-y-2">
              <p><span className='font-semibold text-gray-700 dark:text-gray-300'>First Name: </span>{formData.firstName}</p>
              <p><span className='font-semibold text-gray-700 dark:text-gray-300'>Last Name: </span>{formData.lastName}</p>
              <p><span className='font-semibold text-gray-700 dark:text-gray-300'>Expertise: </span>{formData.expertise.join(', ')}</p>
              <p><span className='font-semibold text-gray-700 dark:text-gray-300'>Certifications: </span>{formData.certifications.join(', ')}</p>
              <p><span className='font-semibold text-gray-700 dark:text-gray-300'>Email: </span>{formData.email}</p>
              <p><span className='font-semibold text-gray-700 dark:text-gray-300'>Phone 1: </span>{formData.phone1}</p>
              <p><span className='font-semibold text-gray-700 dark:text-gray-300'>Phone 2: </span>{formData.phone2}</p>
              <p><span className='font-semibold text-gray-700 dark:text-gray-300'>City: </span>{formData.city}</p>
              <p><span className='font-semibold text-gray-700 dark:text-gray-300'>State: </span>{formData.state}</p>
              <p><span className='font-semibold text-gray-700 dark:text-gray-300'>Country: </span>{formData.country}</p>
              <p><span className='font-semibold text-gray-700 dark:text-gray-300'>LinkedIn: </span>{formData.linkedin}</p>
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
