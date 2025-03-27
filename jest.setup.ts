import "@testing-library/jest-dom";

Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: jest.fn().mockImplementation((query) => ({
		matches: query.includes("(min-width: 768px)"), // Returns true for desktop
		media: query,
		onchange: null,
		addListener: jest.fn(),
		removeListener: jest.fn(),
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	})),
});

globalThis.setMediaQuery = (query: string, matches: boolean) => {
	window.matchMedia = jest.fn().mockImplementation((q) => ({
		matches: q === query ? matches : false,
		media: q,
		onchange: null,
		addListener: jest.fn(),
		removeListener: jest.fn(),
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	}));
};

jest.mock("sonner");
jest.mock("next/navigation");
