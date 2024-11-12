/** @format */

"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import ComingSoonComp from "@/components/comingSoonComp";
import Link from "next/link";

type Item = {
  id: string;
  name: string;
  description: string;
};

export default function FilteringContent() {
  const [activeTab, setActiveTab] = useState("startup");
  const [searchTerm, setSearchTerm] = useState("");

  const startupItems: Item[] = [
    // {
    //   id: "1",
    //   name: "TechStart",
    //   description: "AI-powered startup in Silicon Valley",
    // },
    // {
    //   id: "2",
    //   name: "GreenEnergy",
    //   description: "Renewable energy solutions in Berlin",
    // },
    // {
    //   id: "3",
    //   name: "HealthTech",
    //   description: "Healthcare innovation in Boston",
    // },
    // Add more items as needed
  ];

  const internshipItems: Item[] = [
    // {
    //   id: "1",
    //   name: "Software Development Intern",
    //   description: "3-month internship at a tech startup",
    // },
    // {
    //   id: "2",
    //   name: "Marketing Intern",
    //   description: "6-month internship at a global corporation",
    // },
    // {
    //   id: "3",
    //   name: "Research Assistant",
    //   description: "Summer internship at a university lab",
    // },
    // Add more items as needed
  ];

  const filteredItems = useMemo(() => {
    const items = activeTab === "startup" ? startupItems : internshipItems;
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [activeTab, searchTerm]);

  const renderContent = () => {
    if (filteredItems.length === 0) {
      return <ComingSoonComp />;
    }

    return (
      <ul className='space-y-4'>
        {filteredItems.map((item) => (
          <li key={item.id} className='bg-white p-4 rounded-lg shadow'>
            <h3 className='font-semibold'>{item.name}</h3>
            <p className='text-sm text-gray-600'>{item.description}</p>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-6'>Filtering Criteria</h1>

      <div className='relative mb-6'>
        <Input
          type='text'
          placeholder='Search criteria...'
          className='pl-10'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search
          className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
          size={20}
        />
      </div>

      <Tabs defaultValue='startup' className='w-full mb-6'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='startup' onClick={() => setActiveTab("startup")}>
            Startup
          </TabsTrigger>
          <TabsTrigger
            value='internship'
            onClick={() => setActiveTab("internship")}>
            Internship
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className='bg-gray-100 p-4 rounded-lg mb-6 min-h-[18rem]'>
        {renderContent()}
      </div>

      <div className='flex justify-end'>
        <Link
          href={
            activeTab === "startup" ? "/callforproposal" : "/internshipform"
          }>
          <Button>Apply</Button>
        </Link>
      </div>
    </div>
  );
}
