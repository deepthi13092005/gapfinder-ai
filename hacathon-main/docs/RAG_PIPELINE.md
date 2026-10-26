# GapFinder AI - RAG Pipeline Documentation

## Overview

GapFinder AI implements a Retrieval-Augmented Generation (RAG) pipeline to ensure all answers and questions are grounded in the student's uploaded materials with proper citations.

## Pipeline Stages

### 1. Ingestion

```typescript
// Pseudocode flow
1. Upload file (PDF/TXT) or paste text
2. Extract text (pdf-parse for PDFs)
3. Normalize and clean text
4. Split into overlapping chunks (e.g., 500-1000 tokens, 10-20% overlap)
5. Generate embeddings using Gemini embedding model
6. Store chunks with metadata in document_chunks table
7. Store embedding in pgvector column
```

**Chunk Metadata:**
- `document_id`: Source document
- `user_id`: Owner
- `chunk_text`: Content
- `chunk_index`: Order
- `page_number`: Page if available
- `section_title`: Section if identified
- `metadata`: Additional info

### 2. Retrieval

```typescript
// Pseudocode flow
1. User query/topic/question
2. Generate embedding for query
3. Perform vector similarity search in pgvector
4. Filter by user_id (CRITICAL: only user's documents)
5. Rank by cosine similarity
6. Return top-k chunks (e.g., k=5-10)
7. Include citation metadata
```

**Security:** All retrieval is filtered by `user_id = auth.uid()` to prevent cross-user data leakage.

### 3. Grounded Generation

```typescript
// Pseudocode flow
1. Take retrieved chunks as context
2. Craft prompt with strict instructions
3. Ask LLM to answer ONLY from context
4. Request citations for claims
5. If insufficient info, say so explicitly
6. Validate response
7. Return answer with citations
```

**Prompt Guidelines:**
- "Answer ONLY using the provided context. Do not use prior knowledge."
- "If the context does not contain enough information, say 'The uploaded material does not provide sufficient information to answer this question.'"
- "Include citations with document name and section for factual claims."
- "Do not invent page numbers, quotes, or citations."

## Implementation Details

### Embedding Model
- Using Google Gemini embedding model (e.g., `embedding-001`)
- Dimension: 768 (configurable)

### Vector Search
```sql
SELECT 
  dc.chunk_text,
  dc.page_number,
  dc.section_title,
  d.title as document_title,
  1 - (dc.embedding <=> $1) as similarity
FROM document_chunks dc
JOIN documents d ON d.id = dc.document_id
WHERE dc.user_id = $2
ORDER BY dc.embedding <=> $1
LIMIT 10;
```

### Fallback (Demo Mode)
When pgvector/Supabase not configured:
- Keyword-based search using simple text matching
- Still filters by user
- Clearly labeled as "keyword-based fallback"
- Less accurate but functional for demo

## Citation Format
Every answer includes citations like:
```json
{
  "answer": "...",
  "citations": [
    {
      "document": "Reproduction in Flowering Plants - Notes",
      "section": "DOUBLE FERTILISATION",
      "page": null,
      "chunk_id": "..."
    }
  ]
}
```

## Quality Controls
- Never send cross-user data
- Validate retrieved chunks exist
- Check if context is sufficient
- Explicit insufficient-evidence messages
- No hallucinated citations
