'use client';

import { useState } from 'react';

const focusOptions = ["AI", "Agro-Tech", "Fintech"];
const interestOptions = ["Invest", "Buy startup", "Support vision", "Sponsor"];

type FormData = {
  mediaName: string;
  platform: string;
  contentGenre: string;
  city: string;
  state: string;
  country: string;
  email: string;
  phone1: string;
  phone2: string;
};

export default function OrganizationRegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    mediaName: "",
    platform: "",
    contentGenre: "",
    city: "",
    state: "",
    country: "",
    email: "",
    phone1: "",
    phone2: "",
  });

  const handleChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Submitting form data", formData);
  };

  return (
    <div className="flex items-center justify-center dark:bg-background bg-background p-6">
      <div className="w-full max-w-2xl px-6 mx-4 dark:bg-gray-800 p-6 rounded-lg shadow-xl">
        <div className="text-center font-bold text-2xl mb-6">
          Independent partner
        </div>

        <div className="space-y-6">
          {/* Organization Info */}
          <div className='flex space-x-4'>
            <div className='flex-1'>
              <label htmlFor="mediaName" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                First Name
              </label>
              <input
                id="firstname"
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-sm"
                value={formData.mediaName}
                onChange={(e) => handleChange("mediaName", e.target.value)}
                placeholder="Enter your media name"
              />
            </div>

            <div className='flex-1'>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Last Name
              </label>
              <input
                id="email"
                type="email"
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-sm"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className='flex space-x-4'>
            <div className='flex-1'>
              <label htmlFor="mediaName" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                id="firstname"
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-sm"
                value={formData.mediaName}
                onChange={(e) => handleChange("mediaName", e.target.value)}
                placeholder="Enter your media name"
              />
            </div>

            <div className='flex-1'>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Phone number
              </label>
              <input
                id="email"
                type="email"
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-sm"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="flex-1">
            <label htmlFor="country" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Country
            </label>
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
              <label htmlFor="state" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                State
              </label>
              <input
                id="state"
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-sm"
                value={formData.state}
                onChange={(e) => handleChange("state", e.target.value)}
                placeholder="Enter your state"
              />
            </div>

            <div className='flex-1'>
              <label htmlFor="city" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                City
              </label>
              <input
                id="city"
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-sm"
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
                placeholder="Enter your city"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="platform" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Intersted In
              </label>
              <select
                id="platform"
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-sm"
                value={formData.platform}
                onChange={(e) => handleChange("platform", e.target.value)}
              >
                <option value="">Select your choice</option>
                {interestOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label htmlFor="contentGenre" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Focus Area
              </label>
              <select
                id="contentGenre"
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-sm"
                value={formData.contentGenre}
                onChange={(e) => handleChange("contentGenre", e.target.value)}
              >
                <option value="">Select Content</option>
                {focusOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>




          <div className="flex justify-start mt-6 ">

            <button
              className="bg-cyan-500 text-white py-2 px-4 rounded-lg hover:bg-cyan-600 transition duration-300 w-32"
              onClick={handleSubmit}
            >
              Submit
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
