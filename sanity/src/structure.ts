import {
	BiCheckSquare,
	BiEditAlt,
	BiGlobe,
	BiHome,
	BiMenu,
	BiSolidNavigation,
} from 'react-icons/bi'
import { CgDockBottom } from 'react-icons/cg'
import { FiNavigation, FiRepeat, FiTwitter } from 'react-icons/fi'
import { IoSettingsOutline, IoKeyOutline } from 'react-icons/io5'

import { GrCertificate, GrUserWorker } from 'react-icons/gr'
// eslint-disable-next-line import/no-named-as-default
import HkdirLogo from '../Components/branding/Hkdir_logo'
// eslint-disable-next-line import/no-named-as-default
import URLview from '../Components/URLview'

import schemas from '../constants/schemaTypes'
import titles from '../constants/titles'
import {
	additionalContent,
	discipline,
	editorTopic,
	events,
	grants,
	informationArticles,
	news,
	programs,
	projects,
	translatedChild2,
} from './shared'

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

export const defaultDocumentNodeResolver = (S: any) => {
	const paneViews = [
		S.view.form(),
		S.view.component(URLview).title('Frontend URL'),
	]
	return S.document().views(paneViews)
}

export default (S: any) => {
	const paneViews = [
		S.view.form(),
		S.view.component(URLview).title('Frontend URL'),
	]

	// Singletons
	// Instead of rendering a list of documents, we render a single
	// document, specifying the `documentId` manually to ensure
	// that we're editing the single instance of the document
	const homepage = ({ siteLocale, domain }: DeskStructureItemProps) => {
		if (domain === 'fr')
			return S.listItem()
				.title('Forside')
				.id(schemas.FR_HOME_PAGE + siteLocale)
				.icon(BiHome)
				.child(
					S.document()
						.schemaType(schemas.FR_HOME_PAGE)
						.documentId(`${schemas.FR_HOME_PAGE}_${siteLocale}`)
						.views(paneViews),
				)
		if (domain === 'ePluss')
			return S.listItem()
				.title('Forside')
				.id(schemas.EPLUSS_HOME_PAGE + siteLocale)
				.icon(BiHome)
				.child(
					S.document()
						.schemaType(schemas.EPLUSS_HOME_PAGE)
						.documentId(`${schemas.EPLUSS_HOME_PAGE}_${siteLocale}`)
						.views(paneViews),
				)

		return S.listItem()
			.title('Forside')
			.id(schemas.HOME_PAGE + siteLocale)
			.icon(BiHome)
			.child(
				S.document()
					.schemaType(schemas.HOME_PAGE)
					.documentId(`${schemas.HOME_PAGE}_${siteLocale}`)
					.views(paneViews),
			)
	}

	const passwordProtected = (
		Structure: any,
		{ siteLocale, onlyErasmus }: DeskStructureItemProps,
	) =>
		Structure.listItem()
			.title('Passordbeskyttede sider')
			.child(
				translatedChild2(S, {
					title: 'Passordbeskyttede sider',
					schemaType: 'passwordProtectedPage',
					siteLocale,
					onlyErasmus,
				}),
			)
			.icon(IoKeyOutline)

	const footer = ({ siteLocale }: DeskStructureItemProps) =>
		S.listItem()
			.title(titles.FOOTER)
			.id(schemas.FOOTER + siteLocale)
			.icon(CgDockBottom)
			.child(
				S.document()
					.schemaType(schemas.FOOTER)
					.documentId(`${schemas.FOOTER}_${siteLocale}`)
					.views([S.view.form().icon(BiEditAlt)]),
			)

	const menu = ({ siteLocale }: DeskStructureItemProps) =>
		S.listItem()
			.title(titles.MENU)
			.id(schemas.MENU + siteLocale)
			.icon(BiMenu)
			.child(
				S.document()
					.schemaType(schemas.MENU)
					.documentId(`${schemas.MENU}_${siteLocale}`)
					.views([S.view.form().icon(BiEditAlt)]),
			)

	const navigationPages = ({
		siteLocale,
		onKik,
		domain,
		inErasmus,
		onlyErasmus,
	}: DeskStructureItemProps) =>
		S.listItem()
			.title('Navigasjon')
			.child(
				S.list()
					.title('Navigasjon')
					.items([
						editorTopic(S, { siteLocale, onKik, onlyErasmus }),
						discipline(S, { siteLocale, inErasmus, onlyErasmus }),
						S.listItem()
							.title(titles.CROSS_AREA)
							.child(
								translatedChild2(S, {
									title: titles.CROSS_AREA,
									schemaType: schemas.CROSS_AREA,
									siteLocale,
									onlyErasmus,
								}),
							)
							.icon(FiNavigation),
						S.listItem()
							.title(titles.WRAPPER_PAGE)
							.child(
								translatedChild2(S, {
									title: titles.WRAPPER_PAGE,
									schemaType: schemas.WRAPPER_PAGE,
									siteLocale,
									onlyErasmus,
								}),
							)
							.icon(FiNavigation),
						homepage({ siteLocale, domain }),
						footer({ siteLocale }),
						menu({ siteLocale }),
						S.divider(),
						S.listItem()
							.title('Alias')
							.child(
								translatedChild2(S, {
									title: 'Alias',
									schemaType: schemas.ALIAS,
									siteLocale,
									onlyErasmus,
								}),
							)
							.icon(FiRepeat),
					]),
			)

	const hkdir = S.listItem()
		.title('Kunde')
		.child(
			S.list()
				.title('Kunde')
				.items([
					/* 	news(S, { siteLocale: 'no', onlyErasmus: false }),
					informationArticles(S, { siteLocale: 'no', onlyErasmus: false }), */
					//	events(S, { siteLocale: 'no', onlyErasmus: false }),
					grants(S, { siteLocale: 'no', onlyErasmus: false }),
					programs(S, { siteLocale: 'no', onlyErasmus: false }),
					// projects(S, { siteLocale: 'no', onlyErasmus: false }),
					// Example of how to show documents missing siteLocale.
					/* 		S.divider(),
					additionalContent(S, { siteLocale: 'no' }),
					S.divider(),
					navigationPages({ siteLocale: 'no', onlyErasmus: false }),
					S.divider(),
					passwordProtected(S, { siteLocale: 'no', onlyErasmus: false }), */
					/* settings, */
				]),
		)

	const hkdirStructure = S.list().title('Innhold').items([hkdir])

	return hkdirStructure
}
