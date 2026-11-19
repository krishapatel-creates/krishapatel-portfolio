export interface EducationEntry {
  degree: string;
  institution: string;
  location: string;
  period: string;
  detail?: string;
}

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  category: 'CAD & Mechanical' | 'Embedded & Arduino' | 'AI & Concept';
  status: string;
  typeLabel: string;
  summary: string;
  problem: string;
  architecture: string;
  outcome: string;
  xrayNote: string;
  technicalDetails: string[];
  tools: string[];
  linkedSkills: string[];
  interactiveType: 'quadcopter' | 'led' | 'servo' | 'conveyor' | 'desk';
  externalUrl?: string;
}

export interface ExperienceItem {
  role: string;
  organization: string;
  location: string;
  period: string;
  highlights: string[];
  linkedSkills: string[];
  xrayNote: string;
}

export interface SkillItem {
  name: string;
  category: 'Technical' | 'Creative & AI' | 'Leadership & Strategy';
  sourceNote: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  program?: string;
  date: string;
  durationOrHours?: string;
  certificateId: string;
  signatory: string;
  category: 'AI & Foundations' | 'Engineering & CAD' | 'Hackathon & Leadership';
  skillsCovered: string[];
  linkedSkills: string[];
  courseworkHighlights: string[];
  teamOrHighlight?: string;
  fileUrl: string;
  fileType: 'pdf' | 'image';
  metadataExtra?: string;
}

export const PROFILE_DATA = {
  fullName: 'Krisha Patel',
  primaryTitle: 'Electronics & Communication Engineering Student',
  tagline: 'Designing embedded systems, 3D CAD assemblies & digital strategy that bridge hardware and execution.',
  location: 'Ahmedabad, Gujarat',
  availability: 'Open to Internships & Engineering Research Projects',
  phone: '7900845624',
  email: 'krishakp1412@gmail.com',
  linkedinDisplay: 'linkedin.com/in/krisha-patel-a21534433',
  linkedinUrl: 'https://www.linkedin.com/in/krisha-patel-a21534433',
  githubDisplay: 'github.com/krishapatel-creates',
  githubUrl: 'https://github.com/krishapatel-creates',
  photoUrl: '/assets/aistudio/IMG_4541_45cfd35c.jpeg',
  resumePdfUrl: '/assets/aistudio/Krisha_Patel_Resume__5__771f14fc.pdf',
  summary:
    'First-year Electronics and Communication Engineering student at Karnavati University. Developing practical knowledge of Arduino, C programming, and SOLIDWORKS 3D CAD alongside core electronics fundamentals. Contributing through teamwork, clear communication, and structured problem-solving during project work.',
  languages: ['English', 'Hindi', 'Gujarati'],
  accomplishments: [
    'Secured 52nd rank in a first hackathon.',
    'Participated in an IIT Bombay Techfest workshop.',
    'Volunteered with the Cultural Club.',
  ],
};

export const KEY_FACTS_STRIP = [
  { label: 'Degree Track', value: 'B.Tech ECE · Expected 2030' },
  { label: 'Active CAD Project', value: 'Quadcopter 3D · SOLIDWORKS' },
  { label: 'Smart India Hackathon', value: 'Top 100 · Team RuptureX' },
  { label: 'Verified Credentials', value: '5 Official Certificates' },
];

