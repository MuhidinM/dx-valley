import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTAComponent() {
  return (
    <section className="w-full px-12 py-12 md:py-24 lg:py-24">
      <div className="container mx-auto max-w-7xl px-4  sm:px-6 lg:px-8 flex flex-col justify-between h-full">
        <div className="flex-grow space-y-6">
          <h2 className="text-4xl sm:text-4xl lg:text-4xl font-bold tracking-tight text-coopOrange font-['Arial']">
            Join Us On Our Digital Empowerment Journey
          </h2>
          <p className="text-xl sm:text-lg lg:text-xl text-coopBlue ">
            <em>
            We are at the forefront of digital innovation, dedicated to empowering communities and transforming lives.
            </em>
          </p>
          <p className="text-base font-semibold sm:text-lg text-gray-800  font-['Arial']">
              Walk the empowering digital path with us, One Step at a Time.
            </p>
        
        </div>
        <div className="grid grid-cols-2 gap-3 mt-8">
          <Link href={"/trainers"}>
            <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white font-['Arial'] text-lg py-0 transition-colors duration-300">
              Trainer
            </Button>
          </Link>
          <Link href={"/organizations"}>
            <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white font-['Arial'] text-lg py-0 transition-colors duration-300">
               Organization
            </Button>
          </Link>
          <Link href={"/media"}>
            <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white font-['Arial'] text-lg py-0 transition-colors duration-300">
              Media
            </Button>
          </Link>
          <Link href={"/stakeholders"}>
            <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white font-['Arial'] text-lg py-0 transition-colors duration-300">
             Stakeholder
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
