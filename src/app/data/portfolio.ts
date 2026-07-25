export const RESUME_URL =
  "https://drive.google.com/file/d/1w1B7uTZadDRFDRq5oVP73hDwmw7BQ7RZ/view?usp=drive_link";

export const PROFILE = {
  name: "Piyush Yadav",
  role: "Final-Year B.Tech Student & Software Developer",
  navBrand: "PY/",
  portfolioLabel: "01 — PORTFOLIO",
  heroMeta: ["FINAL YEAR — CLASS OF 2027", "OPEN TO WORK — FULL TIME"],
  image: {
    src: "/piyush-photo.jpg",
    alt: "Piyush Yadav",
    meta: ["B.TECH CSE — CLASS OF 2027", "OPEN TO FULL-TIME ROLES"],
  },
  social: {
    github: "https://github.com/PiyushYadv",
    linkedin: "https://linkedin.com/in/piyushyadav276",
    email: "iampiyushyadv@gmail.com",
  },
};

export const UI_TEXT = {
  navResume: "RESUME",
  primaryCta: "View projects",
  secondaryCta: "Download CV",
  scrollHint: "SCROLL",
  contactResume: "Download Resume",
  linkedinLabel: "LinkedIn",
  githubLabel: "GitHub",
  projectGithubTitle: "GitHub",
  projectLiveTitle: "Live demo",
};

export const NAV_ITEMS = [
  "about",
  "projects",
  "experience",
  "education",
  // "achievements",
  "skills",
  "contact",
];

export const ABOUT = {
  eyebrow: "02 — ABOUT ME",
  title: "Eager to build, keen to learn.",
  paragraphs: [
    "I'm a final-year Computer Science student who loves building resilient systems and clean, user-focused applications.",
    "Between shipping features in my internship, optimizing APIs for full-stack personal projects, and contributing to my college club, I’ve spent the last two years learning how to build software that scales. I pick up new concepts fast, ask the hard questions, and care about writing code that lasts.",
    "When I'm not building projects, you’ll usually find me gaming, grinding through tough competitive programming problems, or going down a rabbit hole to learn a new skill.",
  ],
};

export const PROJECTS = [
  {
    index: "01",
    title: "Synapse — Live Collaborative Workspace",
    tags: ["React", "Spring Boot", "Kafka", "Redis", "PostgreSQL"],
    description:
      "Scalable collaborative editing platform with Spring Boot microservices, Kafka-based domain decoupling, Yjs CRDT synchronization, a Node.js WebSocket sidecar, Redis-backed debounced persistence, and PostgreSQL recovery.",
    year: "2026",
    github: "https://github.com/PiyushYadv/synapse",
    live: null,
  },
  {
    index: "02",
    title: "Nimbus — Distributed Key-Value Store",
    tags: ["Go", "Raft", "LSM Tree", "TCP", "Cobra", "Docker"],
    description:
      "Fault-tolerant distributed key-value store in Go with a pure Raft consensus state machine, custom LSM storage engine, MemTables, Bloom filters, TCP networking, Cobra CLI, and Docker-based local cluster orchestration.",
    year: "2026",
    github: "https://github.com/PiyushYadv/nimbus",
    live: null,
  },
  {
    index: "03",
    title: "NanoBook — Micro-Matching Engine",
    tags: ["C++20", "Google Benchmark", "Linux perf"],
    description:
      "Single-threaded limit order book with O(1) best bid/ask lookups, a two-level bitmap, custom open-addressing hash map, 64-byte aligned intrusive order pool, randomized differential fuzzing, and perf-driven latency profiling.",
    year: "2025",
    github: "https://github.com/PiyushYadv/nanobook",
    live: null,
  },
  {
    index: "04",
    title: "Recall — Secure Text-to-SQL Assistant",
    tags: [
      "Python",
      "FastAPI",
      "LangChain",
      "SQLGlot",
      "PostgreSQL",
      "Pinecone",
    ],
    description:
      "Secure Text-to-SQL assistant with AST-based read-only enforcement using SQLGlot, encrypted multi-tenant database credentials, and a privacy-preserving Schema RAG pipeline that embeds structural metadata instead of row data.",
    year: "2025",
    github: "https://github.com/PiyushYadv/recall",
    live: null,
  },
  {
    index: "05",
    title: "Multi-Relational Link Prediction via Inter-Layer GNNs",
    tags: ["Python", "PyTorch", "PyTorch Geometric"],
    description:
      "Dataset-agnostic link prediction framework for multiplex graphs with intra-layer message passing, inter-layer semantic attention, leakage-safe data ingestion, and scalable neighbor sampling for massive graph training.",
    year: "2026",
    github: "https://github.com/PiyushYadv/mplx-lp",
    live: null,
  },
];

