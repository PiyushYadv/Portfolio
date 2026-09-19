// ─── DATA ────────────────────────────────────────────────────────────────────

import { Award, Flame, Star, Trophy } from "lucide-react";

export const RESUME_URL =
  "https://drive.google.com/file/d/1w1B7uTZadDRFDRq5oVP73hDwmw7BQ7RZ/view?usp=drive_link";

export const PROJECTS = [
  {
    title: "DevRamp",
    subtitle: "Codebase Onboarding Assistant",
    description:
      "AI-powered codebase onboarding assistant with a non-blocking FastAPI RAG backend, Pinecone vector retrieval, SSE token streaming, Tree-sitter AST-based code indexing, and a React/TypeScript workspace with Mermaid architecture graphs and clickable source citations.",
    tags: ["React", "TypeScript", "FastAPI", "Pinecone", "Tree-sitter"],
    github: "https://github.com/piyushyadv/devramp",
    live: null,
    year: "2026",
    gradient: "from-[#f6b64c]/25 via-[#e58a3b]/10 to-transparent",
    cover: "/devramp.png",
    coverAlt: "DevRamp — Codebase Onboarding Assistant",
  },
  {
    title: "SplitSync",
    subtitle: "Expense Settlement Platform",
    description:
      "Multi-currency expense settlement platform with a Spring Boot greedy graph optimization engine, Gemini Vision receipt parsing through the Vercel AI SDK, Zod schema validation, Redis exchange-rate caching, and a normalized PostgreSQL/Supabase data model.",
    tags: ["Java", "Spring Boot", "Next.js", "Redis", "Supabase", "PostgreSQL"],
    github: "https://github.com/piyushyadv/splitsync",
    live: null,
    year: "2026",
    gradient: "from-[#7bd0c1]/25 via-[#4c9a8f]/10 to-transparent",
    cover: "/splitsync.png",
    coverAlt: "SplitSync — Expense Settlement Platform",
  },
  {
    title: "Sentinel.log",
    subtitle: "AI Log Intelligence",
    description:
      "AI-powered log intelligence platform that parses server logs with Drain3, detects anomalous event sequences using a PyTorch LSTM, and delivers near-real-time anomaly visualization and Gemini-powered diagnostics through a Next.js dashboard.",
    tags: ["Python", "PyTorch", "FastAPI", "Next.js", "Gemini"],
    github: "https://github.com/piyushyadv/sentinel-log",
    live: null,
    year: "2026",
    gradient: "from-[#c99ef5]/25 via-[#8a6bd0]/10 to-transparent",
    cover: "/sentinel-log.png",
    coverAlt: "Sentinel.log — AI Log Intelligence",
  },
  {
    title: "Synapse",
    subtitle: "Live Collaborative Workspace",
    description:
      "Scalable collaborative editing platform with Spring Boot microservices, Kafka-based domain decoupling, Yjs CRDT synchronization, a Node.js WebSocket sidecar, Redis-backed debounced persistence, and PostgreSQL recovery.",
    tags: ["React", "Spring Boot", "Kafka", "Redis", "PostgreSQL"],
    github: "https://github.com/PiyushYadv/synapse",
    live: null,
    year: "2026",
    gradient: "from-[#f6a04c]/25 via-[#e5533b]/10 to-transparent",
    cover: "/synapse.png",
    coverAlt: "Synapse — Live Collaborative Workspace",
  },
  {
    title: "Nimbus",
    subtitle: "Distributed Key-Value Store",
    description:
      "Fault-tolerant distributed key-value store in Go with a pure Raft consensus state machine, custom LSM storage engine, MemTables, Bloom filters, TCP networking, Cobra CLI, and Docker-based local cluster orchestration.",
    tags: ["Go", "Raft", "LSM Tree", "TCP", "Cobra", "Docker"],
    github: "https://github.com/PiyushYadv/nimbus",
    live: null,
    year: "2026",
    gradient: "from-[#f6b64c]/25 via-[#e58a3b]/10 to-transparent",
    cover: "/nimbus.png",
    coverAlt: "Nimbus — Distributed Key-Value Store",
  },
  {
    title: "Recall",
    subtitle: "Secure Text-to-SQL Assistant",
    description:
      "Secure Text-to-SQL assistant with AST-based read-only enforcement using SQLGlot, encrypted multi-tenant database credentials, and a privacy-preserving Schema RAG pipeline that embeds structural metadata instead of row data.",
    tags: [
      "Python",
      "FastAPI",
      "LangChain",
      "SQLGlot",
      "PostgreSQL",
      "Pinecone",
    ],
    github: "https://github.com/PiyushYadv/recall",
    live: null,
    year: "2025",
    gradient: "from-[#c99ef5]/25 via-[#8a6bd0]/10 to-transparent",
    cover: "/recall.png",
    coverAlt: "Recall — Secure Text-to-SQL Assistant",
  },
  {
    title: "NanoBook",
    subtitle: "Micro-Matching Engine",
    description:
      "Single-threaded limit order book with O(1) best bid/ask lookups, a two-level bitmap, custom open-addressing hash map, 64-byte aligned intrusive order pool, randomized differential fuzzing, and perf-driven latency profiling.",
    tags: ["C++20", "Google Benchmark", "Linux perf"],
    github: "https://github.com/PiyushYadv/nanobook",
    live: null,
    year: "2025",
    gradient: "from-[#7bd0c1]/25 via-[#4c9a8f]/10 to-transparent",
    cover: null,
    coverAlt: "NanoBook — Micro-Matching Engine",
  },
  {
    title: "Multi-Relational Link Prediction",
    subtitle: "Inter-Layer GNNs",
    description:
      "Dataset-agnostic link prediction framework for multiplex graphs with intra-layer message passing, inter-layer semantic attention, leakage-safe data ingestion, and scalable neighbor sampling for massive graph training.",
    tags: ["Python", "PyTorch", "PyTorch Geometric"],
    github: "https://github.com/PiyushYadv/mplx-lp",
    live: null,
    year: "2026",
    gradient: "from-[#f6a04c]/25 via-[#e5533b]/10 to-transparent",
    cover: null,
    coverAlt: "Multi-Relational Link Prediction via Inter-Layer GNNs",
  },
];

