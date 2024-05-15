import { cn, slug } from '@/lib/utils'

export default function TableOfContents({
	headings,
}: {
	headings: Sanity.BlogPost['headings']
}) {
	return (
		<details className="accordion" open>
			<summary>Table of Contents</summary>

			<ol className="anim-fade-to-b mt-2">
				{headings?.map(({ text, style }, key) => (
					<li className={cn(style == 'h3' && 'ml-4')} key={key}>
						<a className="link" href={`#${slug(text)}`}>
							{text}
						</a>
					</li>
				))}
			</ol>
		</details>
	)
}
