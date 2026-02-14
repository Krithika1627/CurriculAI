# 🚀 CurriculAI

> AI-powered course generator built with Next.js  
> Transform any topic into a structured, chapter-based learning experience.

---

## 🌟 Overview

CurriculAI is an AI-powered learning platform that dynamically generates structured courses across multiple domains such as Programming, Health, Creative Arts, Career Development, and Academics.

The platform creates:

- 📚 Organized course outlines  
- 📝 AI-generated explanations  
- 💻 Code snippets (for technical courses)  
- 🎥 Embedded video support  
- 🎯 Structured learning progression  

Built with modern SaaS-style architecture and a clean, responsive UI.

---

## ✨ Features

- 🔐 Authentication with Clerk  
- 🧠 AI-powered course generation  
- 📂 Category-based course builder  
- 🧭 Multi-step course creation wizard  
- 📖 Dynamic chapter rendering  
- 🎥 YouTube video integration  
- 🎨 Modern UI with Tailwind CSS  
- 🚀 Upgrade-ready SaaS structure  
- 📱 Fully responsive design  

---

## 🛠 Tech Stack

### Frontend
- Next.js (App Router)  
- React  
- Tailwind CSS  
- React Icons / Lucide  

### Backend
- Next.js API Routes  
- AI API integration  

### Authentication
- Clerk  

### State Management
- React Context API  

---

## 🎯 How It Works

1. Select a course category.  
2. Enter a topic and preferences.  
3. AI generates a structured course.  
4. Chapters dynamically render with explanations and video integration.  
5. Users navigate through a clean dashboard interface.  

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/Krithika1627/CurriculAI.git
cd CurriculAI
```

### Install dependencies

```bash
npm install
```

### Add environment variables

Create a `.env.local` file in the root directory and add:

```
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL=your_database_connection_string
YOUTUBE_API_KEY=your_youtube_api_key
```

> ⚠️ Do not commit real API keys to GitHub.

### Run the development server

```bash
npm run dev
```

Open your browser and visit:

```
http://localhost:3000
```

---

## 🔮 Future Improvements

- 💳 Stripe integration for Pro plans  
- 📄 PDF export for generated courses  
- 📊 Progress tracking system  
- 🤝 Course sharing and collaboration  
- 🧠 Enhanced AI personalization  
- 🌗 Light/Dark theme support  

---

## 🌍 Live Demo

Deployment coming soon.

---

## 👩‍💻 Author

**Krithika V**
