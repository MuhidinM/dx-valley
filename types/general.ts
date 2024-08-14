import { ReactNode } from "react";

export interface SectionProps {
  svg: ReactNode;
  title: string;
  description: ReactNode;
  buttonText?: string;
}
export interface ctaProps {
  title: string;
  buttonText: string;
}

export type StatItem = {
  value: string;
  label: string;
};

export type StatsProps = {
  items: StatItem[];
};
