export const skillCategories = {
  finance: { id: "finance", label: "Finance", color: "#7F77DD" },
  tax: { id: "tax", label: "Tax / GST", color: "#EF9F27" },
  tech: { id: "tech", label: "Tech / Dev", color: "#1D9E75" },
  audit: { id: "audit", label: "Audit", color: "#D85A30" },
};

export const globeNodes = [
  // Finance
  { id: "n1", categoryId: "finance", position: [0.8, 0.4, 0.4], label: "Accounting" },
  { id: "n2", categoryId: "finance", position: [-0.6, -0.6, 0.5], label: "IFRS" },
  { id: "n3", categoryId: "finance", position: [0.2, 0.9, -0.4], label: "MIS" },
  // Tax
  { id: "n4", categoryId: "tax", position: [-0.8, 0.3, -0.5], label: "GST" },
  { id: "n5", categoryId: "tax", position: [0.5, -0.7, -0.5], label: "Income Tax" },
  { id: "n6", categoryId: "tax", position: [0.1, 0.2, 0.9], label: "Corp Tax" },
  // Tech
  { id: "n7", categoryId: "tech", position: [0.6, 0.5, -0.6], label: "React" },
  { id: "n8", categoryId: "tech", position: [-0.5, 0.7, 0.5], label: "Python" },
  { id: "n9", categoryId: "tech", position: [0.0, -0.9, 0.4], label: "SQL" },
  { id: "n10", categoryId: "tech", position: [-0.4, -0.2, -0.8], label: "RAG" },
  // Audit
  { id: "n11", categoryId: "audit", position: [0.9, -0.2, 0.3], label: "Stat Audit" },
  { id: "n12", categoryId: "audit", position: [-0.9, -0.3, 0.2], label: "Bank Audit" },
];

export const timelineData = [
  {
    id: "t1",
    title: "B.Com Hons.",
    date: "Jul 2019 – Mar 2022",
    categoryId: "finance",
    description: "Built the core foundation in Commerce — but college shut down in March 2020 due to COVID. Instead of waiting, joined a CA firm in September 2020, turning the lost classroom time into real-world practice.",
    bulletPoints: [
      "Studied Accounting, Corporate Law, Taxation & other related Subjects while simultaneously working  at a CA firm",
      "Adopted a double-shift routine for 2+ years — morning lectures, then straight to office until evening, never missing a deadline at either",
      "Went from zero practical knowledge to independently filing ITRs, handling audits, and managing compliance within months"
    ],
    tags: ["Accounting", "Corporate Law", "Taxation", "Financial Reporting", "Tax Returns & Compliances",  "Audits"]
  },
  {
    id: "t2",
    title: "Internship & Paid Articleship @ CA Firm",
    date: "Sept 2020 – Jul 2025",
    categoryId: "audit",
    description: "Started as a complete novice mid-COVID, grew to Senior Associate over 5 years — handling real clients, real deadlines, and real compliance work from day one.",
    bulletPoints: [
      "Conducted statutory, tax, and bank audits for 15+ corporate clients across manufacturing, e-commerce, transport, F&B, travel, and banking sectors",
      "Led finalization of books, tax planning & returns, and MCA compliance for 40+ clients — reporting financial statements per Schedule III of the Companies Act",
      "Audited high-profile clients including PMBI and ITC-PSPD",
      "Developed internal control systems for 5+ clients covering sales, expenses, and revenue recognition",
      "Represented clients in departmental interactions with tax authorities"
    ],
    tags: ["Statutory Audit", "Tax Audit", "Bank Audit", "Tax Planning", "Corporate Compliances", "Financial Reporting"]
  },
  {
    id: "t3",
    title: " Accounts Specialist — Elcom Digital",
    date: "Joined in Oct 2025",
    categoryId: "finance",
    description: "Managing financials and operations or the company.",
    tags: ["FinOps", "MIS", "Zoho Books", "GST"]
  },
  {
    id: "t4",
    title: "Self-Taught Dev Journey",
    date: "2024",
    categoryId: "tech",
    description: "Began automating repetitive tasks and building tools.",
    tags: ["Python", "React", "JS", "SQL", "RAG"]
  },
  {
    id: "t5",
    title: "UAE Corporate Tax + IFRS",
    date: "Active study — 2026–present",
    categoryId: "finance",
    description: "Expanding into international tax structures and reporting.",
    tags: ["Corporate Tax", "IFRS", "Global Compliance"]
  },
  {
    id: "t6",
    title: "Now · Building & Expanding",
    date: "Present",
    categoryId: "tech",
    description: "Merging finance domain expertise with software solutions.",
    tags: ["GSTR Recon tool", "Portfolio", "CA Finals"]
  }
];
