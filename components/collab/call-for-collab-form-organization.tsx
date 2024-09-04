'use client';

import { useState } from 'react';

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

  const [dropdownsOpen, setDropdownsOpen] = useState({
    focusArea: false,
    interestedIn: false,
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
              documentType: formData.tradeLicenseUpload,
              documentNumber: "hdfagj",
            },
          ],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Form data saved:', data);
      } else {
        console.error('Error saving form data:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const toggleDropdown = (name: keyof typeof dropdownsOpen) => {
    setDropdownsOpen((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <div className="flex justify-center items-center bg-background p-6 dark:bg-gray-800">
      <form className="w-full max-w-5xl p-6 bg-slate-50 dark:bg-gray-900 shadow-lg rounded-lg space-y-6" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center mb-6">Tell us about your company</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Part */}
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300">Organization Name</label>
              <input
                className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-sm"
                value={formData.organizationName}
                onChange={(e) => handleChange("organizationName", e.target.value)}
                placeholder="Enter your organization name"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-sm"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300">Phone</label>
              <input
                type="tel"
                className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-sm"
                value={formData.phoneNumberOne}
                onChange={(e) => handleChange("phoneNumberOne", e.target.value)}
                placeholder="Enter your primary phone number"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300">Country</label>
              <input
                className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-sm"
                value={formData.country}
                onChange={(e) => handleChange("country", e.target.value)}
                placeholder="Enter your Country"
              />
            </div>

            <div className='flex justify-between gap-4'>
              <div className='flex-1'>
                <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300">City</label>
                <input
                  className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-sm"
                  value={formData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  placeholder="Enter your city"
                />
              </div>
              <div className='flex-1'>
                <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300">State</label>
                <input
                  className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-sm"
                  value={formData.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                  placeholder="Enter your state"
                />
              </div>
            </div>


          </div>

          {/* Right Part */}
          <div className="space-y-6">
            <div className=' mb-1'>
              <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300">Organization Type</label>
              <select
                className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-sm"
                value={formData.organizationType}
                onChange={(e) => handleChange("organizationType", e.target.value)}
              >
                <option value="">Select organization type</option>
                {organizationTypeOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Focus Area Dropdown */}
            <div className=' mb-1'>
              <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300">Focus Area</label>
              <div className="relative">
                <button
                  type="button"
                  className="w-full p-3  rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-sm text-left"
                  onClick={() => toggleDropdown('focusArea')}
                >
                  {formData.focusArea.length > 0 ? formData.focusArea.join(', ') : "Select focus areas"}
                </button>
                {dropdownsOpen.focusArea && (
                  <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded shadow-lg max-h-48 overflow-y-auto">
                    {focusAreaOptions.map((option) => (
                      <label key={option} className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-blue-500 mr-2"
                          checked={formData.focusArea.includes(option)}
                          onChange={() => handleCheckboxChange("focusArea", option)}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Interest Area Dropdown */}
            <div className=' mb-1'>
              <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300">Interest Area</label>
              <div className="relative">
                <button
                  type="button"
                  className="w-full p-3 bg-transparent rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-sm text-left"
                  onClick={() => toggleDropdown('interestedIn')}
                >
                  {formData.interestedIn.length > 0 ? formData.interestedIn.join(', ') : "Select interest areas"}
                </button>
                {dropdownsOpen.interestedIn && (
                  <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded shadow-lg max-h-48 overflow-y-auto">
                    {interestOptions.map((option) => (
                      <label key={option} className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-blue-500 mr-2"
                          checked={formData.interestedIn.includes(option)}
                          onChange={() => handleCheckboxChange("interestedIn", option)}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              
            </div>
            <div className=' '>
                <label className="block mb-1 text-lg font-semibold text-gray-700 dark:text-gray-300">Industry</label>
                <select
                  className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-sm"
                  value={formData.industry}
                  onChange={(e) => handleChange("industry", e.target.value)}
                >
                  <option value="">Select industry</option>
                  {industryOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className=''>
                <label className="block text-lg  font-semibold text-gray-700 dark:text-gray-300">Trade License</label>
                <input
                  type="file"
                  className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-sm"
                  onChange={(e) => handleChange("tradeLicenseUpload", e.target.files ? e.target.files[0] : null)}
                />
              </div>



          </div>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
