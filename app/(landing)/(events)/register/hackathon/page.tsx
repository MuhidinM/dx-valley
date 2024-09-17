import { Suspense } from "react";
import ContestRegistrationForm from "@/components/events/ContestRegistrationForm";

const Hackathon = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ContestRegistrationForm />
      </Suspense>
    </div>
  );
};
export default Hackathon;
