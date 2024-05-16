import { BiCalendarEvent as icon } from 'react-icons/bi'
import { BsCalendar2Check } from 'react-icons/bs'
import { SlugInputHkdir } from '../../Components'
import { ReferenceSelect } from '../../Components/referenceSelect'
import { filterOnLanguage } from '../../utils/filterOnLanguage'
import prettifyDate, { prettifyDateYear } from '../../utils/prettifyDate'
import { localeField, siteLocale } from '../../utils/schemaSnippets'
import { RuleType } from '../../utils/validation'
import { PathGeneratorComponent } from '../../Components/PathGeneratorComponent'
import { isUniquePathAcrossAllDocuments } from '../../utils/isUniquePathAcrossAllDocuments'
import { SchemaOrder } from '../../Components/schemaOrder'
import { seo } from '../objects/seoModule'

export default {
	name: 'event',
	title: 'Arrangement',
	type: 'document',
	icon,
	groups: [
		{ name: 'content', title: 'Innhold' },
		{ name: 'meta', title: 'Strukturelt' },
		{ name: 'seo', title: 'SEO' },
	],
	fields: [
		/*   siteLocale,
    localeField, */
		{
			name: 'inErasmus',
			title: 'Inkluder på erasmuspluss.no',
			type: 'boolean',
			group: 'meta',
			description:
				'Hvis du vil at arrangementet skal vises på erasmuspluss.no, må du huke av her.',
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
				schemaName: 'event',
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
		// radio buttons
		{
			name: 'hasProgram',
			title: 'Arrangementet har et program',
			type: 'boolean',
			initialValue: true,
			group: 'content',
		},
		{
			name: 'dateFrom',
			title: 'Arrangementet varer fra',
			type: 'datetime',
			group: 'content',
			options: {
				calendarTodayLabel: 'Today',
				dateFormat: 'DD.MM.YYYY',
			},
		},
		{
			name: 'dateTo',
			title: 'Arrangentet varer til',
			type: 'datetime',
			group: 'content',
			options: {
				calendarTodayLabel: 'Today',
				dateFormat: 'DD.MM.YYYY',
			},
			validation: (Rule: RuleType) =>
				Rule.custom((dateTo, context) => {
					const newDateFrom = context.document.dateFrom
					const dateFrom = newDateFrom
					if (dateTo < dateFrom) {
						return 'Tidspunkt for slutt må være etter tidspunkt for start'
					}
					return true
				}),
		},
		{
			name: 'programDays',
			title: 'Program',
			type: 'array',
			group: 'content',
			of: [{ type: 'programEvent' }],
			hidden: ({ document }: { document: { hasProgram: boolean } }) =>
				!document.hasProgram,
		},

		{
			name: 'isDigital',
			title: 'Digitalt arrangement',
			type: 'boolean',
			initialValue: false,
			group: 'content',
			validation: (Rule: RuleType) =>
				Rule.custom((fieldValue, context) => {
					if (!context.document.isDigital && !context.document.isPhysical) {
						return 'Du må velge enten digitalt eller fysisk, eller begge to'
					}
					return true
				}),
		},

		{
			name: 'isPhysical',
			title: 'Fysisk arrangement',
			type: 'boolean',
			initialValue: false,
			group: 'content',
			validation: (Rule: RuleType) =>
				Rule.custom((fieldValue, context) => {
					if (!context.document.isDigital && !context.document.isPhysical) {
						return 'Du må velge enten fysisk eller digitalt, eller begge to'
					}
					return true
				}),
		},

		{
			name: 'location',
			title: 'Lokasjon',
			type: 'string',
			hidden: ({ document }: { document: { isPhysical: boolean } }) =>
				!document.isPhysical,
			group: 'content',
			validation: (Rule: RuleType) =>
				Rule.custom((fieldValue, context) => {
					if (context.document.isPhysical && !fieldValue) {
						return 'Lokasjon er påkrevd.'
					}
					return true
				}),
		},

		{
			name: 'about',
			title: 'Om arrangementet',
			type: 'blockContentComplex',
			group: 'content',
			validation: (Rule: RuleType) => Rule.required(),
		},

		{
			name: 'registration',
			title: 'Påmelding',
			type: 'url',
			group: 'content',
		},
		{
			name: 'registrationDeadline',
			title: 'Påmeldingsfrist',
			type: 'datetime',
			group: 'content',
		},
		{
			name: 'digitalEvent',
			title: 'Live stream av arrangementet (lenke)',
			type: 'url',
			group: 'content',
		},
		{
			name: 'eventRecording',
			title: 'Opptak av arrangementet',
			type: 'reference',
			to: [{ type: 'video' }],
			options: {
				filter: filterOnLanguage,
			},
			group: 'content',
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
			name: 'resources',
			title: 'Innhold fra arrangementet (ressurser)',
			type: 'array',
			group: 'content',
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
			of: [{ type: 'reference', to: [{ type: 'discipline' }] }],
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
	preview: {
		select: {
			title: 'title',
			dateFrom: 'dateFrom',
		},
		prepare(selection: { title: string; dateFrom: string }) {
			const { title, dateFrom } = selection
			const subtitle = `${prettifyDate(dateFrom)}`
			return {
				title,
				subtitle,
			}
		},
	},
}

export const programEvent = {
	name: 'programEvent',
	title: 'Arrangementsprogram',
	type: 'object',
	fields: [
		{
			name: 'day',
			title: 'Dag',
			type: 'date',
		},
		{
			name: 'events',
			title: 'Arrangementer',
			type: 'array',
			of: [{ type: 'eventProgram' }],
		},
	],
	preview: {
		select: {
			day: 'day',
			elements: 'events',
		},
		prepare(selection: { day: string; elements: string[] }) {
			const { day, elements } = selection
			const subtitle = elements?.length
			return {
				title: prettifyDateYear(day),
				subtitle:
					subtitle > 0 ? `${subtitle} programpost(er) ` : `ingen programposter`,
				icon: BsCalendar2Check,
			}
		},
	},
}
