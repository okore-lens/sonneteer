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
  Megaphone,
  Quote,
  List,
  Heading as HeadingIcon,
  Undo2,
  Redo2,
  SeparatorHorizontal,
  ImageIcon,
  ImagePlus,
  ListOrdered,
} from "lucide-react";
import { useState } from "react";
import Image from "@tiptap/extension-image";
import Color from "@tiptap/extension-color";
import StarterKit from "@tiptap/starter-kit";
import { Level } from "@tiptap/extension-heading";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";

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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

import ArticlePreview from "./article-preview";
import { optimizeImage } from "@/libs/utils";

type EditorProps = {
  articleContent: string | undefined;
  articleTitle: string | undefined;
};

const Editor = ({ articleContent, articleTitle }: EditorProps) => {
  const [title, setTitle] = useState(articleTitle || "");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        blockquote: {
          HTMLAttributes: {
            class: "!border-l-4 pl-4 text-gray-600 border-gray-500",
          },
        },
        bulletList: {
          keepMarks: true,
          HTMLAttributes: {
            class: "!list-disc !list-outside  !pl-4 ",
          },
        },
        orderedList: {
          keepMarks: true,
          HTMLAttributes: {
            class: "!list-decimal !list-outside  !pl-4 ",
          },
        },
      }),

      Placeholder.configure({
        placeholder: "Begin your poem here...",
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Color,
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: "w-auto",
        },
      }),
    ],
    content: articleContent || "",
    editorProps: {
      attributes: {
        class:
          "prose prose-lg dark:prose-invert focus:outline-none bg-article-bg p-4 rounded min-h-[300px] leading-relaxed",
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

  const setHorizontalLine = () => {
    editor?.chain().focus().setHorizontalRule().run();
  };

  const toggleHeading = (level: string = "Paragraph") => {
    if (!editor) return;

    if (!level || level === "Paragraph") {
      editor?.chain().focus().setParagraph().run();
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

  const toggleOrderedList = () => {
    editor?.chain().focus().toggleOrderedList().run();
  };

  const handleUndo = () => {
    editor?.chain().focus().undo().run();
  };

  const handleRedo = () => {
    editor?.chain().focus().redo().run();
  };

  const addImage = () => {
    const url = window.prompt("Enter the URL of the image:");

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.files?.length || !editor) return;

    const file = event.target.files[0];
    const optimizedBase64 = await optimizeImage(file);

    editor.chain().focus().setImage({ src: optimizedBase64 }).run();
    event.target.value = "";
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!editor || !event.dataTransfer.files.length) return;

    const file = event.dataTransfer.files[0];
    if (!file.type.startsWith("image/")) return;

    const optimizedBase64 = await optimizeImage(file);
    editor.chain().focus().setImage({ src: optimizedBase64 }).run();
  };

  const getCurrentNodeType = () => {
    if (!editor) return "Paragraph";

    if (editor.isActive("heading", { level: 4 })) return "4";
    if (editor.isActive("heading", { level: 6 })) return "6";

    return "Paragraph";
  };

  const triggerImageInput = () =>
    document.getElementById("image-upload")?.click();

  // const exportAsText = () => {
  // 	if (editor) {
  // 		const text = editor.getText();
  // 		const blob = new Blob([text], { type: "text/plain" });
  // 		const url = URL.createObjectURL(blob);
  // 		const a = document.createElement("a");
  // 		a.href = url;
  // 		a.download = `${title}.txt`;
  // 		a.click();
  // 	}
  // };

  const publishArticle = () => {
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
        }),
      );
    }
  };

  if (!editor) return null;

  const getEditorHTML = (): string => editor?.getHTML() || "";

  return (
    <section id="sonn-editor" className="max-w-3xl">
      <Textarea
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Give it a title..."
        className="!text-2xl xl:!text-4xl !resize-none border-none focus-visible:ring-0 px-0 mb-10 leading-none flex items-center justify-center"
      />

      <div className="flex flex-wrap shadow-sm mb-6 items-center gap-1 p-4 rounded-xl">
        <TooltipProvider>
          <Tooltip>
            <TooltipContent>Headings</TooltipContent>
            <TooltipTrigger asChild>
              <Select
                value={getCurrentNodeType()}
                onValueChange={toggleHeading}
              >
                <SelectTrigger>
                  <HeadingIcon className="size-4" />
                  <SelectValue placeholder="Select a typography" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Paragraph">Paragraph</SelectItem>
                  <SelectItem value="4">Heading</SelectItem>
                  <SelectItem value="6">Sub Heading</SelectItem>
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
                data-testid="editor-toolbar-bold"
                className={editor?.isActive("bold") ? "bg-muted" : ""}
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
                className={editor?.isActive("italic") ? "bg-muted" : ""}
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
                className={editor?.isActive("underline") ? "bg-muted" : ""}
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
                className={editor?.isActive("strike") ? "bg-muted" : ""}
              >
                <Strikethrough className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Strikethrough</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Separator orientation="vertical" className="!h-6 mx-1" />

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

        <Separator orientation="vertical" className="!h-6 mx-1" />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleBlockquote}
                className={editor?.isActive("blockquote") ? "bg-muted" : ""}
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
                className={editor?.isActive("bulletList") ? "bg-muted" : ""}
              >
                <List className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bullet List</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleOrderedList}
                className={editor?.isActive("orderedList") ? "bg-muted" : ""}
              >
                <ListOrdered className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Ordered List</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" onClick={setHorizontalLine}>
                <SeparatorHorizontal className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Line Separator</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Separator orientation="vertical" className="!h-6 mx-1" />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" onClick={addImage}>
                <ImageIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Insert Image URL</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={triggerImageInput}
                type="button"
              >
                <ImagePlus className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Upload Image</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Separator orientation="vertical" className="!h-6 mx-1" />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" onClick={handleUndo}>
                <Undo2 className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" onClick={handleRedo}>
                <Redo2 className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Redo</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <EditorContent
        editor={editor}
        className="min-h-[300px]"
        onDrop={handleDrop}
        data-testid="editor-content"
      />

      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="sr-only"
      />

      {getEditorHTML() && isMeaningfulContent(getEditorHTML()) && (
        <div
          data-testid="editor-action-btns"
          className="flex justify-between mt-6  p-2"
        >
          <div className="flex gap-2">
            <Button variant="outline">
              <Save className="size-4 mr-2" />
              Save
            </Button>
            <ArticlePreview
              content={getEditorHTML()}
              title={title}
              publishArticle={publishArticle}
            />
          </div>
          <Button onClick={publishArticle}>
            <Megaphone className="size-4 mr-2" />
            Publish
          </Button>
        </div>
      )}
    </section>
  );
};

export default Editor;

const isMeaningfulContent = (html: string) => {
  const cleaned = html.replace(/<p>\s*<\/p>/g, "").trim();
  return cleaned.length > 0;
};
