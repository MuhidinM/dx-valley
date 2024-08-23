/** @format */

import Image from "next/image";
import React from "react";

const HowWeWorkSection = () => {
  return (
    <div className='container flex mx-auto items-center justify-center'>
      <section className='relative py-10 lg:py-20'>
        <div className='container mx-auto py-10'>
          <div className='text-center'>
            <h2 className='text-4xl font-bold'>
              <span className='text-coopBlue'>How</span> We Work
            </h2>
            <div className='flex justify-center mt-2  mb-12'>
              <div className='w-20 h-1 bg-coopOrange'></div>
            </div>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 items-center justify-center md:items-center md:justify-center    '>
            <div className='lg:w-1/3 w-full mb-8 lg:mb-3 items-center justify-center '>
              <Image
                src='/image/idea.gif'
                alt=''
                className='rounded-full'
                width={300}
                height={300}
                id='image1'
              />
            </div>
            <div className='w-full '>
              <div className='flex items-center mb-4'>
                <span className='h-4 w-4 bg-coopBlue rounded-full'></span>
                <h4 className='text-2xl font-semibold ml-4' id='title1'>
                  Ideation
                </h4>
              </div>

              <div className='mt-5 mb-3 w-full text-left'>
                <p id='description_11 '>
                  An innovation hub&apos;s ideation process begins with
                  structured brainstorming sessions, hackathons, and innovation
                  challenges to stimulate creativity and collaboration. By
                  fostering a culture of openness and curiosity, the hub
                  encourages team members to propose a wide array of ideas.
                  After generating ideas, the hub evaluates and prioritizes them
                  based on feasibility, market potential, and alignment with
                  organizational goals. Initial screening filters out less
                  viable ideas, while promising concepts undergo detailed
                  feasibility studies and risk assessments.
                </p>
              </div>

              {/* <div className='process-direction'>
                <svg
                  className='absolute'
                  width='100%'
                  height='300%'
                  viewBox='0 0 100 100'
                  xmlns='http://www.w3.org/2000/svg'>
                  <line
                    x1='0'
                    y1='0'
                    x2='100'
                    y2='100'
                    stroke='#4bafe8'
                    strokeWidth='3'
                    strokeDasharray='5,5'
                  />
                </svg>
              </div> */}
            </div>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 items-center justify-center my-20'>
            <div className='w-full relative'>
              <div className='flex items-center mb-4'>
                <h4 className='text-2xl font-semibold mr-4' id='title2'>
                  Prototyping
                </h4>
                <span className='h-4 w-4 bg-coopBlue rounded-full'></span>
              </div>
              <div className='mt-5 mb-3 w-full text-left list-dis'>
                <ul className='mt-5 mb-3 list-none list-dis' id='work_2'>
                  <li className='flex items-center mb-2'>
                    <i className='fas fa-check mr-3'></i>Idea Generation
                  </li>
                  <li className='flex items-center mb-2'>
                    <i className='fas fa-check mr-3'></i>Idea Evaluation
                  </li>
                  <li className='flex items-center mb-2'>
                    <i className='fas fa-check mr-3'></i>Prototyping and Testing
                  </li>
                  <li className='flex items-center mb-2'>
                    <i className='fas fa-check mr-3'></i>Collaboration and
                    Development
                  </li>
                  <li className='flex items-center mb-2'>
                    <i className='fas fa-check mr-3'></i>Monitoring and Metrics
                  </li>
                </ul>
              </div>
            </div>
            <div className='lg:w-1/3 w-full'>
              <Image
                src='/image/prototyping.gif'
                alt=''
                className='rounded-full'
                width={300}
                height={300}
                id='image2'
              />
            </div>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 items-center justify-center mb-20'>
            <div className='lg:w-1/3 w-full mb-8 lg:mb-0'>
              <Image
                src='/image/software.gif'
                alt=''
                className='rounded-full'
                width={300}
                height={300}
                id='image3'
              />
            </div>
            <div className='w-full relative'>
              <div className='flex items-center mb-4'>
                <span className='h-4 w-4 bg-coopBlue rounded-full'></span>
                <h4 className='text-2xl font-semibold ml-4' id='title3'>
                  Production
                </h4>
              </div>
              <div className='mt-5 mb-3 w-full text-left'>
                <p id='description_11 '>
                  Cross-functional teams are assembled to bring diverse
                  expertise to the project, ensuring all aspects from design to
                  functionality are addressed. Prototypes and minimum viable
                  products (MVPs) are created and iteratively tested,
                  incorporating feedback from stakeholders and potential users.
                  Once the product meets the required standards and goals, it is
                  scaled for full production.
                </p>
              </div>
              {/* <div className='process-direction2'></div> */}
            </div>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 items-center justify-center'>
            <div className='w-full relative'>
              <div className='flex items-center mb-4'>
                <h4 className='text-2xl font-semibold mr-4' id='title4'>
                  Evaluation
                </h4>
                <span className='h-4 w-4 bg-coopBlue rounded-full'></span>
              </div>
              <ul className='mt-5 mb-3 list-disc' id='work_2'>
                <li className='flex items-center mb-2 list-dis'>
                  <i className='fas fa-check mr-3'></i> Initial Screening
                </li>
                <li className='flex items-center mb-2'>
                  <i className='fas fa-check mr-3'></i>Detailed Feasibility
                  Analysis
                </li>
                <li className='flex items-center mb-2'>
                  <i className='fas fa-check mr-3'></i>Risk Assessment
                </li>
                <li className='flex items-center mb-2'>
                  <i className='fas fa-check mr-3'></i>Decision-Making
                </li>
                <li className='flex items-center mb-2'>
                  <i className='fas fa-check mr-3'></i>Feedback Loop
                </li>
              </ul>
              {/* <div className='process-direction-last'></div> */}
            </div>
            <div className='lg:w-1/3 w-full'>
              <Image
                src='/image/evaluation.gif'
                alt=''
                className='rounded-full'
                width={300}
                height={300}
                id='image4'
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowWeWorkSection;
