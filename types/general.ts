import React,{ ReactNode } from "react";
import { CardNoLinkData } from "./strapi-types";

export interface SectionProps {
  svg?: React.ReactNode;
  title: string;
  description: string;
  buttonText?: string;
  href?: string;
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
  items: CardNoLinkData[];
}
export interface ctaProps {
  title: string;
  buttonText?: string;
  href: string;
  description?: string;
}

export interface submissonSuccess {
  title: string;
  // icon: SVGSVGElement;
  desc: string;
}
export interface CardProps {
  img: ReactNode;
  title: string;
  description: string;
  buttonText?: string;
  buttonText2?: string;
}

export type StatItem = {
  img: ReactNode;
  value: string;
  label: string;
};

export type StatsProps = {
  items: StatItem[];
};

// export type SectionProps = {
//   button: String
// }
