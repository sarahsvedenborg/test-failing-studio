import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { filterOnLanguage } from '../../utils/filterOnLanguage'
import { localeField, siteLocale } from '../../utils/schemaSnippets'
import { RuleType } from '../../utils/validation'

interface IwarningTextSelection {
	title: string
	critical: boolean
	showOnAllPages: boolean
}

export default {
	name: 'warningText',
	title: 'Varseltekst',
	type: 'document',
	icon: AiOutlineExclamationCircle,
	fields: [
		siteLocale,
		localeField,
		{
			name: 'title',
			title: 'Tittel (not showing in frontend)',
			type: 'string',
			Validation: (Rule: RuleType) => Rule.required(),
		},
		{
			name: 'body',
			title: 'Brødtekst (ny)',
			type: 'blockContentComplex',
			Validation: (Rule: RuleType) => Rule.required(),
		},
		{
			name: 'hideThisWarningText',
			title: 'skjul denne varselteksten',
			type: 'boolean',
			description: 'Hvis du vil skjule alle varseltekster, må du huke av her.',
			initialValue: false,
		},
		{
			name: 'critical',
			title: 'Kritisk varsel',
			type: 'boolean',
			initialValue: false,
			description:
				'Hvis du vil at varselet skal vises som kritisk, må du huke av her.',
		},
		{
			name: 'showOnAllPages',
			title: 'Vis på alle sider (på: Global)',
			type: 'boolean',
			initialValue: false,
			description:
				'Hvis du vil at varselet skal vises på alle sider, må du huke av her.',
		},

		{
			name: 'showOnFollowing',
			title: 'Vis på følgende sider',
			description:
				'Varselet skal vises på siden med den valgte sidetypen, og den vil også bli vist på spesifikke sider som har samme sidetype nedenfor (Vis på følgende spesifikke sider).',
			type: 'array',
			of: [
				{
					type: 'string',
					options: {
						list: [
							{
								title: 'Rapporter, undersøkelser og statistikk',
								value: 'research',
							},
							{ title: 'Informasjonsartikler', value: 'informationArticle' },
							{ title: 'Aktuelt', value: 'newsArticle' },
							{ title: 'Utlysninger og tilskudd', value: 'grant' },
							{ title: 'Prosjekter', value: 'project' },
							{ title: 'Program', value: 'program' },
							{ title: 'Arrangementer', value: 'event' },
							{ title: 'Ressurser', value: 'resource' },
							{ title: 'Dokumenter', value: 'report' },
							{ title: 'Forsiden', value: 'frontpage' },
						],
					},
				},
			],
		},
		{
			name: 'showOnFollowingPages',
			title: 'Vis på følgende spesifikke sider',
			description:
				'Hvis du vil at varselet skal vises på spesifikke sider, må du fjerne valget for de sidene som har samme sidetype som de ovenfor valgte(Vis på følgende sider).',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [
						{ type: 'informationArticle' },
						{ type: 'newsArticle' },
						{ type: 'grant' },
						{ type: 'project' },
						{ type: 'program' },
						{ type: 'event' },
						{ type: 'resource' },
						{ type: 'editorTopic' },
					],
					options: {
						filter: filterOnLanguage,
					},
				},
			],
		},
	],
	preview: {
		select: {
			title: 'title',
			critical: 'critical',
			showOnAllPages: 'showOnAllPages',
		},
		prepare(selection: IwarningTextSelection) {
			const { title, critical, showOnAllPages } = selection

			let subtitle = ''
			if (showOnAllPages) {
				subtitle += subtitle ? ', Global ' : 'Global '
			} else {
				subtitle += subtitle ? ', Lokalt ' : 'Lokalt '
			}
			if (critical) {
				subtitle += 'Kritisk varsel'
			}

			return {
				title,
				subtitle,
			}
		},
	},
}
