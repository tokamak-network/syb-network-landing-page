import type { ExtendedRecordMap } from 'notion-types';

// Full blog post with content (for individual post pages)
export interface BlogPost {
  id: string;              // Unique identifier (from Notion)
  title: string;           // Post title
  slug: string;            // URL-friendly identifier (e.g., "my-first-post")
  description: string;     // Short description/excerpt
  published: string;       // "Prod" or "Staging"
  publishDate: string;     // ISO date string
  tags: string[];          // Array of tag names
  coverImage?: string;     // Optional cover image URL
  authors: string[];       // Array of author names (supports multiple authors)
  recordMap?: ExtendedRecordMap; // Notion page record map (for react-notion-x)
}

// Notion page interface matching Notion's API response
export interface NotionPage {
  id: string;
  properties: {
    Title: {
      title: Array<{ plain_text: string }>;
    };
    Slug: {
      rich_text: Array<{ plain_text: string }>;
    };
    Description: {
      rich_text: Array<{ plain_text: string }>;
    };
    Published: {
      select: { name: string } | null;
    };
    PublishDate: {
      date: { start: string } | null;
    };
    Tags: {
      multi_select: Array<{ name: string }>;
    };
    CoverImage?: {
      files: Array<{ 
        file?: { url: string }; 
        external?: { url: string } 
      }>;
    };
    Author?: {
      rich_text: Array<{ plain_text: string }>;
    };
  };
  cover?: {
    file?: { url: string };
    external?: { url: string };
  };
  created_time?: string;
}



