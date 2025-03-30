import Image from "next/image";
import { ChangeEvent } from "react";
import { Trash2 } from "lucide-react";

import { Label } from "../ui/label";
import { Button } from "../ui/button";

type ThumbnailFieldProps = {
	imagePreview: string | null;
	imageFile: File | null;
	setImageFile: (file: File | null) => void;
	setImagePreview: (imgPreview: string | null) => void;
	resetThumbnail: () => void;
};

const ThumbnailField = ({
	imageFile,
	imagePreview,
	setImageFile,
	setImagePreview,
	resetThumbnail,
}: ThumbnailFieldProps) => {
	const handleFileChange = (ev: ChangeEvent<HTMLInputElement>) => {
		const files = ev?.target?.files || [];

		const image = files[0];

		if (image) {
			const preview = URL.createObjectURL(image);
			setImagePreview(preview);
			setImageFile(image);
		}
	};

	return (
		<section className="border-b border-dashed pb-4 mb-6 ">
			<Label htmlFor="thumbnail" className="w-max">
				<div className="relative w-60 cursor-pointer overflow-hidden hover:bg-[#f5f5f5] h-60 bg-[#ececec] rounded-xl flex items-center justify-center group">
					{!imagePreview && <p>Thumbnail</p>}
					{imagePreview && (
						<>
							<Image
								fill
								src={imagePreview}
								alt={imageFile?.name || "Thumbnail"}
								className="object-cover object-center"
							/>

							{imageFile && (
								<Button
									onClick={resetThumbnail}
									variant="destructive"
									className="z-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bottom-0 absolute right-0"
								>
									<Trash2 />
								</Button>
							)}
						</>
					)}
				</div>
			</Label>
			<input
				className="hidden"
				id="thumbnail"
				type="file"
				accept="image/*"
				onChange={handleFileChange}
			/>
		</section>
	);
};

export default ThumbnailField;
