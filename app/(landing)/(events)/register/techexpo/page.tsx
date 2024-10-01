/** @format */

import { Suspense } from "react";
import TechExpoRegistrationForm from "@/components/events/TechExpoRegistrationForm";
const Expo = () => {
  return (
    <div>
      <Suspense >
        <TechExpoRegistrationForm />;
      </Suspense>
    </div>
  );
};

export default Expo;
