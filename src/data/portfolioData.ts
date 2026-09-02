import { Project, ExperienceItem, JourneyItem, SkillCategory, CertificateItem, Article } from '../types';

import aryanPortrait from '../assets/images/aryan_profile_portrait_1785493652634.jpg';
import lostAndFoundImg from '../assets/images/regenerated_image_1785494071816.png';
import cyberCoreImg from '../assets/images/regenerated_image_1785494077949.png';
import portfolioImg from '../assets/images/portfolio_dev_ui_1785491907384.jpg';

export const PORTRAIT_IMAGE = aryanPortrait;

export const PERSONAL_INFO = {
  name: 'Aryan',
  title: 'Second-Year B.Tech IT Student & Learning Web Developer',
  university: 'Gujarat Technological University (GTU)',
  degree: 'Bachelor of Technology in Information Technology',
  tagline: 'Learning • Building • Growing',
  phone: '7206510712',
  phoneFormatted: '+91 7206510712',
  phoneUrl: 'tel:+917206510712',
  instagram: '@aryannsen',
  instagramUrl: 'https://www.instagram.com/aryannsen/',
  linkedin: 'Connect on LinkedIn',
  linkedinUrl: 'https://www.linkedin.com/in/aryannsen/',
  location: 'Gujarat, India',
};

