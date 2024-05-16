import { BiBookOpen as icon } from 'react-icons/bi'
import { Reference, Slug } from 'sanity'
import { ReferenceSelect } from '../../Components/referenceSelect'
import ParentReferenceTypes from '../../constants/parentArray'
import ParentValidation from '../../utils/parentValidation'
import { RuleType } from '../../utils/validation'
import { localeField, siteLocale } from '../../utils/schemaSnippets'
import { filterOnLanguage } from '../../utils/filterOnLanguage'
import { PathGeneratorComponent } from '../../Components/PathGeneratorComponent'
import { SlugInputHkdir } from '../../Components/slugInputHkdir'
import { isUniquePathAcrossAllDocuments } from '../../utils/isUniquePathAcrossAllDocuments'
import { seo } from '../objects/seoModule'

const automaticContentList = [
	{ title: 'Lovregulerte yrker', value: 'professions' },
	{ title: 'Godkjenningsmyndigheter', value: 'approvalBodies' },
	{ title: 'GSU-listen', value: 'gsu' },
	{ title: 'Dokumentasjonskrav', value: 'documentationRequirements' },
]

export default {
	name: 'wrapperPage',
	title: 'Oppslagsside',
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
			options: {
				filter: ({
					document,
				}: {
					document: { slug: Slug; siteLocale: string }
				}) => {
					const { slug, siteLocale: locale } = document

					if (slug?.current && locale) {
						return {
							filter: 'slug.current != $slug && siteLocale == $siteLocale',
							params: { slug: slug.current, siteLocale: locale },
						}
					}
					return ''
				},
			},
			validation: ParentValidation,
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
				schemaName: 'wrapperPage',
			},
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
			name: 'excerpt',
			title: 'Ingress',
			type: 'text',
			group: 'content',
		},
		{
			name: 'body',
			title: 'Brødtekst',
			type: 'blockContentComplex',
			group: 'content',
		},
		{
			name: 'automaticContent',
			title: 'Automatisk innhold på siden',
			type: 'string',
			options: { list: automaticContentList },
		},
		{
			name: 'alterations',
			title: 'Endringer',
			type: 'blockContentSimple',
			group: 'content',
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
		seo({ group: 'seo' }),
	],
}
