"use client";

import Image from "next/image";
import { Edit2Icon, Trash2Icon } from "lucide-react";

import { Post } from "@/types/posts";
import { BUCKET_URL } from "@/config";

import { Button } from "./ui/button";

import placeholderThumbnail from "../assets/placeholders/post.webp";
import Link from "next/link";
import { PATHS } from "@/libs/paths";

type PostCardProps = {
	post: Post;
};

const PostCard = ({ post }: PostCardProps) => {
	const { title, thumbnail_url, created_at, slug } = post || {};

	const thumbnail = thumbnail_url?.startsWith("http")
		? thumbnail_url
		: `${BUCKET_URL}${post.thumbnail_url}`;

	return (
		<section
			data-testid="post-card"
			className="relative w-full h-80 md:h-64 rounded-2xl overflow-hidden lg:hover:scale-[1.005] group transition-scale duration-1000"
		>
			<Image
				src={thumbnail || placeholderThumbnail}
				alt={title}
				fill
				className="object-cover object-center"
			/>
			<div className="p-3 lg:opacity-0 group-hover:opacity-100 bg-[#2e2e2ebd] absolute w-full text-white flex justify-between items-end bottom-0 transition-opacity duration-1000">
				<section>
					<h6>{title}</h6>
					<small className="text-right !text-[#fefefe]">
						{new Date(created_at).toLocaleDateString("en-gb")}
					</small>
				</section>

				<section className="flex gap-1">
					<Link href={PATHS.admin.dashboard.corner.craft(slug)}>
						<Button radius="md">
							<Edit2Icon />
						</Button>
					</Link>
					<Button variant="destructive" radius="md">
						<Trash2Icon />
					</Button>
				</section>
			</div>
		</section>
	);
};

export default PostCard;
