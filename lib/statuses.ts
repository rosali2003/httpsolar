export type Category = "success" | "redirect" | "client-error" | "server-error";

export interface StatusCode {
  code: number;
  name: string;
  emoji: string;
  category: Category;
}

export interface StatusCategory {
  id: Category;
  label: string;
  tagline: string;
  statuses: StatusCode[];
}

export const STATUS_CATEGORIES: StatusCategory[] = [
  {
    id: "success",
    label: "2xx",
    tagline: "Solar is a very good boy",
    statuses: [
      { code: 200, name: "OK", emoji: "😊", category: "success" },
      { code: 201, name: "Created", emoji: "🎉", category: "success" },
      { code: 202, name: "Accepted", emoji: "👍", category: "success" },
      { code: 204, name: "No Content", emoji: "😶", category: "success" },
      { code: 206, name: "Partial Content", emoji: "🍖", category: "success" },
    ],
  },
  {
    id: "redirect",
    label: "3xx",
    tagline: "Solar is confused",
    statuses: [
      { code: 301, name: "Moved Permanently", emoji: "🔄", category: "redirect" },
      { code: 302, name: "Found", emoji: "↩️", category: "redirect" },
      { code: 304, name: "Not Modified", emoji: "😑", category: "redirect" },
      { code: 307, name: "Temporary Redirect", emoji: "↪️", category: "redirect" },
      { code: 308, name: "Permanent Redirect", emoji: "🔁", category: "redirect" },
    ],
  },
  {
    id: "client-error",
    label: "4xx",
    tagline: "Solar is disappointed in you",
    statuses: [
      { code: 400, name: "Bad Request", emoji: "😕", category: "client-error" },
      { code: 401, name: "Unauthorized", emoji: "🚫", category: "client-error" },
      { code: 403, name: "Forbidden", emoji: "😤", category: "client-error" },
      { code: 404, name: "Not Found", emoji: "🐾", category: "client-error" },
      { code: 405, name: "Method Not Allowed", emoji: "🙅", category: "client-error" },
      { code: 408, name: "Request Timeout", emoji: "⏳", category: "client-error" },
      { code: 409, name: "Conflict", emoji: "😤", category: "client-error" },
      { code: 410, name: "Gone", emoji: "👻", category: "client-error" },
      { code: 418, name: "I'm a Teapot", emoji: "🫖", category: "client-error" },
      { code: 422, name: "Unprocessable Entity", emoji: "🤔", category: "client-error" },
      { code: 429, name: "Too Many Requests", emoji: "😩", category: "client-error" },
    ],
  },
  {
    id: "server-error",
    label: "5xx",
    tagline: "Solar has no idea what happened",
    statuses: [
      { code: 500, name: "Internal Server Error", emoji: "😱", category: "server-error" },
      { code: 501, name: "Not Implemented", emoji: "🤷", category: "server-error" },
      { code: 502, name: "Bad Gateway", emoji: "😵", category: "server-error" },
      { code: 503, name: "Service Unavailable", emoji: "💤", category: "server-error" },
      { code: 504, name: "Gateway Timeout", emoji: "⏰", category: "server-error" },
    ],
  },
];

export const ALL_STATUSES: StatusCode[] = STATUS_CATEGORIES.flatMap((c) => c.statuses);

export function getStatus(code: number): StatusCode | undefined {
  return ALL_STATUSES.find((s) => s.code === code);
}

export const CATEGORY_STYLES: Record<Category, { bg: string; text: string; border: string; cardBg: string }> = {
  success: {
    bg: "bg-green-50",
    text: "text-green-800",
    border: "border-green-200",
    cardBg: "bg-green-50",
  },
  redirect: {
    bg: "bg-yellow-50",
    text: "text-yellow-800",
    border: "border-yellow-200",
    cardBg: "bg-yellow-50",
  },
  "client-error": {
    bg: "bg-orange-50",
    text: "text-orange-800",
    border: "border-orange-200",
    cardBg: "bg-orange-50",
  },
  "server-error": {
    bg: "bg-red-50",
    text: "text-red-800",
    border: "border-red-200",
    cardBg: "bg-red-50",
  },
};
