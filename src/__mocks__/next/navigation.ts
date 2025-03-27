export const mockPush = jest.fn();

export const useRouter = () => ({
	push: mockPush,
	replace: jest.fn(),
	prefetch: jest.fn(),
});
export const usePathname = jest.fn();
export const useSearchParams = jest.fn();
