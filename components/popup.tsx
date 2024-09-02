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
import { ShowCaseData } from "@/types/strapi-types";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'

export function Popup({details}:{details:ShowCaseData}) {
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
            <h1 className="text-4xl font-bold">{details.projectName}</h1>
            <div className="flex justify-between">
              <div className="">
                <p className="font-bold">Launched</p>
                <p>{new Date(details.launched).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
              </div>
              <div className="">
                <p className="font-bold">Published</p>
                <p>
                    {new Date(details.published).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                </p>
              </div>
            </div>
          </div>
          <div className="">
            <Image src={`http://10.1.151.64:1337${details.img_2}`} width={800} height={800} alt="incubation" />
          </div>
        </div>
        <div className="bg-coopBlue text-white p-8 space-y-4 rounded-lg">
          <div className="flex justify-between my-2">
            <div className="">
                  <h3 className="font-bold">Founders</h3>
                  <ul className="text-gray-100">
                      {details.founders.map((founder, inx) => {
                          return <li key={inx}>{founder.name}</li>
                      })}
                  </ul>
                </div>
                <div className="">
                  <h3 className="font-bold">Co-Investors</h3>
                  <ul className="text-gray-100">
                      {details.investors.map((investor, inx) => {
                          return <li key={inx}>{investor.name}</li>
                      })}
                  </ul>
                </div>
          </div>
          <p>
          <span className="prose font-bold">{details.projectName}</span> 
              <ReactMarkdown children={details.long_description} remarkPlugins={[remarkGfm]}/> 
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
