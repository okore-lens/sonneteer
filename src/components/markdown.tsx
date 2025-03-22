interface MarkdownProps {
	title: string;
	content: string;
}

const Markdown = ({ title, content = "" }: MarkdownProps) => {
	return (
		<section className="prose prose-lg dark:prose-invert mx-auto font-serif">
			<h2 className="text-center">{title}</h2>
			<div
				dangerouslySetInnerHTML={{
					__html: content,
				}}
			/>
		</section>
	);
};

export default Markdown;
