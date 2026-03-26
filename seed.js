const mongoose = require('mongoose');
const AppState = require('./server/models/AppState');
require('dotenv').config();

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/protech2026';

// Generic Participants
const GENERIC_PARTICIPANTS = [
  { id: 1, group_num: "G1", project_title: "Generic Project 1", theme_code: "MECV", theme_full: "Design, Build & Optimize (MECV)", leader: "Team Leader 1", institute: "SIT Pune", category: "Engineering" },
  { id: 2, group_num: "G2", project_title: "Generic Project 2", theme_code: "RA", theme_full: "Automation, Robotics & Control for Societal Impact (RA)", leader: "Team Leader 2", institute: "SIT Pune", category: "Engineering" },
  { id: 3, group_num: "G3", project_title: "Generic Project 3", theme_code: "CSSDG", theme_full: "Secure, Reliable & Responsible Technology for SDGs (CSSDG)", leader: "Team Leader 3", institute: "SIT Pune", category: "Engineering" },
  { id: 4, group_num: "G4", project_title: "Generic Project 4", theme_code: "CSHealth", theme_full: "Inclusive Solutions: Health, Safety & Accessibility (CSHealth)", leader: "Team Leader 4", institute: "SIT Pune", category: "Engineering" }
];

// New Judge List from Image
const NEW_JUDGES = [
  // AISense
  { id:'j1', name:'Dr. Hema Karande', username:'judge01', defaultPassword:'ProTech@2026', secret:'PT26-S1-9X2K', theme_code:'AISense' },
  { id:'j2', name:'Dr. Sagar Pande', username:'judge02', defaultPassword:'ProTech@2026', secret:'PT26-S2-3K9M', theme_code:'AISense' },
  { id:'j3', name:'Dr. Sumanto Dutta', username:'judge03', defaultPassword:'ProTech@2026', secret:'PT26-S3-9M4P', theme_code:'AISense' },
  // ENSmart
  { id:'j4', name:'Dr. Aditya Jain', username:'judge04', defaultPassword:'ProTech@2026', secret:'PT26-S4-2P8Q', theme_code:'ENSmart' },
  { id:'j5', name:'Dr. Jayshree Pande', username:'judge05', defaultPassword:'ProTech@2026', secret:'PT26-S5-5R1W', theme_code:'ENSmart' },
  { id:'j6', name:'Prof. Pawan Upadhye', username:'judge06', defaultPassword:'ProTech@2026', secret:'PT26-S6-1Q6T', theme_code:'ENSmart' },
  // CSSDG / CSHealth
  { id:'j7', name:'Dr. Jitendra Raipurohit', username:'judge07', defaultPassword:'ProTech@2026', secret:'PT26-S7-4W0E', theme_code:'CSSDG' },
  { id:'j8', name:'Dr. Sudhanshu Gonge', username:'judge08', defaultPassword:'ProTech@2026', secret:'PT26-S8-8E3R', theme_code:'CSSDG' },
  { id:'j9', name:'Dr. Nilima Zade', username:'judge09', defaultPassword:'ProTech@2026', secret:'PT26-S9-6T5Y', theme_code:'CSSDG' },
  { id:'j10', name:'Dr. Dipti Theng', username:'judge10', defaultPassword:'ProTech@2026', secret:'PT26-S10-0Y7U', theme_code:'CSSDG' },
  { id:'j11', name:'Dr. Saiprasad Potharaju', username:'judge11', defaultPassword:'ProTech@2026', secret:'PT26-S11-3U2I', theme_code:'CSSDG' },
  { id:'j12', name:'Dr. Ranjeet Bidwe', username:'judge12', defaultPassword:'ProTech@2026', secret:'PT26-S12-7I4O', theme_code:'CSHealth' },
  { id:'j13', name:'Prof. Usha Jogalekar', username:'judge13', defaultPassword:'ProTech@2026', secret:'PT26-S13-2O9P', theme_code:'CSHealth' },
  { id:'j14', name:'Prof. Amol Kamble', username:'judge14', defaultPassword:'ProTech@2026', secret:'PT26-S14-5L3A', theme_code:'CSHealth' },
  { id:'j15', name:'Prof. Arijit Dutta', username:'judge15', defaultPassword:'ProTech@2026', secret:'PT26-S15-9Z6S', theme_code:'CSHealth' },
  // RA
  { id:'j16', name:'Dr. Javed Sayyad', username:'judge16', defaultPassword:'ProTech@2026', secret:'PT26-S16-4C8D', theme_code:'RA' },
  { id:'j17', name:'Dr. Ramesh B. T.', username:'judge17', defaultPassword:'ProTech@2026', secret:'PT26-S17-6V1F', theme_code:'RA' },
  { id:'j18', name:'Dr. Mahesh Singh', username:'judge18', defaultPassword:'ProTech@2026', secret:'PT26-S18-1B2G', theme_code:'RA' },
  { id:'j19', name:'Dr. Santosh Bagewadi', username:'judge19', defaultPassword:'ProTech@2026', secret:'PT26-S19-0N3M', theme_code:'RA' },
  // MECV
  { id:'j20', name:'Dr. Sanjay Kulkarni', username:'judge20', defaultPassword:'ProTech@2026', secret:'PT26-S20-7X2A', theme_code:'MECV' },
  { id:'j21', name:'Dr. Anirban Sur', username:'judge21', defaultPassword:'ProTech@2026', secret:'PT26-S21-5B4M', theme_code:'MECV' },
  { id:'j22', name:'Dr. Vinayak Hiremath', username:'judge22', defaultPassword:'ProTech@2026', secret:'PT26-S22-2K3P', theme_code:'MECV' },
];

async function seed() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to local MongoDB');

    const initialData = {
      scores: {},
      flags: {},
      passwords: {},
      judges: NEW_JUDGES,
      participants: GENERIC_PARTICIPANTS
    };

    await AppState.findByIdAndUpdate(
      'main',
      { $set: { data: initialData } },
      { upsert: true, new: true }
    );

    console.log('Database re-seeded with latest judges and generic participants successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err.message);
    process.exit(1);
  }
}

seed();
