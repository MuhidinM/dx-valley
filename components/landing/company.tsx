import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
import { reviews } from "@/constants";

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const Companies = ({ img }: { img: string }) => {
  return (
    <figure
      className={cn(
        "relative cursor-pointer overflow-hidden rounded-xl p-4 md:ml-16"
      )}
    >
      <div className="flex flex-row items-center gap-2">{img}</div>
    </figure>
  );
};

export function SlidingCompanies() {
  return (
    <div className="py-8 lg:py-16 mx-auto max-w-screen-xl px-4">
      <h2 className="mb-8 lg:mb-16 text-3xl font-extrabold tracking-tight leading-tight text-center text-gray-900 dark:text-white md:text-4xl">
        You’ll be in good company
      </h2>

      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-background">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((review) => (
            <Companies key={review.id} {...review} />
          ))}
        </Marquee>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-slate-50 dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-slate-50 dark:from-background"></div>
      </div>
    </div>
  );
}
