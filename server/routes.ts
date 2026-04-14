import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { sendContactEmails, isEmailConfigured } from "./email";
import { z } from "zod";

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

export async function registerRoutes(app: Express): Promise<Server> {
  // GitHub pinned projects
  app.get("/api/github/projects", async (_req, res) => {
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
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      
      // Send email notification if SMTP is configured
      if (isEmailConfigured()) {
        try {
          await sendContactEmails(contact);
          console.log("Contact email sent successfully for:", contact.email);
        } catch (emailError) {
          console.error("Failed to send contact email:", emailError);
          // Continue with success response even if email fails
        }
      } else {
        console.log("SMTP not configured, contact saved without email notification:", contact);
      }

      res.json({ 
        success: true, 
        message: "Thank you for your message! I'll get back to you soon." 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Please fill in all required fields correctly.",
          errors: error.errors 
        });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({ 
          success: false, 
          message: "Something went wrong. Please try again later." 
        });
      }
    }
  });

  // Get all contacts (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error fetching contacts" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
