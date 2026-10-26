export const config = {
  appName: process.env.NEXT_PUBLIC_APP_NAME || "GapFinder AI",
  isDemoMode: process.env.NEXT_PUBLIC_DEMO_MODE !== "false" || !process.env.GEMINI_API_KEY,
  geminiApiKey: process.env.GEMINI_API_KEY,
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  demoEmail: process.env.NEXT_PUBLIC_DEMO_EMAIL || "demo@gapfinder.ai",
  demoPassword: process.env.NEXT_PUBLIC_DEMO_PASSWORD || "demo123456",
};

export function isConfigured() {
  return !!(config.geminiApiKey && config.supabaseUrl && config.supabaseAnonKey);
}
