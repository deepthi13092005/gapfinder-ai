"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send, FileText, Sparkles } from "lucide-react";
import { useState } from "react";
import { config } from "@/lib/config";

export default function ExplainPage() {
  const [messages, setMessages] = useState<Array<{role: string, content: string, citations?: any[]}>>([
    {
      role: "assistant",
      content: "Hi! I'm your AI learning assistant. Ask me anything about your uploaded study materials, and I'll answer using only your content with proper citations.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const suggestedQuestions = [
    "What is double fertilisation?",
    "Explain the structure of microsporangium",
    "What are the types of pollination?",
    "What is sporopollenin and why is it important?",
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages([...messages, { role: "user", content: input }]);
    setLoading(true);
    
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "Based on your uploaded material 'Reproduction in Flowering Plants - Notes':\n\n**Double fertilisation** is a unique event in angiosperms where two types of fusions occur in an embryo sac:\n\n1. **Syngamy**: One male gamete fuses with the egg cell to form a diploid zygote.\n2. **Triple fusion**: The other male gamete fuses with the two polar nuclei in the central cell to produce a triploid primary endosperm nucleus (PEN).\n\nSince both events take place, it's called double fertilisation.",
          citations: [
            {
              document: "Reproduction in Flowering Plants - Notes",
              section: "DOUBLE FERTILISATION",
              text: "Since two types of fusions, syngamy and triple fusion take place in an embryo sac the phenomenon is termed double fertilisation, an event unique to angiosperms.",
            },
          ],
        },
      ]);
      setLoading(false);
      setInput("");
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Explain a Topic
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Ask questions and get answers grounded in your materials
          </p>
        </div>

        {config.isDemoMode && (
          <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
            <CardContent className="p-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Demo Mode:</strong> Using sample responses from Biology materials.
              </p>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6 lg:grid-cols-4">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">Suggested Questions</CardTitle>
              <CardDescription>Based on your materials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => setInput(q)}
                  className="w-full text-left p-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {q}
                </button>
              ))}
            </CardContent>
          </Card>

          <Card className="lg:col-span-3 flex flex-col h-[600px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                Chat with GapFinder AI
              </CardTitle>
              <CardDescription>Answers are grounded in your uploaded materials only</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-lg ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 dark:bg-gray-800"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                      {msg.citations && msg.citations.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-300 dark:border-gray-700 space-y-2">
                          <p className="text-xs font-medium flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            Sources:
                          </p>
                          {msg.citations.map((cite, cidx) => (
                            <div key={cidx} className="text-xs p-2 bg-white/50 dark:bg-black/20 rounded">
                              <p className="font-medium">{cite.document} - {cite.section}</p>
                              <p className="mt-1 italic">"{cite.text}"</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 animate-pulse" />
                        <span>Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask a question about your materials..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-800"
                />
                <Button onClick={handleSend} disabled={loading || !input.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
