import { BiDollar as icon } from 'react-icons/bi'
import { SlugInputHkdir } from '../../Components'
import { ReferenceSelect } from '../../Components/referenceSelect'
import { RuleType } from '../../types/ruleType'
import { filterOnLanguage } from '../../utils/filterOnLanguage'
import { localeField, siteLocale } from '../../utils/schemaSnippets'
import { PathGeneratorComponent } from '../../Components/PathGeneratorComponent'
import { isUniquePathAcrossAllDocuments } from '../../utils/isUniquePathAcrossAllDocuments'
import { SchemaOrder } from '../../Components/schemaOrder'
import { seo } from '../objects/seoModule'

const grantProcess = {
	name: 'grantProcess',
	title: 'Om prosessen',
	group: 'process',
	type: 'object',
	fields: [
		{
			name: 'aboutGrant',
			title: 'Om tilskuddet',
			type: 'object',
			options: { collapsible: true, collapsed: true },
			fields: [
				{
					name: 'intro',
					title: 'Introduksjon',
					type: 'blockContentComplex',
				},
				{
					name: 'purpose',
					title: 'Hensikten med tilskuddet',
					type: 'blockContentComplex',
				},
				{
					name: 'amount',
					title: 'Tilskuddsbeløp',
					type: 'blockContentComplex',
				},
				{
					name: 'terms',
					title: 'Vilkår for å få tilskudd',
					type: 'blockContentComplex',
				},
			],
		},

		{
			name: 'applicationProcess',
			title: 'Slik søker du',
			type: 'object',
			options: { collapsible: true, collapsed: true },
			fields: [
				{
					name: 'intro',
					title: 'Introduksjon',
					type: 'blockContentComplex',
				},
				{
					name: 'requirements',
					title: 'Krav til søknaden',
					type: 'blockContentComplex',
				},
				{
					name: 'guides',
					title: 'Veiledning og maler',
					type: 'blockContentComplex',
				},
				{
					name: 'registerApplication',
					title: 'Registrer søknad',
					type: 'blockContentComplex',
				},
				{
					name: 'files',
					title: 'Last opp vedlegg',
					type: 'array',
					of: [{ type: 'file' }],
				},
			],
		},
		{
			name: 'applicationTreatment',
			title: 'Behandling av søknad',
			type: 'object',
			options: { collapsible: true, collapsed: true },
			fields: [
				{
					name: 'intro',
					title: 'Introduksjon',
					type: 'blockContentComplex',
				},
				{
					name: 'evaluation',
					title: 'Vurdering',
					type: 'blockContentComplex',
				},
				{
					name: 'feedbackDate',
					title: 'Når får du svar?',
					type: 'blockContentComplex',
				},
			],
		},
		{
			name: 'reporting',
			title: 'Rapportering',
			type: 'blockContentComplex',
		},
	],
}

export default {
	name: 'grant',
	title: 'Tilskudd',
	type: 'document',
	icon,
	groups: [
		{ name: 'content', title: 'Innhold' },
		{ name: 'process', title: 'Prosess' },
		{ name: 'meta', title: 'Strukturelt' },
		{ name: 'seo', title: 'SEO' },
	],
	fields: [
		siteLocale,
		localeField,
		/* 	{
			name: 'inErasmus',
			title: 'Inkluder på erasmuspluss.no',
			type: 'boolean',
			initialValue: false,
			group: 'meta',
		}, */
		{
			name: 'title',
			title: 'Tittel',
			type: 'string',
			group: 'content',
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
			options: {
				source: 'title',
				isUnique: isUniquePathAcrossAllDocuments,
			},
			components: {
				input: SlugInputHkdir,
				schemaName: 'grant',
			},
			validation: (Rule: RuleType) => Rule.required(),
			group: 'content',
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
			name: 'file',
			title: 'Last opp fullstendig utlysningsbrev (PDF)',
			type: 'file',
			options: {
				accept: '.pdf',
			},
		},
		{
			name: 'excerpt',
			title: 'Ingress',
			type: 'text',
			group: 'content',
		},
		{
			name: 'recipients',
			title: 'Disse fikk midler',
			description:
				'Brukes (og vises i frontend) når søknadsfristen og midlene er tildelt',
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
			name: 'deadline',
			title: 'Søknadsfrist',
			type: 'object',
			group: 'content',
			fields: [
				{
					name: 'isDate',
					title: 'Dato eller løpende',
					type: 'string',
					options: {
						list: [
							{
								title: 'Dato',
								value: 'date',
								options: { dateFormat: 'DD.MM.YYYY' },
							},
							{ title: 'Løpende', value: 'running' },
						],
						layout: 'radio',
						direction: 'horizontal',
					},
					initialValue: 'running',
				},
				{
					name: 'date',
					title: 'Dato',
					type: 'datetime',
					hidden: ({ parent }: { parent?: { isDate?: string } }) =>
						parent?.isDate === 'running',
					initialValue: new Date().toISOString(),
				},
			],
		},
		{
			name: 'applicationSystem',
			title: 'Lenke til søknadssystem',
			description: 'Ekstern lenke av typen https://...',
			type: 'url',
			group: 'content',
		},
		grantProcess,
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
			name: 'disciplines2',
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
			name: 'crossAreas2',
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
