/**
 * Aura Architectural Atelier - Website Data & Content
 * Distinct luxury interior architecture studio configuration.
 */
export const siteData = {
  brand: {
    name: "Aura Atelier",
    full: "Aura Architectural Atelier",
    tagline: "Bespoke Spatial Architecture & Turnkey Sanctuaries",
    city: "Chennai · Bangalore"
  },
  contact: {
    phones: ["98400 12890", "98400 78210"],
    whatsapp: "919840012890",
    website: "www.auraatelier.design",
    address: [
      "The Glass Pavilion, Suite 402",
      "Kader Nawaz Khan Road, Nungambakkam",
      "Chennai 600006"
    ],
    mapQuery: "Kader Nawaz Khan Road, Nungambakkam, Chennai 600006",
    hours: "Mon – Sat · 9:30 AM – 7:30 PM"
  },
  nav: [
    { label: "Disciplines", href: "#services" },
    { label: "Methodology", href: "#process" },
    { label: "Philosophy", href: "#promise" },
    { label: "Atelier", href: "#contact" }
  ],
  hero: {
    eyebrow: "Architectural Interior Atelier · Turnkey Sanctuaries",
    lines: ["AURA", "ATELIER", "STUDIO"],
    sub: "We orchestrate bespoke residential estates, contemporary headquarters, and visionary hospitality spaces from spatial inception to white-glove handover.",
    cta: {
      label: "Commission a Consultation",
      href: "#contact"
    },
    hint: "Explore the Atelier"
  },
  intro: {
    label: "Our Creed",
    text: "We practice architecture at the intersection of quiet luxury and structural rigor. Private residences, modern boardrooms, custom millwork, and experiential spaces designed to evoke emotion and endure for generations.",
    note: "Experience our eight disciplines"
  },
  services: {
    label: "What We Practice",
    title: ["Eight disciplines.", "One unified signature."],
    intro: "Whether shaping a single bespoke suite or directing an entire estate from ground up, our dedicated architects, engineers, and master craftsmen guide every detail.",
    items: [
      {
        title: ["Private Residential", "Estates"],
        tags: ["Bespoke", "Quiet Luxury", "Harmonious"],
        icon: "home",
        image: "/images/residential.webp",
        text: "Penthouses, sprawling villas, and private residences tailored precisely to your family's personal rhythms and aspirations."
      },
      {
        title: ["Commercial & Retail", "Flagships"],
        tags: ["Iconic", "Experiential", "Magnetic"],
        icon: "building",
        image: "/images/commercial.webp",
        text: "Flagship retail boutiques and experiential showrooms engineered to amplify brand prestige and customer devotion."
      },
      {
        title: ["Executive Corporate", "Workspaces"],
        tags: ["High-Focus", "Ergonomic", "Prestigious"],
        icon: "chair",
        image: "/images/office.webp",
        text: "Visionary corporate headquarters balancing biophilic daylight, acoustic confidentiality, and ergonomic collaboration."
      },
      {
        title: ["Artisanal Kitchens", "& Wardrobes"],
        tags: ["Concealed Luxury", "Italian Millwork"],
        icon: "kitchen",
        image: "/images/kitchen.webp",
        text: "Architectural cabinetry with integrated lighting, motorized soft-close hardware, and precision internal organization."
      },
      {
        title: ["Turnkey Architectural", "Execution"],
        tags: ["Civil", "MEP", "Carpentry", "Finishes"],
        icon: "tools",
        image: "/images/turnkey.webp",
        text: "Comprehensive site leadership spanning structural modifications, electrical systems, bespoke joinery, and fine art curation."
      },
      {
        title: ["Volumetric Space", "Planning"],
        tags: ["Circulation", "Acoustics", "Light Flow"],
        icon: "cubes",
        image: "/images/planning.webp",
        text: "Meticulous 3D circulation mapping and solar orientation analysis so every square meter fulfills an intentional purpose."
      },
      {
        title: ["Rare Material", "Curation"],
        tags: ["Imported Stone", "Smoked Oak", "Brass"],
        icon: "shield",
        image: "/images/quality.webp",
        text: "Ethically sourced bookmatched marbles, bespoke bronze hardware, and European veneers hand-selected for timeless patinas."
      },
      {
        title: ["Precision Timeline", "Commitment"],
        tags: ["Milestone-Driven", "Strict Delivery"],
        icon: "clock",
        image: "/images/delivery.webp",
        text: "Rigorous milestone scheduling with weekly digital progress reports and an unyielding commitment to our agreed handover date."
      }
    ]
  },
  finale: {
    label: "Private Commission",
    title: ["Your sanctuary", "begins here."],
    cta: {
      label: "Schedule a Private Session",
      href: "#contact"
    }
  },
  process: {
    label: "Our Methodology",
    title: ["From conceptual vision", "to white-glove handover"],
    steps: [
      {
        title: "Immerse",
        text: "In-depth spatial evaluation, lifestyle alignment, budget framework, and architectural master timeline.",
        image: "/images/p-blueprint.webp",
        points: ["Site laser mapping", "Scope & feasibility", "Investment alignment"]
      },
      {
        title: "Synthesize",
        text: "Hyper-realistic 3D volumetric renders, physical tactile material palettes, and lighting calculations.",
        image: "/images/p-blocks.webp",
        points: ["Volumetric space models", "Tactile material trays", "Lighting & MEP blueprints"]
      },
      {
        title: "Craft",
        text: "Flawless site execution directed by a dedicated lead project architect with rigorous milestone inspections.",
        image: "/images/p-build.webp",
        points: ["Single project director", "Weekly live progress logs", "Millimeter quality audit"]
      },
      {
        title: "Sanctuary",
        text: "White-glove deep detailing, acoustic balance check, art staging, and turnkey key handover on the promised date.",
        image: "/images/p-handover.webp",
        points: ["Flawless walkthrough", "White-glove detailing", "Key handover on time"]
      }
    ]
  },
  promise: {
    label: "Our Philosophy",
    title: ["Three tenets", "we never compromise"],
    items: [
      {
        icon: "shield",
        title: "Heirloom Quality",
        tags: "Master Craftsmanship · Lasting Value",
        text: "Every veneer, joinery joint, and stone slab undergoes stringent laboratory-grade inspection so the elegance endures for decades."
      },
      {
        icon: "clock",
        title: "Uncompromising Delivery",
        tags: "Committed · Transparent · Reliable",
        text: "Milestone-locked contracts backed by real-time client tracking portals and zero handover surprises."
      },
      {
        icon: "tools",
        title: "Complete Sole-Source Care",
        tags: "Design · Engineering · Build",
        text: "Design, structural engineering, procurement, and artisanal craftsmanship harmonized under one accountable signature."
      }
    ]
  },
  cta: {
    label: "Inquire About a Commission",
    title: ["Let us shape your", "defining space"],
    text: "Share the vision for your residential, corporate, or commercial sanctuary. Our lead architects will connect with you to arrange a private consultation.",
    services: [
      "Private Residential Estates",
      "Executive Corporate Workspaces",
      "Commercial & Retail Flagships",
      "Artisanal Kitchens & Wardrobes",
      "Turnkey Architectural Execution",
      "Volumetric Space Planning"
    ]
  },
  footer: {
    note: "Bespoke interior architecture, custom millwork, and turnkey execution for visionary residences and headquarters."
  }
};
