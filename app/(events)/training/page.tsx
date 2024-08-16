import CTA from '@/components/cta'
import { SectionRight } from '@/components/section'
import { SectionLeft } from '@/components/section'
import Section1 from '@/components/section1'
import Section2 from '@/components/Section2'
import { SVG1 } from '@/constants'
import React from 'react'

const Page = () => {
  return (
    // <div>Page</div>
    <div>
      {/* <Section1 btnTitle ={"Apply To Give Training"}/>
      <Section2 btnTitle={"Apply To Give Training"} />
      <Section1 btnTitle={"Apply To Give Training"} />
      <Section2 btnTitle={"Apply To Give Training"} /> */}

      <SectionRight svg={<SVG1 />}
        title={"Traning"}
        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
        buttonText={"Apply To Give Training"} />

      <SectionLeft svg={<SVG1 />}
        title={"Traning"}
        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
        buttonText={"Apply To Give Training"} />

      <CTA title={"Want To Give a Training?"} buttonText={"Apply"} />
    </div>
  )
}

export default Page




