# GapFinder AI

**AI-Powered Personalized Learning Diagnosis Platform**

GapFinder AI helps students identify knowledge gaps, test understanding using questions grounded in their own study material, and generates personalized revision plans. Built for hackathons with a focus on RAG-powered, citation-backed learning diagnosis.

## Features

- 📚 **Material Upload**: Upload PDFs, TXT files, or paste notes/syllabus
- 🗺️ **Topic Mapping**: AI extracts hierarchical topics from your materials
- 🧠 **RAG Pipeline**: Questions and answers grounded in your uploaded content with citations
- 📝 **Diagnostic Quiz**: AI-generated MCQs tailored to your materials
- 📊 **Gap Analysis**: Topics classified as Weak/Medium/Strong with actionable insights
- 📅 **Revision Plan**: Personalized, prioritized study schedule
- 💬 **Explain a Topic**: Chat assistant that answers from your materials
- 📈 **Progress Tracking**: Monitor improvement over time
- 🔒 **Secure & Private**: User-isolated data with row-level security
- 🎯 **Demo Mode**: Works without API keys for instant testing

## Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini API
- **Database**: PostgreSQL with pgvector (via Supabase)
- **Auth**: Supabase Auth
- **Validation**: Zod
- **File Processing**: pdf-parse

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- (Optional) Gemini API key, Supabase project for full functionality

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd hacathon

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Mode

The app runs in **Demo Mode** by default if no API keys are configured. This provides:
- Sample Biology syllabus and study materials
- Pre-loaded topics and diagnostic data
- Working quiz, gap report, and revision plan
- All UI features functional without external services

**Demo Account** (when auth is configured): `demo@gapfinder.ai` / `demo123456`

## Environment Variables

See `.env.example` for all configuration options. The app gracefully falls back to demo mode if credentials are missing.

## Project Structure

```
├── src/
│   ├── app/              # Next.js App Router pages & API routes
│   ├── components/       # React components (UI, layout, charts)
│   ├── lib/              # Utilities, AI, RAG, DB logic
│   └── ...
├── data/                 # Sample materials
├── migrations/           # Database schema
├── docs/                 # Documentation
└── public/samples/       # Sample files for demo
```

## Build for Production

```bash
npm run build
npm start
```

## Documentation

- [Architecture Overview](./docs/ARCHITECTURE.md)
- [RAG Pipeline](./docs/RAG_PIPELINE.md)
- [AI Workflow](./docs/AI_WORKFLOW.md)
- [Database Schema](./migrations/schema.sql)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Demo Instructions](./docs/DEMO.md)

## License

MIT
