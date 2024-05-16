import { BiShield as icon } from 'react-icons/bi'
import { SlugInputHkdir } from '../../Components'
import { ReferenceSelect } from '../../Components/referenceSelect'
import { filterOnLanguage } from '../../utils/filterOnLanguage'
import { localeField, siteLocale } from '../../utils/schemaSnippets'
import { RuleType } from '../../utils/validation'
import { PathGeneratorComponent } from '../../Components/PathGeneratorComponent'
import { isUniquePathAcrossAllDocuments } from '../../utils/isUniquePathAcrossAllDocuments'
import { SchemaOrder } from '../../Components/schemaOrder'
import { seo } from '../objects/seoModule'

export default {
	name: 'program',
	title: 'Program',
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
			name: 'title',
			title: 'Tittel',
			type: 'string',
			group: 'content',
			description: 'Tittel på programmet',
			Validation: (Rule: RuleType) => Rule.required(),
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
				schemaName: 'program',
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
			name: 'standardText',
			title: 'Gjentagende intro',
			group: 'content',
			type: 'reference',
			to: [
				{
					type: 'standardText',
					to: [{ type: 'standardText' }],
				},
			],
			options: {
				filter: filterOnLanguage,
			},
		},
		{
			name: 'whatIs',
			title: 'Hva er programmet',
			type: 'blockContentComplex',
			group: 'content',
			validation: (Rule: RuleType) => Rule.required(),
		},
		{
			name: 'whoIs',
			title: 'Hvem står bak',
			type: 'blockContentComplex',
			group: 'content',
			validation: (Rule: RuleType) => Rule.required(),
		},
		{
			name: 'purpose',
			title: 'Hensikt',
			type: 'blockContentComplex',
			group: 'content',
		},
		{
			name: 'eligibleApplicants',
			title: 'Hvem kan søke',
			type: 'blockContentSimple',
			group: 'content',
		},
		{
			name: 'focusAreasObject',
			title: 'Satsningsområder',
			group: 'content',
			type: 'object',
			fields: [
				{
					name: 'title',
					title: 'Tittel på listen',
					type: 'string',
				},
				{
					name: 'focusAreaList',
					title: 'Satsningsområder',
					type: 'array',
					of: [
						{
							type: 'focusArea',
						},
					],
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
			name: 'resources',
			title: 'Ressurser',
			group: 'content',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: { type: 'resource' },
					options: {
						filter: filterOnLanguage,
					},
				},
			],
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
			title: 'Relaterte tilskudd',
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
			name: 'relatedNews',
			title: 'Relaterte nyheter',
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
			name: 'currentArticles',
			title: 'Aktuelle artikler',
			group: 'content',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: { type: 'newsArticle' },
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
