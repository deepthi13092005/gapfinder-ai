"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { demoRevisionPlan } from "@/lib/demo/data";
import { Calendar, Clock, Target, BookOpen, CheckCircle, Circle } from "lucide-react";
import { useState } from "react";
import { config } from "@/lib/config";

export default function RevisionPlanPage() {
  const [tasks, setTasks] = useState(demoRevisionPlan);

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  };

  const tasksByDay = tasks.reduce((acc, task) => {
    if (!acc[task.day_number]) acc[task.day_number] = [];
    acc[task.day_number].push(task);
    return acc;
  }, {} as Record<number, typeof tasks>);

  const totalMinutes = tasks.reduce((acc, t) => acc + t.duration_minutes, 0);
  const completedMinutes = tasks.filter(t => t.completed).reduce((acc, t) => acc + t.duration_minutes, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Revision Plan
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Personalized study schedule based on your gaps
            </p>
          </div>
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Regenerate Plan
          </Button>
        </div>

        {config.isDemoMode && (
          <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
            <CardContent className="p-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Demo Mode:</strong> Sample revision plan prioritizing weak topics (Double Fertilisation).
              </p>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Study Time</CardTitle>
              <Clock className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Across all days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.floor(completedMinutes / 60)}h {completedMinutes % 60}m</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {tasks.filter(t => t.completed).length}/{tasks.length} tasks
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Priority</CardTitle>
              <Target className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Weak Topics First</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Prioritized by severity</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {Object.keys(tasksByDay).sort((a, b) => Number(a) - Number(b)).map((day) => (
            <Card key={day}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Day {day}
                </CardTitle>
                <CardDescription>
                  {tasksByDay[Number(day)].reduce((acc, t) => acc + t.duration_minutes, 0)} minutes •{" "}
                  {tasksByDay[Number(day)].length} task{tasksByDay[Number(day)].length !== 1 ? "s" : ""}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {tasksByDay[Number(day)].map((task) => (
                  <div
                    key={task.id}
                    className={`p-4 border rounded-lg transition-colors ${
                      task.completed
                        ? "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
                        : "border-gray-200 dark:border-gray-800"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <button onClick={() => toggleTask(task.id)} className="mt-1">
                        {task.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <Circle className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <h3 className={`font-semibold ${task.completed ? "line-through text-gray-500" : "text-gray-900 dark:text-white"}`}>
                            {task.title}
                          </h3>
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {task.duration_minutes} min
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <strong>Objective:</strong> {task.learning_objective}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <strong>Activity:</strong> {task.activity}
                        </p>
                        <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            {task.source_material}
                          </span>
                          <span className="flex items-center gap-1">
                            <Target className="h-3 w-3" />
                            {task.practice_question_target} practice questions
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
