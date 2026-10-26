"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { demoQuiz } from "@/lib/demo/data";
import { Brain, FileText, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { config } from "@/lib/config";

export default function QuizPage() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const question = demoQuiz.questions[currentQuestion];
  const totalQuestions = demoQuiz.questions.length;

  const handleAnswerSelect = (questionId: string, optionId: string) => {
    setAnswers({ ...answers, [questionId]: optionId });
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    demoQuiz.questions.forEach((q) => {
      if (answers[q.id] === q.correct_answer) correct++;
    });
    return Math.round((correct / totalQuestions) * 100);
  };

  if (!started) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Diagnostic Quiz
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Test your understanding with questions from your materials
            </p>
          </div>

          {config.isDemoMode && (
            <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
              <CardContent className="p-4">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>Demo Mode:</strong> Using sample quiz from Biology materials.
                </p>
              </CardContent>
            </Card>
          )}

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-blue-600" />
                {demoQuiz.title}
              </CardTitle>
              <CardDescription>
                {demoQuiz.question_count} questions • Mixed difficulty • Grounded in your materials
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-2">
                <p className="text-sm font-medium">Quiz Features:</p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Questions generated from your uploaded materials</li>
                  <li>• Each question includes source citations</li>
                  <li>• Explanations provided after answering</li>
                  <li>• Results update your topic mastery</li>
                </ul>
              </div>
              <Button onClick={() => setStarted(true)} className="w-full" size="lg">
                Start Quiz
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const correct = demoQuiz.questions.filter((q) => answers[q.id] === q.correct_answer).length;

    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Quiz Results
            </h1>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-bold">{score}%</CardTitle>
              <CardDescription>
                {correct} out of {totalQuestions} correct
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {demoQuiz.questions.map((q, idx) => {
                  const isCorrect = answers[q.id] === q.correct_answer;
                  return (
                    <div
                      key={q.id}
                      className="p-4 border border-gray-200 rounded-lg dark:border-gray-800"
                    >
                      <div className="flex items-start gap-2 mb-2">
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium mb-2">
                            Q{idx + 1}. {q.question_text}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            Your answer: <span className="font-medium">{answers[q.id] || "Not answered"}</span>
                          </p>
                          {!isCorrect && (
                            <p className="text-sm text-green-600 dark:text-green-400 mb-2">
                              Correct answer: <span className="font-medium">{q.correct_answer}</span>
                            </p>
                          )}
                          <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                            <p className="text-sm font-medium mb-1">Explanation:</p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">{q.explanation}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-1">
                              <FileText className="h-3 w-3" />
                              Source: {q.source_section}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-3">
                <Button onClick={() => { setStarted(false); setCurrentQuestion(0); setAnswers({}); setShowResults(false); }} variant="outline" className="flex-1">
                  Retake Quiz
                </Button>
                <Button onClick={() => window.location.href = '/gap-report'} className="flex-1">
                  View Gap Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Question {currentQuestion + 1} of {totalQuestions}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              {demoQuiz.title}
            </p>
          </div>
          <div className="text-sm text-gray-500">
            {Math.round(((currentQuestion + 1) / totalQuestions) * 100)}% Complete
          </div>
        </div>

        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-xl">{question.question_text}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Source: {question.source_section} (Grounded in your material)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {question.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswerSelect(question.id, option.id)}
                className={`w-full p-4 text-left border rounded-lg transition-colors ${
                  answers[question.id] === option.id
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                    : "border-gray-200 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
                }`}
              >
                <span className="font-medium mr-2">{option.id.toUpperCase()}.</span>
                {option.text}
              </button>
            ))}
            <Button
              onClick={handleNext}
              disabled={!answers[question.id]}
              className="w-full"
              size="lg"
            >
              {currentQuestion < totalQuestions - 1 ? "Next Question" : "Submit Quiz"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
