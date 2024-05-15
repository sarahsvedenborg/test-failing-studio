import Img, { Source } from '@/ui/Img'
import { PortableText } from '@portabletext/react'
import CTAList from '@/ui/CTAList'
import Pretitle from '@/ui/Pretitle'
import { cn } from '@/lib/utils'
import { stegaClean } from '@sanity/client/stega'

export default function Hero({
	pretitle,
	content,
	ctas,
	bgImage,
	bgImageMobile,
	textAlign = 'center',
	alignItems,
}: Partial<{
	pretitle: string
	content: any
	ctas: Sanity.CTA[]
	bgImage: Sanity.Image
	bgImageMobile: Sanity.Image
	textAlign: React.CSSProperties['textAlign']
	alignItems: React.CSSProperties['alignItems']
}>) {
	const hasImage = !!bgImage?.asset

	return (
		<section
			className={cn(
				hasImage && 'grid bg-ink text-canvas *:col-span-full *:row-span-full',
			)}
		>
			{bgImage && (
				<picture>
					<Source image={bgImageMobile} />
					<Img
						className="size-full max-h-fold object-cover"
						image={bgImage}
						draggable={false}
					/>
				</picture>
			)}

			{content && (
				<div className="section flex w-full flex-col">
					<div
						className={cn(
							'richtext relative max-w-xl [&_:is(h1,h2)]:text-balance',
							{
								'mb-8': stegaClean(alignItems) === 'start',
								'my-auto': stegaClean(alignItems) === 'center',
								'mt-auto': stegaClean(alignItems) === 'end',
							},
							{
								'mr-auto': stegaClean(textAlign) === 'left',
								'mx-auto': stegaClean(textAlign) === 'center',
								'ml-auto': stegaClean(textAlign) === 'right',
							},
						)}
						style={{ textAlign: stegaClean(textAlign) }}
					>
						<Pretitle
							className={cn(hasImage ? 'text-canvas/70' : 'text-ink/50')}
						>
							{pretitle}
						</Pretitle>
						<PortableText value={content} />
						<CTAList
							ctas={ctas}
							className={cn({
								'justify-start': stegaClean(textAlign) === 'left',
								'justify-center': stegaClean(textAlign) === 'center',
								'justify-end': stegaClean(textAlign) === 'right',
							})}
						/>
					</div>
				</div>
			)}
		</section>
	)
}
