export const PORTFOLIO_DATA = {
  personalInfo: {
    name: "Andrew Lai Eng Khiong",
    title: "Software Engineer",
    location: "Singapore",
    status: "Online",
    avatarUrl: "https://api.dicebear.com/7.x/pixel-art/svg?seed=AndrewLai",
    aboutMe: "Result-oriented Software Engineer with 6+ years of experience building high-performance web and mobile applications using React, TypeScript, and Node.js. Skilled in designing scalable, secure systems and leading cross-functional projects to deliver impactful results for businesses.",
    systemProperties: [
      { label: "Phone", value: "+65 8621 0964" },
      { label: "Email", value: "laiandrew2002@gmail.com" },
      { label: "LinkedIn", value: "linkedin.com/in/andrew-lai-abc/" },
      { label: "GitHub", value: "github.com/laiandrew2002" },
      { label: "Website", value: "andrew-portfolio.vercel.app" }
    ],
    resumeUrl: "#"
  },
  experience: {
    pageTitle: "Work Experience",
    pageSubtitle: "CONFIDENTIAL - Last updated 2026",
    jobs: [
      {
        id: "job-1",
        role: "Senior Software Engineer",
        period: "Jun 2025 – Present",
        company: "Xweave.io",
        achievements: [
          "Built a scalable orchestration system for cross-border payments using stablecoins (ERC20, Polygon) across centralized and decentralized infrastructures.",
          "Designed and scaled full-stack systems with RedwoodJS and GraphQL, leveraging Temporal for durable, fault-tolerant workflows with automatic retries and error recovery.",
          "Integrated multiple payment and exchange providers to enable real-time route and fee optimization.",
          "Enhanced transaction reliability, reconciliation, and data accuracy through workflow automation.",
          "Collaborated with product and operations teams to deliver secure, compliant, and high-performance money transfer systems."
        ]
      },
      {
        id: "job-2",
        role: "Software Engineer",
        period: "April 2021 – Oct 2024",
        company: "Bake",
        achievements: [
          "Led development of high-traffic web apps (bake.io, app.bake.io) with React (TypeScript), Redux, Node.js (Express/TypeScript), PostgreSQL, and Redis, ensuring seamless user experiences.",
          "Increased sign-up and login rates by 30% via SSO integration; strengthened authentication and authorisation flows.",
          "Reduced KYC processing time by 80% through automation integrating Sumsub and Singpass MyInfo.",
          "Enhanced admin panel with React Admin & React Query; built country-specific restriction features expanding product adaptability"
        ]
      },
      {
        id: "job-3",
        role: "Software Engineer",
        period: "November 2019 - March 2021",
        company: "Ufinity Pte Ltd.",
        achievements: [
          "Contributed to the LifeSG mobile application (iOS & Android) with React Native (TypeScript), enhancing user experience through performance optimization and clean UI design.",
          "Delivered high-quality code in agile sprints through pair programming and test-driven development."
        ]
      },
      {
        id: "job-4",
        role: "Associate Professional Programmer Analyst",
        period: "February 2019 - November 2019",
        company: "DXC Technology",
        achievements: [
          "Involved in the development of the front end of an API gateway with React.js & Redux.",
          "Developed a REST API generator using loopback in node.js",
          "Involved in the development of integration of a microservice to provide Singpass OIDC authentication for clients. (Node.js & Express.js)."
        ]
      }
    ]
  },
  projects: [
    {
      id: "fintrack",
      title: "FinTrack",
      desc: "Personal finance dashboard and tracking tool.",
      tech: "React, Node.js, PostgreSQL, Redis",
      achievements: [
        "Reduced query time by 50% using Redis",
        "Implemented exact bank sync"
      ],
      githubUrl: "#",
      demoUrl: "#"
    },
    {
      id: "leadscoop",
      title: "LeadScoop",
      desc: "B2B Lead Generation tool.",
      tech: "Next.js, Tailwind, tRPC",
      achievements: [
        "Built performant data grids",
        "Handled 1M+ rows on frontend efficiently"
      ],
      githubUrl: "#",
      demoUrl: "#"
    },
    {
      id: "crypto-yield",
      title: "Crypto Yield Dash",
      desc: "Web3 dashboard for DeFi yield farming.",
      tech: "React, Ethers.js, The Graph",
      achievements: [
        "Integrated multiple smart contracts",
        "Real-time APR tracking"
      ],
      githubUrl: "#",
      demoUrl: "#"
    },
    {
      id: "driver-track",
      title: "Driver Tracking App",
      desc: "Real-time logistics tracking.",
      tech: "React Native, Node.js, WebSockets",
      achievements: [
        "Low latency live tracking",
        "Offline support"
      ],
      githubUrl: "#",
      demoUrl: "#"
    }
  ],
  skills: [
    { title: "Languages", skills: ["JavaScript", "TypeScript", "Python"] },
    { title: "Front End", skills: ["HTML", "CSS", "React", "React Query", "React Native", "Next.js", "Redux", "Zustand", "React Context"] },
    { title: "Back End", skills: ["Node.js", "Express.js", "Koa", "RESTful APIs", "Temporal workflow"] },
    { title: "Databases", skills: ["MySQL", "Postgres", "MongoDB", "Redis"] },
    { title: "DevOps & Cloud", skills: ["Git", "AWS", "Docker"] },
    { title: "Blockchain/Web3", skills: ["Ethers.js", "Viem", "Metamask Integration"] }
  ]
};
