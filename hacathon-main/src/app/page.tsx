import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Brain, BarChart3, Target, CheckCircle, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              GapFinder AI
            </span>
          </div>
          <Link href="/dashboard">
            <Button>Get Started</Button>
          </Link>
        </nav>
      </header>

      <main>
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Find Your Learning Gaps with{" "}
            <span className="text-blue-600">AI</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Upload your syllabus, notes, and past papers. Get AI-powered diagnosis, 
            personalized quizzes, and a custom revision plan tailored to your materials.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg">
                Try Demo Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/materials">
              <Button size="lg" variant="outline">
                Upload Materials
              </Button>
            </Link>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Upload</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Upload PDFs, TXT files, or paste your syllabus and notes
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Map Topics</h3>
              <p className="text-gray-600 dark:text-gray-400">
                AI extracts and organizes topics from your materials
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Diagnose</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Take AI-generated quizzes grounded in your content
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">4. Fix Gaps</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get personalized revision plan with citations
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="bg-blue-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Find Your Gaps?</h2>
            <p className="text-xl mb-8 opacity-90">
              Start learning smarter with AI-powered personalized diagnosis
            </p>
            <Link href="/dashboard">
              <Button size="lg" variant="secondary">
                Launch GapFinder AI
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-4 py-8 text-center text-gray-600 dark:text-gray-400">
        <p>&copy; 2026 GapFinder AI. Built for Hackathon.</p>
      </footer>
    </div>
  );
}
