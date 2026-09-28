// ==============================================================================
// SINGLE SOURCE OF TRUTH FOR ALL PROJECTS — ALFAIZKHAN PORTFOLIO
// Auto-synchronized from Admin Suite
// ==============================================================================

export const projects = [
  {
    "id": "feesense",
    "title": "FeeSense",
    "slug": "feesense",
    "category": "Hackathon",
    "shortDescription": "DeFi transaction fee intelligence dashboard for monitoring real-time blockchain gas fees.",
    "description": "FeeSense is a decentralized finance utility designed to bring transparency and predictability to volatile blockchain network gas fees. Built during a hackathon, it translates raw mempool and gas oracle data into clear visual charts, cost predictors, and actionable timing recommendations so users avoid overpaying during transaction fee spikes.",
    "problem": "Blockchain network fees fluctuate unpredictably based on traffic congestion, leading users and smart contract developers to either overpay during surges or suffer from stalled, dropped transactions.",
    "solution": "Aggregates real-time fee telemetry, analyzes historical volatility trends, and offers intuitive high/medium/low cost tiers with smart execution timing recommendations.",
    "features": [
      "Real-time gas fee monitoring across rapid, standard, and economy priority tiers",
      "Historical fee volatility analytics with interactive trend visualization",
      "Dynamic color-coded status indicators (Normal, Congested, Surging)",
      "Interactive cost estimator for swaps, transfers, and contract deployments",
      "Clean responsive dashboard optimized for desktop and mobile displays"
    ],
    "technologies": [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "Recharts"
    ],
    "image": "/images/projects/feesense/thumbnail.png",
    "screenshots": [
      "/images/projects/feesense/screenshot-1.png",
      "/images/projects/feesense/screenshot-2.png"
    ],
    "github": "https://github.com/alfaizkhan/feesense",
    "liveDemo": "",
    "date": "2026",
    "role": "Full-Stack Developer",
    "featured": true
  },
  {
    "id": "campus-find",
    "title": "Campus Find",
    "slug": "campus-find",
    "category": "College Project",
    "shortDescription": "Full-stack lost & found management system for universities featuring a 5-factor matching algorithm.",
    "description": "Campus Find is a comprehensive, production-grade Lost & Found management system built specifically for college campuses. It replaces chaotic message groups and paper logbooks with an auditable, automated recovery ecosystem complete with role-based access control, privacy-preserving item reporting, and anti-fraud verification interrogations.",
    "problem": "Valuable personal and educational items misplaced across campus lecture halls, libraries, and laboratories are rarely recovered due to fragmented communication channels and lack of secure ownership verification.",
    "solution": "Implements a deterministic 5-factor scoring engine (Category, Item Name Levenshtein Similarity, Campus Proximity, Temporal Window, and Description Overlap) combined with secret question verification before physical custody handovers.",
    "features": [
      "Dedicated role-based portals for Students, Faculty, Security Staff, and Administrators",
      "Deterministic 5-factor matching engine with percentage confidence breakdown",
      "Anti-fraud verification interrogation masking private distinguishing marks from public view",
      "Physical locker custody intake and handover receipt tracking",
      "Audit logging with status lifecycle management (Reported -> Matched -> Verified -> Returned)"
    ],
    "technologies": [
      "React",
      "Node.js",
      "Express",
      "MySQL",
      "Tailwind CSS",
      "JWT"
    ],
    "image": "/images/projects/campus-find/thumbnail.png",
    "screenshots": [
      "/images/projects/campus-find/screenshot-1.png",
      "/images/projects/campus-find/screenshot-2.png"
    ],
    "github": "https://github.com/alfaizkhan/campus-find",
    "liveDemo": "",
    "date": "2026",
    "role": "Full-Stack Developer",
    "featured": true
  },
  {
    "id": "truckpack",
    "title": "TruckPack",
    "slug": "truckpack",
    "category": "Web Development",
    "shortDescription": "Freight and return-load logistics matching platform with live GPS highway corridor tracking.",
    "description": "TruckPack is a full-stack logistics and transportation platform designed to resolve the commercial freight industry's deadhead problem. By algorithmically connecting shippers with trucks traveling empty on return trips along national highway corridors, TruckPack provides shippers with discounted freight rates while maximizing carrier operating margins.",
    "problem": "Up to 40% of commercial freight truck trips are non-revenue 'deadhead' return miles, resulting in wasted fuel, higher carbon emissions, and inflated one-way shipping costs.",
    "solution": "Employs an algorithmic return-load matching system that analyzes route corridors, pickup timing, and vehicle capacity, backed by an interactive Leaflet radar map simulating real-time vehicle transit.",
    "features": [
      "Mathematical return-load matching algorithm offering 25% shipper discount incentives",
      "Interactive OpenStreetMap & Leaflet radar simulation along active highway corridors",
      "Multi-persona workspaces for Shippers, Fleet Transporters, and Drivers",
      "Automated booking generation, sandbox payment checkout, and GST tax invoice generation",
      "Vehicle & driver document compliance verification system (RC, DL, GST, PAN)"
    ],
    "technologies": [
      "JavaScript",
      "Node.js",
      "Express",
      "MySQL",
      "Leaflet",
      "CSS3"
    ],
    "image": "/images/projects/truckpack/thumbnail.png",
    "screenshots": [
      "/images/projects/truckpack/screenshot-1.png",
      "/images/projects/truckpack/screenshot-2.png"
    ],
    "github": "https://github.com/alfaizkhan/truckpack",
    "liveDemo": "",
    "date": "2026",
    "role": "Backend & Systems Developer",
    "featured": true
  }
];

export const getAllCategories = () => {
  const predefined = [
    'All',
    'Web Development',
    'College Project',
    'Hackathon',
    'Python',
    'AI/ML',
    'C/C++',
    'Database',
    'Other'
  ];
  const fromData = projects.map(p => p.category).filter(Boolean);
  return Array.from(new Set([...predefined, ...fromData]));
};

export const getProjectBySlug = (slug) => {
  if (!slug) return null;
  const clean = String(slug).trim().toLowerCase();
  return projects.find(p => (p.slug && p.slug.toLowerCase() === clean) || (p.id && p.id.toLowerCase() === clean)) || null;
};

export const getFeaturedProjects = () => {
  return projects.filter(p => Boolean(p.featured));
};

export default projects;
