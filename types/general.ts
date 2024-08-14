import { ReactNode } from "react";

export interface SectionProps {
  svg: ReactNode;
  title: string;
  description: ReactNode;
  buttonText: string;
  reverse?: boolean;
}
export interface ctaProps {
  title: string;
  buttonText: string;
}
