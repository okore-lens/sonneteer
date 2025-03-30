export type Post = {
	id: string;
	created_at: Date;
	updated_at: Date;
	user_id: string;
	content: string;
	thumbnail_url: string | null;
	title: string;
	slug: string;
};
