export const PATHS = {
	admin: {
		dashboard: {
			analytics: "/admin/dashboard",
			corner: {
				list: "/admin/dashboard/corner",
				curate: "/admin/dashboard/corner/curate",
				craft: (slug: string) =>
					`/admin/dashboard/corner/craft/${slug}`,
			},
		},

		auth: {
			login: "/admin/auth/login",
			signup: "/admin/auth/signup",
		},
	},
};