export const EDUCATION_DATA: EducationEntry[] = [
  {
    degree: 'B.Tech, Electronics & Communication Engineering',
    institution: 'Karnavati University',
    location: 'Gandhinagar',
    period: 'Expected 2030',
  },
  {
    degree: 'Senior Secondary Education (CBSE)',
    institution: 'Kenalily School For Children',
    location: 'Ahmedabad',
    period: 'May 2026',
    detail: 'Class XII: 69%',
  },
  {
    degree: 'Secondary Education (CBSE)',
    institution: 'Kalorex Future School',
    location: 'Ahmedabad',
    period: 'May 2024',
    detail: 'Class X: 88%',
  },
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discover',
    description:
      'Analyze problem statements, mechanical tolerances, circuit requirements, or audience objectives to establish clear constraints.',
  },
  {
    step: '02',
    title: 'Define',
    description:
      'Map hardware components, CAD assembly mates, sensor inputs, or content calendars into structured milestones.',
  },
  {
    step: '03',
    title: 'Design',
    description:
      'Draft 3D part assemblies in SOLIDWORKS, electrical schematics, or visual brand assets in Canva with precision.',
  },
  {
    step: '04',
    title: 'Develop',
    description:
      'Write C and Arduino firmware, assemble breadboard prototypes, and iterate collaboratively across engineering teams.',
  },
  {
    step: '05',
    title: 'Deliver',
    description:
      'Validate mechanical clearances, test circuit outputs, and document outcomes cleanly for technical review.',
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'quadcopter-solidworks',
    index: '01',
    title: 'Quadcopter 3D Design in SOLIDWORKS',
    category: 'CAD & Mechanical',
    status: 'Active Project',
    typeLabel: '3D CAD Assembly · Mechanical Design',
    summary:
      'Ongoing multi-part 3D quadcopter airframe and rotor assembly modeled in SOLIDWORKS, applying parametric sketching, extrusion features, and concentric/coincident assembly mates.',
    problem:
      'Designing a balanced, lightweight multi-rotor airframe requires precise arm symmetry, motor mount clearances, and central hub structural integrity prior to fabrication.',
    architecture:
      'Parametric central chassis plates, 4 symmetric radial arms, brushless motor mount housings, landing skids, and propeller guards constrained inside a SOLIDWORKS top-level assembly.',
    outcome:
      'Active ongoing CAD build applying competencies earned in the 10-hour SOLIDWORKS 2024 Essential Training certification toward real multi-part assembly modeling.',
    xrayNote:
      'CAD Sandbox renders live geometric arm-span projection, rotor clearance arc, and exploded Z-axis assembly offset using real-time trig calculations.',
    technicalDetails: [
      'Parametric X-frame geometry enabling synchronized arm-length and hub clearance adjustments.',
      'Multi-body assembly hierarchy separating structural chassis, motor pods, and propeller profiles.',
      'Evaluating center-of-gravity symmetry and rotor tip-to-tip clearance envelopes.',
    ],
    tools: ['SOLIDWORKS 2024', '3D Assembly Mates', 'Parametric Sketching'],
    linkedSkills: ['SOLIDWORKS 2024', 'Problem-Solving', 'Creativity'],
    interactiveType: 'quadcopter',
  },
  {
    id: 'arduino-led',
    index: '02',
    title: 'Arduino LED Control',
    category: 'Embedded & Arduino',
    status: 'Completed Academic Work',
    typeLabel: 'Embedded Hardware · Digital Output',
    summary:
      'Programmed an Arduino-based LED activity to demonstrate digital output control and timed ON/OFF operation.',
    problem:
      'Establishing deterministic hardware-level timing and safe current limiting when driving external optical indicators from microcontroller GPIO pins.',
    architecture:
      'Arduino digital output Pin 13 wired in series with a current-limiting resistor and LED, governed by a C/Arduino loop toggling HIGH (5V) and LOW (0V) states.',
    outcome:
      'Demonstrated reliable digital output switching and repeatable ON/OFF timing intervals on physical hardware.',
    xrayNote:
      'Sandbox runs an actual JavaScript interval state machine synchronized to virtual GPIO HIGH/LOW registers and simulated C++ serial traces.',
    technicalDetails: [
      'Configured digital GPIO pins on an Arduino microcontroller for clean HIGH/LOW switching.',
      'Implemented deterministic timing intervals in C/Arduino syntax for rhythmic ON/OFF states.',
      'Validated current-limiting resistor sizing and breadboard polarity.',
    ],
    tools: ['Arduino', 'C Programming', 'Basic Electronics'],
    linkedSkills: ['Arduino', 'C Programming', 'Basic Electronics'],
    interactiveType: 'led',
  },
  {
    id: 'servo-potentiometer',
    index: '03',
    title: 'Potentiometer-Based Servo Motor Control',
    category: 'Embedded & Arduino',
    status: 'Completed Academic Work',
    typeLabel: 'Analog Input · Actuation Control',
    summary:
      'Worked with an Arduino and potentiometer setup to control servo movement, exploring analog input readings and their relationship to angular position.',
    problem:
      'Translating continuous human-controlled analog voltage variations into smooth, proportional angular actuation on a standard hobby servo.',
    architecture:
      '10kΩ rotary potentiometer feeding analog pin A0 (0–1023 ADC counts), mapped linearly via map() in C to 0°–180° PWM duty pulses driving the servo actuator.',
    outcome:
      'Verified proportional real-time tracking between analog voltage divider input and mechanical servo shaft angle.',
    xrayNote:
      'Interactive ADC slider computes exact 10-bit quantization (0–1023), input voltage (0.00V–5.00V), and PWM pulse width (544µs–2400µs).',
    technicalDetails: [
      'Sampled continuous voltage dividers via analog input pins (0–1023 ADC resolution).',
      'Mapped raw analog readings proportionally to 0°–180° PWM servo angular positions.',
      'Observed real-time mechanical response and signal smoothing across rotation sweeps.',
    ],
    tools: ['Arduino', 'C Programming', 'Basic Electronics'],
    linkedSkills: ['Arduino', 'C Programming', 'Basic Electronics', 'Problem-Solving'],
    interactiveType: 'servo',
  },
  {
    id: 'iron-conveyor-ai',
    index: '04',
    title: 'Iron-Conveyor Belt AI',
    category: 'AI & Concept',
    status: 'Team Project',
    typeLabel: 'Team Project · AI & Hardware Concept',
    summary:
      'Collaborated with team members across multiple aspects of an AI-focused conveyor-belt project, contributing to its collective development.',
    problem:
      'Coordinating hardware conveyor mechanics with intelligent detection logic across a multidisciplinary student engineering team.',
    architecture:
      'Conveyor feed track paired with sensor/vision inspection stage and AI classification logic to trigger automated sorting decisions.',
    outcome:
      'Contributed across technical framing, team coordination, and collective system development.',
    xrayNote:
      'Interactive conveyor simulation models item throughput, metallic/material classification threshold, and real-time decision logging.',
    technicalDetails: [
      'Coordinated across multidisciplinary teammates on an AI-integrated conveyor-belt concept.',
      'Contributed to system workflow framing, communication, and collective milestone execution.',
      'Bridged foundational AI concepts with practical hardware automation thinking.',
    ],
    tools: ['AI Tools', 'Teamwork', 'Problem-Solving'],
    linkedSkills: ['AI Tools', 'AI Foundations & ML', 'Teamwork', 'Problem-Solving', 'Communication'],
    interactiveType: 'conveyor',
  },
  {
    id: 'study-helper-desk',
    index: '05',
    title: 'Study-Helper Desk',
    category: 'AI & Concept',
    status: 'Project Concept',
    typeLabel: 'Project Concept · Interactive Design',
    summary:
      'Explored a student-support desk concept combining electronics, embedded systems and interactive design to assist study activities.',
    problem:
      'Students often lack integrated, distraction-free physical study tools that unify ambient lighting, focus pacing, and ergonomic awareness.',
    architecture:
      'Embedded microcontroller hub embedded within a study desk surface linking environmental sensors, timed focus indicators, and tactile controls.',
    outcome:
      'Formulated a human-centered embedded systems concept connecting core electronics with everyday student productivity.',
    xrayNote:
      'Interactive concept simulator toggles desk operating modes and shows real-time embedded subsystem states.',
    technicalDetails: [
      'Conceptualized an ergonomic, electronics-assisted desk environment for focused student workflows.',
      'Combined embedded microcontroller triggers with interactive user feedback principles.',
      'Structured human-centered design considerations around daily study habits.',
    ],
    tools: ['Basic Electronics', 'Arduino', 'Interactive Design'],
    linkedSkills: ['Basic Electronics', 'Arduino', 'Creativity', 'Problem-Solving'],
    interactiveType: 'desk',
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    role: 'Social Media Manager',
    organization: 'PAAJI KI KAKSHA',
    location: 'Ahmedabad',
    period: 'May 2026 – September 2026',
    highlights: [
      'Coordinated social media content management for Paaji Ki Kaksha tutoring brand across multiple channels to enhance brand visibility.',
      'Crafted engaging post captions and stories aligned with classroom learning themes to foster community interaction.',
      'Used platform calendars and scheduling tools to plan content posts.',
      'Analyzed content performance and audience engagement metrics to inform future content strategy.',
    ],
    linkedSkills: [
      'Social Media Marketing Management',
      'Content Strategy',
      'Content Management',
      'Canva',
      'Communication',
      'Creativity',
    ],
    xrayNote:
      'Demonstrates structured analytical iteration (plan → schedule → measure engagement) complementary to engineering workflows.',
  },
];

