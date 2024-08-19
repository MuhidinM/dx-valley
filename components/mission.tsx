
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card";


const Mission = () => {
  return (
    <div>
      <div className='mx-auto max-w-screen-xl xl:gap-6 md:grid md:grid-cols-1 md:w-half sm:py-16 lg:px-6 gap-3'>
        <Card>
          <CardTitle className='items-center justify-center p-6'>
            <span className='text-4xl font-semibold'>Mission</span>
          </CardTitle>
          <CardContent className='flex items-center h-fit justify-center p-6'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='100'
              height='100'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
              className=''>
              <path d='M3 7V5a2 2 0 0 1 2-2h2' />
              <path d='M17 3h2a2 2 0 0 1 2 2v2' />
              <path d='M21 17v2a2 2 0 0 1-2 2h-2' />
              <path d='M7 21H5a2 2 0 0 1-2-2v-2' />
              <circle cx='12' cy='12' r='1' />
              <path d='M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0' />
            </svg>
          </CardContent>
          <CardFooter>
            <p>
              {" "}
              Our mission is to empower capable youngsters through technology
              and innovation, transforming their ideas into reality and changing
              lives. We provide access to cutting-edge technology, mentorship,
              and resources to foster innovation and creativity. Our goal is to
              equip youngsters with the skills and knowledge to drive positive
              change in their communities and beyond. By empowering young minds,
              we can create a brighter future for all.
            </p>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <span className='text-4xl font-semibold'>Vision </span>
            </CardTitle>
          </CardHeader>
          <CardContent className='grid items-center h-fit justify-center p-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='100'
              height='100'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
              className='lucide lucide-scan-eye'>
              <path d='M3 7V5a2 2 0 0 1 2-2h2' />
              <path d='M17 3h2a2 2 0 0 1 2 2v2' />
              <path d='M21 17v2a2 2 0 0 1-2 2h-2' />
              <path d='M7 21H5a2 2 0 0 1-2-2v-2' />
              <circle cx='12' cy='12' r='1' />
              <path d='M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0' />
            </svg>
          </CardContent>
          <CardFooter>
            <p>
              {" "}
              Our mission is to empower capable youngsters through technology
              and innovation, transforming their ideas into reality and changing
              lives. We provide access to cutting-edge technology, mentorship,
              and resources to foster innovation and creativity. Our goal is to
              equip youngsters with the skills and knowledge to drive positive
              change in their communities and beyond. By empowering young minds,
              we can create a brighter future for all.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Mission;
