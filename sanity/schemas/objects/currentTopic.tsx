interface HiddenProps {
	document: {
		currentTopic: {
			landingPageType: string
		}
	}
}

type previewType = {
	title: string
	landingPage: 'internalLandingpage' | 'externalLandingpage'
	internalLandingPage: string
}

export default {
	name: 'currentTopic',
	title: 'Høyaktuelt tema',
	type: 'object',
	group: 'content',
	options: { collapsible: true },
	fields: [
		{
			name: 'landingPageType',
			title: 'Landingssidetype',
			type: 'string',
			initialValue: 'internal',
			options: {
				list: [
					{ title: 'Intern', value: 'internal' },
					{ title: 'Ekstern', value: 'external' },
				],
				layout: 'radio',
				direction: 'horizontal',
			},
		},
		{
			name: 'url',
			title: 'URL',
			description: 'Eks: https://...',
			type: 'url',
			hidden: ({ parent }: any) => parent?.landingPageType !== 'external',
		},
		{
			name: 'internalType',
			tittel: 'Sidetype som skal lenkes til',
			type: 'string',
			hidden: ({ parent }: any) => parent?.landingPageType !== 'internal',

			options: {
				list: [
					{ title: 'Alle', value: 'all' },
					{ title: 'Tilskudd', value: 'grant' },
					{ title: 'Nyhet', value: 'newsArticle' },
					{ title: 'Informasjonsartikkel', value: 'informationArticle' },
					{ title: 'Arrangement', value: 'event' },
					{ title: 'Prosjekt', value: 'project' },
					{ title: 'Program', value: 'program' },
					{ title: 'Ressurs', value: 'resource' },
					{ title: 'Dokumenter', value: 'report' },
					{ title: 'Rapporter/statistikk', value: 'research' },
					{ title: 'Redaktørstyrt emneside', value: 'editorTopic' },
				],
				layout: 'radio',
				direction: 'horizontal',
			},
		},

		{
			name: 'internalDocument',
			title: 'Internt document',
			description:
				'For at valgt filter skal fungere, må du skrive noe i søkefeltet',
			hidden: ({ parent }: any) => parent?.landingPageType !== 'internal',

			type: 'reference',
			to: [
				{ type: 'wrapperPage' },
				{ type: 'informationArticle' },
				{ type: 'newsArticle' },
				{ type: 'grant' },
				{ type: 'event' },
				{ type: 'project' },
				{ type: 'resource' },
				{ type: 'program' },
				{ type: 'editorTopic' },
			],
			options: {
				filter: ({ parent, document }: any) => {
					const { siteLocale: locale } = document
					// Check if the internalType is not 'all'
					if (parent?.internalType && parent?.internalType !== 'all') {
						return {
							filter: '_type == $internalType && siteLocale == $siteLocale',
							params: {
								internalType: parent.internalType,
								siteLocale: locale,
							},
						}
					}
					// If internalType is 'all', ignore the internalType in the filter
					return {
						filter: 'siteLocale == $siteLocale',
						params: { siteLocale: locale },
					}
				},
			},
		},
		{
			name: 'title',
			title: 'Tittel',
			type: 'string',
		},
		{
			name: 'excerpt',
			title: 'Ingress',
			type: 'text',
		},
		{
			name: 'image',
			title: 'Bilde',
			type: 'imageWithAlt',
			description:
				'Nyheter, Tilskudd, Programmer, Arrangementer, Prosjekter, Ressurser, Dokumenter, Rapporter/statistikk har sine egne forutsatte bilder',
		},
	],
	preview: {
		select: {
			landingPage: 'landingPage',
			title: 'title',
			internalLandingPage: 'chooseInternalLandingPage.0.title',
		},
		prepare({ landingPage, title, internalLandingPage }: previewType) {
			return {
				title:
					landingPage === 'internalLandingpage' ? internalLandingPage : title,
			}
		},
	},
}
