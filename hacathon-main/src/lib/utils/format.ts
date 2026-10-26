export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

export function getMasteryColor(score: number): string {
  if (score >= 80) return "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950";
  if (score >= 50) return "text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-950";
  return "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950";
}

export function getMasteryLabel(score: number): string {
  if (score >= 80) return "Strong";
  if (score >= 50) return "Medium";
  return "Weak";
}
