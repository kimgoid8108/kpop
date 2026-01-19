export interface Slide {
  id: number;
  title: string;
  subtitle: string;
  detail: string;
  ctaPrimary: string;
  ctaPrimaryLink: string;
  ctaSecondary: string;
  ctaSecondaryLink: string;
  year: string;
  gradient: string;
}

export interface Activity {
  id: number;
  title: string;
  date: string;
  preview: string;
  participants: number;
}

export interface Newsletter {
  id: number;
  title: string;
  preview: string;
}

export type ExpandedCard = "activity" | "newsletter" | null;
