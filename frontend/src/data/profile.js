export const PROFILE = {
  name: "Brandon Eroza",
  fullName: "Brandon Enrique Eroza Torres",
  role: "Data Scientist & ML Engineer",
  location: "México",
  email: "tbdonran.23@gmail.com",
  github: "https://github.com/Brandon-dev314",
  linkedin: "https://linkedin.com/in/brandoneroza",
  tagline:
    "I build intelligent systems — from data pipelines to autonomous AI agents.",
  about: [
    "Computer Science graduate from BUAP with a focus on machine learning, NLP, and generative AI. I design and build end-to-end solutions: data ingestion, model training, API development, and cloud deployment.",
    "My work spans RAG architectures, agent orchestration (ReAct + MCP), and production ML pipelines using FastAPI, Docker, and AWS. I'm driven by solving real problems with clean, scalable code.",
  ],
};

export const PROJECTS = [
  {
    id: "devagent",
    title: "DevAgent",
    subtitle: "AI Agent · RAG + MCP",
    description:
      "Conversational AI agent for technical documentation. Full RAG pipeline with semantic chunking, Qdrant vector search, ReAct-pattern orchestrator, sliding-window memory, and MCP tool integration.",
    tech: ["FastAPI", "OpenAI API", "Qdrant", "Docker", "React", "Prometheus"],
    accent: "#00d4ff",
    icon: "⬡",
    github: "https://github.com/Brandon-dev314/devagent",
    demo: "https://devagent-4l1i.vercel.app/",
  },
  {
    id: "extractor",
    title: "Tax extractor",
    subtitle: "GenAI Document Processing",
    description:
      "Automated extraction and analysis of Mexican fiscal documents (CFDI/XML) using GPT. Bulk processing pipeline with structured data output, deployed on AWS.",
    tech: ["FastAPI", "GPT-4", "AWS S3", "AWS RDS", "Python"],
    accent: "#10b981",
    icon: "◈",
    github: "https://github.com/Brandon-dev314/taxExtractor",
    demo: "https://taxextractor-korbhcphbryzhravtyyxdy.streamlit.app/",
  },
  {
    id: "Space",
    title: "Space missions",
    subtitle: "Data analysis & visualization",
    description:
      "REST API for multi-waypoint delivery route optimization using OpenRouteService with vehicle constraints and real-time geocoding.",
    tech: ["Django", "OpenRouteService", "SQLite", "REST API"],
    accent: "#f59e0b",
    icon: "△",
    github: "https://github.com/Brandon-dev314/Space-Missions/blob/main/README.md",
    demo: "#",
  },
  {
    id: "coach",
    title: "CoachManager",
    subtitle: "Full-Stack SaaS (demo)",
    description:
      "Client management platform for fitness coaches. Google OAuth, Calendar API integration, client tracking, and responsive dashboard.",
    tech: ["React", "Node.js", "MySQL", "Google OAuth", "Google Calendar API", "AWS S3", "AWS RDS",],
    accent: "#8b5cf6",
    icon: "◎",
    github: "https://github.com/Brandon-dev314/coach-demo",
    demo: "https://coach-demo-five.vercel.app/",
  },
];

export const SKILLS = [
  { label: "Python", level: "intermediate" },
  { label: "SQL", level: "intermediate" },
  { label: "FastAPI", level: "intermediate" },
  { label: "OpenAI / GenAI", level: "intermediate" },
  { label: "Scikit-learn", level: "intermediate" },
  { label: "Docker", level: "basic" },
  { label: "Django", level: "intermediate" },
  { label: "Power BI", level: "basic" },
  { label: "TensorFlow", level: "intermediate" },
  { label: "AWS", level: "intermediate" },
  { label: "React", level: "basic" },
  { label: "PySpark", level: "basic" },
];

export const TECH_GROUPS = [
  {
    title: "ML & AI",
    items: ["Scikit-learn", "TensorFlow", "OpenAI API", "RAG", "LangChain", "NLP", "Qdrant", "ChromaDB"],
  },
  {
    title: "Backend",
    items: ["FastAPI", "Django", "Node.js / Express", "REST APIs", "WebSocket"],
  },
  {
    title: "Data & Cloud",
    items: ["PySpark", "Databricks", "AWS S3 / RDS", "PostgreSQL", "Redis", "Docker", "GitHub Actions"],
  },
  {
    title: "Frontend & Viz",
    items: ["React", "Tailwind CSS", "Streamlit"],
  },
];

export const NAV_LINKS = ["about", "projects", "skills", "contact"];