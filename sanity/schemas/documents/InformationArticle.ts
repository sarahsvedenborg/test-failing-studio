import { BiBookOpen as icon } from 'react-icons/bi'
import { Reference, Slug } from 'sanity'
import { SlugInputHkdir } from '../../Components'
import { PathGeneratorComponent } from '../../Components/PathGeneratorComponent'
import ParentReferenceTypes from '../../constants/parentArray'
import { filterOnLanguage } from '../../utils/filterOnLanguage'
import ParentValidation from '../../utils/parentValidation'
import { localeField, siteLocale } from '../../utils/schemaSnippets'
import { RuleType } from '../../utils/validation'
import { ReferenceSelect } from '../../Components/referenceSelect'
import { isUniquePathAcrossAllDocuments } from '../../utils/isUniquePathAcrossAllDocuments'
import { SchemaOrder } from '../../Components/schemaOrder'
import { seo } from '../objects/seoModule'

interface ContextType {
	parent?: {
		onKik?: boolean
	}
}

export default {
	name: 'informationArticle',
	title: 'Informasjonsartikkel',
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
			name: 'inErasmus',
			title: 'Inkluder på erasmuspluss.no',
			type: 'boolean',
			group: 'meta',
			initialValue: false,
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
			name: 'approvalRelated',
			title: 'Relatert til godkjenning',
			type: 'boolean',
			initialValue: false,
			group: 'meta',
		},
		{
			name: 'onKik',
			title: 'Inkluder på Kvalitet i karriereveiledning',
			type: 'boolean',
			initialValue: false,
			group: 'content',
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
				schemaName: 'informationArticle',
			},
			validation: (Rule: RuleType) => Rule.required(),
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
			validation: (Rule: RuleType) => Rule.required(),
		},
		{
			name: 'viewChanges',
			title: 'Se endringer',
			type: 'blockContentSimple',
			group: 'content',
		},
		{
			name: 'body',
			title: 'Brødtekst',
			type: 'blockContentComplex',
			group: 'content',
			validation: (Rule: RuleType) =>
				Rule.custom((body, context) => {
					if (context.parent && context.parent.onKik === false && !body) {
						return 'Brødtekst er påkrevd'
					}
					return true
				}),
			hidden: ({ parent }: ContextType) => parent?.onKik,
		},
		{
			name: 'kikBody',
			title: 'Brødtekst for Kik',
			type: 'kikBlockContentComplex',
			group: 'content',
			validation: (Rule: RuleType) =>
				Rule.custom((kikBody, context) => {
					if (context.parent && context.parent.onKik === true && !kikBody) {
						return 'Brødtekst for Kik er påkrevd'
					}
					return true
				}),
			hidden: ({ parent }: ContextType) => !parent?.onKik,
		},
		{
			name: 'relatedContentOrder',
			title: 'Rekkefølge på relatert innhold',
			type: 'array',
			group: 'content',
			components: {
				input: SchemaOrder,
			},
			of: [{ type: 'string' }],
			itemSelection: {
				grants: 'Utlysninger og tilskudd',
				programs: 'Program',
				events: 'Arrangement',
				reports: 'Dokumenter',
				resources: 'Ressurser',
				news: 'Aktuelt',
				projects: 'Prosjekteksempler',
				research: 'Rapporter, undersøkelser og statistikk',
			},
			initialValue: [
				'grants',
				'programs',
				'events',
				'reports',
				'resources',
				'news',
				'projects',
				'research',
			],
		},
		{
			name: 'relatedResources',
			title: 'Relaterte ressurser',
			type: 'array',
			group: 'content',
			of: [
				{
					type: 'reference',
					to: [{ type: 'resource' }],
					options: {
						filter: filterOnLanguage,
					},
				},
			],
		},
		{
			name: 'relatedEvents',
			title: 'Relaterte arrangementer',
			type: 'array',
			group: 'content',
			of: [
				{
					type: 'reference',
					to: [{ type: 'event' }],
					options: {
						filter: filterOnLanguage,
					},
				},
			],
		},
		{
			name: 'current',
			title: 'Aktuelt',
			type: 'array',
			group: 'content',
			of: [
				{
					type: 'reference',
					to: [{ type: 'newsArticle' }],
					options: {
						filter: filterOnLanguage,
					},
				},
			],
		},

		{
			name: 'relatedProjects',
			title: 'Relaterte prosjekter',
			type: 'array',
			group: 'content',
			of: [
				{
					type: 'reference',
					to: [{ type: 'project' }],
					options: {
						filter: filterOnLanguage,
					},
				},
			],
		},
		{
			name: 'relatedPrograms',
			title: 'Relaterte programmer',
			type: 'array',
			group: 'content',
			of: [
				{
					type: 'reference',
					to: [{ type: 'program' }],
					options: {
						filter: filterOnLanguage,
					},
				},
			],
		},
		{
			name: 'relatedGrants',
			title: 'Relaterte støtteordninger',
			type: 'array',
			group: 'content',
			of: [
				{
					type: 'reference',
					to: [{ type: 'grant' }],
					options: {
						filter: filterOnLanguage,
					},
				},
			],
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
