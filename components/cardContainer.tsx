import React from "react";
import Card from "./Card"; // Adjust the path according to your file structure
import { stats, SVG1, SVG2 } from "@/constants";

const CardContainer: React.FC = () => {
  return (
    <section className='py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6'>
      <div className='grid gap-8 md:grid-cols-2 w-[800px]'>
        <Card
          svg={<SVG1 />}
          title="Our Incubation Center: Your Launchpad to Unleashing Startup Success"
          description="Our Incubation Center nurtures entrepreneurs at every stage with tailored training, personalized coaching, and direct access to seasoned investors. "
          buttonText="Explore Incubation center "
          href={"/incubationcenter"}
        />
        <Card
          svg={<SVG2 />}
          title='Our Innovation Hub: Where Breakthroughs Take Flight and Visionaries Thrive'
          description='Our Innovation Hub drives industry advancements with cutting-edge products and strategic partnerships, fostering a secure environment for groundbreaking.'
          buttonText='Explore Innovation Hub'
          href={"/innovationhub"}
        />
      </div>
    </section>
  );
};

export default CardContainer;
