// Every piece of text on the site lives here, matched to Abdullah's resume.

export const profile = {
  name: "Muhammad Abdullah",
  first: "Muhammad",
  last: "Abdullah",
  title: "Full-Stack Software Engineer",
  location: "Rawalpindi, Pakistan",
  timezone: "Asia/Karachi",
  github: "https://github.com/AlphaAbdullah7",
  linkedin: "https://www.linkedin.com/in/muhammad-abdullah-8b8898281",
  resume: "/Muhammad-Abdullah-Resume.pdf",
  lede: "Software engineer at Insight Corporation. I build fast, reliable products end to end — React and React Native interfaces, and the Spring Boot and Node.js services behind them.",
  summary:
    "Full-stack software engineer working across React, React Native, Next.js, Spring Boot, Node.js and MongoDB — from interface to API to database.",
};

// The address is never rendered into the HTML (keeps it away from scrapers);
// it's assembled in the browser only when a visitor clicks a contact action.
const EMAIL_PARTS = ["alphabdullah07", "gmail.com"] as const;
const getEmail = () => EMAIL_PARTS.join("@");

export const openEmail = () => {
  window.location.href = `mailto:${getEmail()}`;
};

export const copyEmail = () => navigator.clipboard.writeText(getEmail());

export const stats = [
  { value: "2+", label: "Years of professional experience" },
  { value: "1st", label: "IEEE Web Development Competition" },
  { value: "2nd", label: "Final Year Project ranking" },
  { value: "Full-stack", label: "React · Spring Boot · Node.js" },
];

export type Project = {
  name: string;
  kind: string;
  description: string;
  tech: string[];
  image?: string;
  demo?: string;
  code?: string;
  note?: string;
  caseStudy?: string; // internal route to a full case-study page
};

// StyleZone live-demo config — used by the case-study page's embedded app.
export const stylezoneDemo = {
  appUrl: "https://stylezone-pk.vercel.app",
  password: "Test@1234",
  accounts: [
    { role: "Client", email: "alijavedmember@gmail.com" },
    { role: "Provider", email: "alijavedprovider@gmail.com" },
  ],
};

export const projects: Project[] = [
  {
    name: "Face-Shape Detector",
    kind: "Live demo",
    description:
      "A computer-vision web app that classifies face shape from a single photo using OpenCV and dlib 81-point landmarks, then recommends flattering hairstyles. Returns a calibrated confidence blend and flags tilted/turned photos.",
    tech: ["Python", "OpenCV", "dlib", "Gradio", "Docker", "Render"],
    image: "/work/face-shape.jpg",
    demo: "https://face-shape-detector-7o8r.onrender.com",
    code: "https://github.com/alijavedcodes/face-shape-detector",
  },
  {
    name: "StyleZone",
    kind: "Personal product",
    description:
      "A cross-platform salon-booking platform — one codebase running native iOS, Android, and web. Appointment booking, availability & service management, Stripe payments, and typo-tolerant search. Built end-to-end: design system, API, and database.",
    tech: ["React Native (Expo)", "React Native Web", "Express", "MongoDB Atlas", "Stripe"],
    caseStudy: "/projects/stylezone",
    note: "iOS · Android · Web",
  },
];

export type Role = {
  org: string;
  title: string;
  period: string;
  stack: string[];
  points: string[];
  link?: { label: string; href: string };
};

export const experience: Role[] = [
  {
    org: "Insight Corporation",
    title: "Software Engineer",
    period: "Jan 2025 – Present",
    stack: ["React", "React Native", "Spring Boot", "Node.js", "Hapi.js", "MongoDB", "FHIR", "Elasticsearch"],
    points: [
      "Build scalable full-stack applications with React and React Native front ends and Java (Spring Boot) and Node.js services over MongoDB.",
      "Built the Confidant Health web platform for virtual sessions between members and doctors, with a focus on a smooth user experience and reliable performance.",
      "Lead feature development across frontend and backend — advanced state management, clean styling, and scalable, maintainable code.",
    ],
  },
  {
    org: "Mehdi Technologies Pvt Ltd",
    title: "Jr. Web Developer",
    period: "May 2024 – Dec 2024",
    stack: ["React", "Next.js", "Node.js", "Express", "MongoDB", "PostgreSQL"],
    points: [
      "Built scalable full-stack web applications with React and Next.js front ends and Node.js (Express) services over MongoDB and PostgreSQL.",
      "Led feature development integrating React and Next.js with advanced state management and styling, delivering high-quality, maintainable products.",
    ],
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Frontend", items: ["React", "React Native", "Next.js", "TypeScript", "Tailwind CSS", "Material UI", "Tamagui", "Redux Toolkit"] },
  { group: "Backend", items: ["Spring Boot", "Node.js", "Express", "Hapi.js", "REST APIs", "Firebase"] },
  { group: "Data & search", items: ["MongoDB", "PostgreSQL", "Elasticsearch"] },
  { group: "Healthcare & tools", items: ["FHIR", "Java", "Git", "GitHub", "Vercel"] },
];

export const marquee = [
  "React", "React Native", "Next.js", "TypeScript", "Spring Boot", "Node.js", "Hapi.js", "Express",
  "MongoDB", "PostgreSQL", "Elasticsearch", "FHIR", "Tailwind CSS", "Redux Toolkit", "Tamagui",
];

export const education = {
  degree: "BS Software Engineering",
  school: "National University of Modern Languages (NUML)",
  period: "Sep 2021 – Jun 2025",
};

export const teaching = {
  title: "MERN Stack crash course",
  text: "Conducted an online web development crash course covering MongoDB, Express, React and Node.js.",
  stack: ["MongoDB", "Express", "React", "Node.js"],
};

export const awards = [
  { title: "1st Position — IEEE Web Development Competition", org: "IEEE" },
  { title: "2nd Position — Final Year Project", org: "NUML" },
];

export const about =
  "I'm a full-stack software engineer who likes owning a feature from the first sketch to the deployed endpoint. I care about the details users feel — fast pages, clear states, interfaces that just work — and the ones they don't: clean data models, sensible APIs and maintainable code.";
