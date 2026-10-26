"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { demoTopics } from "@/lib/demo/data";
import { TrendingUp, Target, Award, BookOpen } from "lucide-react";
import { config } from "@/lib/config";

export default function ProgressPage() {
  const avgMastery = Math.round(
    demoTopics.reduce((acc, t) => acc + t.mastery_score, 0) / demoTopics.length
  );
  const improved = demoTopics.filter((t) => t.mastery_score >= 50).length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Progress Tracking
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Monitor your learning journey over time
          </p>
        </div>

        {config.isDemoMode && (
          <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
            <CardContent className="p-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Demo Mode:</strong> Showing sample progress data. Real tracking starts after you take quizzes.
              </p>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Mastery</CardTitle>
              <Target className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgMastery}%</div>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +12% from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Topics Improved</CardTitle>
              <Award className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{improved}/{demoTopics.length}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Above 50% mastery</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quiz Attempts</CardTitle>
              <BookOpen className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total attempts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                Improving
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Topic-by-Topic Progress</CardTitle>
            <CardDescription>Score changes across your learning journey</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {demoTopics.map((topic) => (
              <div key={topic.id} className="p-4 border border-gray-200 rounded-lg dark:border-gray-800">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900 dark:text-white">{topic.name}</h3>
                  <span className="text-sm font-semibold">{topic.mastery_score}%</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex-1">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Initial: 23%</span>
                      <span>Current: {topic.mastery_score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${topic.mastery_score}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-green-600 font-medium">+{topic.mastery_score - 23}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest learning sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div className="h-2 w-2 rounded-full bg-blue-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Completed Diagnostic Quiz</p>
                  <p className="text-xs text-gray-500">Scored 60% - 2 days ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div className="h-2 w-2 rounded-full bg-green-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Completed Revision Task</p>
                  <p className="text-xs text-gray-500">Double Fertilisation - 1 day ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div className="h-2 w-2 rounded-full bg-purple-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Asked question in Explain mode</p>
                  <p className="text-xs text-gray-500">"What is double fertilisation?" - Today</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
