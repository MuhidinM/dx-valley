import DxDescription from '@/components/dxDesc'
import FocusAreas from '@/components/focusAreas'
import HowWeWorkSection from '@/components/howWeWork'
import ContactUs from '@/components/landing/contactus'
import Mission from '@/components/mission'

import React from 'react'


const Page = () => {
    return (
        // <div>Page</div>
        <div className="space-y-8 mb-8 justify-center">
           
            <DxDescription />
            <HowWeWorkSection />
            <FocusAreas />
            <ContactUs />
        </div>

    )
}

export default Page