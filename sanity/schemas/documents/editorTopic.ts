import { BiCalendarEvent as icon } from 'react-icons/bi'
import { Reference, Slug } from 'sanity'
import { SlugInputHkdir } from '../../Components'
import { PathGeneratorComponent } from '../../Components/PathGeneratorComponent'
import { ReferenceSelect } from '../../Components/referenceSelect'
import ParentReferenceTypes from '../../constants/parentArray'
import { filterOnLanguage } from '../../utils/filterOnLanguage'
import ParentValidation from '../../utils/parentValidation'
import { localeField, siteLocale } from '../../utils/schemaSnippets'
import { RuleType } from '../../utils/validation'
import { isUniquePathAcrossAllDocuments } from '../../utils/isUniquePathAcrossAllDocuments'
import { seo } from '../objects/seoModule'

interface ContextType {
	parent?: {
		onKik?: boolean
	}
}

export default {
	name: 'editorTopic',
	title: 'Redaktørstyrt emneside',
	type: 'document',
	icon,
	groups: [
		{ name: 'content', title: 'Innhold' },
		{ name: 'meta', title: 'Strukturelt' },
		{ name: 'seo', title: 'SEO' },
	],
	fields: [
		siteLocale,
		localeField,
		{
			name: 'colorPalette',
			title: 'Fargepalett',
			type: 'string',
			initialValue: 'none',
			group: 'meta',
			options: {
				list: [
					{ title: 'Vanlig/Ingen', value: '0' },
					{ title: 'Farge 1 (oransje)', value: '1' },
					{ title: 'Farge 2 (rosa)', value: '2' },
					{ title: 'Farge 3 (lys blå)', value: '3' },
					{ title: 'Miks', value: 'mix' },
					{ title: 'Miks-grønn', value: 'mixGreen' },
				],
			},
		},
		{
			name: 'inErasmus',
			title: 'Inkluder på erasmuspluss.no',
			type: 'boolean',
			initialValue: false,
			group: 'meta',
		},
		{
			name: 'onlyOnErasmus',
			title: 'Vis kun på erasmuspluss.no',
			type: 'boolean',
			group: 'meta',
			initialValue: false,
			hidden: ({ document }: { document?: { inErasmus?: boolean } }) =>
				!document?.inErasmus,
		},
		{
			name: 'onKik',
			title: 'Inkluder på Kvalitet i karriereveiledning',
			type: 'boolean',
			initialValue: false,
			group: 'content',
		},
		{
			name: 'kikFrontPage',
			title: 'Forside - Kvalitet i karriereveiledning',
			type: 'boolean',
			initialValue: false,
			group: 'content',
			hidden: ({
				document,
			}: {
				document: {
					kikCompetencePage: boolean
					onKik: boolean
				}
			}) => !document.onKik || document.kikCompetencePage,
		},
		{
			name: 'kikCompetencePage',
			title: 'Kompetanseområde - Kvalitet i karriereveiledning',
			type: 'boolean',
			initialValue: false,
			group: 'content',
			hidden: ({
				document,
			}: {
				document: {
					kikFrontPage: any
					onKik: boolean
				}
			}) => !document.onKik || document.kikFrontPage,
		},
		{
			name: 'kikArea',
			title: 'Område',
			type: 'string',
			options: {
				list: [
					{ title: 'Etikk', value: 'etikk' },
					{ title: 'Kompetansestandarder', value: 'kompetansestandarder' },
					{ title: 'Karrierekompetanse', value: 'karrierekompetanse' },
					{ title: 'Kvalitetssikring', value: 'kvalitetssikring' },
				],
			},
			group: 'content',
			hidden: ({
				document,
			}: {
				document: {
					kikCompetencePage: boolean
					onKik: boolean
				}
			}) => !document.onKik || !document.kikCompetencePage,
		},
		{
			name: 'approvalRelated',
			title: 'Relatert til godkjenning',
			type: 'boolean',
			initialValue: false,
			group: 'meta',
		},
		{
			name: 'parent',
			title: 'Overordnet side for URL og brødsmulesti',
			type: 'reference',
			to: ParentReferenceTypes,
			group: 'content',
			// options: {
			//   filter: ({ document }: { document: { slug: Slug; siteLocale: string } }) => {
			//     const { slug, siteLocale: locale } = document;

			//     if (slug?.current && locale) {
			//       return {
			//         filter: 'slug.current != $slug && siteLocale == $siteLocale',
			//         params: { slug: slug.current, siteLocale: locale },
			//       };
			//     }
			//     return '';
			//   },
			// },
			// write the same options as above, but with an additional filter. This filter should check if the current document is inErasmus. If it is, the parent also needs to be inErasmus.
			options: {
				filter: ({
					document,
				}: {
					document: { slug: Slug; siteLocale: string; inErasmus: boolean }
				}) => {
					const { slug, siteLocale: locale, inErasmus } = document

					if (slug?.current && locale && inErasmus === true) {
						return {
							filter:
								'slug.current != $slug && siteLocale == $siteLocale && inErasmus == true',
							params: { slug: slug.current, siteLocale: locale },
						}
					}
					if (slug?.current && locale && inErasmus !== true) {
						return {
							filter: 'slug.current != $slug && siteLocale == $siteLocale',
							params: { slug: slug.current, siteLocale: locale },
						}
					}
					return ''
				},
			},

			validation: (Rule: RuleType) => [
				ParentValidation,
				Rule.custom(async (value, context) => {
					const { getClient } = context

					const client = getClient({ apiVersion: '2021-03-25' })
					if (value) {
						const parentIsErasmus = await client.fetch(
							'*[_id == $id][0].inErasmus',
							{
								id: value._ref,
							},
						)
						const { inErasmus } = context.document
						if (inErasmus) {
							if (inErasmus === true && parentIsErasmus === false) {
								return 'Denne siden er merket som "Inkluder på erasmuspluss.no", og kan derfor ikke ha en forelder som ikke er merket som det samme.'
							}
							if (inErasmus === true && parentIsErasmus === true) {
								return true
							}
						}
						return true
					}
					return true
				}),
			],
		},
		{
			name: 'title',
			title: 'Tittel',
			type: 'string',
			group: 'content',
			validation: (Rule: RuleType) => Rule.required(),
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			group: 'content',
			options: {
				source: 'title',
				isUnique: isUniquePathAcrossAllDocuments,
			},
			components: {
				input: SlugInputHkdir,
				schemaName: 'editorTopic',
			},
			// if the slug exists anywhere else in the dataset, throw an error message
			validation: (Rule: RuleType) => [
				Rule.required(),
				Rule.custom(async (slug, context) => {
					const { getClient } = context
					const client = getClient({ apiVersion: '2021-03-25' })
					const slugExists = await client.fetch(
						'*[_type == $type && slug.current == $slug][0]',
						{
							type: 'editorTopic',
							slug,
						},
					)
					if (slugExists) {
						return 'Denne slugen finnes allerede'
					}
					return true
				}),
			],
		},
		{
			name: 'path',
			title: 'Fullpath',
			group: 'content',
			type: 'string',
			readOnly: true,
			components: {
				input: PathGeneratorComponent,
			},
		},
		{
			name: 'searchstrings',
			description: 'Ord som dukker opp på søk',
			title: 'Søkeord',
			type: 'array',
			of: [{ type: 'string' }],
			group: 'content',
			options: {
				layout: 'tags',
			},
		},
		{
			name: 'heroLogoTitle',
			title: 'Logo bilde',
			type: 'image',
			group: 'content',
			hidden: ({ document }: { document: { kikCompetencePage: boolean } }) =>
				!document.kikCompetencePage,

			options: {
				hotspot: true,
			},
		},
		{
			name: 'mainImage',
			title: 'Hovedbilde',
			type: 'imageWithAlt',
			group: 'content',
			options: { collapsable: true, collapsed: true },
		},

		{
			name: 'excerpt',
			title: 'Ingress',
			type: 'text',
			group: 'content',
		},
		{
			name: 'cardExcerpt',
			title: 'Kort ingress',
			type: 'text',
			group: 'content',
			hidden: ({ document }: { document: { kikCompetencePage: boolean } }) =>
				!document.kikCompetencePage,
		},
		{
			name: 'entryGroups',
			title: 'Grupper av innganger til undersider',
			type: 'array',
			group: 'content',
			of: [
				{
					name: 'entryGroup',
					title: 'Inngangsgruppe',
					type: 'object',
					fields: [
						{
							name: 'displayStyle',
							title: 'Vis som',
							type: 'string',
							initialValue: 'standard',
							options: {
								list: [
									{ title: 'Inngang', value: 'standard' },
									{ title: 'Kort', value: 'cards' },
								],
								direction: 'horizontal',
								layout: 'radio',
							},
						},
						{
							name: 'title',
							title: 'Gruppetittel',
							type: 'string',
						},
						{
							name: 'entries',
							title: 'Innganger',
							type: 'array',
							of: [{ type: 'emphasisedTopics' }],
						},
					],
				},
			],
		},
		/*   {
      name: 'emphasisedTopics',
      title: 'Navigasjon til undersider',
      type: 'array',
      group: 'content',
      of: [{ type: 'emphasisedTopics' }],
    }, */
		{
			name: 'currentTopics',
			title: 'Høyaktuelle temaer',
			type: 'array',
			of: [{ type: 'currentTopic' }],
			group: 'content',
		},
		{
			name: 'body',
			title: 'Brødtekst',
			type: 'blockContentComplex',
			group: 'content',
			hidden: ({ parent }: ContextType) => parent?.onKik,
		},
		{
			name: 'kikBody',
			title: 'Brødtekst for Kik',
			type: 'kikBlockContentComplex',
			group: 'content',
			hidden: ({ parent }: ContextType) => !parent?.onKik,
		},

		{
			name: 'contacts',
			title: 'Kontakter',
			type: 'array',
			group: 'content',
			of: [
				{
					type: 'reference',
					to: [{ type: 'contact' }],
					options: {
						filter: filterOnLanguage,
					},
				},
			],
		},
		{
			name: 'disciplines',
			title: 'Fagmiljø',
			group: 'meta',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'crossArea' }] }],
			components: {
				input: ReferenceSelect,
			},
			referenceType: 'discipline',
		},
		{
			name: 'crossAreas',
			title: 'Tema',
			group: 'meta',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'crossArea' }] }],
			components: {
				input: ReferenceSelect,
			},
			referenceType: 'crossArea',
		},
		seo({ group: 'seo' }),
	],
}

export const emphasisedTopics = {
	name: 'emphasisedTopics',
	title: 'innganger',
	type: 'object',
	fields: [
		{
			name: 'title',
			title: 'Tittel',
			type: 'string',
		},
		{
			name: 'excerpt',
			title: 'Ingress',
			type: 'text',
			ValidityState: (Rule: RuleType) => Rule.required(),
		},
		{
			title: 'Inngang til',
			name: 'type',
			type: 'reference',
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
			ValidityState: (Rule: RuleType) => Rule.required(),
		},
		{
			name: 'image',
			description: 'Kvadratisk/runde ikoner fungerer best',
			title: 'Bilde/ikon',
			type: 'image',
		},
	],
}
