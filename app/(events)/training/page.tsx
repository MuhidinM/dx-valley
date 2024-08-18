import CTA from '@/components/cta'
import { SectionRight } from '@/components/section'
import { SectionLeft } from '@/components/section'
import { SVG1 } from '@/constants'
import React from 'react'

const Page = () => {
  return (
    // <div>Page</div>
    <div>
      <SectionRight svg={<SVG1 />}
        title={"Skill craft: Hard Skill Training"}
        description={"At SkillCraft, we’re on a mission to turn aspiring professionals into masters of hard skills. As a trainer, you'll have the opportunity to guide participants through the intricate world of product development and project management frameworks. Your expertise will be pivotal in equipping them with the precision tools and strategies they need to excel. Embrace the role of mentor and help shape the next generation of technical leaders who will drive innovation and lead with confidence. Partner with us to make a profound impact and foster excellence in every learner's journey."}
        buttonText={"Want Shape Future Innovators?"} />

      <SectionLeft svg={<SVG1 />}
        title={"Empower Excellence: Soft Skills Training"}
        description={"At Impact Ignite, we’re dedicated to empowering individuals with vital soft skills that drive success. As a trainer, you'll play a key role in delivering interactive, engaging sessions that enhance communication, customer care, and personal development. Your expertise will help learners connect authentically, inspire those around them, and create a thriving environment where both they and their careers can flourish. Join us in igniting potential and making a meaningful impact in every participant’s journey"}
        buttonText={"Want Shape Future Leaders?"} />

      <CTA title={"Want To Give a Training?"} buttonText={"Apply"} />
    </div>
  )
}

export default Page




