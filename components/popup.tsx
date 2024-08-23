import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import AiUserImage from "@/public/image/ai-user-image.png";

export function Popup() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-coopBlue hover:bg-coopBlueHover">
          Read More
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader></DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div className="">
            <h1 className="text-4xl font-bold">Relevance AI</h1>
            <div className="flex justify-between">
              <div className="">
                <p className="font-bold">Launched</p>
                <p>November 2022</p>
              </div>
              <div className="">
                <p className="font-bold">Published</p>
                <p>February 2023</p>
              </div>
            </div>
          </div>
          <div className="">
            <Image src={AiUserImage} alt="incubation" />
          </div>
        </div>
        <div className="bg-coopBlue text-white p-8 space-y-4 rounded-lg">
          <div className="flex justify-between my-2">
            <div className="">
                  <h3 className="font-bold">Founders</h3>
                  <ul className="text-gray-100">
                    <li>Gadaa Jarraa</li>
                    <li>Danuu Bulchaa</li>
                    <li>Daba Wayesa</li>
                  </ul>
                </div>
                <div className="">
                  <h3 className="font-bold">Co-Investors</h3>
                  <ul className="text-gray-100">
                    <li>Gamechu Wakjira</li>
                    <li>Kulani Obsa</li>
                    <li>Kanani Misbah</li>
                  </ul>
                </div>
          </div>
          <p>
          <span className="font-bold">Relevance AI</span> is an advanced AI-driven platform designed to deliver precise, context-aware insights to businesses.
          By analyzing extensive datasets, it identifies the most relevant information to guide decision-making and strategy development.
          
          </p>
          <p>
          The platform empowers companies to optimize their operations, enhance customer experiences,
          and maintain a competitive edge in a dynamic market environment. 
          With <span className="font-bold">Relevance AI</span>, businesses can unlock the full potential of their data and make informed, impactful choices.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