export const PROJECTS: Project[] = [
  {
    id: 'smart-lost-and-found',
    title: 'Smart Lost & Found System',
    category: 'Web Development',
    subCategory: 'Full-Stack Concept',
    year: '2024',
    client: 'Student Project',
    role: 'Student Developer',
    summary: 'A web-based platform designed to help users report, search, and manage lost and found items in an organized and accessible way.',
    coverImage: lostAndFoundImg,
    galleryImages: [
      lostAndFoundImg,
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80'
    ],
    challenge: 'Lost items in institutions and campuses are often tracked informally through chat groups, leading to unorganized posts and lost items remaining unclaimed.',
    approach: 'Designed a clean, structured web interface with category filtering, search bars, item status tags, and simple submission forms.',
    solution: 'Built a web-based prototype focusing on clear navigation, item reporting workflows, responsive layouts, and intuitive user interactions.',
    outcomes: [
      'Successfully built a working web interface concept for item reporting',
      'Practiced structured form handling, state management, and filtering',
      'Improved understanding of user experience and practical problem-solving'
    ],
    tools: ['HTML', 'CSS', 'JavaScript', 'Responsive UI'],
    featured: true,
    status: 'Learning Project',
    learningFocus: 'Website structure, problem-solving, user-focused design, and responsive development.'
  },
  {
    id: 'cybercore-landing-page',
    title: 'CyberCore Landing Page',
    category: 'Frontend UI',
    subCategory: 'Interactive Design',
    year: '2024',
    client: 'Personal Project',
    role: 'Frontend Student',
    summary: 'A futuristic, cyber-inspired landing page created to practice modern layouts, responsive design, visual hierarchy, and smooth frontend interactions.',
    coverImage: cyberCoreImg,
    galleryImages: [
      cyberCoreImg,
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'
    ],
    challenge: 'Creating a high-impact, modern landing page while ensuring smooth performance, clean typography, and full responsiveness across devices.',
    approach: 'Explored sleek dark theme styling, subtle hover animations, structured hero typography, and card grid layouts.',
    solution: 'Developed a responsive landing page showcasing clean CSS layouts, semantic HTML structure, and interactive navigation elements.',
    outcomes: [
      'Gained hands-on experience with modern CSS layouts and Flexbox/Grid',
      'Implemented responsive design techniques for mobile and desktop screens',
      'Enhanced visual design skills and frontend attention to detail'
    ],
    tools: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
    featured: true,
    status: 'Learning Project',
    learningFocus: 'HTML, CSS, JavaScript, responsive layouts, and modern UI development.'
  },
  {
    id: 'personal-portfolio',
    title: 'Personal Portfolio Website',
    category: 'Web Portfolio',
    subCategory: 'Personal Branding',
    year: '2026',
    client: 'Self-Initiated',
    role: 'Student Creator',
    summary: 'A continuously evolving personal portfolio created to showcase my learning journey, skills, projects, and future achievements as I grow in web development.',
    coverImage: portfolioImg,
    galleryImages: [
      portfolioImg,
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    challenge: 'Presenting a second-year student persona honestly while maintaining high aesthetic quality, smooth user experience, and professional layout principles.',
    approach: 'Used a clean, editorial layout style with subtle animations, structured project cards, and clear student milestones.',
    solution: 'Created an interactive React application with modular components, dark/light editorial aesthetics, and smooth navigation.',
    outcomes: [
      'Learned React component architecture and state management',
      'Utilized Tailwind CSS for clean, responsive visual styling',
      'Built a complete digital home to document ongoing learning progress'
    ],
    tools: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    featured: true,
    status: 'Work in Progress',
    learningFocus: 'Personal branding, responsive layouts, content organization, and modern portfolio design.'
  },
  {
    id: 'student-task-manager',
    title: 'Student Task Manager',
    category: 'Productivity App',
    subCategory: 'Web Utility',
    year: '2024',
    client: 'Student Concept',
    role: 'Developer',
    summary: 'A student-focused web application concept designed to organize assignments, tasks, deadlines, and daily study goals in one simple interface.',
    coverImage: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=80'
    ],
    challenge: 'Helping students keep track of daily deadlines and subject priorities without complex or cluttered tools.',
    approach: 'Focused on minimal task lists, priority badges, completion toggles, and clean categorizations.',
    solution: 'Built a lightweight web utility that allows quick task creation, status updates, and deadline sorting.',
    outcomes: [
      'Practiced DOM manipulation and event handling in JavaScript',
      'Designed clean interface components for daily task management'
    ],
    tools: ['JavaScript', 'HTML', 'CSS', 'Local State'],
    featured: false,
    status: 'Currently Building',
    learningFocus: 'JavaScript fundamentals, user interaction, practical problem-solving, and interface design.'
  },
  {
    id: 'weather-dashboard',
    title: 'Weather Dashboard Concept',
    category: 'API Learning',
    subCategory: 'Frontend App',
    year: '2024',
    client: 'Learning Project',
    role: 'Student Developer',
    summary: 'A responsive weather dashboard concept designed to display weather information in a clean, simple, and easy-to-understand interface.',
    coverImage: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=1200&q=80'
    ],
    challenge: 'Learning how to fetch asynchronous data, parse response payloads, and render dynamic weather metrics.',
    approach: 'Used modern JavaScript async/await functions paired with clean metric cards and forecast widgets.',
    solution: 'Created an interactive dashboard displaying temperature, conditions, humidity, and location search.',
    outcomes: [
      'Gained core experience working with REST APIs and JSON data',
      'Built dynamic UI updates based on user search inputs'
    ],
    tools: ['JavaScript', 'REST APIs', 'CSS Flexbox'],
    featured: false,
    status: 'Learning Project',
    learningFocus: 'Working with APIs, dynamic content, JavaScript, and responsive user interfaces.'
  },
  {
    id: 'ai-study-assistant',
    title: 'AI Study Assistant Concept',
    category: 'AI Tools',
    subCategory: 'Student Utility',
    year: '2025',
    client: 'Concept Project',
    role: 'Explorer',
    summary: 'A student-focused web application concept designed to help organize study topics, generate learning ideas, and improve study productivity using AI-assisted features.',
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'
    ],
    challenge: 'Exploring how AI API calls can be integrated into web applications to aid student learning.',
    approach: 'Designed clean prompt input cards, study summary displays, and flashcard generators.',
    solution: 'Engineered a conceptual student assistant interface leveraging AI API integration patterns.',
    outcomes: [
      'Explored AI API workflows and rapid prototyping tools',
      'Developed student-centric user interface flows'
    ],
    tools: ['React', 'Google AI Studio', 'Tailwind CSS'],
    featured: false,
    status: 'Concept Project',
    learningFocus: 'AI-assisted development, user experience, practical technology, and product thinking.'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    number: '01',
    category: 'Web Development',
    description: 'Building fundamental web skills through consistent practice, coding exercises, and real project implementation.',
    skills: [
      { name: 'HTML', description: 'Learning website structure, semantic elements, and accessible markup.' },
      { name: 'CSS', description: 'Practicing styling, Flexbox, CSS Grid, responsive layouts, and Tailwind CSS.' },
      { name: 'JavaScript', description: 'Learning programming fundamentals, DOM manipulation, events, and dynamic features.' }
    ]
  },
  {
    number: '02',
    category: 'Development Tools',
    description: 'Using modern development tools to organize, write, manage, and share code efficiently.',
    skills: [
      { name: 'VS Code', description: 'Using VS Code to write, debug, and structure web development projects.' },
      { name: 'Git', description: 'Learning the fundamentals of version control and tracking code history.' },
      { name: 'GitHub', description: 'Learning how to manage repositories and share project code online.' }
    ]
  },
  {
    number: '03',
    category: 'AI-Assisted Development',
    description: 'Leveraging modern AI tools responsibly to accelerate learning, understand concepts, and build projects.',
    skills: [
      { name: 'Google AI Studio', description: 'Exploring AI-assisted development and rapid prototyping workflows.' },
      { name: 'AI Tools', description: 'Using AI tools responsibly to learn, understand, build, test, and improve projects.' }
    ]
  },
  {
    number: '04',
    category: 'Currently Exploring',
    description: 'Expanding technical horizons by studying modern frameworks, deployment, and UI design principles.',
    skills: [
      { name: 'React', description: 'Currently learning modern component-based development and React hooks.' },
      { name: 'Responsive Web Design', description: 'Practicing layouts that adapt seamlessly across mobile, tablet, and desktop.' },
      { name: 'Web Deployment', description: 'Learning how websites are built, hosted, and published on the web.' },
      { name: 'Modern UI/UX', description: 'Exploring clean, simple, and user-friendly digital interface principles.' }
    ]
  }
];

