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
import incubationPhoto from "@/public/image/incubation-center.png";

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
                <p>November 2023</p>
              </div>
              <div className="">
                <p className="font-bold">Published</p>
                <p>October 2023</p>
              </div>
            </div>
          </div>
          <div className="">
            <Image src={incubationPhoto} alt="incubation" />
          </div>
        </div>
        <div className="bg-coopBlue text-white p-8 space-y-4 rounded-lg">
          <div className="flex justify-between my-2">
            <div className="">
              <h3 className="font-bold">Founders</h3>
              <ul className="">
                <li>Name</li>
                <li>Name</li>
                <li>Name</li>
              </ul>
            </div>
            <div className="">
              <h3 className="font-bold">Co-Investors</h3>
              <ul className="">
                <li>Name</li>
                <li>Name</li>
                <li>Name</li>
              </ul>
            </div>
          </div>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti
            dicta officiis est ratione. Repellat nesciunt quam voluptatum
            deleniti recusandae voluptate officiis at laudantium modi, id
            molestiae exercitationem beatae eum expedita.
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti
            dicta officiis est ratione. Repellat nesciunt quam voluptatum
            deleniti recusandae voluptate officiis at laudantium modi, id
            molestiae exercitationem beatae eum expedita.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
