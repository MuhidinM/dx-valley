import DxDescription from '@/components/dxDesc'
import FocusAreas from '@/components/focusAreas'
import HowWeWorkSection from '@/components/howWeWork'

import React from 'react'


const Page = () => {
    return (
        // <div>Page</div>
        <div className="space-y-8 mb-8 justify-center">
           
            <DxDescription />
            <HowWeWorkSection />
        </div>

    )
}

export default Page