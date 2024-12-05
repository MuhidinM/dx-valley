"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type FormData = {
  [step: number]: {
    [question: number]: number;
  };
};

const questions = [
  [
    "Frequently my ideas or perspectives diverge radically from the perspectives of others.",
    "I am very careful to avoid making mistakes in my work.",
    "I regularly ask questions that challenge the status quo.",
    "I am extremely well organized at work.",
    "New ideas often come to me when I am directly observing how people interact with products and services.",
  ],
  [
    'I must have everything finished "just right" when completing a work assignment.',
    "I often find solutions to problems by drawing on solutions or ideas developed in other industries, fields, or disciplines.",
    "I never jump into new projects and ventures and never act quickly without carefully thinking through all the issues.",
    "I frequently experiment to create new ways of doing things.",
    "I always follow through to complete a task, no matter what the obstacles.",
  ],
  [
    "I regularly talk with a diverse set of people (e.g. from different business functions, organizations, industries, geographies, etc.) to find and refine new ideas.",
    "I excel at breaking down a goal or plan into the micro tasks required to achieve it.",
    "I attend conferences on my areas of expertise, as well as unrelated areas, to meet new people and understand what issues they face.",
    "I pay careful attention to details at work to ensure that nothing is overlooked.",
    "I actively seek to identify emerging trends by reading books, articles, magazines, blogs…",
  ],
  [
    "I hold myself and others strictly accountable for getting results.",
    'I frequently ask "what if" questions that provoke the exploration of new possibilities.',
    "I consistently follow through on all commitments and finish what I start.",
    "I regularly observe the actions of customers, suppliers, or other organizations, to get ideas.",
    "I consistently create detailed plans to get work done.",
  ],
];

const choices = [
  { label: "strongly disagree", value: 1 },
  { label: "somewhat disagree", value: 2 },
  { label: "neither agree nor disagree", value: 3 },
  { label: "somewhat agree", value: 4 },
  { label: "strongly agree", value: 5 },
];

const ColorfulSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500">
      <SliderPrimitive.Range className="absolute h-full bg-transparent" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
ColorfulSlider.displayName = SliderPrimitive.Root.displayName;

