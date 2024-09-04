/** @format */

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const SkeletonLoader = () => (
  <div>
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mt-5'>
      <div className='lg:col-span-2 flex flex-col justify-between'>
        <Skeleton height={300} />
      </div>
      <div className='lg:col-span-1 flex flex-col'>
        <div className='mt-auto'>
          <Skeleton height={100} />
        </div>
        <div className='mt-auto'>
          <Skeleton height={100} />
        </div>
      </div>
    </div>
    <div className='grid grid-cols-1 mt-3 lg:grid-cols-3 gap-6'>
      <div className='lg:col-span-2'>
        <Skeleton height={150} />
      </div>
      <div className='lg:col-span-1'>
        <Skeleton height={300} />
      </div>
    </div>
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mt-3'>
      <div className='lg:col-span-2'>
        <Skeleton height={200} />
      </div>
      <div className='lg:col-span-1'>
        <Skeleton height={300} />
      </div>
    </div>
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-2 items-center mt-5'>
      <div className='lg:col-span-2'>
        <Skeleton height={300} />
      </div>
      <div className='lg:col-span-1'>
        <Skeleton height={100} />
      </div>
    </div>
    <div className=''>
      <Skeleton height={100} />
    </div>
    <br />
    <h1 className='text-3xl font-bold m-0 text-center'>
      <Skeleton width={300} />
    </h1>
    <br></br>
    <Skeleton height={300} />
    <Skeleton height={100} />
  </div>
);

 export const SkeletonLoaderCollabForm = () => {
   return (
     <div>
      <div className="mb-8">
        <Skeleton height={40} width={300} />
      </div>

      <div className="space-y-8">
        {/* Skeleton for each Section (Alternating Left and Right) */}
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <Skeleton height={400} />
            </div>
            <div className="flex-1">
              <Skeleton height={40} width={`60%`} />
              <Skeleton height={20} width={`80%`} className="mt-2" />
              <Skeleton height={20} width={`90%`} className="mt-2" />
              <Skeleton height={20} width={`75%`} className="mt-2" />
              <Skeleton height={20} width={`50%`} className="mt-2" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Skeleton height={40} width={200} />
      </div>

      <div className="mt-12">
        <Skeleton height={300} />
      </div>

      <div className="mt-12">
        <Skeleton height={600} />
      </div>
    </div>
  
   );
 };

export const SkeletonLoaderAboutPage = () => {
  return (
    <div className='space-y-8 mb-8 justify-center'>
      {/* SectionRight Skeleton */}
      <div className='flex flex-col md:flex-row items-center justify-between'>
        <div className='w-full md:w-1/2'>
          <Skeleton height={320} />
        </div>
        <div className='w-full md:w-1/2 space-y-4 mt-4 md:mt-0'>
          <Skeleton height={40} />
          <Skeleton count={3} />
        </div>
      </div>

      {/* CTA Skeleton */}
      <div className='flex flex-col items-center justify-center space-y-4'>
        <Skeleton width={300} height={40} />
        <Skeleton width={200} height={50} />
      </div>

      {/* Feature Skeleton */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {[...Array(3)].map((_, idx) => (
          <Skeleton key={idx} height={200} />
        ))}
      </div>

      {/* FocusAreas Skeleton */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {[...Array(3)].map((_, idx) => (
          <Skeleton key={idx} height={120} />
        ))}
      </div>

      {/* Offer Skeleton */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {[...Array(3)].map((_, idx) => (
          <Skeleton key={idx} height={120} />
        ))}
      </div>
    </div>
  );
};

export const SkeletonLoaderAboutInnovationPage = () => {
  return (
    <div className='space-y-8 mb-8 justify-center'>
      {/* Skeleton for SectionLeft */}
      <div className='flex flex-col lg:flex-row gap-8'>
        <div className='flex-1'>
          <Skeleton height={400} />
        </div>
        <div className='flex-1'>
          <Skeleton height={40} width={`60%`} />
          <Skeleton height={20} width={`80%`} className='mt-2' />
          <Skeleton height={20} width={`90%`} className='mt-2' />
          <Skeleton height={20} width={`75%`} className='mt-2' />
          <Skeleton height={20} width={`50%`} className='mt-2' />
        </div>
      </div>

      {/* Skeleton for CTA */}
      <div className='flex justify-center'>
        <Skeleton height={40} width={200} />
      </div>

      {/* Skeleton for HowWeWorkSection */}
      <div className='space-y-4'>
        <Skeleton height={40} width={300} />
        <Skeleton count={3} height={20} />
      </div>

      {/* Skeleton for SlidingCompanies */}
      <div className='space-y-4'>
        <Skeleton height={40} width={300} />
        <Skeleton height={200} />
      </div>

      {/* Skeleton for Header */}
      <div className='space-y-4'>
        <Skeleton height={40} width={300} />
        <Skeleton height={20} width={150} />
      </div>

      {/* Skeleton for Gallery Cards */}
      <div className='grid grid-cols-3 gap-4'>
        {[...Array(3)].map((_, index) => (
          <div key={index}>
            <Skeleton height={200} />
            <Skeleton height={20} width={`80%`} className='mt-2' />
            <Skeleton height={20} width={`50%`} className='mt-1' />
          </div>
        ))}
      </div>

      {/* Skeleton for ContactUs */}
      <div className='mt-12'>
        <Skeleton height={40} width={200} />
        <Skeleton height={20} width={`60%`} className='mt-2' />
        <Skeleton height={20} width={`80%`} className='mt-2' />
      </div>
    </div>
  );
};

