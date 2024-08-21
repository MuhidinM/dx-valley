import Image from "next/image";
import Link from "next/link";
import React from "react";

const Offer = () => {
  const features = [
    {
      image: "/Trainging.svg",
      title: "Training",
      desc: "Empower your entrepreneurial journey with our comprehensive training programs. We provide you with the essential skills, knowledge, and tools needed to transform your innovative ideas into successful ventures.",
    },
    {
      image: "/coaching-and-mentoring 1.svg",
      title: "Coaching and Mentoring",
      desc: "Benefit from personalized coaching and mentoring by industry experts. Our tailored guidance helps you navigate challenges, refine your strategy, and accelerate your startup's growth",
    },
    {
      image: "/Linkage-and-Awards.svg",
      title: "Linkage and Awards",
      desc: "Gain access to a network of investors and industry leaders through our strategic linkages. We also recognize and reward outstanding startups, providing them with the visibility and support needed to succeed",
    },
    {
      image: "/consoltancy-mai.svg",
      title: "Consultancy",
      desc: "Leverage our expert consultancy services to fine-tune your business model, optimize operations, and ensure sustainable growth. Our consultants work closely with you to turn your vision into reality",
    },
  ];
  return (
    <section className="dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white">
            What We Offer
          </h2>
        </div>
        <div className="grid gap-4 grid-cols-4">
          {features.map((item, index) => (
            <article
              key={index}
              className="overflow-hidden rounded-lg shadow transition hover:shadow-lg"
            >
              <Image
                alt=""
                width={1}
                height={10}
                src={item.image}
                className="w-5/6 h-64 object-center items-center"
              />
              <div className="bg-white dark:bg-gray-950 p-4 sm:p-6">
                <Link href="#">
                  <h3 className="mt-0.5 text-lg text-gray-900 dark:text-gray-200">
                    {item.title}
                  </h3>
                </Link>

                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                  {item.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offer;
