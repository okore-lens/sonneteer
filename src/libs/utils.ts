import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...classes: ClassValue[]): string => {
	return twMerge(clsx(...classes));
};

export const optimizeImage = async (
	file: File,
	maxWidth = 800,
	maxHeight = 800,
	quality = 0.7,
	fillStyle = "#fcf6e3"
): Promise<string> => {
	return new Promise((resolve, reject) => {
		const isSVG = file.type === "image/svg+xml";
		const reader = new FileReader();

		reader.onload = (e) => {
			const result = e.target?.result;
			if (typeof result !== "string") {
				return reject("Invalid file result");
			}

			if (isSVG) {
				// SVGs don’t need canvas optimization
				resolve(result);
				return;
			}

			const img = new Image();
			img.src = result;

			img.onload = () => {
				let { width, height } = img;
				const ratio = Math.min(maxWidth / width, maxHeight / height, 1);
				width = width * ratio;
				height = height * ratio;

				const canvas = document.createElement("canvas");
				canvas.width = width;
				canvas.height = height;

				const ctx = canvas.getContext("2d");
				if (!ctx) return reject("Canvas context not available");

				if (file.type === "image/jpeg" || file.type === "image/jpg") {
					ctx.fillStyle = fillStyle;
					ctx.fillRect(0, 0, width, height);
				}

				ctx.drawImage(img, 0, 0, width, height);

				const outputFormat =
					file.type === "image/png" ? "image/png" : "image/jpeg";

				const optimizedBase64 =
					outputFormat === "image/jpeg"
						? canvas.toDataURL("image/jpeg", quality)
						: canvas.toDataURL("image/png");

				resolve(optimizedBase64);
			};

			img.onerror = () => reject("Failed to load image");
		};

		reader.onerror = () => reject("Failed to read file");

		reader.readAsDataURL(file);
	});
};
