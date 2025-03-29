import { Post } from "@/types/posts";

export const mockPosts: Post[] = [
	{
		id: "post-123",
		title: "The Future of Next.js in Modern Web Development",
		content:
			"Next.js continues to evolve as a powerful React framework, offering features like server-side rendering (SSR), static site generation (SSG), and edge functions. With its growing adoption, developers can expect enhanced performance optimizations and better developer experience in future updates.",
		created_at: new Date(),
		updated_at: new Date(),
		user_id: "user_123",
		description: null,
		slug: "the-future-of-next-js-in-modern-web-development",
		thumbnail_url: null,
	},
	{
		id: "post-345",
		title: "Why TypeScript is Essential for Scalable Applications",
		content:
			"TypeScript provides static typing, better code maintainability, and enhanced tooling support. By using TypeScript in large-scale applications, teams can reduce bugs, improve collaboration, and create more reliable software.",
		created_at: new Date(),
		updated_at: new Date(),
		user_id: "user_456",
		description: null,
		slug: "why-typescript-is-essential-for-scalable-applications",
		thumbnail_url: null,
	},
	{
		id: "post-567",
		title: "Best Practices for Testing React Applications",
		content:
			"When testing React applications, using tools like Jest and React Testing Library ensures better test coverage. Focus on writing unit tests for pure functions, integration tests for component interactions, and end-to-end tests for full user flows.",
		created_at: new Date(),
		updated_at: new Date(),
		user_id: "user_123",
		description: null,
		slug: "best-practices-for-testing-react-applications",
		thumbnail_url: null,
	},
	{
		id: "post-789",
		title: "Understanding Multitenancy in Next.js",
		content:
			"Multitenancy allows a single application to serve multiple tenants, each with its own data and configuration. In Next.js, this can be achieved using subdomains, environment variables, and middleware for dynamic tenant resolution.",
		created_at: new Date(),
		updated_at: new Date(),
		user_id: "user_456",
		description: null,
		slug: "understanding-multitenancy-in-next-js",
		thumbnail_url: null,
	},
	{
		id: "post-901",
		title: "Optimizing Performance in a Next.js Application",
		content:
			"Performance optimization in Next.js involves techniques such as image optimization, lazy loading, caching strategies, and using edge functions. Implementing these best practices ensures faster load times and improved user experience.",
		created_at: new Date(),
		updated_at: new Date(),
		user_id: "user_123",
		description: null,
		slug: "optimizing-performance-in-a-next-js-application",
		thumbnail_url: null,
	},
];
