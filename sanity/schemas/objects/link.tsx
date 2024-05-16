import { FiExternalLink, FiLink, FiMail } from 'react-icons/fi'
import { Reference, Slug } from 'sanity'
import { RuleType } from '../../types/ruleType'

interface PreviewProps {
	target: {
		title: string
	}
	blank: string
	external: string
	media: {
		asset: {
			_ref: string
		}
	}
	label: string
	email: string
	linkType: string
}

type ParentType = {
	parent: {
		linkType:
			| 'internal'
			| 'external'
			| 'email'
			| 'phone'
			| 'file'
			| 'imageFile'
			| 'internalStatic'
			| 'highchart'
			| 'asIframe'
			| 'relative'
	}
}

export default {
	name: 'link',
	title: 'Lenke',
	type: 'object',
	options: {
		modal: {
			width: 500,
		},
	},
	fields: [
		{
			name: 'linkType',
			title: 'Lenketype',
			type: 'string',
			options: {
				list: [
					{ title: 'Intern', value: 'internal' },
					{ title: 'Intern statisk', value: 'internalStatic' },
					{ title: 'Ekstern', value: 'external' },
					{ title: 'Relativ', value: 'relative' },
					{ title: 'Epost', value: 'email' },
					{ title: 'Telefon', value: 'phone' },
					{ title: 'Fil', value: 'file' },
					{ title: 'BildeFil', value: 'imageFile' },
					{ title: 'Highchart', value: 'highchart' },
				],
				layout: 'radio',
				direction: 'horizontal',
			},
			initialValue: 'external',
		},
		/*     {
      name: 'label',
      title: 'Lenkenavn',
      type: 'string',
    }, */
		{
			type: 'reference',
			name: 'target',
			title: 'Intern lenke',

			to: [
				{ type: 'crossArea' },
				{ type: 'discipline' },
				{ type: 'editorTopic' },
				{ type: 'informationArticle' },
				{ type: 'wrapperPage' },
				{ type: 'newsArticle' },
				{ type: 'grant' },
				{ type: 'project' },
				{ type: 'program' },
				{ type: 'event' },
				{ type: 'resource' },
				{ type: 'passwordProtectedPage' },
			],
			options: {
				filter: ({
					document,
				}: {
					document: {
						slug: Slug
						siteLocale: string
						inErasmus: boolean
						onlyOnErasmus: boolean
					}
				}) => {
					const {
						slug,
						siteLocale: locale,
						inErasmus,
						onlyOnErasmus,
					} = document

					if (slug?.current && locale && inErasmus === true) {
						if (onlyOnErasmus !== true) {
							return {
								filter:
									'slug.current != $slug && siteLocale == $siteLocale && inErasmus == true && onlyOnErasmus != true',
								params: { slug: slug.current, siteLocale: locale },
							}
						}
						return {
							filter:
								'slug.current != $slug && siteLocale == $siteLocale && inErasmus == true',
							params: { slug: slug.current, siteLocale: locale },
						}
					}
					if (slug?.current && locale && inErasmus !== true) {
						return {
							filter:
								'slug.current != $slug && siteLocale == $siteLocale && onlyOnErasmus != true',
							params: { slug: slug.current, siteLocale: locale },
						}
					}

					return ''
				},
			},
			hidden: ({ parent }: ParentType) => parent?.linkType !== 'internal',
			validation: (Rule: RuleType) => {
				// if the document that this object is used in has the field "inErasmus" set to true, then the target must be inErasmus
				return Rule.custom(
					async (
						value: Reference,
						context: { document?: any; getClient?: any },
					) => {
						const { getClient } = context
						const { inErasmus } = context.document
						const client = getClient({ apiVersion: '2021-03-25' })
						if (inErasmus) {
							if (value) {
								const linkIsErasmus = await client.fetch(
									'*[_id == $id][0].inErasmus',
									{
										id: value._ref,
									},
								)

								if (inErasmus === true && linkIsErasmus !== true) {
									return 'Dokumentet er ikke tilgjengelig i Erasmus'
								}
							}

							return true
						}
						return true
					},
				)
			},
		},
		{
			name: 'staticTarget',
			title: 'Statisk side',
			type: 'string',
			options: {
				list: [
					{ title: 'Tilskuddliste', value: 'grant' },
					{ title: 'Arrangementliste', value: 'event' },
					{ title: 'Prosjektliste', value: 'project' },
					{ title: 'Dokumentliste', value: 'report' },
					{
						title: 'Rapporter, undersøkelser og statistikk',
						value: 'research',
					},
					{ title: 'Aktueltartikler', value: 'newsArticle' },
					{ title: 'Ressursliste', value: 'resource' },
					{ title: 'Programmer', value: 'program' },
				],
				layout: 'radio',
			},
			hidden: ({ parent }: ParentType) => parent?.linkType !== 'internalStatic',
		},
		{
			title: 'Ekstern lenke',
			name: 'href',
			type: 'string',
			hidden: ({ parent }: ParentType) => parent?.linkType !== 'external',
		},
		{
			title: 'Relativ lenke',
			name: 'relativeHref',
			description:
				'Kan ikke lages manuelt. Brukes av Word -> Sanity-generator.',
			type: 'string',
			readOnly: true,
			hidden: ({ parent }: ParentType) => parent?.linkType !== 'relative',
		},
		{
			title: 'Epost adresse',
			name: 'email',
			type: 'email',
			hidden: ({ parent }: ParentType) => parent?.linkType !== 'email',
		},
		{
			title: 'Telefonnummer',
			name: 'phone',
			type: 'string',
			hidden: ({ parent }: ParentType) => parent?.linkType !== 'phone',
		},
		{
			title: 'Fil',
			name: 'file',
			type: 'file',
			hidden: ({ parent }: ParentType) => parent?.linkType !== 'file',
		},
		{
			title: 'BildeFil',
			name: 'imageFile',
			type: 'image',
			hidden: ({ parent }: ParentType) => parent?.linkType !== 'imageFile',
		},
		{
			title: 'Highchart',
			name: 'highchart',
			type: 'string',
			hidden: ({ parent }: ParentType) => parent?.linkType !== 'highchart',
		},
		{
			title: 'Åpne i ny fane',
			name: 'blank',
			type: 'boolean',
			initialValue: false,
			hidden: ({ parent }: ParentType) => parent?.linkType !== 'external',
		},
	],
	preview: {
		select: {
			target: 'target.title',
			media: 'target.image',
			external: 'href',
			linkType: 'linkType',
			email: 'email',
			label: 'label',
		},
		prepare({ target, external, linkType, label, email }: PreviewProps) {
			let href
			if (linkType === 'external') href = `Ekstern: ${external}`
			else if (linkType === 'email') href = `Epost:  ${email}`
			else href = `Intern: ${target}`

			const getIcon = () => {
				switch (linkType) {
					case 'internal':
						return FiLink
					case 'external':
						return FiExternalLink
					case 'email':
						return FiMail
					default:
						return FiLink
				}
			}
			return { title: label || href, media: getIcon(), subtitle: href }
		},
	},
}
