import { BiClipboard as icon } from 'react-icons/bi'
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
	name: 'project',
	title: 'Prosjekt',
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
			name: 'approvalRelated',
			title: 'Relatert til godkjenning',
			type: 'boolean',
			initialValue: false,
			group: 'meta',
		},
		{
			name: 'title',
			title: 'Tittel',
			type: 'string',
			group: 'content',
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
				schemaName: 'project',
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
			Validation: (Rule: RuleType) => Rule.required(),
			options: {
				source: 'title',
			},
		},
		{
			name: 'mainImage',
			title: 'Hovedbilde',
			description:
				'Trykk på "edit"-pennen for å legge til alt-tekst, bildetekst og/eller fotograf.',
			type: 'imageWithAlt',
			group: 'content',
		},
		{
			name: 'shortVersion',
			title: 'Kortversjon',
			type: 'projectShortVersion',
			group: 'content',
			Validation: (Rule: RuleType) => Rule.required(),
			options: { collapsible: true, collapsed: true },
		},
		{
			name: 'aboutProject',
			title: 'Om prosjektet',
			type: 'aboutProject',
			group: 'content',
			Validation: (Rule: RuleType) => Rule.required(),
			options: { collapsible: true, collapsed: true },
		},
		{
			name: 'moreAbout',
			title: 'Mer om prosjektet',
			type: 'url',
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
			name: 'otherProjects',
			title: 'Andre prosjekter',
			type: 'array',
			group: 'content',
			of: [
				{
					type: 'reference',
					to: { type: 'project' },
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
