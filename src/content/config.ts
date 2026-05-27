import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(), // Coerce string to Date object
    category: z.string(),
    badge: z.string().optional(),
    coverImage: z.string().optional(),
    downloads: z.number().optional(),
    views: z.number().optional(),
    tags: z.array(z.string()).default([]),
    difficulty: z.string().default("PRINCIPIANTE"),
    lang: z.string().default("es"),
  }),
});

export const collections = {
  blog: blogCollection,
};
