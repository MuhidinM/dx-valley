import NavBar from "@/components/navbar";;
import Footer from "@/components/footer";
import CTA from "@/components/cta";
import DxDescription from "@/components/dxDesc";
import Mission from "@/components/mission";
import { IncubationPhase } from "@/components/incubationPhase";
import HowWeWorkSection from "@/components/howWeWork";
const InnovationHubPage = () => {
    return (
        <div className="bg-slate-50">
            <div className="bg-slate-50 dark:bg-gray-900 mb-3">
                <NavBar />
                <DxDescription />
                <div className="grid grid-cols-2 gap-2 px-2 py-8">
                    <Mission />
                    <CTA />
                </div>

                <Footer />
            </div>
        </div>
    );
};

export default InnovationHubPage;