export const SKILLS_DATA: SkillItem[] = [
  { name: 'SOLIDWORKS 2024', category: 'Technical', sourceNote: 'LinkedIn Learning (10h) · Quadcopter 3D' },
  { name: 'Arduino', category: 'Technical', sourceNote: 'Resume · Embedded Hardware Projects' },
  { name: 'C Programming', category: 'Technical', sourceNote: 'Resume · Firmware & Logic' },
  { name: 'Basic Electronics', category: 'Technical', sourceNote: 'Resume · ECE Core & Circuits' },
  { name: 'Canva', category: 'Creative & AI', sourceNote: 'Resume · Visual Design' },
  { name: 'AI Tools', category: 'Creative & AI', sourceNote: 'Resume · Applied Workflows' },
  { name: 'AI Foundations & ML', category: 'Creative & AI', sourceNote: 'LinkedIn Learning & Jio Institute' },
  { name: 'Content Strategy', category: 'Leadership & Strategy', sourceNote: 'Resume · Paaji Ki Kaksha' },
  { name: 'Social Media Marketing Management', category: 'Leadership & Strategy', sourceNote: 'Resume · Paaji Ki Kaksha' },
  { name: 'Content Management', category: 'Leadership & Strategy', sourceNote: 'Resume · Multi-channel Calendars' },
  { name: 'Leadership & Constructive Feedback', category: 'Leadership & Strategy', sourceNote: 'PMI® / LinkedIn Learning' },
  { name: 'Teamwork', category: 'Leadership & Strategy', sourceNote: 'Resume · SIH & Iron-Conveyor Team' },
  { name: 'Problem-Solving', category: 'Leadership & Strategy', sourceNote: 'Resume · Hackathons & CAD' },
  { name: 'Communication', category: 'Leadership & Strategy', sourceNote: 'Resume · Team & Brand' },
  { name: 'Creativity', category: 'Creative & AI', sourceNote: 'Resume · Concept & Design' },
];

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    id: 'sih-rupturex-2026',
    title: 'Preliminary Smart India Hackathon 2026 — Certificate of Appreciation',
    issuer: 'Karnavati University · Ministry of Education · AICTE · MoE Innovation Cell · KIIF',
    date: '10th & 11th September 2026',
    certificateId: 'KU-SIH36H-ACH-2026-0311',
    signatory: 'Nir Gandhi (SPOC), Dr. Brinda Pandya (KIIF), Dr. Rebakah Geddam (UIT), Dr. Tariq Ali Saiyed (Registrar)',
    category: 'Hackathon & Leadership',
    skillsCovered: ['Problem-Solving', 'Teamwork', 'Innovation'],
    linkedSkills: ['Problem-Solving', 'Teamwork', 'Communication'],
    courseworkHighlights: [
      'Represented Team RUPTUREX during the 36-hour Preliminary Smart India Hackathon 2026.',
      'Proudly nominated among the Top 100 Teams representing Karnavati University.',
      'Jointly issued by Karnavati Innovation & Incubation Foundation (KIIF) and MoE Innovation Cell.',
    ],
    teamOrHighlight: 'Team RUPTUREX · Nominated among Top 100 Teams representing Karnavati University',
    fileUrl: '/assets/aistudio/Krisha_Patel_-_RuptureX_76f9848d.pdf',
    fileType: 'pdf',
    metadataExtra: 'Held at Karnavati University, Gandhinagar',
  },
  {
    id: 'solidworks-2024',
    title: 'SOLIDWORKS 2024 Essential Training',
    issuer: 'LinkedIn Learning',
    date: 'Nov 19, 2026 at 12:17PM UTC',
    durationOrHours: '10 hours',
    certificateId: '97b13be4e9628d50cc2d19f323b40fe64e00c2f332c8f5830594504cc11e9b40',
    signatory: 'Shea Hanson, Head of Learning Content Strategy',
    category: 'Engineering & CAD',
    skillsCovered: ['SOLIDWORKS'],
    linkedSkills: ['SOLIDWORKS 2024', 'Creativity', 'Problem-Solving'],
    courseworkHighlights: [
      '10 hours of structured CAD modeling training in SOLIDWORKS 2024.',
      'Parametric 2D sketching, 3D boss/cut extrusions, fillets, and reference geometry.',
      'Multi-part assembly mates and engineering drawing fundamentals directly applied to Quadcopter 3D Design.',
    ],
    fileUrl: '/assets/aistudio/KRISHA_PATEL_EDG_LINKEDIN_CERTIFICATE_9799f6a3.pdf',
    fileType: 'pdf',
  },
  {
    id: 'ai-thinking-machines',
    title: 'Artificial Intelligence Foundations: Thinking Machines',
    issuer: 'LinkedIn Learning',
    date: 'Nov 19, 2026 at 06:23AM UTC',
    durationOrHours: '1 hour 36 minutes',
    certificateId: '926f338ce2d50089f13eee527c6a1a46cd651b25386d5d4e0fc0dab9dae04ca5',
    signatory: 'Shea Hanson, Head of Learning Content Strategy',
    category: 'AI & Foundations',
    skillsCovered: ['Machine Learning', 'Artificial Intelligence (AI)', 'Artificial Intelligence Foundations'],
    linkedSkills: ['AI Foundations & ML', 'AI Tools'],
    courseworkHighlights: [
      'Core concepts distinguishing narrow AI, machine learning pipelines, and neural architectures.',
      'Data representation, supervised vs. unsupervised learning foundations.',
      'Applied context informing AI-integrated hardware concepts such as Iron-Conveyor Belt AI.',
    ],
    fileUrl: '/assets/aistudio/KRISHA_PATEL_FAI_LINKEDIN_CERTIFICATE_765c6b5d.pdf',
    fileType: 'pdf',
  },
  {
    id: 'jio-ai-foundation',
    title: 'AI Foundation Course',
    issuer: 'AI Classroom (Powered by JioPC · Designed by Jio Institute)',
    date: '2026',
    certificateId: 'ENMdW58JKX2WJ',
    signatory: 'Jio Institute · AI Classroom',
    category: 'AI & Foundations',
    skillsCovered: ['Artificial Intelligence Foundations', 'AI Tools'],
    linkedSkills: ['AI Foundations & ML', 'AI Tools'],
    courseworkHighlights: [
      'Curriculum designed by Jio Institute via AI Classroom (Powered by JioPC).',
      'Practical foundations in modern AI systems, prompting, and real-world tool integration.',
      'Verifiable QR-encoded credential issued to Krisha Patel.',
    ],
    fileUrl: '/assets/aistudio/KU202605162_KRISHA_PATEL_AI_FOUNDATION_COURSE_75290ce0.png',
    fileType: 'image',
  },
  {
    id: 'leadership-feedback',
    title: 'Leadership through Feedback',
    issuer: 'LinkedIn Learning · PMI® Registered Education Provider',
    program: 'PMI® Provider ID: #4101 · Activity #: 4101143NNS',
    date: 'Nov 15, 2026 at 06:18PM UTC',
    durationOrHours: '1.25 PDUs / Contact Hours',
    certificateId: '0dc349912dd3d4a336d039ee1b4644afd0ef49a8f41d99f7ea3ed925632e02a6',
    signatory: 'Shea Hanson, Head of Learning Content Strategy',
    category: 'Hackathon & Leadership',
    skillsCovered: ['Constructive Feedback', 'Leadership'],
    linkedSkills: ['Leadership & Constructive Feedback', 'Communication', 'Teamwork'],
    courseworkHighlights: [
      'PMI® Registered Education Provider accredited coursework (1.25 Contact Hours / PDUs).',
      'Structured delivery of actionable, constructive feedback in team environments.',
      'Applied across hackathon teams and brand coordination at Paaji Ki Kaksha.',
    ],
    fileUrl: '/assets/aistudio/KU202605162_KRISHA_PATEL_LINKEDIN_LEARNING_CERTIFICATE_1fc42e08.pdf',
    fileType: 'pdf',
  },
];
