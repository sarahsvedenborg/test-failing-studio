import { BiWrench as icon } from 'react-icons/bi'
import { SlugInputHkdir } from '../../Components'
import { PathGeneratorComponent } from '../../Components/PathGeneratorComponent'
import { ReferenceSelect } from '../../Components/referenceSelect'
import { resourceFormats } from '../../constants/enums'
import { isUniquePathAcrossAllDocuments } from '../../utils/isUniquePathAcrossAllDocuments'
import { localeField, siteLocale } from '../../utils/schemaSnippets'
import { RuleType } from '../../utils/validation'
import { filterOnLanguage } from '../../utils/filterOnLanguage'
import { SchemaOrder } from '../../Components/schemaOrder'
import { seo } from '../objects/seoModule'

export default {
	name: 'resource',
	title: 'Ressurs',
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
			description: 'Dette valget gjelder kun for innhold på hkdir.no',
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
			name: 'onKik',
			title: 'Inkluder på Kvalitet i karriereveiledning',
			type: 'boolean',
			initialValue: false,
			group: 'content',
		},
		{
			name: 'resourceType',
			title: 'Ressursformat',
			type: 'string',
			options: {
				list: Object.values(resourceFormats),
				layout: 'radio',
			},
			group: 'content',
			Validation: (Rule: RuleType) => Rule.required(),
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
				schemaName: 'resource',
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
			title: 'Kort beskrivelse',
			type: 'string',
			group: 'content',
			Validation: (Rule: RuleType) => Rule.required(),
		},
		{
			name: 'developedBy',
			title: 'Utviklet av',
			type: 'string',
			group: 'content',
			Validation: (Rule: RuleType) => Rule.required(),
		},
		{
			name: 'mainImage',
			title: 'Hovedbilde',
			description:
				'Trykk på "edit"-pennen for å legge til alt-tekst, bildetekst og/eller fotograf.',
			type: 'imageWithAlt',
			group: 'content',
			hidden: ({ document }: { document: { onKik: boolean } }) =>
				!document.onKik,
		},
		{
			name: 'body',
			title: 'Brødtekst',
			type: 'blockContentComplex',
			group: 'content',
		},
		{
			name: 'video',
			title: 'Video',
			type: 'video',
			group: 'content',
			hidden: ({ document }: { document: { resourceType: string } }) =>
				document.resourceType !== resourceFormats.VIDEO,
		},
		{
			name: 'eLearningLink',
			title: 'Lenke til E-læring',
			type: 'url',
			group: 'content',
			hidden: ({ document }: { document: { resourceType: string } }) =>
				document.resourceType !== resourceFormats.E_LARING,
		},
		{
			name: 'eventRecordingLink',
			title: 'Lenke til arrangementsopptak',
			description:
				'Fungerer bare med panopto nå. Rop ut som hvilke andre videotjenester som må støttes.',
			type: 'url',
			group: 'content',
			hidden: ({ document }: { document: { resourceType: string } }) =>
				document.resourceType !== resourceFormats.ARRANGEMENTSOPPTAK,
		},
		{
			name: 'podcast',
			title: 'Podcast',
			type: 'podcastService',
			group: 'content',
			hidden: ({ document }: { document: { resourceType: string } }) =>
				document.resourceType !== resourceFormats.PODCAST,
		},
		{
			name: 'file',
			title: 'Fil',
			type: 'file',
			group: 'content',
			hidden: ({
				document,
			}: {
				document: { resourceType: string; onKik: boolean }
			}) =>
				document.resourceType !== resourceFormats.DOKUMENT_OG_MAL ||
				document.onKik === true,
		},
		{
			name: 'kikFiles',
			title: 'Fil og bilde',
			type: 'array',
			of: [{ type: 'fileWithImage' }],
			group: 'content',
			hidden: ({
				document,
			}: {
				document: { resourceType: string; onKik: boolean }
			}) =>
				document.resourceType !== resourceFormats.DOKUMENT_OG_MAL ||
				document.onKik === false,
		},
		{
			name: 'toolLink',
			title: 'Lenke til nettsted/verktøy',
			type: 'url',
			group: 'content',
			hidden: ({ document }: { document: { resourceType: string } }) =>
				document.resourceType !== resourceFormats.VERKTOY_OG_NETTSTED,
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

		seo({ group: 'seo' }),
	],
	preview: {
		select: {
			title: 'title',
			language: 'siteLocale',
			resourceType: 'resourceType',
		},
		prepare({
			title,
			language,
			resourceType,
		}: {
			title: string
			language: string
			resourceType: string
		}) {
			return {
				title,
				/* subtitle: language ? undefined : 'MANGLER SPRÅK', */
				subtitle: `${resourceType || 'MANGLER RESSURSFORMAT'} ${language ? '' : ', MANGLER SPRÅK'}`,
			}
		},
	},
}
