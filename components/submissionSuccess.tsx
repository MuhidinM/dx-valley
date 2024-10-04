import { Button } from "./ui/button";
import Link from "next/link";

interface SubmissionSuccessProps {
  title: string;
  icon: React.ReactNode;
  desc: string;
}

const SubmissionSuccess: React.FC<SubmissionSuccessProps> = ({
  title,
  icon,
  desc,
}) => {
  return (
    <div className='flex flex-col items-center dark:text-gray-300 dark:bg-gray-900  justify-center  bg-gray-50'>
      <div className='text-center space-y-4 dark:text-gray-300'>
        <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-gray-700'>
          {/* <CheckCircle2 className='w-8 h-8 text-green-600' /> */}
          {icon}
        </div>
        <h1 className='text-4xl font-bold text-gray-900 dark:text-gray-300'>
          {/* Submission Successful!
           */}
          {title}
        </h1>
        <p className='text-xl text-gray-600 dark:text-gray-300'>
          {/* Good luck! Stay tuned for our email.
           */}
          {desc}
        </p>
        <Link href='/'>
          <Button className='mt-8'>Go Back to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default SubmissionSuccess;
