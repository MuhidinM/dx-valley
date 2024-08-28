/** @format */

import Confetti from "react-confetti";
import { Button } from "./ui/button";
import { CheckCircle2 } from "lucide-react";
import router from "next/router";
import { submissonSuccess } from "@/types/general";


const SubmissionSuccess: React.FC<submissonSuccess> = ({ items }) => {
  return (
    <div className='flex flex-col items-center justify-center  bg-gray-50'>
      <div className='text-center space-y-4'>
        <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100'>
          <CheckCircle2 className='w-8 h-8 text-green-600' />
        </div>
        <h1 className='text-4xl font-bold text-gray-900'>
          Submission Successful!
        </h1>
        <p className='text-xl text-gray-600'>
          Good luck! Stay tuned for our email.
        </p>
        <Button onClick={() => router.push("/")} className='mt-8'>
          Go Back to Home
        </Button>
      </div>
    </div>
  );
};

export default SubmissionSuccess;
