/** @format */

import Head from "next/head";
import { objectivesProps } from "@/types/general";

const Objectives: React.FC<objectivesProps> = ({ items }) => {
  return (
    <div className='flex p-16   items-center justify-center bg-gray-50'>
      <Head>
        <title>Objectives</title>
      </Head>

      <div className='w-full max-w-6xl mx-auto'>
        <h1 className='text-center text-3xl font-extrabold text-gray-800 mb-12'>
          Objectives
        </h1>

        {items?.map((item, index) => (
          <div
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12'
            key={index}>
            {/* Objective 1 */}
            <div className='flex flex-col items-center space-y-4'>
              <div className='w-20 h-20 bg-gradient-to-r from-blue-400 to-coopBlue text-white flex items-center justify-center rounded-lg shadow-lg'>
                <svg
                  className='w-10 h-10'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 8c.707 0 1.354.293 1.768.768C14.293 9.354 14 10 14 10.5a3.502 3.502 0 01-1.5 2.968C11.905 14.052 11.464 14 11 14h-1v-1h.514c.607 0 1.179-.108 1.642-.514.463-.407.844-1.036.844-1.986 0-.707-.293-1.354-.768-1.768C11.354 8.293 10.707 8 10 8s-1.354.293-1.768.768C7.293 9.146 7 9.707 7 10.5H5c0-.707.293-1.354.768-1.768C6.646 7.707 7.293 7.5 8 7.5a3.502 3.502 0 011.5 2.968c0 1.086-.407 1.793-1.268 2.268a5.984 5.984 0 00-2.232 1.964C5.354 16.146 5 17.5 5 18.5c0 .707.293 1.354.768 1.768C6.646 20.707 7.293 21 8 21h8c.707 0 1.354-.293 1.768-.768.475-.414.768-1.061.768-1.768H19c0 .707-.293 1.354-.768 1.768C17.646 21.707 16.707 22 16 22h-8c-.707 0-1.354-.293-1.768-.768C5.293 20.354 5 19.707 5 19s.293-1.354.768-1.768C6.646 16.707 7.293 16.5 8 16.5c.606 0 1.354-.108 1.768-.514.415-.406.732-1.035.732-1.986 0-.707-.293-1.354-.768-1.768C9.354 11.293 8.707 11 8 11H5V9h1.75C7.707 8.293 8 7.646 8 7s-.293-1.354-.768-1.768C6.646 4.293 6 4 5 4h-2a3 3 0 00-3 3c0 .707.293 1.354.768 1.768C.354 9.646.646 10 .75 10.5H5v1a2 2 0 11-4 0v-1H.25c-.606 0-1.354.108-1.768.514C-.293 11.146 0 12 0 12.5V13h1.75C2.707 13.707 3 14.354 3 15a3 3 0 00-3 3c0 .707.293 1.354.768 1.768C.354 20.646.646 21 1 21h3a2 2 0 002-2v-1H1v1a4 4 0 004 4h10a4 4 0 004-4v-1h-4a3 3 0 00-3-3H1.25c-.606 0-1.354-.108-1.768-.514C-.293 19.354 0 19.293 0 18.5v-.5h4v1h3a3 3 0 003-3v-.5H1V9.5h4V7a4 4 0 014 4h4a2 2 0 012 2v1.5h1.5c1.293 0 2-.707 2-1.5 0-.707-.707-1.354-1.768-1.768C15.354 10.293 14.707 10 14 10H12V9h2a3 3 0 00-3-3h-4zm0 5h2a2 2 0 00-2 2H8.5c-.707 0-1.354-.293-1.768-.768C5.354 12.354 5 11.707 5 11c0-.707.293-1.354.768-1.768C6.646 8.293 7.293 8 8 8h2v2zm0-1H8a1 1 0 000 2h2v-2zm-2-1v1h2v-1H8zm2 3v1H8v-1h2zm0-4H8a1 1 0 000 2h2v-2z'></path>
                </svg>
              </div>
              <div className='text-center text-lg font-medium text-gray-800'>
                {item.description}
              </div>
            </div>

            {/* Objective 2 */}
            <div className='flex flex-col items-center space-y-4'>
              <div className='w-20 h-20 bg-gradient-to-r from-gray-700 to-gray-900 text-white flex items-center justify-center rounded-lg shadow-lg'>
                <svg
                  className='w-10 h-10'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19.428 15.3a8 8 0 11-2.828-2.828l2.137 2.137a3 3 0 01-1.415 5.18 2.993 2.993 0 01-1.178-.236l-2.182-1.09-2.182 1.09a3 3 0 11-4.242-4.242l1.09-2.182-1.09-2.182A3 3 0 0112.343 4.93a2.993 2.993 0 011.415 0 3 3 0 011.415 5.18l-2.137-2.137a8 8 0 012.828 2.828l2.137 2.137a3 3 0 011.415 5.18 2.993 2.993 0 011.178-.236l2.182-1.09 2.182 1.09a3 3 0 011.415-5.18z'></path>
                </svg>
              </div>
              <div className='text-center text-lg font-medium text-gray-800'>
                {item.description}
              </div>
            </div>

            {/* Objective 3 */}
            <div className='flex flex-col items-center space-y-4'>
              <div className='w-20 h-20 bg-gradient-to-r  from-yellow-400 to-orange-500 text-white flex items-center justify-center rounded-lg shadow-lg'>
                <svg
                  className='w-10 h-10'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15 10a3 3 0 01-6 0 3 3 0 016 0zm2 6a6 6 0 01-12 0 6 6 0 0112 0zm1.5-9.5a1.5 1.5 0 01-3 0 1.5 1.5 0 013 0zm-3 10a1.5 1.5 0 01-3 0 1.5 1.5 0 013 0zm6.5-7.5h-1a1.5 1.5 0 010-3h1a1.5 1.5 0 010 3zm-10 12.5h-1a1.5 1.5 0 010-3h1a1.5 1.5 0 010 3zm-12-1h1a1.5 1.5 0 010 3h-1a1.5 1.5 0 010-3zm3-19.5h-1a1.5 1.5 0 010-3h1a1.5 1.5 0 010 3z'></path>
                </svg>
              </div>
              <div className='text-center text-lg font-medium text-gray-800'>
                {item.description}
              </div>
            </div>

            {/* Objective 4 */}
            <div className='flex flex-col items-center space-y-4'>
              <div className='w-20 h-20 bg-gradient-to-r from-green-400 to-teal-600 text-white flex items-center justify-center rounded-lg shadow-lg'>
                <svg
                  className='w-10 h-10'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M13.414 10L18 14.586l-1.414 1.414L12 11.414l-4.586 4.586L6 14.586 10.586 10 6 5.414 7.414 4 12 8.586l4.586-4.586L18 5.414 13.414 10z'></path>
                </svg>
              </div>
              <div className='text-center text-lg font-medium text-gray-800'>
                {item.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Objectives;
