import { FiNavigation } from 'react-icons/fi'
import { BsCardText } from 'react-icons/bs'
import {
	BiDetail,
	BiBookOpen,
	BiCalendarEvent,
	BiDollar,
	BiShield,
	BiClipboard,
	BiWrench,
	BiUser,
	BiFilm,
	BiInfoCircle,
} from 'react-icons/bi'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { MdDescription } from 'react-icons/md'
import titles from '../constants/titles'
import schemas from '../constants/schemaTypes'
import {} from 'sanity'

interface DeskStructureItemProps {
	siteLocale: undefined | string
	onKik?: boolean
	kikCompetencePage?: boolean
	kikFrontPage?: boolean
	filter?: string
	title?: string
	domain?: string
	inErasmus?: boolean
	onlyErasmus?: boolean
}

// Function for rendering the correct documetn based on locale in descStructure

export const translatedChild2 = (
	S: any,
	{
		title,
		schemaType,
		siteLocale,
		onKik,
		inErasmus,
		onlyErasmus,
	}: {
		title: string
		schemaType: string
		siteLocale: undefined | string
		onKik?: undefined | boolean
		inErasmus?: undefined | boolean
		onlyErasmus?: undefined | boolean
	},
) => {
	const getfilter = () => {
		if (siteLocale !== undefined) {
			if (onlyErasmus === false) {
				return '_type == $type && siteLocale == $siteLocale && onlyOnErasmus != true'
			}
			if (onKik !== undefined) {
				return '_type == $type && siteLocale == $siteLocale && onKik == $onKik && defined(onKik)'
			}
			if (inErasmus !== undefined) {
				return '_type == $type && siteLocale == $siteLocale && inErasmus == $inErasmus && defined(inErasmus)'
			}

			return '_type == $type && siteLocale == $siteLocale'
		}
		return '_type == $type'
	}

	return (
		S.documentTypeList(schemaType)
			.title(title)
			/*   .filter(getfilter()) */
			.apiVersion('v2023-08-01')
			.params({
				type: schemaType,
				siteLocale: siteLocale || 'no',
				onKik: onKik || false,
				inErasmus: inErasmus || false,
			})
	)
	/*  .initialValueTemplates([
      S.initialValueTemplateItem(`${schemaType}-by-language`, { siteLocale, onKik }),
    ]) */
}

// Single documents

export const discipline = (
	S: any,
	{ siteLocale, inErasmus, onlyErasmus }: DeskStructureItemProps,
) =>
	S.listItem()
		.title(titles.DISCIPLINE)
		.child(
			translatedChild2(S, {
				title: titles.DISCIPLINE,
				schemaType: schemas.DISCIPLINE,
				siteLocale,
				inErasmus,
				onlyErasmus,
			}),
		)
		.icon(FiNavigation)

export const editorTopic = (
	S: any,
	{ siteLocale, onKik, inErasmus, onlyErasmus }: DeskStructureItemProps,
) =>
	S.listItem()
		.title(titles.EDITOR_TOPIC)
		.child(
			translatedChild2(S, {
				title: titles.EDITOR_TOPIC,
				schemaType: schemas.EDITOR_TOPIC,
				siteLocale,
				onKik,
				inErasmus,
				onlyErasmus,
			}),
		)
		.icon(FiNavigation)

export const news = (
	S: any,
	{ siteLocale, inErasmus, onlyErasmus }: DeskStructureItemProps,
) =>
	S.listItem()
		.title(titles.NEWS + ' (Working)')
		.child(
			translatedChild2(S, {
				title: titles.NEWS,
				schemaType: schemas.NEWS,
				siteLocale,
				inErasmus,
				onlyErasmus,
			}),
		)
		.icon(BiDetail)

