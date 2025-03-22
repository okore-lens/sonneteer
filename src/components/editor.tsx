"use client";

import {
	Bold,
	Italic,
	UnderlineIcon,
	Strikethrough,
	AlignCenter,
	AlignLeft,
	AlignRight,
	Save,
	Share2,
	Type,
	Indent,
	Quote,
	Palette,
	Download,
	List,
	Heading as HeadingIcon,
	Undo2,
	Redo2,
} from "lucide-react";
import { useState } from "react";
import Color from "@tiptap/extension-color";
import StarterKit from "@tiptap/starter-kit";
import ListItem from "@tiptap/extension-list-item";
import Document from "@tiptap/extension-document";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Blockquote from "@tiptap/extension-blockquote";
import Dropcursor from "@tiptap/extension-dropcursor";
import BulletList from "@tiptap/extension-bullet-list";
import Placeholder from "@tiptap/extension-placeholder";
import OrderedList from "@tiptap/extension-ordered-list";
import { EditorContent, useEditor } from "@tiptap/react";
import Heading, { Level } from "@tiptap/extension-heading";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Editor = () => {
	const [title, setTitle] = useState("");

	const editor = useEditor({
		extensions: [
			StarterKit,
			ListItem,
			OrderedList,
			BulletList,
			Placeholder.configure({
				placeholder: "Begin your poem here...",
			}),
			Underline,
			TextAlign.configure({
				types: ["heading", "paragraph"],
			}),
			TextStyle,
			Color,
			Highlight,
			Dropcursor,
			Document,
			Heading.configure({
				levels: [1, 2, 3, 4, 5, 6],
			}),
			Blockquote,
		],
		content: "",
		editorProps: {
			attributes: {
				class: "prose prose-lg dark:prose-invert focus:outline-none min-h-[300px] leading-relaxed",
			},
		},
	});

	const toggleBold = () => {
		editor?.chain().focus().toggleBold().run();
	};

	const toggleItalic = () => {
		editor?.chain().focus().toggleItalic().run();
	};

	const setTextAlign = (align: "left" | "center" | "right") => {
		if (align === "left") {
			editor?.chain().focus().unsetTextAlign().run();
		} else {
			editor?.chain().focus().setTextAlign(align).run();
		}
	};

	const toggleUnderline = () => {
		editor?.chain().focus().toggleUnderline().run();
	};

	const toggleStrikethrough = () => {
		editor?.chain().focus().toggleStrike().run();
	};

	const toggleHeading = (level: string = "Paragraph") => {
		if (!editor) return;

		if (!level || level === "Paragraph") {
			editor?.chain().focus().setParagraph();
		} else {
			editor
				?.chain()
				.focus()
				.toggleHeading({ level: Number(level) as Level })
				.run();
		}
	};

	const toggleBlockquote = () => {
		editor?.chain().focus().toggleBlockquote().run();
	};

	const toggleBulletList = () => {
		editor?.chain().focus().toggleBulletList().run();
	};

	const handleUndo = () => {
		editor?.chain().focus().undo().run();
	};

	const handleRedo = () => {
		editor?.chain().focus().redo().run();
	};

	const indent = () => {
		// In a real implementation, this would handle indentation
		// For now, we'll add a non-breaking space as a simple indent
		editor?.chain().focus().insertContent("&nbsp;&nbsp;&nbsp;&nbsp;").run();
	};

	const setTextColor = (color: string) => {
		editor?.chain().focus().setColor(color).run();
	};

	const setHighlight = (color: string) => {
		editor?.chain().focus().toggleHighlight({ color }).run();
	};

	const exportAsText = () => {
		if (editor) {
			const text = editor.getText();
			const blob = new Blob([text], { type: "text/plain" });
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `${title}.txt`;
			a.click();
		}
	};

	const savePoem = () => {
		// In a real app, this would save to a database
		console.log({
			title,
			content: editor?.getHTML(),
		});
		// For demo purposes, save to localStorage
		if (editor) {
			localStorage.setItem(
				"savedPoem",
				JSON.stringify({
					title,
					content: editor.getHTML(),
				})
			);
		}
	};

	if (!editor) return null;

	return (
		<section className="max-w-3xl">
			<Input
				type="text"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="Give it a title..."
				className="!text-6xl border-none focus-visible:ring-0 px-0 mb-10 h-[60px] leading-none flex items-center justify-center"
			/>

			<div className="flex flex-wrap shadow-sm mb-6 items-center gap-1 p-4 rounded-xl">
				<TooltipProvider>
					<Tooltip>
						<TooltipContent>Headings</TooltipContent>
						<TooltipTrigger asChild>
							<Select onValueChange={toggleHeading}>
								<SelectTrigger>
									<HeadingIcon className="size-4" />
									<SelectValue placeholder="Select a typography" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Paragraph">
										Paragraph
									</SelectItem>
									<SelectItem value="4">Heading</SelectItem>
									<SelectItem value="6">
										Sub Heading
									</SelectItem>
								</SelectContent>
							</Select>
						</TooltipTrigger>
					</Tooltip>
				</TooltipProvider>

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="sm"
								onClick={toggleBold}
								className={
									editor?.isActive("bold") ? "bg-muted" : ""
								}
							>
								<Bold className="size-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Bold</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="sm"
								onClick={toggleItalic}
								className={
									editor?.isActive("italic") ? "bg-muted" : ""
								}
							>
								<Italic className="size-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Italic</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="sm"
								onClick={toggleUnderline}
								className={
									editor?.isActive("underline")
										? "bg-muted"
										: ""
								}
							>
								<UnderlineIcon className="size-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Underline</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="sm"
								onClick={toggleStrikethrough}
								className={
									editor?.isActive("strike") ? "bg-muted" : ""
								}
							>
								<Strikethrough className="size-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Strikethrough</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<Separator orientation="vertical" className="mx-1 h-6" />

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="sm"
								onClick={() => setTextAlign("left")}
								className={
									!editor?.isActive({
										textAlign: "center",
									}) &&
									!editor?.isActive({
										textAlign: "right",
									})
										? "bg-muted"
										: ""
								}
							>
								<AlignLeft className="size-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Align Left</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="sm"
								onClick={() => setTextAlign("center")}
								className={
									editor?.isActive({
										textAlign: "center",
									})
										? "bg-muted"
										: ""
								}
							>
								<AlignCenter className="size-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Align Center</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="sm"
								onClick={() => setTextAlign("right")}
								className={
									editor?.isActive({
										textAlign: "right",
									})
										? "bg-muted"
										: ""
								}
							>
								<AlignRight className="size-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Align Right</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<Separator orientation="vertical" className="mx-1 h-6" />

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="sm"
								onClick={toggleBlockquote}
								className={
									editor?.isActive("blockquote")
										? "bg-muted"
										: ""
								}
							>
								<Quote className="size-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Blockquote</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="sm"
								onClick={toggleBulletList}
								className={
									editor?.isActive("bulletList")
										? "bg-muted"
										: ""
								}
							>
								<List className="size-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Bullet List</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<Separator orientation="vertical" className="mx-1 h-6" />

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="ghost" size="sm" onClick={indent}>
								<Indent className="size-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Indent</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<Separator orientation="vertical" className="mx-1 h-6" />

				<DropdownMenu>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" size="sm">
										<Palette className="size-4" />
									</Button>
								</DropdownMenuTrigger>
							</TooltipTrigger>
							<TooltipContent>Text Color</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<DropdownMenuContent>
						<DropdownMenuItem
							onClick={() => setTextColor("#000000")}
						>
							<div className="w-4 h-4 rounded-full bg-black mr-2" />
							&nbsp; Black
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => setTextColor("#3b82f6")}
						>
							<div className="w-4 h-4 rounded-full bg-blue-500 mr-2" />
							&nbsp; Blue
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => setTextColor("#ef4444")}
						>
							<div className="w-4 h-4 rounded-full bg-red-500 mr-2" />
							&nbsp; Red
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => setTextColor("#10b981")}
						>
							<div className="w-4 h-4 rounded-full bg-emerald-500 mr-2" />
							&nbsp; Green
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => setTextColor("#8b5cf6")}
						>
							<div className="w-4 h-4 rounded-full bg-violet-500 mr-2" />
							&nbsp; Purple
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				<DropdownMenu>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" size="sm">
										<Type className="size-4" />
									</Button>
								</DropdownMenuTrigger>
							</TooltipTrigger>
							<TooltipContent>Highlight</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<DropdownMenuContent>
						<DropdownMenuItem
							onClick={() => setHighlight("#fef3c7")}
						>
							<div className="w-4 h-4 rounded-full bg-amber-100 mr-2" />
							&nbsp; Yellow
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => setHighlight("#dcfce7")}
						>
							<div className="w-4 h-4 rounded-full bg-green-100 mr-2" />
							&nbsp; Green
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => setHighlight("#dbeafe")}
						>
							<div className="w-4 h-4 rounded-full bg-blue-100 mr-2" />
							&nbsp; Blue
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => setHighlight("#f3e8ff")}
						>
							<div className="w-4 h-4 rounded-full bg-purple-100 mr-2" />
							&nbsp; Purple
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="sm"
								onClick={handleUndo}
							>
								<Undo2 className="size-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Undo</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="sm"
								onClick={handleRedo}
							>
								<Redo2 className="size-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Redo</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>

			<EditorContent editor={editor} className="min-h-[300px]" />

			{/* <Markdown title={title} content={editor?.getHTML() || ""} /> */}

			<div className="flex justify-between mt-6  p-2">
				<div className="flex gap-2">
					<Button variant="outline" onClick={savePoem}>
						<Save className="size-4 mr-2" />
						Save
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline">
								<Download className="size-4 mr-2" />
								Export
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem onClick={exportAsText}>
								Plain Text (.txt)
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<Button>
					<Share2 className="size-4 mr-2" />
					Publish
				</Button>
			</div>
		</section>
	);
};

export default Editor;
