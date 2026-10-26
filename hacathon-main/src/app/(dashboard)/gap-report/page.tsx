"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { demoTopics } from "@/lib/demo/data";
import { getMasteryColor, getMasteryLabel } from "@/lib/utils/format";
import { BarChart3, AlertCircle, CheckCircle, AlertTriangle, BookOpen, Target } from "lucide-react";
import Link from "next/link";
import { config } from "@/lib/config";

export default function GapReportPage() {
  const weakTopics = demoTopics.filter((t) => t.mastery_score < 50);
  const mediumTopics = demoTopics.filter((t) => t.mastery_score >= 50 && t.mastery_score < 80);
  const strongTopics = demoTopics.filter((t) => t.mastery_score >= 80);

  const getIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-5 w-5 text-green-600" />;
    if (score >= 50) return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
    return <AlertCircle className="h-5 w-5 text-red-600" />;
  };

  const getRecommendation = (score: number) => {
    if (score >= 80) return "Review periodically with spaced repetition";
    if (score >= 50) return "Practice more questions and revisit weak areas";
    return "Focus heavily - read source material and do targeted practice";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Gap Report
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Topic-level learning diagnosis based on your performance
            </p>
          </div>
          <Link href="/revision-plan">
            <Button>
              <Target className="mr-2 h-4 w-4" />
              Create Revision Plan
            </Button>
          </Link>
        </div>

        {config.isDemoMode && (
          <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
            <CardContent className="p-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Demo Mode:</strong> These are illustrative demo scores, not from actual attempts.
              </p>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weak</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{weakTopics.length}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Score &lt; 50%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Medium</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{mediumTopics.length}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Score 50-79%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Strong</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{strongTopics.length}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Score ≥ 80%</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Detailed Topic Analysis
            </CardTitle>
            <CardDescription>
              Mastery, evidence, misconceptions, and recommendations for each topic
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {demoTopics.map((topic) => (
              <div
                key={topic.id}
                className="p-4 border border-gray-200 rounded-lg dark:border-gray-800 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {getIcon(topic.mastery_score)}
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                        {topic.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Source: {topic.source_section}
                      </p>
                    </div>
                  </div>
                  <span className={`text-sm px-3 py-1 rounded-full ${getMasteryColor(topic.mastery_score)}`}>
                    {topic.mastery_score}% - {getMasteryLabel(topic.mastery_score)}
                  </span>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm font-medium mb-1">Performance</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Mastery: {topic.mastery_score}% | Chunks: {topic.chunk_count}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm font-medium mb-1">Recommended Next Action</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {getRecommendation(topic.mastery_score)}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <p className="text-sm font-medium mb-1 flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    Source Sections to Revisit
                  </p>
                  <p className="text-xs text-gray-700 dark:text-gray-300">
                    {topic.source_section} - Review all related content chunks ({topic.chunk_count} sections)
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
