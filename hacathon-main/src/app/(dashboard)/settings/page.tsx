"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Settings as SettingsIcon, Info } from "lucide-react";
import { config } from "@/lib/config";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Account / Settings
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your account and application settings
          </p>
        </div>

        {config.isDemoMode && (
          <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
            <CardContent className="p-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Demo Mode:</strong> Authentication is simulated. Configure Supabase for real auth.
              </p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile
            </CardTitle>
            <CardDescription>Your account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={config.demoEmail}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                value="Demo Student"
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
              />
            </div>
            <Button variant="outline" disabled>Update Profile</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              Application Settings
            </CardTitle>
            <CardDescription>Configure GapFinder AI</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Demo Mode</p>
                <p className="text-sm text-gray-500">App running with sample data</p>
              </div>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm dark:bg-yellow-900 dark:text-yellow-200">
                Enabled
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">AI Provider</p>
                <p className="text-sm text-gray-500">Gemini API</p>
              </div>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm dark:bg-gray-800 dark:text-gray-200">
                {config.geminiApiKey ? "Configured" : "Not Configured"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Database</p>
                <p className="text-sm text-gray-500">Supabase / PostgreSQL</p>
              </div>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm dark:bg-gray-800 dark:text-gray-200">
                {config.supabaseUrl ? "Configured" : "Not Configured"}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              About
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>GapFinder AI</strong> v1.0.0<br />
              AI-powered personalized learning diagnosis platform<br />
              Built with Next.js, TypeScript, Tailwind CSS, and Gemini API
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
