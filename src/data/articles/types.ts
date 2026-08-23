export interface BlogArticle {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
  summary: string;
  tableOfContents: { id: string; title: string }[];
  content: string;
  faqs?: { q: string; a: string }[];
  relatedSlugs?: string[];
}
