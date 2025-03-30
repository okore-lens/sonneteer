import CraftPage from "@/app/admin/dashboard/corner/craft/[slug]/page";
import { mockPosts } from "@/tests/mocks/post";
import { render } from "@testing-library/react";

describe("Craft Page", () => {
	it("should render page", async () => {
		render(await CraftPage({ params: { slug: mockPosts[4].slug } }));
	});
});