export const JOURNEY_ITEMS: JourneyItem[] = [
  {
    id: 'nda-prep',
    year: '2022',
    icon: '🪖',
    title: 'Started NDA Preparation',
    description: 'Began preparing for the National Defence Academy (NDA), building discipline, resilience, and leadership skills.'
  },
  {
    id: 'ncc-cadet',
    year: '2022–2024',
    icon: '🎖️',
    title: 'Army Wing NCC Cadet',
    description: 'Actively participated in the National Cadet Corps (Army Wing), strengthening teamwork, discipline, physical fitness, leadership, and patriotism.'
  },
  {
    id: 'nda-qualified',
    year: 'April 2024',
    icon: '🏅',
    title: 'Qualified NDA Written Examination',
    description: 'Successfully cleared the NDA Written Examination and appeared for the SSB Interview (Stage I).'
  },
  {
    id: 'cu-btech',
    year: 'Mid 2024',
    icon: '🎓',
    title: 'Joined Chandigarh University',
    description: 'Started my B.Tech journey and explored different career opportunities.'
  },
  {
    id: 'gtu-btech',
    year: '2025',
    icon: '📍',
    title: 'Joined Gujarat Technological University (GTU)',
    description: 'Continued my B.Tech in Information Technology with a stronger focus on software development.'
  },
  {
    id: 'started-coding',
    year: '2025',
    icon: '💻',
    title: 'Started Coding',
    description: 'Started learning HTML, CSS, JavaScript, Python, Git, and GitHub while building practical projects.'
  },
  {
    id: 'projects-ai',
    year: '2026',
    icon: '🚀',
    title: 'Building Projects & Exploring AI',
    description: 'Developing modern web applications, creating real-world projects, and continuously improving my skills in AI and software development.'
  },
  {
    id: 'fullstack-aspiring',
    year: 'Future',
    icon: '🌟',
    title: 'Aspiring Full-Stack Developer',
    description: 'Working towards becoming a skilled Full-Stack Developer and building impactful software that solves real-world problems.'
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'gtu-btech-it',
    company: 'Gujarat Technological University (GTU)',
    location: 'Gujarat, India',
    period: '2025 — 2029',
    role: 'B.Tech Information Technology (2nd Year)',
    tags: ['Degree', 'IT Fundamentals', 'Academic'],
    description: 'Currently pursuing my Bachelor of Technology degree in Information Technology. Building a solid foundation in computer science core subjects, programming, and software concepts.',
    highlights: [
      'Currently in 2nd year of B.Tech Information Technology degree program',
      'Studying core subjects: Object-Oriented Programming, Data Structures, Database Systems, Operating Systems',
      'Participating in academic projects, technical labs, and peer learning groups'
    ]
  },
  {
    id: 'web-dev-journey',
    company: 'Self-Driven Web Development Journey',
    location: 'Personal Learning',
    period: '2025 — Present',
    role: 'Web Development Student',
    tags: ['HTML/CSS', 'JavaScript', 'Frontend'],
    description: 'Dedicated self-learning path focused on mastering the core building blocks of modern web development through hands-on practice and continuous coding exercises.',
    highlights: [
      'Mastered HTML5 semantic markup and CSS layout fundamentals (Flexbox & Grid)',
      'Practicing JavaScript programming logic, dynamic functions, and API fetching',
      'Exploring modern CSS frameworks like Tailwind CSS to build clean user interfaces'
    ]
  },
  {
    id: 'building-projects',
    company: 'Hands-On Projects & Experiments',
    location: 'Portfolio Development',
    period: '2025 — Present',
    role: 'Project Creator',
    tags: ['Projects', 'Problem-Solving', 'UI Design'],
    description: 'Applying theoretical knowledge into practical, real-world web applications and landing pages to solve problems and refine coding skills.',
    highlights: [
      'Created web projects like Smart Lost & Found System, CyberCore Landing Page, and Student Task Manager',
      'Gained practical experience in responsive web design, mobile-first layouts, and interactive UI components',
      'Documenting learnings and continuously refactoring code for better structure and performance'
    ]
  },
  {
    id: 'ai-assisted-learning',
    company: 'AI Tools & Rapid Prototyping',
    location: 'Modern Workflows',
    period: '2025 — Present',
    role: 'Technology Learner',
    tags: ['AI Tools', 'Google AI Studio', 'Prototyping'],
    description: 'Exploring how modern AI tools and assistants can support code learning, idea generation, debugging, and rapid prototyping.',
    highlights: [
      'Utilizing Google AI Studio to explore AI-assisted code generation and web prototyping',
      'Using AI tools as learning companions to understand complex programming concepts faster',
      'Building student-focused AI concepts and productivity application ideas'
    ]
  },
  {
    id: 'future-milestones',
    company: 'Future Academic & Career Milestones',
    location: 'Ongoing Goal',
    period: 'Future Goals',
    role: 'Aspiring Web Developer',
    tags: ['React', 'Full-Stack', 'Certificates'],
    description: 'Continuing to build expertise in full-stack web development, open-source contribution, technical certifications, and real-world internships.',
    highlights: [
      'Deepening React and JavaScript mastery for building complex web applications',
      'Earning industry-recognized certifications in web development and cloud tech',
      'Seeking internship opportunities to apply skills in professional environments'
    ]
  }
];

