import { PortableText } from '@portabletext/react'
import Pretitle from '@/ui/Pretitle'
import CTAList from '@/ui/CTAList'
import Img from '@/ui/Img'
import { cn } from '@/lib/utils'

export default function HeroPostcard({
	pretitle,
	content,
	ctas,
	image,
}: Partial<{
	pretitle: string
	content: any
	ctas: Sanity.CTA[]
	image: Sanity.Image & { onRight?: boolean }
}>) {
	return (
		<section className="section grid items-center gap-8 md:grid-cols-2 md:gap-x-12">
			<figure className={cn(image?.onRight && 'md:order-1')}>
				<Img image={image} imageWidth={800} />
			</figure>

			<div className="richtext [&_:is(h1,h2)]:text-balance">
				<Pretitle className="text-ink/50">{pretitle}</Pretitle>
				<PortableText value={content} />
				<CTAList ctas={ctas} />
			</div>
		</section>
	)
}
