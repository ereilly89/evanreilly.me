import type { VercelRequest, VercelResponse } from "@vercel/node";

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
const GITHUB_USERNAME = "ereilly89";

const PINNED_REPOS_QUERY = `
  query {
    user(login: "${GITHUB_USERNAME}") {
      pinnedItems(first: 6, types: [REPOSITORY]) {
        nodes {
          ... on Repository {
            name
            description
            url
            homepageUrl
            openGraphImageUrl
            repositoryTopics(first: 10) {
              nodes {
                topic { name }
              }
            }
            primaryLanguage {
              name
            }
          }
        }
      }
    }
  }
`;

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return res.status(503).json({ success: false, message: "GitHub token not configured" });
  }

  try {
    const response = await fetch(GITHUB_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${token}`,
      },
      body: JSON.stringify({ query: PINNED_REPOS_QUERY }),
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`);
    }

    const data = await response.json() as {
      data?: {
        user?: {
          pinnedItems?: {
            nodes?: Array<{
              name: string;
              description: string | null;
              url: string;
              homepageUrl: string | null;
              openGraphImageUrl: string;
              repositoryTopics: { nodes: Array<{ topic: { name: string } }> };
              primaryLanguage: { name: string } | null;
            }>;
          };
        };
      };
      errors?: Array<{ message: string }>;
    };

    if (data.errors?.length) {
      throw new Error(data.errors[0].message);
    }

    const repos = data.data?.user?.pinnedItems?.nodes ?? [];
    const projects = repos.map((repo) => {
      const topics = repo.repositoryTopics.nodes.map((n) => n.topic.name);
      const technologies = topics.length > 0
        ? topics
        : repo.primaryLanguage ? [repo.primaryLanguage.name] : [];

      return {
        name: repo.name,
        description: repo.description ?? "",
        githubUrl: repo.url,
        liveUrl: repo.homepageUrl ?? null,
        image: repo.openGraphImageUrl,
        technologies,
      };
    });

    res.json(projects);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("GitHub API error:", message);
    res.status(500).json({ success: false, message: `Failed to fetch GitHub projects: ${message}` });
  }
}
