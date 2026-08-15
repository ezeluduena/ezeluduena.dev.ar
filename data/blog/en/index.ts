import { createBlogLoader } from '~/data/blog/_loader';

export type { BlogLocale, BlogPost, BlogPostRef } from '~/data/blog/_loader';

const loader = createBlogLoader('en');

export const loadBlogPosts = loader.loadBlogPosts;
export const loadBlogPostRefs = loader.loadBlogPostRefs;
export const loadBlogPost = loader.loadBlogPost;
export const publishBlogPostAssets = loader.publishBlogPostAssets;
export const publishBlogFeed = loader.publishBlogFeed;
