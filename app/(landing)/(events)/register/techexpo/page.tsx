import { Suspense } from "react";
import TechExpoRegistrationForm from "@/components/events/TechExpoRegistrationForm";
const Expo = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <TechExpoRegistrationForm />;
      </Suspense>
    </div>
  );
};

export default Expo;
