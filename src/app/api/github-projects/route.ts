import { NextResponse } from "next/server";

interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  homepage: string | null;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics?: string[];
  pushed_at: string;
  archived: boolean;
  fork: boolean;
  owner: {
    login: string;
  };
}

const fallbackUser = "ElGioVR";

function cleanUrl(url: string | null) {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed || !/^https?:\/\//i.test(trimmed)) return null;
  return trimmed;
}

function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function projectImageUrl(repo: GitHubRepo) {
  const params = new URLSearchParams({
    seed: String(repo.id),
    name: repo.name,
    language: repo.language || "Project",
    description: repo.description || "GitHub project",
  });

  return `/api/project-image?${params.toString()}`;
}

function demoCandidates(repoName: string, username: string) {
  const lower = repoName.toLowerCase();
  const camelSplit = repoName
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
  const apiSplit = lower.replace(/api$/i, "-api");
  const compact = lower.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

  const candidates = [
    `https://${apiSplit}.vercel.app`,
    `https://${compact}.vercel.app`,
    `https://${camelSplit}.vercel.app`,
  ];

  if (repoName.toLowerCase() === `${username.toLowerCase()}.github.io`) {
    candidates.push(`https://${username.toLowerCase()}.github.io`);
  }

  return unique(candidates);
}

async function isReachable(url: string) {
  try {
    const response = await fetch(url, {
      method: "HEAD",
      signal: AbortSignal.timeout(2500),
      redirect: "follow",
    });
    return response.ok;
  } catch {
    return false;
  }
}

async function resolveDemoUrl(repo: GitHubRepo, username: string) {
  const homepage = cleanUrl(repo.homepage);
  if (homepage) return homepage;

  for (const candidate of demoCandidates(repo.name, username)) {
    if (await isReachable(candidate)) return candidate;
  }

  return null;
}

export async function GET() {
  const username =
    process.env.GITHUB_USERNAME ||
    process.env.NEXT_PUBLIC_GITHUB_USERNAME ||
    fallbackUser;
  const token = process.env.GITHUB_TOKEN;

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=12`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "gio-portfolio",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "GitHub request failed", projects: [] },
        { status: response.status }
      );
    }

    const repos = ((await response.json()) as GitHubRepo[]).filter(
      (repo) => !repo.archived && !repo.fork
    );

    const projects = await Promise.all(
      repos.map(async (repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        topics: repo.topics || [],
        updatedAt: repo.pushed_at,
        repoUrl: repo.html_url,
        demoUrl: await resolveDemoUrl(repo, username),
        imageUrl: projectImageUrl(repo),
      }))
    );

    return NextResponse.json({ username, projects });
  } catch (error) {
    console.error("Error fetching GitHub projects:", error);
    return NextResponse.json(
      { error: "Unable to load GitHub projects", projects: [] },
      { status: 500 }
    );
  }
}
