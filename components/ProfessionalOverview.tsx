import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChartIcon, ArrowRightIcon } from "lucide-react"

export default function Component() {
  return (
    <Card className='w-full max-w-5xl mx-auto items-center justify-center my-4 overflow-hidden border-t-4 border-t-[#00adef] shadow-md'>
      <CardHeader className='bg-gradient-to-r from-[#00adef]/5 to-[#E38524]/5 pb-4'>
        <CardTitle className='flex items-center gap-2 text-2  xl font-semibold text-gray-800'>
          <BarChartIcon className='h-5 w-5 text-[#00adef]' />
          Collaboration Overview
        </CardTitle>
      </CardHeader>
      <CardContent className='p-4 space-y-3'>
        <p className='text-md leading-relaxed text-gray-600'>
          Our collaboration leverages mutual strengths to drive innovation and
          achieve shared goals. By combining expertise and resources, we create
          synergies that lead to:
        </p>
        <ul className='text-md text-gray-600 space-y-1 list-disc list-inside'>
          <li>Groundbreaking solutions</li>
          <li>Enhanced market efficiency</li>
          <li>Expanded capabilities</li>
          <li>Long-term stakeholder value</li>
        </ul>
        <div className='mt-4 flex justify-between items-center text-sm'>
          <span className='text-lg font-bold text-coopOrange italic'>
            "Driving excellence through partnership"
          </span>
          {/* <a
            href='#'
            className='flex items-center text-[#00adef] hover:text-[#E38524] transition-colors duration-200'>
            Learn more
            <ArrowRightIcon className='ml-1 h-4 w-4' />
          </a> */}
        </div>
      </CardContent>
    </Card>
  );
}