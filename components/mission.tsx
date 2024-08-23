import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Target, View } from "lucide-react";

const Mission = () => {
  return (
    <div className='md:grid grid-cols-2 gap-4'>
      <Card>
        <CardTitle className='items-center justify-center p-6'>
          <span className='text-4xl font-bold text-coopOrange'>Mission</span>
        </CardTitle>
        <CardContent className='flex items-center h-fit justify-center p-6'>
          <Target size={96} className='text-coopBlue' strokeWidth={1.5} />
        </CardContent>
        <CardFooter>
          <p>
            {" "}
            Our mission is to empower capable youngsters through technology and
            innovation, transforming their ideas into reality and changing
            lives. We provide access to cutting-edge technology, mentorship, and
            resources to foster innovation and creativity. Our goal is to equip
            youngsters with the skills and knowledge to drive positive change in
            their communities and beyond. By empowering young minds, we can
            create a brighter future for all.
          </p>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            <span className='text-4xl font-bold text-coopOrange'>Vision </span>
          </CardTitle>
        </CardHeader>
        <CardContent className='grid items-center h-fit justify-center p-4'>
          <View size={96} className='text-coopBlue' strokeWidth={1.5} />
        </CardContent>
        <CardFooter>
          <p>
            {" "}
            To be the leading force in pioneering innovations that reshape
            industries, empower communities, and drive sustainable growth. We
            envision a future where cutting-edge technology, creative
            collaboration, and a relentless pursuit of excellence converge to
            unlock new possibilities, elevate human potential
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Mission;
