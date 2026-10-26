"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Map,
  Brain,
  BarChart3,
  Calendar,
  MessageSquare,
  TrendingUp,
  Settings,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { config } from "@/lib/config";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Materials", href: "/materials", icon: FileText },
  { name: "Topic Map", href: "/topics", icon: Map },
  { name: "Diagnostic Quiz", href: "/quiz", icon: Brain },
  { name: "Gap Report", href: "/gap-report", icon: BarChart3 },
  { name: "Revision Plan", href: "/revision-plan", icon: Calendar },
  { name: "Explain a Topic", href: "/explain", icon: MessageSquare },
  { name: "Progress", href: "/progress", icon: TrendingUp },
  { name: "Account / Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
      <div className="flex h-16 items-center px-6 border-b border-gray-200 dark:border-gray-800">
        <BookOpen className="h-8 w-8 text-blue-600" />
        <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
          {config.appName}
        </span>
      </div>
      {config.isDemoMode && (
        <div className="mx-4 mt-4 px-3 py-2 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-xs font-medium text-yellow-800 dark:text-yellow-200">
            🎯 DEMO MODE
          </p>
        </div>
      )}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              )}
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
