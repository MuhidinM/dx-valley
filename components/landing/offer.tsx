import Image from "next/image";
import Link from "next/link";
import React from "react";

const Offer = () => {
  const features = [
    {
      image: "/peep-35.svg",
      title: "Training",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae dolores, possimus pariatur animi temporibus nesciunt praesentium dolore sed nulla ipsum eveniet corporis quidem, mollitia itaque minus soluta, voluptates neque explicabo tempora nisi culpa eius atque dignissimos. Molestias explicabo corporis voluptatem?",
    },
    {
      image: "/peep-sitting-14.svg",
      title: "Coaching and Mentoring",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae dolores, possimus pariatur animi temporibus nesciunt praesentium dolore sed nulla ipsum eveniet corporis quidem, mollitia itaque minus soluta, voluptates neque explicabo tempora nisi culpa eius atque dignissimos. Molestias explicabo corporis voluptatem?",
    },
    {
      image: "/peep-103.svg",
      title: "Linkage and Awards",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae dolores, possimus pariatur animi temporibus nesciunt praesentium dolore sed nulla ipsum eveniet corporis quidem, mollitia itaque minus soluta, voluptates neque explicabo tempora nisi culpa eius atque dignissimos. Molestias explicabo corporis voluptatem?",
    },
    {
      image: "/peep-72.svg",
      title: "Consultancy",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae dolores, possimus pariatur animi temporibus nesciunt praesentium dolore sed nulla ipsum eveniet corporis quidem, mollitia itaque minus soluta, voluptates neque explicabo tempora nisi culpa eius atque dignissimos. Molestias explicabo corporis voluptatem?",
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
        <div className="grid gap-4   grid-cols-4">
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
                className="w-4/6 h-64 object-center"
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
