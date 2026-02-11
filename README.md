# <p align="center">🚀 Sheets - Interactive Question Management System</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Zustand-443E38?style=for-the-badge&logo=react&logoColor=white" alt="Zustand" />
  <img src="https://img.shields.io/badge/Live_Demo-Vercel-black?style=for-the-badge&logo=vercel" alt="Live Demo" />
</p>

---

<p align="center">
  <strong>A modern, premium interactive web application for managing hierarchical questions.</strong><br />
  🚀 <strong>Live : <a href="https://sheets-blond.vercel.app/">APP</a></strong><br />
  Designed specifically for tracking progress through the <strong>ZEUS SDE Sheet</strong> and other curated DSA curriculum.
</p>

<p align="center">
  <img src="image.png" alt="Sheets Preview" width="90%" style="border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);" />
</p>

---

## ✨ Final Implementation Status

The application is **100% complete** and production-ready, featuring the full **ZEUS SDE Sheet** dataset.

- 💎 **Complete Dataset**: 27 topics and 191+ real questions integrated.
- ⚡ **Full CRUD**: Create, Read, Update, and Delete topics, sub-topics, and questions.
- 🎯 **Drag & Drop**: Intuitive reordering at all hierarchical levels using `@dnd-kit`.
- 🔍 **Pro Search & Filter**: Real-time search and multi-criteria filters (status, difficulty).
- 📈 **Progress Tracking**: Visual progress bars and Github-style activity graph.
- 💾 **Data Persistence**: Automatic saving to `localStorage` via Zustand.
- 📤 **Import/Export**: Backup and restore your study progress as JSON.
- 📱 **Mobile Optimized**: Fully responsive interface for all device sizes.
- **Improved Routing**: Human-readable URLs (e.g., `/u/zeus-a2z-dsa`) for easy sharing and navigation.

---

## 📊 Dataset: ZEUS SDE Sheet

The app comes pre-loaded with **27 Topics** covering essential DSA concepts:

| Topic           | Focus Area                       | Questions |
| :-------------- | :------------------------------- | :-------- |
| **Arrays**      | Basic to Advanced manipulations  | 24        |
| **Linked List** | SLL, DLL, and cycle detection    | 18        |
| **Greedy**      | Optimization problems            | 6         |
| **Recursion**   | Backtracking and basic recursion | 11        |
| **Trees**       | Binary Trees & BST               | 41        |
| **Graphs**      | Traversals and Shortest Paths    | 18        |
| **DP**          | Classical Dynamic Programming    | 16        |

> **Platform Coverage**: LeetCode, GeeksforGeeks, InterviewBit, Spoj, and Codestudio.

---

## 📋 Project Requirements

### ✅ Functional Requirements

- **Add Topic**: Create, edit, and delete main topics.
- **Add Sub-topic**: Create, edit, and delete sub-topics under existing topics.
- **Add Question**: Create, edit, and delete questions under specific topics and sub-topics.
- **Reorder Elements**: Change the order of topics, sub-topics, and questions via drag-and-drop.
- **Search & Filter**: Quickly find specific sheets and questions.

### ⚙️ Technical Requirements

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

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mayankkmauryaa/Sheets.git
   cd Sheets
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Environment Configuration**:
   Create a `.env` file in the root directory based on `.env.example`:
   ```env
   VITE_API_BASE_URL=https://your-api-url.com
   VITE_STORAGE_KEY=your-storage-key
   VITE_STARDUST_URL=your-asset-url
   VITE_LEATHER_URL=your-asset-url
   VITE_CURSOR_URL=your-asset-url
   ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🎯 Deployment Guide

### ☁️ Netlify (Recommended)

```bash
npm run build
npx netlify deploy --prod --dir=dist
```

### ⚡ Vercel

```bash
npm install -g vercel
npm run build
vercel --prod dist
```

---

## 🏗 Project Structure

The project follows a scalable, feature-based architecture:

```
src/
├── features/           # Feature-specific components
│   ├── dashboard/      # Dashboard and Sheet Selection views
│   │   ├── Dashboard.jsx
│   │   └── SheetSelection.jsx
│   └── sheet/          # Sheet view components
│       ├── TopicList.jsx
│       ├── QuestionList.jsx
│       ├── ActivityGraph.jsx
│       └── ...
├── components/         # Shared components
│   ├── layout/         # Layout wrappers (Header, etc.)
│   └── ui/             # Reusable UI elements
├── store/              # State management (Zustand)
│   ├── sheetStore.js   # Main store logic
│   └── sheets.js       # Sheet configuration and metadata
└── Router.jsx          # Routing configuration
```

---

## 🏆 Competitive Advantages

- 🎨 **Premium UI**: Clean, modern design with dark mode and smooth micro-animations.
- 🔒 **Privacy First**: All data is stored locally in your browser. No internet required.
- 🛠 **Fully Customizable**: Unlike static sheets, this app allows full content control.
- 🚀 **High Performance**: Optimized bundle (~300KB) for instant load times.
- 🔗 **Smart Routing**: Human-readable URLs and deep linking support.

---

## 📜 License & Support

This project is licensed under the **MIT License**.<br>
For support, contact **hpmayankmaurya@gmail.com** or open an issue in the repository.

---

## Submission Details

- **Repository**: [Sheets](https://github.com/mayankkmauryaa/Sheets)
- **Instructions**: See the [Getting Started](#getting-started) section.
- **Live Demo**: [https://sheets-blond.vercel.app/](https://sheets-blond.vercel.app/)

---

<p align="center">
  <i>Built with ❤️ for the DSA Community</i>
</p>
