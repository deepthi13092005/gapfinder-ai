# GapFinder AI - Demo Instructions

## Quick Demo (No Setup Required)

GapFinder AI runs in **Demo Mode** by default and works immediately without any API keys or database configuration.

### Running the Demo

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Click "Try Demo Now" or navigate to `/dashboard`

## What You'll See in Demo Mode

### Pre-loaded Sample Data
- **2 Documents**: Biology Syllabus (Grade 12) and Reproduction in Flowering Plants Notes
- **5 Topics**: Including Double Fertilisation, Pollination, Flower Structure, etc.
- **5-Question Quiz**: Grounded in the sample materials
- **Gap Report**: Shows Weak/Medium/Strong classifications
- **Revision Plan**: Prioritized tasks focusing on weak topics
- **Explain Chat**: Can answer questions about the sample materials

### Demo Features to Try

1. **Dashboard** (`/dashboard`) - Overview of progress with sample data
2. **My Materials** (`/materials`) - View pre-uploaded Biology materials
3. **Topic Map** (`/topics`) - See hierarchical topics with citations
4. **Diagnostic Quiz** (`/quiz`) - Take the sample quiz, see explanations
5. **Gap Report** (`/gap-report`) - View topic-level diagnosis
6. **Revision Plan** (`/revision-plan`) - Check personalized study schedule
7. **Explain a Topic** (`/explain`) - Ask questions like "What is double fertilisation?"
8. **Progress** (`/progress`) - Track sample progress
9. **Settings** (`/settings`) - See demo mode status

## Demo Mode Indicators

- Yellow banner saying "🎯 DEMO MODE" in sidebar
- Yellow cards saying "Demo Mode: ..." throughout the app
- Sample data clearly labeled as illustrative
- Upload functionality simulated

## Testing Key Features

### Quiz Flow
1. Go to `/quiz` → Click "Start Quiz"
2. Answer questions - see source citations
3. Submit and view results with explanations
4. Each explanation shows the grounded source
5. Click "View Gap Report" to see updated analysis

### Explain Feature
1. Go to `/explain`
2. Try suggested questions or ask your own
3. See answers with citations from sample materials
4. Citations show document name and section

### Revision Plan
1. Go to `/revision-plan`
2. See tasks prioritized by weak topics (Double Fertilisation is weakest)
3. Click tasks to mark complete
4. Progress updates dynamically

## Important Notes

- Demo data is **clearly labeled** as sample/illustrative
- No real AI API calls in demo mode (uses pre-written responses)
- No data persistence in demo mode (resets on refresh in current implementation)
- All UI features are functional

## Full Mode (With Credentials)

To enable full functionality with real AI and persistence:

1. Get Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Set up Supabase project with pgvector
3. Run migrations from `migrations/schema.sql`
4. Copy `.env.example` to `.env.local` and add credentials
5. Restart the app
