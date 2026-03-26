// ─── THEMES ─────────────────────────────────────────────────────────────────
// ─── THEMES ─────────────────────────────────────────────────────────────────
export const THEMES = [
  {
    code: 'MECV', id: 1,
    name: 'Design, Build & Optimize',
    full: 'Design, Build & Optimize (MECV)',
    short: 'Design & Build',
    icon: '⚙️',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    color: '#f5576c',
    bg: 'rgba(245,87,108,0.12)',
    border: 'rgba(245,87,108,0.3)',
  },
  {
    code: 'RA', id: 2,
    name: 'Automation, Robotics & Control',
    full: 'Automation, Robotics & Control for Societal Impact (RA)',
    short: 'Automation',
    icon: '🤖',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    color: '#4facfe',
    bg: 'rgba(79,172,254,0.12)',
    border: 'rgba(79,172,254,0.3)',
  },
  {
    code: 'CSSDG', id: 3,
    name: 'Secure & Responsible Tech',
    full: 'Secure, Reliable & Responsible Technology for SDGs (CSSDG)',
    short: 'Security & SDG',
    icon: '🛡️',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    color: '#43e97b',
    bg: 'rgba(67,233,123,0.12)',
    border: 'rgba(67,233,123,0.3)',
  },
  {
    code: 'CSHealth', id: 4,
    name: 'Inclusive Health & Accessibility',
    full: 'Inclusive Solutions: Health, Safety & Accessibility (CSHealth)',
    short: 'Health & Access',
    icon: '❤️',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    color: '#fa709a',
    bg: 'rgba(250,112,154,0.12)',
    border: 'rgba(250,112,154,0.3)',
  },
  {
    code: 'AISense', id: 5,
    name: 'Connected Sensing & Intelligence',
    full: 'Connected Sensing & Intelligence (AISense)',
    short: 'IoT & AI/ML',
    icon: '🧠',
    gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    color: '#a18cd1',
    bg: 'rgba(161,140,209,0.12)',
    border: 'rgba(161,140,209,0.3)',
  },
  {
    code: 'ENSmart', id: 6,
    name: 'Sustainable Smart Systems',
    full: 'Sustainable Smart Systems (ENSmart)',
    short: 'Green Tech',
    icon: '🌱',
    gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    color: '#84fab0',
    bg: 'rgba(132,250,176,0.12)',
    border: 'rgba(132,250,176,0.3)',
  },
];

export const THEME_BY_FULL = {};
THEMES.forEach(t => { THEME_BY_FULL[t.full] = t; });
export const THEME_BY_CODE = {};
THEMES.forEach(t => { THEME_BY_CODE[t.code] = t; });

// ─── SCORING CRITERIA ────────────────────────────────────────────────────────
export const CRITERIA = [
  {
    key: 'c1', label: 'R1: Prototype Model Completeness',
    max: 40, weight: 40,
    desc: 'Functional completeness, engineering quality, working demonstration',
    icon: '🔧',
    bands: [
      { band: 'Excellent', range: '35–40', desc: 'Fully functional, production-ready, all functionalities demonstrated.' },
      { band: 'Good',      range: '20–34', desc: 'Partial implementation; major components work.' },
      { band: 'Poor',      range: '0–19',  desc: 'Design incomplete or cannot be demonstrated.' },
    ],
  },
  {
    key: 'c2', label: 'R2: Technical Demonstration & Presentation Skill',
    max: 10, weight: 10,
    desc: 'Clarity, flow, communication, and demonstration quality',
    icon: '📊',
    bands: [
      { band: 'Excellent', range: '9–10', desc: 'Highly professional, clear and persuasive presentation.' },
      { band: 'Good',      range: '5–8',  desc: 'Good flow, minor lapses in communication or demonstration.' },
      { band: 'Poor',      range: '0–4',  desc: 'Unstructured presentation or poor demonstration.' },
    ],
  },
  {
    key: 'c3', label: 'R3: Questions / Answers',
    max: 10, weight: 10,
    desc: 'Depth of understanding, accurate query handling, technical resonance',
    icon: '🎤',
    bands: [
      { band: 'Excellent', range: '9–10', desc: 'Deep technical grasp, all queries answered accurately.' },
      { band: 'Good',      range: '5–8',  desc: 'Good conceptual understanding, most queries answered.' },
      { band: 'Poor',      range: '0–4',  desc: 'Unable to answer basic questions about the project.' },
    ],
  },
  {
    key: 'c4', label: 'R4: Use of Modern Tools & Technology',
    max: 10, weight: 10,
    desc: 'Appropriate choice and integration of modern frameworks, software, or AI',
    icon: '💻',
    bands: [
      { band: 'Excellent', range: '9–10', desc: 'Innovative use of state-of-the-art tools or technologies.' },
      { band: 'Good',      range: '5–8',  desc: 'Appropriate tools used, though not necessarily innovative.' },
      { band: 'Poor',      range: '0–4',  desc: 'Legacy tools or minimal technology integration.' },
    ],
  },
  {
    key: 'c5', label: 'R5: Innovativeness & Creativity',
    max: 10, weight: 10,
    desc: 'Novelty of the solution, original approach to solving the problem',
    icon: '💡',
    bands: [
      { band: 'Excellent', range: '9–10', desc: 'Highly original solution with clear creative elements.' },
      { band: 'Good',      range: '5–8',  desc: 'Reasonably novel approach, builds effectively on existing ideas.' },
      { band: 'Poor',      range: '0–4',  desc: 'Little to no novelty or originality.' },
    ],
  },
  {
    key: 'c6', label: 'R6: Theme Relevance',
    max: 20, weight: 20,
    desc: 'Alignment with the theme\'s core goals and societal impact',
    icon: '🎯',
    bands: [
      { band: 'Excellent', range: '17–20', desc: 'Directly and strongly addresses the core themes.' },
      { band: 'Good',      range: '10–16', desc: 'Relevant to the theme, though impact could be better defined.' },
      { band: 'Poor',      range: '0–9',   desc: 'Weak alignment with the chosen theme.' },
    ],
  },
];

