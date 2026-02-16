# <p align="center">Sheets - Interactive Question Management System</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite_6-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Zustand_5-443E38?style=for-the-badge&logo=react&logoColor=white" alt="Zustand" />
  <img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/Live_Demo-Vercel-black?style=for-the-badge&logo=vercel" alt="Live Demo" />
</p>

---

<p align="center">
  <strong>A modern, premium interactive web application for managing hierarchical questions.</strong><br />
  <strong>Live : <a href="https://sheets-blond.vercel.app/">APP</a></strong><br />
  Designed specifically for tracking progress through the <strong>ZEUS SDE Sheet</strong> and other curated DSA curriculum.
</p>

<p align="center">
  <img src="image.png" alt="Sheets Preview" width="90%" style="border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);" />
</p>

---

## Table of Contents
1.  [The Vision](#the-vision)
2.  [Core Features](#core-features)
3.  [Technical Arsenal](#technical-arsenal)
4.  [The Manuscript Architecture](#the-manuscript-architecture)
5.  [The Sacred Data Structure](#the-sacred-data-structure)
6.  [Logic & Mechanics](#logic--mechanics)
7.  [Dataset: ZEUS SDE Sheet](#dataset-zeus-sde-sheet)
8.  [Getting Started](#getting-started)
9.  [Deployment Guide](#deployment-guide)
10. [Competitive Advantages](#competitive-advantages)

---

## The Vision

**Sheets** is not just a tool; it's a sanctuary for the modern developer. Inspired by the ancient power of Zeus, this platform transforms the mundane task of DSA tracking into a legendary journey. Every question solved is a victory, every streak maintained is a flame that never dies. It bridges the gap between static spreadsheets and dynamic, interactive learning environments.

---

## Core Features

### Immersive Landing Page
-   **3D Aurora Hero**: A mesmerizing starfield and aurora effect powered by `Three.js` and `React Three Fiber`.
-   **Parallax Storytelling**: Interactive sections that reveal the "Artifacts of Power" (components) through smooth scroll animations.
-   **The Patronus Charm**: A unique "Try a Random Question" feature that use a specialized algorithm to challenge the user.

### The Great Hall (Dashboard)
-   **Multi-Sheet Selection**: Browse and select from various curated DSA sheets (Striver’s A2Z, Zeus SDE, Love Babbar, etc.).
-   **Real-time Metadata Sync**: Automatically fetches and updates question counts and progress metadata for all available sheets.
-   **Stateful Navigation**: Smooth transitions between the global dashboard and individual practice sheets.

### The Practice Sanctuary (Sheet View)
-   **Hierarchical Management**: Full CRUD operations for Topics, Sub-Topics, and Questions.
-   **Drag & Drop Mastery**: Intuitively reorder any element at any level using `@dnd-kit`.
-   **Pro Filtering & Search**:
    -   Instant search across titles and links.
    -   Difficulty filters (Easy, Medium, Hard).
    -   Status filters (Pending, Completed, Revision).
-   **Note Taking & Favoriting**: Attach sacred scrolls (notes) to questions and star the most challenging ones for later.

### Gamification & Progress
-   **GitHub-Style Activity Graph**: Visualize your consistency over time with a dynamic heatmap.
-   **Flame Streak System**: Tracks daily activity to maintain your "Learning Flame."
-   **Visual Progress Bars**: Real-time feedback on completion percentages at the topic and sub-topic levels.

### Data Resilience
-   **LocalStorage Persistence**: All progress is etched into the browser's local storage instantly via Zustand middleware.
-   **Import/Export Magic**: Backup your entire progress or migrate it across devices using JSON files.

---

## Technical Arsenal

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | **React 19** | Core UI library for high-performance rendering. |
| **Bundler** | **Vite 6** | Ultra-fast development and build environment. |
| **Styling** | **Tailwind CSS 4** | Utility-first styling with the latest v4 engine. |
| **State** | **Zustand 5** | Lightweight, transactional state management with persistence. |
| **3D Graphics** | **Three.js / R3F** | Powering the magical aurora and starfield backgrounds. |
| **Animation** | **Framer Motion** | Fluid transitions and layout animations. |
| **Interactivity**| **@dnd-kit** | Robust drag-and-drop orchestration. |
| **Icons** | **Lucide / React Icons**| Crisp, consistent iconography throughout the app. |
| **Routing** | **React Router 7** | Human-readable URLs and deep-linking support. |

---

## The Manuscript Architecture

The codebase is organized into modular layers for maximum scalability:

-   **`src/features/`**: Contains the core logic for the three main views.
    -   `landing/`: The 3D entry portal and parallax content.
    -   `dashboard/`: The sheet selection hub.
    -   `sheet/`: The complex logic for the hierarchical practice area.
-   **`src/store/`**: The brain of the application.
    -   `sheetStore.js`: A massive Zustand store managing everything from CRUD to streaks.
    -   `sheets.js`: Configuration for all available DSA sheets.
-   **`src/layouts/`**: Global UI wrappers like the `Header`, `MagicalBackground`, and `AboutUsModal`.
-   **`src/components/ui/`**: A centralized library of reusable, theme-consistent UI tokens (Badges, Buttons, Cards, Progress bars).

---

## The Sacred Data Structure

The system uses a 3-tier hierarchical JSON structure to manage data consistency:

```javascript
{
  "id": "topic-uuid",
  "title": "Arrays",
  "subTopics": [
    {
      "id": "subtopic-uuid",
      "title": "Basic Sorting",
      "questions": [
        {
          "id": "q-uuid",
          "title": "Bubble Sort",
          "link": "https://leetcode.com/...",
          "status": "completed",
          "difficulty": "Easy",
          "note": "Don't forget the swapped flag!",
          "isStarred": true
        }
      ]
    }
  ]
}
```

---

## Logic & Mechanics

### Remote Synchronization
The `fetchRemoteSheet` action in `sheetStore.js` performs a delicate dance between local and remote data. It fetches the latest question sets while carefully preserving the user's localized progress (status, notes, stars).

### The Streak Algorithm
The `calculateStreak` function parses the `activity` log in the store. It looks for consecutive days of activity, accounting for the current date to determine if a streak is active or has been extinguished.

### URL Source of Truth
Using React Router, the app treats the URL (e.g., `/u/strivers-a2z-dsa`) as the primary state. Changing the URL automatically triggers the store to switch context and fetch the corresponding sheet data.

---

## Dataset: ZEUS SDE Sheet

Pre-loaded with **27 Topics** covering essential DSA concepts:

| Topic | Focus Area | Questions |
| :--- | :--- | :--- |
| **Arrays** | Basic to Advanced manipulations | 24 |
| **Linked List** | SLL, DLL, and cycle detection | 18 |
| **Greedy** | Optimization problems | 6 |
| **Recursion** | Backtracking and basic recursion | 11 |
| **Trees** | Binary Trees & BST | 41 |
| **Graphs** | Traversals and Shortest Paths | 18 |
| **DP** | Classical Dynamic Programming | 16 |

> **Platform Coverage**: LeetCode, GeeksforGeeks, InterviewBit, Spoj, and Codestudio.

---

## Project Requirements

### Functional Requirements

- **Add Topic**: Create, edit, and delete main topics.
- **Add Sub-topic**: Create, edit, and delete sub-topics under existing topics.
- **Add Question**: Create, edit, and delete questions under specific topics and sub-topics.
- **Reorder Elements**: Change the order of topics, sub-topics, and questions via drag-and-drop.
- **Search & Filter**: Quickly find specific sheets and questions.

### Technical Requirements

- **Framework**: Built with **React 18.3+** for high performance.
- **Styling**: Modern dark-theme UI using **Tailwind CSS v4.1**.
- **State**: **Zustand** for lightweight, transactional state management.
- **Reference**: UI design and functionality inspired by the **Codolio** platform.

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
1.  **Clone the repository**:
    ```bash
    git clone https://github.com/mayankkmauryaa/Sheets.git
    cd Sheets
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Start the development server**:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Deployment Guide

### Netlify (Recommended)
```bash
npm run build
npx netlify deploy --prod --dir=dist
```

### Vercel
```bash
npm install -g vercel
npm run build
vercel --prod dist
```

---

## Project Structure

The project follows a scalable, feature-based architecture:

```
src/
├── features/           # Feature-specific components
│   ├── landing/        # Zeus Magic Landing Page
│   │   ├── LandingPage.jsx
│   │   ├── TextParallaxContent.jsx
│   │   └── ...
│   ├── dashboard/      # Dashboard and Sheet Selection views
│   └── sheet/          # Sheet view components
├── layouts/            # Global layout components (Header, Background, Modals)
├── components/         # Shared components
│   └── ui/             # Reusable UI library (Badge, Button, Card, etc.)
├── store/              # State management (Zustand)
└── Router.jsx          # Routing configuration
```

## The Manuscript Architecture

The system is architected for maximum speed and readability, mirroring the efficiency of lightning.

### 1. Features Layer (`src/features`)
- **Landing**: The entry portal for seekers.
- **Dashboard**: The central hub for all manuscripts.
- **Sheet**: The sacred practice area where individual problems are faced.

### 2. Global Layouts (`src/layouts`)
- **Magical Background**: Persistent 3D environments that travel with you across pages.
- **Header**: Optimized navigation and live statistics tracking.

### 3. State Core (`src/store`)
- A unified source of truth powered by **Zustand**, managing hierarchical data structures with surgical precision.

---

## Documentation & Sacred Lore

The **"View Documentation"** button in the Artifacts of Power section serves as your portal to the deeper understanding of this system. It encompasses:

### 1. The Core Mechanics
- **Hierarchical Persistence**: Data flows through a 3-tier structure (Sheet -> Topic -> Sub-topic -> Question), ensuring that complex DSA patterns are broken down into manageable glyphs.
- **State Synchronization**: Uses **Zustand** with a middleware layer to ensure your progress is etched into the browser's local storage instantly.

### 2. UI Artifacts
- **Manuscript Cards**: Designed with glassmorphism to feel like floating archives.
- **Aurora Hero**: A 3D starfield crafted with `three.js` to represent the infinite space of knowledge.
- **The Patronus Charm**: Uses a randomized selection algorithm to challenge you with a problem when you need guidance most.

### 3. Sacred Commands
- `npm run dev`: Ignites the development spell.
- `npm run build`: Crystallizes the manuscript for production.

---

## Competitive Advantages

-   **Premium UI**: Dark mode with aurora backgrounds and glassmorphism.
-   **Privacy First**: All data is stored locally in your browser.
-   **Fully Customizable**: Unlike static PDF sheets, you can add your own questions.
-   **High Performance**: Optimized bundle (~300KB) and React 19 concurrent features.
-   **Smart Routing**: Human-readable URLs for easy bookmarking.

---

## License & Support

This project is licensed under the **MIT License**.<br>
For support, contact **hpmayankmaurya@gmail.com** or open an issue in the repository.

---

## Submission Details

- **Repository**: [Sheets](https://github.com/mayankkmauryaa/Sheets)
- **Instructions**: See the [Getting Started](#getting-started) section.
- **Live Demo**: [https://sheets-blond.vercel.app/](https://sheets-zeus.vercel.app/)

---

<p align="center">
  <i>Built with for the DSA Community</i>
</p>
