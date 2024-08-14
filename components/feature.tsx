"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";

//TODO : Improve mobile version to display the image down the corresponding text instead of at the full bottom

const data = [
  {
    title: "Pre Incubation",
    content:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque euismod, nisl sit amet ultricies lacinia, nunc nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.",
    srcImage:
      "https://images.unsplash.com/photo-1717501219781-54ac9d09051b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8N3x8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "During Incubation",
    content:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque euismod, nisl sit amet ultricies lacinia, nunc nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.",
    srcImage:
      "https://images.unsplash.com/photo-1717501219074-943fc738e5a2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8M3x8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Post Incubation",
    content:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque euismod, nisl sit amet ultricies lacinia, nunc nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.",
    srcImage:
      "https://images.unsplash.com/photo-1717501218636-a390f9ac5957?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Nnx8fGVufDB8fHx8fA%3D%3D",
  },
];

export function Variant2FeatureFourImages() {
  const [featureOpen, setFeatureOpen] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 10);
    }, 10);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer > 10000) {
      setFeatureOpen((prev) => (prev + 1) % data.length);
      setTimer(0);
    }
  }, [timer]);

  return (
    <div className="container">
      <div className="text-center mb-20">
        <p className=" uppercase text-coopBlue mb-2 text-lg font-medium">
          How does it work ?
        </p>

        <h2 className="text-3xl font-medium dark:text-gray-300 text-gray-800 mb-4 shrink-0">
          How to use the Easiest component librairy : Cuicui
        </h2>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-6 ">
          {data.map((item, index) => (
            <button
              type="button"
              className="w-full"
              key={item.title}
              onClick={() => {
                setFeatureOpen(index);
                setTimer(0);
              }}
              title=""
            >
              <TextComponent
                number={index + 1}
                title={item.title}
                content={item.content}
                isOpen={featureOpen === index}
                loadingWidthPercent={featureOpen === index ? timer / 100 : 0}
              />
            </button>
          ))}
        </div>
        <div className="h-full">
          <div
            className={cn(
              "relative h-[500px]  w-full rounded-lg overflow-hidden"
            )}
          >
            {data.map((item, index) => (
              <Image
                key={item.title}
                src={item.srcImage}
                alt={item.title}
                width={400}
                height={800}
                className={cn(
                  "rounded-lg absolute w-full object-cover transition-all duration-300 h-[500px] transform-gpu",
                  featureOpen === index ? "scale-100" : "scale-70",
                  featureOpen > index ? "translate-y-full" : ""
                )}
                style={{ zIndex: data.length - index }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TextComponent({
  number,
  title,
  content,
  isOpen,
  loadingWidthPercent,
}: Readonly<{
  number: number;
  title: string;
  content: string;
  isOpen: boolean;
  loadingWidthPercent?: number;
}>) {
  return (
    <div
      className={cn(
        "transition-colors rounded-lg transform-gpu",
        isOpen ? "bg-coopBlue/10" : "saturate-0 opacity-50"
      )}
    >
      <div className="w-full p-4 flex gap-4 items-center">
        <p
          className={cn(
            "inline-flex size-8 rounded-md items-center justify-center text-coopBlue bg-coopBlue/20"
          )}
        >
          {number}
        </p>
        <h2
          className={cn(
            "text-xl font-medium dark:text-gray-200 text-gray-800 text-left"
          )}
        >
          {title}
        </h2>
      </div>
      <div
        className={cn(
          "overflow-hidden transition-all duration-500 text-left dark:text-gray-400 text-gray-600 w-full transform-gpu",
          isOpen ? " max-h-64" : "max-h-0"
        )}
      >
        <p className="p-4 text-lg">{content}</p>
        <div className="w-full pb-4 px-4">
          <div className="h-1 relative rounded-full w-full overflow-hidden">
            <div
              className={cn("absolute top-0 left-0 h-1 bg-coopBlue")}
              style={{ width: `${loadingWidthPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
