import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import type { BlogPost, NotionPage } from '@/types/blog';

// Initialize Notion client
function initNotionClient() {
  if (!process.env.NOTION_API_KEY) {
    console.error('NOTION_API_KEY is not set in environment variables');
    throw new Error('NOTION_API_KEY is required');
  }
  return new Client({
  auth: process.env.NOTION_API_KEY,
});
}

const notion = initNotionClient();
const n2m = new NotionToMarkdown({ notionClient: notion });

export const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID || '';
const BLOG_ENVIRONMENT = process.env.BLOG_ENVIRONMENT || 'Staging';

console.log(`[Notion] Initialized with environment: ${BLOG_ENVIRONMENT}`);

// Parse Notion page to BlogPost
function parseNotionPage(page: any): BlogPost {
  const properties = page.properties;
  
  // Extract title by concatenating all title segments (handles special characters)
  const title = properties.Title?.title
    ?.map((t: any) => t.plain_text)
    .join('') || '';

  // Extract slug by concatenating all rich_text segments
  const slug = properties.Slug?.rich_text
    ?.map((t: any) => t.plain_text)
    .join('') || page.id;

  // Extract description by concatenating all rich_text segments
  const description = properties.Description?.rich_text
    ?.map((t: any) => t.plain_text)
    .join('') || '';

  // Get published status from select.name
  const published = properties.Published?.select?.name || 'Staging';

  // Get publish date from date.start (default to current date if missing)
  const publishDate = properties.PublishDate?.date?.start || 
                      page.created_time || 
                      new Date().toISOString();

  // Extract tags from multi_select array
  const tags = properties.Tags?.multi_select?.map((tag: any) => tag.name) || [];
  
  // Extract author from rich_text (default to "Tokamak Network")
  const author = properties.Author?.rich_text
    ?.map((t: any) => t.plain_text)
    .join('') || 'Tokamak Network';
  
  // Extract cover image - first check CoverImage property, then page cover
  let coverImage: string | undefined;
  
  if (properties.CoverImage?.files && properties.CoverImage.files.length > 0) {
    const file = properties.CoverImage.files[0];
    coverImage = file.file?.url || file.external?.url;
  } else if (page.cover) {
    coverImage = page.cover.file?.url || page.cover.external?.url;
  }
  
  return {
    id: page.id,
    title,
    slug,
    description,
    published,
    publishDate,
    tags,
    author,
    coverImage,
  };
}

// Get all blog posts (filtered by environment)
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    console.log(`[Notion] Fetching blog posts for environment: ${BLOG_ENVIRONMENT}`);
    
    // Retrieve database info
    const database = await notion.databases.retrieve({
      database_id: NOTION_DATABASE_ID,
    });

    // Extract data source ID
    const dataSources = (database as any).data_sources || [];
    if (dataSources.length === 0) {
      console.error('[Notion] No data sources found in database');
      return [];
    }
    
    const dataSourceId = dataSources[0].id;

    // Query data source with filter
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        property: 'Published',
        select: {
          equals: BLOG_ENVIRONMENT,
        },
      },
      sorts: [
        {
          property: 'PublishDate',
          direction: 'descending',
        },
      ],
      page_size: 100,
    });

    const posts = response.results.map(parseNotionPage);
    console.log(`[Notion] Found ${posts.length} blog posts`);
    
    return posts;
  } catch (error) {
    console.error('[Notion] Error fetching blog posts:', error);
    return [];
  }
}

// Get a single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    console.log(`[Notion] Fetching blog post by slug: ${slug}`);
    
    // Retrieve database info
    const database = await notion.databases.retrieve({
      database_id: NOTION_DATABASE_ID,
    });

    // Extract data source ID
    const dataSources = (database as any).data_sources || [];
    if (dataSources.length === 0) {
      console.error('[Notion] No data sources found in database');
      return null;
    }
    
    const dataSourceId = dataSources[0].id;

    // Query data source with compound filter
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        and: [
          {
            property: 'Published',
            select: {
              equals: BLOG_ENVIRONMENT,
            },
          },
              {
                property: 'Slug',
                rich_text: {
                  equals: slug,
                },
          },
        ],
      },
    });

    if (response.results.length === 0) {
      console.log(`[Notion] No blog post found with slug: ${slug}`);
      return null;
    }

    // Parse post
    const post = parseNotionPage(response.results[0]);

    // Convert page content to markdown
    const mdBlocks = await n2m.pageToMarkdown(post.id);
    const mdString = n2m.toMarkdownString(mdBlocks);
    post.content = mdString.parent;

    console.log(`[Notion] Successfully fetched post: ${post.title}`);
    
    return post;
  } catch (error) {
    console.error(`[Notion] Error fetching blog post by slug "${slug}":`, error);
    return null;
  }
}

// Get all blog slugs (for static generation)
export async function getAllBlogSlugs(): Promise<string[]> {
  try {
    console.log(`[Notion] Fetching all blog slugs for environment: ${BLOG_ENVIRONMENT}`);
    
    const posts = await getBlogPosts();
    const slugs = posts.map(post => post.slug);
    
    console.log(`[Notion] Found ${slugs.length} slugs:`, slugs);
    
    return slugs;
  } catch (error) {
    console.error('[Notion] Error fetching blog slugs:', error);
    return [];
  }
}

// Get recent blog posts for landing page
export async function getRecentBlogPosts(limit: number = 3): Promise<BlogPost[]> {
  const allPosts = await getBlogPosts();
  return allPosts.slice(0, limit);
}

// Get blog posts by tag
export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  try {
    console.log(`[Notion] Fetching blog posts by tag: ${tag}`);
    
    // Retrieve database info
    const database = await notion.databases.retrieve({
      database_id: NOTION_DATABASE_ID,
    });

    // Extract data source ID
    const dataSources = (database as any).data_sources || [];
    if (dataSources.length === 0) {
      console.error('[Notion] No data sources found in database');
      return [];
    }
    
    const dataSourceId = dataSources[0].id;

    // Query data source with tag filter
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        and: [
          {
            property: 'Published',
            select: {
              equals: BLOG_ENVIRONMENT,
            },
          },
          {
            property: 'Tags',
            multi_select: {
              contains: tag,
            },
          },
        ],
      },
      sorts: [
        {
          property: 'PublishDate',
          direction: 'descending',
        },
      ],
    });

    const posts = response.results.map(parseNotionPage);
    console.log(`[Notion] Found ${posts.length} posts with tag "${tag}"`);
    
    return posts;
  } catch (error) {
    console.error(`[Notion] Error fetching blog posts by tag "${tag}":`, error);
    return [];
  }
}