export const SKILLS = [
  {
    category: "Languages",
    items: ["C++", "Go", "Python", "JavaScript/TypeScript", "Java", "Dart"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Flutter", "TailwindCSS", "GSAP"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "Spring Boot", "FastAPI", "REST APIs"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase"],
  },
  {
    category: "Distributed Systems",
    items: ["Kafka", "Raft", "WebSockets", "Microservices"],
  },
  {
    category: "AI / ML",
    items: ["LangChain", "PyTorch", "PyTorch Geometric", "Pinecone", "RAG"],
  },
  {
    category: "Tools",
    items: ["Git", "VSCode", "Docker", "Postman", "Figma"],
  },
  {
    category: "CS Fundamentals",
    items: ["DSA", "OOP", "OS", "DBMS", "Computer Networks", "System Design"],
  },
];

export const STATS = [
  { value: 5, suffix: "+", label: "Featured projects" },
  { value: 8.76, suffix: "", label: "Current CGPA", decimals: 2 },
  { value: 1, suffix: "", label: "Industry internship" },
  { value: 2, suffix: "+", label: "Years building" },
];

export const EXPERIENCE = [
  {
    role: "Full Stack Developer Intern",
    company: "NPTEL, IIT Ropar",
    period: "Jan 2026 — Mar 2026",
    type: "Internship",
    points: [
      "Developed Vi-Notes, a full-stack note-taking platform using MongoDB, Express.js, React, and Node.js.",
      "Engineered secure RESTful APIs with JWT/OAuth 2.0 authentication and Role-Based Access Control (RBAC).",
      "Built an AI-powered authorship verification system analyzing WPM, keystrokes, pauses, and copy-paste patterns to flag AI-assisted or externally pasted content.",
    ],
  },
  {
    role: "Freelance Software Developer",
    company: "Wixthemestore",
    period: "May 2024 — Jun 2025",
    type: "Freelance",
    points: [
      "Architected and deployed full-stack web and mobile applications for client requirements.",
      "Managed projects end-to-end, from initial design and development through production release.",
    ],
  },
  {
    role: "App Development Team",
    company: "Google Developer Student Clubs (GDSC)",
    period: "Aug 2023 — May 2025",
    type: "Responsibility",
    points: [
      "Shipped features for internal club applications as part of the app development team.",
      "Vetted incoming developers through technical interviews, helping scale the team.",
    ],
  },
];

export const EDUCATION = [
  {
    degree: "B.Tech Computer Science & Engineering",
    institution: "Delhi Technological University",
    period: "2023 — 2027",
    gpa: "8.76 CGPA",
    highlights: [
      "Relevant: DSA, OS, DBMS, Computer Networks, Machine Learning, Software Engineering",
    ],
  },
  {
    degree: "Higher Secondary (Class XII)",
    institution: "Aakash Public School",
    period: "2021-2022",
    gpa: "84.8%",
    highlights: ["Completed senior secondary education with PCM"],
  },
  {
    degree: "Secondary School (Class X)",
    institution: "Kendriya Vidyalaya No. 3",
    period: "2019-2020",
    gpa: "94.4%",
    highlights: ["Secured Rank 1 in class"],
  },
];

// Future section: uncomment the nav item above, the heading below, and the
// Achievements section in App.tsx when you have 3-5 strong achievements.
// export const ACHIEVEMENTS = [
//   {
//     title: "Hackathon Finalist",
//     organization: "Event or organizer name",
//     year: "2026",
//     description: "Short outcome-focused description of what you built or won.",
//   },
//   {
//     title: "Competitive Programming Milestone",
//     organization: "Platform name",
//     year: "2025",
//     description: "Mention rating, rank, contest result, or solved problem count.",
//   },
//   {
//     title: "Academic Recognition",
//     organization: "Institution name",
//     year: "2024",
//     description: "Keep this specific and measurable.",
//   },
// ];

export const SECTION_HEADINGS = {
  projects: {
    eyebrow: "03 — SELECTED WORK",
    title: "Projects",
    githubLabel: "All on GitHub",
  },
  experience: {
    eyebrow: "04 — WORK HISTORY",
    title: "Experience",
  },
  education: {
    eyebrow: "05 — ACADEMIC BACKGROUND",
    title: "Education",
  },
  // achievements: {
  //   eyebrow: "06 — ACHIEVEMENTS",
  //   title: "Achievements",
  // },
  skills: {
    eyebrow: "06 — TECH STACK",
    title: "Skills",
  },
};

export const CONTACT = {
  eyebrow: "07 — CONTACT",
  title: "Let's connect.",
  description:
    "I'm actively looking for my first full-time software engineering role. Open to full-time positions, internships, and collaborations on interesting side projects.",
};

export const FOOTER = {
  suffix: "PORTFOLIO",
  credit: "BUILT WITH ❤️",
};
