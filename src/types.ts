export interface Project {
  id: string;
  title: string;
  category: string;
  subCategory: string;
  year: string;
  client: string;
  role: string;
  summary: string;
  coverImage: string;
  galleryImages: string[];
  challenge: string;
  approach: string;
  solution: string;
  outcomes: string[];
  tools: string[];
  liveUrl?: string;
  featured?: boolean;
  status: string;
  learningFocus: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  location: string;
  period: string;
  role: string;
  tags: string[];
  description: string;
  highlights: string[];
}

export interface JourneyItem {
  id: string;
  year: string;
  icon: string;
  title: string;
  description: string;
}

export interface SkillCategory {
  number: string;
  category: string;
  description: string;
  skills: {
    name: string;
    description: string;
  }[];
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  category: string;
  description: string;
  status: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  coverImage: string;
  content: {
    heading: string;
    paragraphs: string[];
    quote?: string;
  }[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
