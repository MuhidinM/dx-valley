import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChartIcon, ArrowRightIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Component({ overview }: { overview: string }) {
  return (
    <Card className="prose w-full max-w-7xl mx-auto items-center justify-center my-4 overflow-hidden border-t-4 border-t-[#00adef] shadow-md">
      <CardHeader className="bg-gradient-to-r from-[#00adef]/5 to-[#E38524]/5 pb-4">
        <CardTitle className="flex items-center gap-2 text-2  xl font-semibold text-gray-800">
          <BarChartIcon className="h-5 w-5 text-[#00adef]" />
          Collaboration Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="prose dp-4 space-y-3">
        <p className="prose text-md leading-relaxed text-gray-600">
          <ReactMarkdown children={overview} remarkPlugins={[remarkGfm]} />
        </p>
        <div className="mt-4 flex justify-between items-center text-sm">
          <span className="text-lg font-bold text-coopOrange italic">
            "Driving excellence through partnership"
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