export const informationArticles = (
	S: any,
	{ siteLocale, onKik, inErasmus, onlyErasmus }: DeskStructureItemProps,
) =>
	S.listItem()
		.title(titles.INFORMATION_ARTICLE)
		.child(
			translatedChild2(S, {
				title: titles.INFORMATION_ARTICLE,
				schemaType: schemas.INFORMATION_ARTICLE,
				siteLocale,
				onKik,
				inErasmus,
				onlyErasmus,
			}),
		)
		.icon(BiBookOpen)

export const grants = (
	S: any,
	{ siteLocale, inErasmus, onlyErasmus }: DeskStructureItemProps,
) =>
	S.listItem()
		.title('Tilskudd (Cannot navigate between)')
		.child(
			translatedChild2(S, {
				title: 'Tilskudd',
				schemaType: schemas.GRANTS,
				siteLocale,
				inErasmus,
				onlyErasmus,
			}),
		)
		.icon(BiDollar)

export const events = (
	S: any,
	{ siteLocale, inErasmus, onlyErasmus }: DeskStructureItemProps,
) =>
	S.listItem()
		.title(titles.EVENTS)
		.child(
			translatedChild2(S, {
				title: titles.EVENTS,
				schemaType: schemas.EVENTS,
				siteLocale,
				inErasmus,
				onlyErasmus,
			}),
		)
		.icon(BiCalendarEvent)

export const projects = (
	S: any,
	{ siteLocale, inErasmus, onlyErasmus }: DeskStructureItemProps,
) =>
	S.listItem()
		.title(titles.PROJECTS)
		.child(
			translatedChild2(S, {
				title: titles.PROJECTS,
				schemaType: schemas.PROJECTS,
				siteLocale,
				inErasmus,
				onlyErasmus,
			}),
		)
		.icon(BiClipboard)

export const programs = (
	S: any,
	{ siteLocale, onlyErasmus }: DeskStructureItemProps,
) =>
	S.listItem()
		.title('Programmer (Cannot navigate between)')
		.child(
			translatedChild2(S, {
				title: 'Programmer',
				schemaType: schemas.PROGRAMS,
				siteLocale,
				onlyErasmus,
			}),
		)
		.icon(BiShield)

export const resources = (
	S: any,
	{ siteLocale, onKik, inErasmus, onlyErasmus }: DeskStructureItemProps,
) =>
	S.listItem()
		.title(titles.RESOURCES)
		.child(
			translatedChild2(S, {
				title: titles.RESOURCES,
				schemaType: schemas.RESOURCES,
				siteLocale,
				onKik,
				inErasmus,
				onlyErasmus,
			}),
		)
		.icon(BiWrench)

// Groups
export const additionalContent = (
	S: any,
	{ siteLocale }: DeskStructureItemProps,
) =>
	S.listItem()
		.title('Tilleggsinnhold')
		.child(
			S.list()
				.title('Tilleggsinnhold')
				.items([
					S.listItem()
						.title(titles.CONTACT)
						.child(
							translatedChild2(S, {
								title: titles.CONTACT,
								schemaType: schemas.CONTACT,
								siteLocale,
							}),
						)
						.icon(BiUser),
					S.listItem()
						.title(titles.VIDEO)
						.child(
							translatedChild2(S, {
								title: titles.VIDEO,
								schemaType: schemas.VIDEO,
								siteLocale,
							}),
						)
						.icon(BiFilm),
					S.listItem()
						.title(titles.FACT_BOX)
						.child(
							translatedChild2(S, {
								title: titles.FACT_BOX,
								schemaType: schemas.FACT_BOX,
								siteLocale,
							}),
						)
						.icon(BiInfoCircle),
					S.listItem()
						.title(titles.STANDARD_TEXT)
						.child(
							translatedChild2(S, {
								title: titles.STANDARD_TEXT,
								schemaType: schemas.STANDARD_TEXT,
								siteLocale,
							}),
						)
						.icon(BsCardText),
					S.listItem()
						.title(titles.WARNING)
						.child(
							translatedChild2(S, {
								title: titles.WARNING,
								schemaType: schemas.WARNING,
								siteLocale,
							}),
						)
						.icon(AiOutlineExclamationCircle),
				]),
		)
