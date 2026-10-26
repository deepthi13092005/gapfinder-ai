# GapFinder AI - Hackathon Presentation Outline

## Slide 1: Problem Statement
- **Problem**: Students struggle to identify specific knowledge gaps from vast syllabus
- **Pain Point**: Generic practice doesn't target weak areas effectively
- **Solution**: AI-powered personalized learning diagnosis using their own materials

## Slide 2: Solution Overview
- **GapFinder AI**: RAG-powered platform that diagnoses learning gaps
- **Key Innovation**: Questions grounded in student's uploaded materials with citations
- **Focus**: Topic-level diagnosis, not just chatbot

## Slide 3: Features Demo
- Material Upload (PDF/TXT)
- Topic Mapping
- AI Diagnostic Quiz (grounded)
- Gap Analysis (Weak/Medium/Strong)
- Personalized Revision Plan
- Explain-a-Topic with Citations
- Progress Tracking

## Slide 4: RAG Pipeline (Technical Highlight)
- **Ingestion**: Extract → Chunk → Embed → Store in pgvector
- **Retrieval**: User query → Embedding → Vector search (user-isolated)
- **Generation**: Context-only answering with citations
- **Grounding**: Never uses general knowledge as primary source

## Slide 5: Gap Analysis Logic
- **Mastery Calculation**: From actual quiz performance
- **Classification**: <50% Weak, 50-79% Medium, ≥80% Strong
- **Insights**: Misconceptions, evidence, recommendations
- **Prioritization**: Weak topics first in revision plan

## Slide 6: Demo
- Show landing page
- Upload/view materials
- Take diagnostic quiz
- View gap report with citations
- Generate revision plan
- Use Explain feature

## Slide 7: Tech Stack & Architecture
- Next.js 16, TypeScript, Tailwind CSS
- Google Gemini API
- Supabase (Auth + PostgreSQL + pgvector)
- RAG pipeline with vector search
- Zod validation

## Slide 8: Impact & Future Enhancements
- **Impact**: Targeted learning saves time, improves retention
- **Future**: Spaced repetition algorithm, mobile app, collaborative features, exam-specific modes
- **Scalable**: Can work for any subject with uploaded materials

## Slide 9: Q&A
- Emphasize demo mode works without credentials
- Highlight citation-backed answers
- Show user data isolation
- Mention production build ready