export const ACHIEVEMENTS: {
  icon: typeof Flame;
  value: number;
  suffix: string;
  label: string;
  sub: string;
  decimals?: number;
}[] = [
  {
    icon: Star,
    value: 1898,
    suffix: "",
    label: "LeetCode max rating",
    sub: "Knight · current 1869",
  },
  {
    icon: Award,
    value: 1459,
    suffix: "",
    label: "Codeforces max rating",
    sub: "Specialist · current 1450",
  },
  {
    icon: Trophy,
    value: 8.76,
    suffix: "",
    decimals: 2,
    label: "CGPA",
    sub: "Delhi Technological University",
  },
  {
    icon: Flame,
    value: 15,
    suffix: "+",
    label: "Client websites",
    sub: "Delivered through freelance work",
  },
];

export const SKILLS: { category: string; items: string[] }[] = [
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
  { category: "Tools", items: ["Git", "VSCode", "Docker", "Postman", "Figma"] },
  {
    category: "CS Fundamentals",
    items: ["DSA", "OOP", "OS", "DBMS", "Computer Networks", "System Design"],
  },
];

export const EXPERIENCE = [
  {
    role: "Software Developer Intern",
    company: "NPTEL, IIT Ropar",
    period: "Jan 2026 — Mar 2026",
    type: "Internship",
    points: [
      "Built Vi-Notes, a MERN authorship-verification platform correlating writing with keystroke dynamics, editing behavior, typing rhythm, and paste activity.",
      "Implemented Node.js/Express REST APIs with JWT, OAuth 2.0, and RBAC; used React Query and Context API for client state and authentication.",
      "Incorporated keystroke dynamics (dwell/flight time, typing speed, paste detection) for authorship verification.",
    ],
  },
  {
    role: "Freelance Web Developer",
    company: "Wixthemestore",
    period: "May 2024 — Jun 2025",
    type: "Freelance",
    points: [
      "Built 15+ client websites using Wix Studio (Velo) and Shopify (Liquid), with responsive designs.",
      "Implemented custom frontend features, CMS functionality, and theme modifications while resolving client-reported issues.",
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
    degree: "B.Tech — Computer Science & Engineering",
    institution: "Delhi Technological University",
    period: "2023 — 2027",
    score: "8.76 CGPA",
    details: [
      "Relevant: DSA, OS, OOPS, DBMS, Computer Networks, Machine Learning, Software Engineering",
    ],
  },
  {
    degree: "Higher Secondary (Class XII)",
    institution: "Aakash Public School",
    period: "2021 – 2022",
    score: "84.8%",
    details: ["Completed senior secondary education with PCM"],
  },
  {
    degree: "Secondary School (Class X)",
    institution: "Kendriya Vidyalaya No. 3",
    period: "2019 – 2020",
    score: "94.4%",
    details: ["Secured Rank 1 in class"],
  },
];

export const MONO: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
};

export const DISPLAY: React.CSSProperties = {
  fontFamily: "'Sora', sans-serif",
};