export const MAX_TOTAL = CRITERIA.reduce((s, c) => s + c.max, 0); // 100

// ─── JUDGES ─────────────────────────────────────────────────────────────
export const JUDGES_INITIAL = [
  // AISense (T5)
  { id:'j1', name:'Dr. Hema Karande', username:'judge01', defaultPassword:'ProTech@2026', secret:'PT26-S1-9X2K', theme_code:'AISense' },
  { id:'j2', name:'Dr. Sagar Pande', username:'judge02', defaultPassword:'ProTech@2026', secret:'PT26-S2-3K9M', theme_code:'AISense' },
  { id:'j3', name:'Dr. Sumanto Dutta', username:'judge03', defaultPassword:'ProTech@2026', secret:'PT26-S3-9M4P', theme_code:'AISense' },
  
  // ENSmart (T6)
  { id:'j4', name:'Dr. Aditya Jain', username:'judge04', defaultPassword:'ProTech@2026', secret:'PT26-S4-2P8Q', theme_code:'ENSmart' },
  { id:'j5', name:'Dr. Jayshree Pande', username:'judge05', defaultPassword:'ProTech@2026', secret:'PT26-S5-5R1W', theme_code:'ENSmart' },
  { id:'j6', name:'Prof. Pawan Upadhye', username:'judge06', defaultPassword:'ProTech@2026', secret:'PT26-S6-1Q6T', theme_code:'ENSmart' },
  
  // CSSDG / CSHealth (T3/T4)
  { id:'j7', name:'Dr. Jitendra Raipurohit', username:'judge07', defaultPassword:'ProTech@2026', secret:'PT26-S7-4W0E', theme_code:'CSSDG' },
  { id:'j8', name:'Dr. Sudhanshu Gonge', username:'judge08', defaultPassword:'ProTech@2026', secret:'PT26-S8-8E3R', theme_code:'CSSDG' },
  { id:'j9', name:'Dr. Nilima Zade', username:'judge09', defaultPassword:'ProTech@2026', secret:'PT26-S9-6T5Y', theme_code:'CSSDG' },
  { id:'j10', name:'Dr. Dipti Theng', username:'judge10', defaultPassword:'ProTech@2026', secret:'PT26-S10-0Y7U', theme_code:'CSSDG' },
  { id:'j11', name:'Dr. Saiprasad Potharaju', username:'judge11', defaultPassword:'ProTech@2026', secret:'PT26-S11-3U2I', theme_code:'CSSDG' },
  { id:'j12', name:'Dr. Ranjeet Bidwe', username:'judge12', defaultPassword:'ProTech@2026', secret:'PT26-S12-7I4O', theme_code:'CSHealth' },
  { id:'j13', name:'Prof. Usha Jogalekar', username:'judge13', defaultPassword:'ProTech@2026', secret:'PT26-S13-2O9P', theme_code:'CSHealth' },
  { id:'j14', name:'Prof. Amol Kamble', username:'judge14', defaultPassword:'ProTech@2026', secret:'PT26-S14-5L3A', theme_code:'CSHealth' },
  { id:'j15', name:'Prof. Arijit Dutta', username:'judge15', defaultPassword:'ProTech@2026', secret:'PT26-S15-9Z6S', theme_code:'CSHealth' },
  
  // RA (T2)
  { id:'j16', name:'Dr. Javed Sayyad', username:'judge16', defaultPassword:'ProTech@2026', secret:'PT26-S16-4C8D', theme_code:'RA' },
  { id:'j17', name:'Dr. Ramesh B. T.', username:'judge17', defaultPassword:'ProTech@2026', secret:'PT26-S17-6V1F', theme_code:'RA' },
  { id:'j18', name:'Dr. Mahesh Singh', username:'judge18', defaultPassword:'ProTech@2026', secret:'PT26-S18-1B2G', theme_code:'RA' },
  { id:'j19', name:'Dr. Santosh Bagewadi', username:'judge19', defaultPassword:'ProTech@2026', secret:'PT26-S19-0N3M', theme_code:'RA' },
  
  // MECV (T1)
  { id:'j20', name:'Dr. Sanjay Kulkarni', username:'judge20', defaultPassword:'ProTech@2026', secret:'PT26-S20-7X2A', theme_code:'MECV' },
  { id:'j21', name:'Dr. Anirban Sur', username:'judge21', defaultPassword:'ProTech@2026', secret:'PT26-S21-5B4M', theme_code:'MECV' },
  { id:'j22', name:'Dr. Vinayak Hiremath', username:'judge22', defaultPassword:'ProTech@2026', secret:'PT26-S22-2K3P', theme_code:'MECV' },
];

// Admin credentials
export const ADMIN_CREDS = {
  username: 'protech_admin',
  password: 'Admin@ProTech2026!',
  name: 'Event Coordinator',
  role: 'admin',
};

// Storage key - increment version to reset database (clears all scores, flags, and passwords)
export const STORAGE_KEY = 'protech2026_v4_final';
