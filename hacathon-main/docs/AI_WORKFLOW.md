# GapFinder AI - AI Workflow Documentation

## Overview

This document distinguishes between **Retrieval** and **Generation** in GapFinder AI, and explains how AI is used throughout the system.

## Retrieval vs Generation

| Aspect | Retrieval | Generation |
|---|---|---|
| Purpose | Find relevant content from user's materials | Create new content using retrieved context |
| Source | User's uploaded documents only | LLM (Gemini) guided by retrieved context |
| Output | Chunks of text with metadata/citations | Questions, answers, explanations, plans |
| Grounding | Direct from source | Must be grounded in retrieved context |
| Hallucination Risk | None (it's actual content) | Mitigated by strict prompting and context limits |

## AI Workflows

### 1. Topic Mapping
**Type:** Generation (guided by retrieval)

1. **Retrieve** all chunks from user's documents
2. **Generate** hierarchical topic structure
3. **Ground** topics in actual document content
4. **Cite** source documents/sections

### 2. Diagnostic Quiz Generation
**Type:** Generation with retrieval

1. **Retrieve** relevant chunks for selected topics
2. **Generate** MCQs with options, correct answer, explanation
3. **Ensure** questions come from retrieved content
4. **Validate** JSON schema with Zod
5. **Include** source citations for each question
6. **Reject** if insufficient content

### 3. Answer Evaluation
**Type:** Generation (evaluation)

1. **Retrieve** context for the question
2. **Compare** user answer with correct answer
3. **Explain** why correct/incorrect using source
4. **Update** mastery scores
5. **Identify** misconceptions

### 4. Gap Analysis
**Type:** Calculation + Generation

1. **Calculate** mastery from quiz attempts (deterministic)
2. **Classify** Weak/Medium/Strong by thresholds
3. **Generate** recommendations using AI
4. **Identify** misconceptions from wrong answers
5. **Suggest** specific sections to revisit

### 5. Revision Plan Generation
**Type:** Generation with rules

1. **Analyze** gap report data
2. **Apply** prioritization rules (weak first, time constraints)
3. **Generate** daily tasks with AI assistance
4. **Ensure** tasks reference source materials
5. **Update** based on new attempts

### 6. Explain-a-Topic
**Type:** RAG Generation

1. **Retrieve** chunks relevant to question
2. **Generate** answer from context only
3. **Add** citations
4. **Suggest** follow-ups based on content
5. **Say** insufficient if no relevant context

## AI Models Used

- **Generation**: Google Gemini 1.5 Flash/Pro
- **Embeddings**: Google Gemini embedding-001
- **Evaluation**: Same as generation model

## Safety Measures

- **Context-only prompting**: Strict instructions to use only retrieved content
- **Citation requirement**: Must cite sources
- **Insufficient evidence handling**: Explicit messages
- **JSON validation**: Zod schemas for structured outputs
- **User isolation**: Never mix user data
- **Demo mode labeling**: Clearly distinguish real vs sample data
- **No fabrication**: Never invent page numbers or quotes

## Prompting Strategy

### For Question Generation
```
You are generating quiz questions from educational material.
ONLY use the provided source chunks.
Generate {count} multiple-choice questions.
Each question must have: question, 4 options, correct answer, explanation, source citation.
Explanations must be grounded in the source.
Do not use general knowledge.
```

### For Answering
```
You are a helpful tutor answering from course material.
Use ONLY the following context: {chunks}
If the answer is not in the context, say: "The uploaded material does not provide sufficient information to answer this question."
Cite specific sections for claims.
Do not add information beyond what is in the context.
```
