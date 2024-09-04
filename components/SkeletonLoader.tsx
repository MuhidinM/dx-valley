/** @format */

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoader = () => (
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

export default SkeletonLoader;
