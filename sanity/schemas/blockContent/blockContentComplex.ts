import { TbListLetters } from 'react-icons/tb'
import { BiBarChart, BiRecycle, BiDownload, BiLink } from 'react-icons/bi'
import { BsCardText } from 'react-icons/bs'

import { filterOnLanguage } from '../../utils/filterOnLanguage'
import link from '../objects/link'
import footnote from '../objects/footnote'

export default {
	title: 'Block Content',
	name: 'blockContentComplex',
	type: 'array',
	of: [
		{
			title: 'Block',
			type: 'block',
			// Styles let you set what your user can mark up blocks with. These
			// correspond with HTML tags, but you can set any title or value
			// you want and decide how you want to deal with it where you want to
			// use your content.
			styles: [
				{ title: 'Normal', value: 'normal' },
				{ title: 'Nivå 1', value: 'h1' },
				{ title: 'Nivå 2', value: 'h2' },
				{ title: 'Nivå 3', value: 'h3' },
				{ title: 'Nivå 4', value: 'h4' },
				/*      { title: 'Quote', value: 'blockquote' }, */
			],
			lists: [
				{ title: 'Bullet', value: 'bullet' },
				{ title: 'Numbered', value: 'number' },
				{ title: 'Alfa', value: 'alphanumeric', icon: TbListLetters },
			],
			// Marks let you mark up inline text in the block editor.
			marks: {
				// Decorators usually describe a single property – e.g. a typographic
				// preference or highlighting by editors.
				decorators: [
					{ title: 'Strong', value: 'strong' },
					{ title: 'Strong EM', value: 'em' },
				],
				// Annotations can be any object structure – e.g. a link or a footnote.
				annotations: [link, footnote],
			},
		},
		// You can add additional types here. Note that you can't use
		// primitive types such as 'string' and 'number' in the same array
		// as a block type.
		{
			type: 'imageWithAlt',
			title: 'Bilde',
		},
		{
			type: 'videoSection',
			title: 'Video',
		},
		{
			type: 'podcastService',
			title: 'Podcast',
		},
		{
			type: 'fileInput',
			title: 'Fil',
			icon: BiDownload,
		},
		{
			name: 'emphasizedLink',
			title: 'Fremhevet lenke',
			icon: BiLink,
			type: 'object',
			fields: [
				{
					name: 'label',
					title: 'Lenkenavn',
					type: 'string',
				},
				{
					name: 'link',
					title: 'Lenke',
					type: 'link',
				},
			],
		},
		{
			title: 'Accordion',
			name: 'accordion',
			type: 'accordionObject',
		},
		{
			title: 'Grafikk fra Highcharts',
			name: 'highchart',
			type: 'object',
			icon: BiBarChart,
			fields: [
				{
					name: 'highchartURL',
					title: 'Lenke til Highcharts grafikk',
					type: 'url',
				},
				{
					name: 'description',
					title: 'Beskrivelse',
					type: 'text',
					rows: 3,
				},
			],
		},
		{
			title: 'Grafikk fra vedleggsløsningen',
			name: 'iframe',
			type: 'object',
			icon: BiBarChart,
			fields: [
				{
					name: 'iframeURL',
					title: 'Lenke til vedleggsløsnignen',
					type: 'url',
				},
				{
					name: 'idFromWord',
					title: 'ID fra Word',
					type: 'string',
				},
				{
					name: 'title',
					title: 'Tittel på figur',
					type: 'string',
				},
				{
					name: 'hideTitle',
					title: 'Skjul figurtittel på nettsiden',
					type: 'boolean',
					initialValue: false,
				},
				{
					name: 'description',
					title: 'Beskrivelse',
					type: 'text',
					rows: 3,
				},
				{
					name: 'source',
					title: 'Kilde',
					type: 'string',
				},
			],
		},
		{
			title: 'Tekstboks',
			name: 'textbox',
			type: 'object',
			icon: BsCardText,
			fields: [
				{
					name: 'content',
					title: 'Innhold',
					type: 'blockContentComplex',
				},
			],
			preview: {
				select: {
					content: 'content',
				},
				prepare: ({ content }: { content: any }) => {
					const text = content?.[0].children?.[0]?.text
						?.concat(content?.[1]?.children?.[0]?.text)
						?.substring(0, 100)
						.concat('...')

					return { title: 'Textboks', subtitle: text || 'Ingen tekst' }
				},
			},
		},
		{
			icon: BiRecycle,
			type: 'reference',
			options: {
				filter: filterOnLanguage,
			},
			to: [
				{
					type: 'standardText',
					title: 'Gjenbrukstekst',
				},
				{ type: 'factBox', title: 'Faktabox' },
				{ type: 'resource', title: 'Ressurs' },
			],
			title: 'Gjenbrukbart innhold',
		},
	],
}