export const CERTIFICATES: CertificateItem[] = [
  {
    id: 'cert-web-dev',
    title: 'Web Development Learning Milestones',
    issuer: 'Coursework & Self-Study',
    category: 'Web Development',
    description: 'Documenting completed online courses, web development workshops, and foundational coding milestones as I progress through my IT degree.',
    status: 'In Progress / Learning'
  },
  {
    id: 'cert-ai-tech',
    title: 'AI & Technology Workflows',
    issuer: 'Self-Paced Exploration',
    category: 'AI Tools',
    description: 'Learning certificates and project accomplishments in AI-assisted development, prompt engineering, and modern developer tools.',
    status: 'Exploring & Learning'
  },
  {
    id: 'cert-tech-events',
    title: 'Technical Events & Workshops',
    issuer: 'Gujarat Technological University (GTU)',
    category: 'Academic & Events',
    description: 'Participation and achievements in university technical symposiums, coding competitions, and developer workshops.',
    status: 'Upcoming / Active'
  },
  {
    id: 'cert-project-milestones',
    title: 'Project Milestones & Showcase',
    issuer: 'Personal Portfolio',
    category: 'Practical Building',
    description: 'Certifying completed personal projects, open-source experiments, and functional web applications created during my studies.',
    status: 'Growing Collection'
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'learning-through-building',
    title: 'Learning Web Development Through Hands-On Building',
    category: 'Web Development',
    readTime: '4 min read',
    date: '2025',
    excerpt: 'Why creating real projects—even small ones—is the fastest and most effective way to understand web concepts.',
    coverImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    content: [
      {
        heading: 'Moving Beyond Passive Tutorials',
        paragraphs: [
          'When I started learning web development as an Information Technology student at Gujarat Technological University (GTU), I quickly realized that watching tutorials is not enough. You truly learn when you type the code yourself and fix the bugs that appear.',
          'Building projects like my Smart Lost & Found System or CyberCore Landing Page forced me to understand how HTML, CSS, and JavaScript interact in real scenarios.'
        ],
        quote: 'You don’t truly understand a concept until you try to build something with it.'
      },
      {
        heading: 'Embracing Trial and Error',
        paragraphs: [
          'Every error message in the console is a learning opportunity. Solving layout breaks, debugging JavaScript logic, and adjusting responsive breakpoints has taught me patience and problem-solving skills that textbooks alone cannot provide.'
        ]
      }
    ]
  },
  {
    id: 'exploring-ai-tools',
    title: 'Exploring AI-Assisted Development as a Student',
    category: 'AI & Workflows',
    readTime: '4 min read',
    date: '2025',
    excerpt: 'How AI tools like Google AI Studio help me grasp difficult coding concepts, brainstorm ideas, and improve project workflows.',
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    content: [
      {
        heading: 'AI as a Learning Accelerator',
        paragraphs: [
          'Using AI tools as a student isn’t about taking shortcuts—it’s about having a 24/7 learning companion that can explain complex syntax, suggest code refactoring, and provide instant feedback.',
          'With tools like Google AI Studio, I can prototype layout ideas rapidly while focusing on understanding the underlying logic and user experience.'
        ],
        quote: 'AI tools amplify curiosity—they let students build and experiment faster than ever before.'
      }
    ]
  },
  {
    id: 'growing-as-a-developer',
    title: 'My Journey as a Second-Year IT Student',
    category: 'Personal Journey',
    readTime: '3 min read',
    date: '2025',
    excerpt: 'Documenting my academic growth, technical exploration, and future goals in web development.',
    coverImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80',
    content: [
      {
        heading: 'Building a Strong IT Foundation',
        paragraphs: [
          'Balancing university coursework at GTU with self-driven web development learning has given me both academic discipline and practical building skills.',
          'As I progress into higher semesters, my goal is to continue building meaningful projects, earning certifications, and preparing for future developer roles.'
        ]
      }
    ]
  }
];

export const SOCIAL_LINKS = [
  { name: 'Phone', url: 'tel:+917206510712', handle: '7206510712', type: 'phone' },
  { name: 'Instagram', url: 'https://www.instagram.com/aryannsen/', handle: '@aryannsen', type: 'instagram' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/aryannsen/', handle: 'Aryan on LinkedIn', type: 'linkedin' }
];
