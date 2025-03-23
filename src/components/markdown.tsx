interface MarkdownProps {
	content: string;
}

const Markdown = ({ content = "" }: MarkdownProps) => {
	return (
		<div
			dangerouslySetInnerHTML={{
				__html: content,
			}}
			className="prose prose-lg dark:prose-invert p-4 max-w-3xl rounded bg-article-bg article-content"
		/>
	);
};

export default Markdown;
