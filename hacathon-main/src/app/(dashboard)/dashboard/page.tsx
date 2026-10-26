"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { demoTopics, demoDocuments, demoRevisionPlan } from "@/lib/demo/data";
import { getMasteryColor, getMasteryLabel } from "@/lib/utils/format";
import { BookOpen, Brain, Target, Calendar, TrendingUp, Upload, MessageSquare, Map as MapIcon } from "lucide-react";
import Link from "next/link";
import { config } from "@/lib/config";

export default function DashboardPage() {
  const avgMastery = Math.round(
    demoTopics.reduce((acc, t) => acc + t.mastery_score, 0) / demoTopics.length
  );
  const weakTopics = demoTopics.filter((t) => t.mastery_score < 50);
  const completedTasks = demoRevisionPlan.filter((t) => t.completed).length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Track your learning progress and identify gaps
            </p>
          </div>
          <Link href="/materials">
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Materials
            </Button>
          </Link>
        </div>

        {config.isDemoMode && (
          <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
            <CardContent className="p-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Demo Mode:</strong> Showing sample data. Upload your own materials to get personalized analysis.
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
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Across {demoTopics.length} topics
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Materials</CardTitle>
              <BookOpen className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{demoDocuments.length}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Documents uploaded
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weak Topics</CardTitle>
              <Brain className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{weakTopics.length}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Need attention
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revision Tasks</CardTitle>
              <Calendar className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedTasks}/{demoRevisionPlan.length}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Completed
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Topic Mastery</CardTitle>
              <CardDescription>Your performance across topics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {demoTopics.map((topic) => (
                <div key={topic.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{topic.name}</span>
                    <span className={`text-sm px-2 py-1 rounded-full ${getMasteryColor(topic.mastery_score)}`}>
                      {topic.mastery_score}% - {getMasteryLabel(topic.mastery_score)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${topic.mastery_score}%` }}
                    />
                  </div>
                </div>
              ))}
              <Link href="/gap-report">
                <Button variant="outline" className="w-full">
                  View Full Gap Report
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Revision</CardTitle>
              <CardDescription>Tasks from your personalized plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {demoRevisionPlan.slice(0, 3).map((task) => (
                <div key={task.id} className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-800">
                  <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{task.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Day {task.day_number} • {task.duration_minutes} min • {task.practice_question_target} questions
                    </p>
                  </div>
                </div>
              ))}
              <Link href="/revision-plan">
                <Button variant="outline" className="w-full">
                  View Full Plan
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Start diagnosing your learning gaps</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/quiz">
              <Button variant="outline" className="w-full h-auto flex-col py-4">
                <Brain className="h-6 w-6 mb-2" />
                <span>Take Diagnostic Quiz</span>
              </Button>
            </Link>
            <Link href="/explain">
              <Button variant="outline" className="w-full h-auto flex-col py-4">
                <MessageSquare className="h-6 w-6 mb-2" />
                <span>Explain a Topic</span>
              </Button>
            </Link>
            <Link href="/topics">
              <Button variant="outline" className="w-full h-auto flex-col py-4">
                <MapIcon className="h-6 w-6 mb-2" />
                <span>View Topic Map</span>
              </Button>
            </Link>
            <Link href="/gap-report">
              <Button variant="outline" className="w-full h-auto flex-col py-4">
                <TrendingUp className="h-6 w-6 mb-2" />
                <span>See Gap Report</span>
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
