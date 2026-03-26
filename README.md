# ProTech 2026 — Judge Evaluation Portal

National-Level Project Exhibition · Symbiosis Institute of Technology, Pune  
Event Date: March 28, 2026

---

## Quick Start (MongoDB + Local Dev)

```bash
# 1. Install dependencies
npm install

# 2. Create .env from template and update DB password
copy .env.example .env

# 3. Run frontend + API together
npm run dev

# 4. Build for production
npm run build

# 5. Deploy frontend as usual; keep API server running in Node environment
```

Set this in `.env`:

```env
MONGODB_URI=mongodb+srv://sai:<db_password>@protech.zmhc4w2.mongodb.net/protech2026?appName=PROTECH
PORT=5000
FRONTEND_ORIGIN=http://localhost:3000
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

Replace `<db_password>` with your actual Atlas database user password.

---

## Image Placeholders

Add your institution logo image at:
```
public/images/sit_logo.png
```
Then in `src/pages/LoginPage.jsx`, swap the `<div>SIT</div>` placeholder with:
```jsx
<img src="/images/sit_logo.png" alt="SIT" style={{width:'100%',height:'100%',objectFit:'contain'}} />
```
Similarly in `src/components/Topbar.jsx` replace the PT text badge with:
```jsx
<img src="/images/sit_logo.png" alt="SIT" style={{width:28,height:28,objectFit:'contain'}} />
```

---

## Login Credentials

### Admin (Coordinator)
| Field    | Value                    |
|----------|--------------------------|
| Username | `protech_admin`          |
| Password | `Admin@ProTech2026!`     |

Admin can: manage judges, view all scores, see leaderboard, export CSV, view credentials.

### Judges (18)
All judges start with default password `ProTech@2026`.  
**First login forces a mandatory password reset using their secret key.**

| # | Username  | Default Password | Secret Key            | Theme | Name                   |
|---|-----------|------------------|-----------------------|-------|------------------------|
| 1 | judge01   | ProTech@2026     | PT26-ALPHA-7X2K       | T1    | Dr. Priya Sharma       |
| 2 | judge02   | ProTech@2026     | PT26-BETA-3K9M        | T1    | Prof. Arjun Mehta      |
| 3 | judge03   | ProTech@2026     | PT26-GAMMA-9M4P       | T2    | Dr. Sneha Kulkarni     |
| 4 | judge04   | ProTech@2026     | PT26-DELTA-2P8Q       | T2    | Mr. Rohit Joshi        |
| 5 | judge05   | ProTech@2026     | PT26-EPSLN-5R1W       | T3    | Dr. Kavitha Nair       |
| 6 | judge06   | ProTech@2026     | PT26-ZETA-1Q6T        | T3    | Ms. Deepika Singh      |
| 7 | judge07   | ProTech@2026     | PT26-ETA-4W0E         | T4    | Dr. Anil Patil         |
| 8 | judge08   | ProTech@2026     | PT26-THETA-8E3R       | T4    | Dr. Meena Iyer         |
| 9 | judge09   | ProTech@2026     | PT26-IOTA-6T5Y        | T5    | Prof. Suresh Tiwari    |
|10 | judge10   | ProTech@2026     | PT26-KAPPA-0Y7U       | T5    | Mr. Vinod Rao          |
|11 | judge11   | ProTech@2026     | PT26-LMBDA-3U2I       | T6    | Dr. Pradeep Jadhav     |
|12 | judge12   | ProTech@2026     | PT26-MU-7I4O          | T6    | Ms. Ritika Menon       |
|13 | judge13   | ProTech@2026     | PT26-NU-2O9P          | T1    | Dr. Harish Bhandari    |
|14 | judge14   | ProTech@2026     | PT26-XI-5L3A          | T2    | Prof. Anita Deshmukh   |
|15 | judge15   | ProTech@2026     | PT26-OMCRN-9Z6S       | T3    | Dr. Kiran Wagh         |
|16 | judge16   | ProTech@2026     | PT26-PI-4C8D          | T4    | Mr. Santosh Gupta      |
|17 | judge17   | ProTech@2026     | PT26-RHO-6V1F         | T5    | Dr. Lalitha Rao        |
|18 | judge18   | ProTech@2026     | PT26-SIGMA-1B2G       | T6    | Prof. Sameer Khan      |

---

## Features

### For Judges
# ProTech 2026 Judge Portal (Updated)

This is the fully localized and database-driven version of the ProTech 2026 Judge Portal.

## key Features
-   **Database Driven**: Everything (Judges, Teams, Scores) is stored in a local MongoDB (`protech2026`).
-   **New Themes & Judges**: Updated to match the latest event requirements (22 Judges, 6 Themes).
-   **New Rubrics (R1-R6)**: Evaluation criteria updated to a total of 100 marks.
-   **Team Manager**: Admin can now Add/Edit/Delete teams directly through the "Teams" tab in the Admin Panel.

## Local Setup
1.  **MongoDB**: Ensure MongoDB is running on `127.0.0.1:27017`.
2.  **Environment**: Update `.env` with your local IP and MongoDB URI.
3.  **Install & Run**:
    ```bash
    npm install
    npm run dev
    ```
4.  **Seed Data**: Reset or populate the database anytime by running:
    ```bash
    node seed.js
    ```

## Authentication
-   **Admin**: `protech_admin` / `Admin@ProTech2026!`
-   **Judges**: `judge01` - `judge22` / Default Pwd: `ProTech@2026` / (Use Secret Key for first login).

## Deployment (Planned)
-   **Frontend**: Vercel
-   **Backend**: Render
-   **DB**: MongoDB Atlas

---

## Tech Stack

- **React 18** (Create React App)
- **Express + Mongoose** API server
- **MongoDB Atlas** for persistent data storage
- **CSS Variables** + custom glassmorphism design system
- **localStorage** as offline fallback cache
- **263 real participants** from the ProTech 2026 registration CSV

---

## Scoring Criteria (100 marks)

| Criterion                     | Marks |
|-------------------------------|-------|
| Project Report                | 10    |
| Prototype / Model Development | 20    |
| PowerPoint Presentation       | 15    |
| Viva Voce                     | 15    |
| Modern Tool / Technology      | 10    |
| Innovativeness                | 10    |
| Individual Contribution       | 10    |
| Group Activity & Team Dynamics| 10    |
| **TOTAL**                     | **100** |

### PPT Sub-criteria (15 marks)
- Body Language: 5
- Communication Skills: 5
- Content Quality: 5

---

## Competition Themes

| Code | Theme |
|------|-------|
| T1 | Design, Build & Optimize |
| T2 | Automation, Robotics & Control |
| T3 | Secure, Reliable & Responsible Tech |
| T4 | Inclusive Health, Safety & Accessibility |
| T5 | Connected Sensing & Intelligence (IoT/AI/ML) |
| T6 | Sustainable Smart Systems |

---

## Data Note

All 263 registered participants from the ProTech 2026 Google Form responses are embedded in `src/data/participants_raw.json`. When you receive the final/updated registration sheet, run:

```bash
# Update participants data
python3 scripts/parse_csv.py path/to/new_responses.csv
```

This will regenerate `participants_raw.json`.

---

*ProTech 2026 · SIT Pune · March 2026*
