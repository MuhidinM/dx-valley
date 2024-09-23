"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
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
  "strongly disagree",
  "somewhat disagree",
  "neither agree nor disagree",
  "somewhat agree",
  "strongly agree",
];

export function MultiStepFormComponent() {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({});

  const totalSteps = 5;

  const handleOptionChange = (
    step: number,
    question: number,
    value: string
  ) => {
    const score = parseInt(value);
    setFormData((prev) => ({
      ...prev,
      [step]: {
        ...prev[step],
        [question]: score,
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
    console.log("Form submitted:", formData);
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
      <DialogTrigger asChild>
        <Button variant="outline">Open Multi-Step Form</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Multi-Step Form - Step {currentStep}</DialogTitle>
        </DialogHeader>
        {currentStep < 5 ? (
          <div className="grid gap-10 py-4">
            {questions[currentStep - 1].map((question, questionIndex) => (
              <div key={questionIndex} className="space-y-2">
                <Label
                  htmlFor={`question-${questionIndex + 1}`}
                  className="font-bold text-md"
                >
                  {question}
                </Label>
                <RadioGroup
                  id={`question-${questionIndex + 1}`}
                  className="flex justify-between"
                  value={
                    formData[currentStep]?.[questionIndex + 1]?.toString() || ""
                  }
                  onValueChange={(value) =>
                    handleOptionChange(currentStep, questionIndex + 1, value)
                  }
                >
                  {choices.map((choice, choiceIndex) => (
                    <div key={choiceIndex} className="flex space-x-2">
                      <RadioGroupItem
                        value={(choiceIndex + 1).toString()}
                        id={`q${questionIndex + 1}-option-${choiceIndex + 1}`}
                      />
                      <Label
                        htmlFor={`q${questionIndex + 1}-option-${
                          choiceIndex + 1
                        }`}
                        className=" text-center"
                      >
                        {choice}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
            <p className="text-lg mb-4">
              You have completed the multi-step form. Thank you for your
              participation!
            </p>
            <div className="space-y-2 mb-6">
              <p className="font-semibold">Your Results:</p>
              <p>Sum of odd-numbered questions: {oddSum}</p>
              <p>Sum of even-numbered questions: {evenSum}</p>
            </div>
            <div className="w-full h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                  }}
                >
                  <CartesianGrid />
                  <XAxis
                    type="number"
                    dataKey="x"
                    name="Odd Sum"
                    domain={[0, 50]}
                    ticks={[0, 25, 50]}
                    label={{ value: "Odd Sum", position: "bottom" }}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    name="Even Sum"
                    domain={[0, 50]}
                    ticks={[0, 25, 50]}
                    label={{ value: "Even Sum", angle: -90, position: "left" }}
                  />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                  <Scatter name="Result" data={chartData} fill="#8884d8" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        <div className="flex justify-between mt-6">
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
