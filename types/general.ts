import { ReactNode } from "react";

export interface SectionProps {
  svg: ReactNode;
  title: string;
  description: ReactNode;
  buttonText?: string;
}

export interface objectivesItems {
  icon: string;
  description: string;
}

export interface objectivesProps {
 items: objectivesItems[];
}
export interface focusAreaItems {
  image: string;
  tab: string;
  contentTitle: string;
  contentDesc: string;
}
export interface focusAreaProps {
    items: focusAreaItems[];
}
export interface ctaProps {
  title: string;
  buttonText?: string;
}
export interface CardProps {
  img: ReactNode;
  title: string;
  description: string;
  buttonText?: string;
  buttonText2?: string;
}

export type StatItem = {
  value: string;
  label: string;
};

export type StatsProps = {
  items: StatItem[];
};

// export type SectionProps = {
//   button: String
// }

