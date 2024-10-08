/** @format */

import { Suspense } from "react";
import ContestRegistrationForm from "@/components/events/ContestRegistrationForm";

const Hackathon = () => {
  return (
    <div>
      <Suspense >
        <ContestRegistrationForm />
      </Suspense>
    </div>
  );
};
export default Hackathon;
