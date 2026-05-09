import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const palettes = [
  ["#0f9f8f", "#ff5c7a", "#111827"],
  ["#2563eb", "#f59e0b", "#0b1120"],
  ["#7c3aed", "#22c55e", "#111827"],
  ["#e11d48", "#06b6d4", "#18181b"],
  ["#ea580c", "#14b8a6", "#111827"],
];

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function formatProjectName(value: string) {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 42);
}

function splitLine(value: string, maxLength: number) {
  const words = value.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxLength && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) lines.push(current);
  return lines.slice(0, 2);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = formatProjectName(searchParams.get("name") || "Project");
  const language = (searchParams.get("language") || "Portfolio").slice(0, 24);
  const description = (searchParams.get("description") || "GitHub project").slice(0, 96);
  const seed = Number(searchParams.get("seed") || 0);
  const [primary, secondary, ink] = palettes[Math.abs(seed) % palettes.length];
  const titleLines = splitLine(name, 20);
  const descriptionLines = splitLine(description, 44);

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675" role="img" aria-label="${escapeXml(name)} preview">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${primary}"/>
      <stop offset="55%" stop-color="${ink}"/>
      <stop offset="100%" stop-color="${secondary}"/>
    </linearGradient>
    <radialGradient id="glow" cx="25%" cy="20%" r="80%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.34"/>
      <stop offset="55%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow" color-interpolation-filters="sRGB">
      <feDropShadow dx="0" dy="28" stdDeviation="28" flood-color="#000000" flood-opacity="0.28"/>
    </filter>
  </defs>
  <rect width="1200" height="675" fill="url(#bg)"/>
  <rect width="1200" height="675" fill="url(#glow)"/>
  <path d="M760 78c125 38 228 118 314 238 69 96 54 227-43 282-111 63-235-30-367-12-141 19-302 121-391 30-89-92 21-227 90-329C463 139 619 35 760 78Z" fill="#ffffff" opacity="0.1"/>
  <g filter="url(#shadow)">
    <rect x="92" y="88" width="1016" height="499" rx="36" fill="#05070d" opacity="0.58"/>
    <rect x="124" y="124" width="952" height="427" rx="24" fill="#ffffff" opacity="0.08"/>
  </g>
  <text x="156" y="182" fill="#ffffff" opacity="0.72" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="28" font-weight="800" letter-spacing="4">${escapeXml(language.toUpperCase())}</text>
  <text x="156" y="303" fill="#ffffff" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="82" font-weight="900">
    ${titleLines.map((line, index) => `<tspan x="156" dy="${index === 0 ? 0 : 88}">${escapeXml(line)}</tspan>`).join("")}
  </text>
  <text x="158" y="480" fill="#ffffff" opacity="0.76" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="30" font-weight="600">
    ${descriptionLines.map((line, index) => `<tspan x="158" dy="${index === 0 ? 0 : 40}">${escapeXml(line)}</tspan>`).join("")}
  </text>
  <circle cx="1005" cy="178" r="42" fill="${secondary}" opacity="0.95"/>
  <circle cx="954" cy="178" r="42" fill="${primary}" opacity="0.95"/>
  <path d="M940 425h136v34H940zm0 58h96v34h-96z" fill="#ffffff" opacity="0.68"/>
</svg>`;

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
