'use client';

import { useState } from 'react';

const platformOptions = ["Radio", "TV", "Youtube"];
const genreOptions = ["Report", "Podcast", "Other"];
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
<<<<<<< HEAD
    <div className="flex items-center justify-center dark:bg-background bg-background p-6">
      <div className="w-full max-w-2xl px-6 mx-4 dark:bg-gray-800 p-6 rounded-lg shadow-xl">
        <div className="text-center font-bold text-2xl mb-6">
          Media Registration Form
        </div>
=======
    <div
      className="admin-event mx-8 flex w-3/4 justify-center p-6 "
      id="collab-form"
    >
      <Card className="w-auto items-center p-10">
        <CardHeader>
          <CardTitle className="flex-col justify-center items-center mb-10">
            <span className="flex justify-center text-3xl tracking-tight mb-2 font-bold leading-tight underline-offset-auto dark:text-white">
            Media Registration Form
            </span>
            <div className="flex justify-center">
              <div className="w-20 h-1 bg-coopOrange"></div>
            </div>
            {/* <div className="flex w-full justify-between shadow-lg dark:bg-red-500 h-16 items-center p-6">
              <div>Put some info here</div>
              <div>Vedio introduction</div>
            </div> */}
            
            
          </CardTitle>
          {/* <CardDescription className="flex mb-10">Write for Us!</CardDescription> */}
        </CardHeader>
        <CardContent>
          {/* <form onSubmit={(e) => e.preventDefault()}> */}
          <form onSubmit={handleSubmit}>
            <div className="grid w-full gap-4 md:grid-cols-2 mb-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Media Name</Label>
                <Input
                  type="text"
                  value={Fullname}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
>>>>>>> a91c0993c317904633b4203c8f9fac306dec810e

        <div className="space-y-6">
          {/* Organization Info */}
          <div>
            <label htmlFor="mediaName" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Media Name
            </label>
            <input
              id="mediaName"
              className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-sm"
              value={formData.mediaName}
              onChange={(e) => handleChange("mediaName", e.target.value)}
              placeholder="Enter your media name"
            />
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="platform" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Platform
              </label>
              <select
                id="platform"
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-sm"
                value={formData.platform}
                onChange={(e) => handleChange("platform", e.target.value)}
              >
                <option value="">Select platform</option>
                {platformOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label htmlFor="contentGenre" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Content Genre
              </label>
              <select
                id="contentGenre"
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-sm"
                value={formData.contentGenre}
                onChange={(e) => handleChange("contentGenre", e.target.value)}
              >
                <option value="">Select Content</option>
                {genreOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Email
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

          <div>
            <label htmlFor="phone1" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Phone
            </label>
            <input
              id="phone1"
              type="tel"
              className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-sm"
              value={formData.phone1}
              onChange={(e) => handleChange("phone1", e.target.value)}
              placeholder="Enter your primary phone number"
            />
          </div>

          <div className="flex space-x-4">
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
          </div>

          <div>
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
