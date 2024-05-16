import { filterOnLanguage } from '../../utils/filterOnLanguage'
import { RuleType } from '../../utils/validation'

export default {
	name: 'relatedContent',
	title: 'Relatert innhold',
	type: 'object',
	fields: [
		{
			name: 'title',
			title: 'Tittel',
			type: 'string',
			validation: (Rule: RuleType) => Rule.required(),
		},
		{
			name: 'content',
			title: 'Innhold',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: { type: 'newsArticle' },
					name: 'newsArticle',
					title: 'Nyheter',
					options: {
						filter: filterOnLanguage,
					},
				},
				{
					type: 'reference',
					to: { type: 'informationArticle' },
					name: 'informationArticle',
					title: 'Informasjonsartikkel',
					options: {
						filter: filterOnLanguage,
					},
				},

				{
					type: 'reference',
					to: { type: 'resource' },
					name: 'resource',
					title: 'Ressurs',
					options: {
						filter: filterOnLanguage,
					},
				},
				{
					type: 'reference',
					to: { type: 'event' },
					name: 'event',
					title: 'Arrangement',
					options: {
						filter: filterOnLanguage,
					},
				},
				{
					type: 'reference',
					to: { type: 'project' },
					name: 'project',
					title: 'Prosjekt',
					options: {
						filter: filterOnLanguage,
					},
				},
				{
					type: 'reference',
					to: { type: 'program' },
					name: 'program',
					title: 'Program',
					options: {
						filter: filterOnLanguage,
					},
				},
				{
					type: 'reference',
					to: { type: 'research' },
					name: 'research',
					title: 'Forskning',
					options: {
						filter: filterOnLanguage,
					},
				},
				{
					type: 'reference',
					to: { type: 'grant' },
					name: 'grant',
					title: 'Utlysninger og tilskudd',
					options: {
						filter: filterOnLanguage,
					},
				},
			],
			validation: (Rule: RuleType) => Rule.required(),
		},
	],
}
