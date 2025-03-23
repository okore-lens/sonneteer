"use client";

import { useEffect, useState } from "react";

const useMediaQuery = (query: string): boolean => {
	const [matches, setMatches] = useState<boolean>(false);

	useEffect(() => {
		// Create the media query list
		const mediaQuery = window.matchMedia(query);

		// Set the initial value
		setMatches(mediaQuery.matches);

		// Define the change handler
		const handleChange = (event: MediaQueryListEvent) => {
			setMatches(event.matches);
		};

		// Add the event listener
		mediaQuery.addEventListener("change", handleChange);

		// Clean up
		return () => {
			mediaQuery.removeEventListener("change", handleChange);
		};
	}, [query]);

	return matches;
};
export default useMediaQuery;
