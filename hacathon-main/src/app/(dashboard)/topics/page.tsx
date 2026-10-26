"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { demoTopics, demoDocuments } from "@/lib/demo/data";
import { getMasteryColor, getMasteryLabel } from "@/lib/utils/format";
import { Map, FileText, ChevronRight } from "lucide-react";
import { config } from "@/lib/config";

export default function TopicsPage() {
  const parentTopics = demoTopics.filter((t) => t.parent_topic === null);
  const getChildTopics = (parentId: string) => demoTopics.filter((t) => t.parent_topic === parentId);
  const getDocumentName = (docId: string) => demoDocuments.find((d) => d.id === docId)?.title || "Unknown";

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Topic Map
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Hierarchical view of topics extracted from your materials
          </p>
        </div>

        {config.isDemoMode && (
          <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
            <CardContent className="p-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Demo Mode:</strong> Showing sample topic map from Biology materials.
              </p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Extracted Topics</CardTitle>
            <CardDescription>
              Topics organized hierarchically with source citations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {parentTopics.map((parent) => (
              <div key={parent.id} className="space-y-3">
                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Map className="h-5 w-5 text-blue-600" />
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                        {parent.name}
                      </h3>
                    </div>
                    <span className={`text-sm px-2 py-1 rounded-full ${getMasteryColor(parent.mastery_score)}`}>
                      {parent.mastery_score}% - {getMasteryLabel(parent.mastery_score)}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      <span>{getDocumentName(parent.document_id)}</span>
                    </div>
                    {parent.source_section && (
                      <span>Section: {parent.source_section}</span>
                    )}
                    <span>{parent.chunk_count} related chunks</span>
                  </div>
                </div>

                <div className="ml-6 space-y-2">
                  {getChildTopics(parent.id).map((child) => (
                    <div
                      key={child.id}
                      className="p-3 border border-gray-200 rounded-lg dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {child.name}
                          </h4>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${getMasteryColor(child.mastery_score)}`}>
                          {child.mastery_score}% - {getMasteryLabel(child.mastery_score)}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-xs text-gray-600 dark:text-gray-400 ml-6">
                        {child.source_section && (
                          <span>Section: {child.source_section}</span>
                        )}
                        <span>{child.chunk_count} chunks</span>
                        {child.source_page && <span>Page: {child.source_page}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