export function MultiStepFormComponent() {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(() => {
    const initialData: FormData = {};
    questions.forEach((step, stepIndex) => {
      initialData[stepIndex + 1] = {};
      step.forEach((_, questionIndex) => {
        initialData[stepIndex + 1][questionIndex + 1] = 3; // Set default to 3
      });
    });
    return initialData;
  });

  const totalSteps = 5;

  const handleSliderChange = (
    step: number,
    question: number,
    value: number[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [step]: {
        ...prev[step],
        [question]: value[0],
      },
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    // console.log("Form submitted:", formData);
    setOpen(false);
    setCurrentStep(1);
    setFormData({});
  };

  const { oddSum, evenSum } = useMemo(() => {
    let oddSum = 0;
    let evenSum = 0;
    Object.values(formData).forEach((step, stepIndex) => {
      Object.entries(step).forEach(([questionKey, score]) => {
        const questionNumber = stepIndex * 5 + parseInt(questionKey);
        if (questionNumber % 2 === 1) {
          oddSum += score;
        } else {
          evenSum += score;
        }
      });
    });
    return { oddSum, evenSum };
  }, [formData]);

  const chartData = [{ x: oddSum, y: evenSum }];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <section className='dark:bg-gray-950 bg-white rounded-b-lg py-10 px-10'>
        <div className='px-4 sm:mx-auto flex flex-col items-center justify-center space-y-6 text-center md:px-0'>
          {/* Heading */}
          <h2 className='text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-gray-800 dark:text-white'>
            Deliverer or Discoverer? Find out which one you are!
          </h2>

          {/* Button */}
          <div className='mt-4'>
            <DialogTrigger asChild>
              <Button className='bg-coopBlue hover:bg-coopBlueHover text-2xl py-6 px-12'>
                Discover Here!
              </Button>
            </DialogTrigger>
          </div>

          {/* Citation */}
          <div className='prose dark:prose-dark text-gray-700 dark:text-gray-300 flex items-center justify-center px-4 md:px-10'>
            <p className='text-sm md:text-base'>
              Source: Dyer, Gregersen, and Christensen,{" "}
              <span className='italic font-semibold'>
                The Innovator&apos;s Dilemma
              </span>
            </p>
          </div>
        </div>
      </section>
      <DialogContent className='lg:max-w-[1000px]'>
        <DialogHeader>
          <DialogTitle>Multi-Step Form - Step {currentStep}</DialogTitle>
        </DialogHeader>
        {currentStep < 5 ? (
          <div className='lg:grid lg:gap-10 py-4 '>
            <div className='flex justify-between items-center mb-4'>
              <span className='text-xs text-red-500'>Strongly Disagree</span>
              <div className='w-1/2 h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full'></div>
              <span className='text-xs text-green-500'>Strongly Agree</span>
            </div>
            {questions[currentStep - 1].map((question, questionIndex) => (
              <div key={questionIndex} className='space-y-4  pb-3'>
                <div className='lg:flex justify-between items-center gap-10    '>
                  <Label
                    htmlFor={`question-${questionIndex + 1}`}
                    className='lg:font-bold md:font-bold text-sm flex flex-wrap lg:pb-3 pb-1 lg:text-md md:text-md lg:min-w-[700px] xs:text-sm '>
                    {question}
                  </Label>
                  <div className='space-y-2 w-full items-center '>
                    <ColorfulSlider
                      id={`question-${questionIndex + 1}`}
                      min={1}
                      max={5}
                      step={1}
                      value={[formData[currentStep]?.[questionIndex + 1] || 3]}
                      onValueChange={(value) =>
                        handleSliderChange(
                          currentStep,
                          questionIndex + 1,
                          value
                        )
                      }
                      className='w-full'
                    />
                    <div className='flex justify-between px-2'>
                      {[1, 2, 3, 4, 5].map((value) => (
                        <span key={value} className='text-xs'>
                          {value}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='pt-4 text-center '>
            <h2 className='text-2xl font-bold mb-2'>Congratulations!</h2>
            <p className='text-lg mb-2'>
              You have completed the Discovery and Delivery form. Thank you for
              your participation!
            </p>
            <div className='space-y-2 mb-2'>
              <div className='flex gap-2 justify-center items-center'>
                <p className='font-semibold'>Your Results:</p>
                <p>Discovery: {oddSum}</p>
                <p>Delivery: {evenSum}</p>
              </div>

              <div className='text-center'>
                {oddSum > evenSum ? (
                  <p className='font-bold text-blue-500 relative group'>
                    You are a Discoverer
                    <span className='absolute top-6 left-1/2 -translate-x-1/2 bg-gray-200 text-gray-800 text-sm rounded-lg p-2 w-64 hidden group-hover:block'>
                      Discoverers are idea generators and visionaries who excel
                      at conceptualizing and exploring new opportunities.
                    </span>
                  </p>
                ) : (
                  <p className='font-bold text-green-500 relative group'>
                    You are a Deliverer
                    <span className='absolute top-6 left-1/2 -translate-x-1/2 bg-gray-200 text-gray-800 text-sm rounded-lg p-2 w-64 hidden group-hover:block'>
                      Deliverers are execution-focused individuals who excel at
                      turning plans into tangible outcomes and ensuring
                      follow-through.
                    </span>
                  </p>
                )}
              </div>
            </div>

            <div className='lg:h-[450px] h-3/5'>
              <ResponsiveContainer width='100%' height='100%'>
                <ScatterChart
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                  }}>
                  <CartesianGrid />
                  <XAxis
                    type='number'
                    dataKey='x'
                    name='Discovery'
                    domain={[0, 50]}
                    ticks={[0, 25, 50]}
                    label={{ value: "Discovery", position: "bottom" }}
                  />
                  <YAxis
                    type='number'
                    dataKey='y'
                    name='Delivery'
                    domain={[0, 50]}
                    ticks={[0, 25, 50]}
                    label={{ value: "Delivery", angle: -90, position: "left" }}
                  />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                  <Scatter name='Result' data={chartData} fill='#8884d8' />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        <div className='flex justify-between mt-2'>
          <Button onClick={handlePrevious} disabled={currentStep === 1}>
            Previous
          </Button>
          {currentStep < totalSteps ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button onClick={handleSubmit}>Finish</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
