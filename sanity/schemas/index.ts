// documents
import informationArticle from './documents/InformationArticle'
import alias from './documents/alias'
import approvalBody from './documents/approvalBody'
import contact from './documents/contact'
import crossArea from './documents/crossArea'
import discipline from './documents/discipline'
import editorTopic, { emphasisedTopics } from './documents/editorTopic'
import event, { programEvent } from './documents/event'
import factBox from './documents/factBox'
import footer from './documents/footer'
import grant from './documents/grant'
import homepage, {
	emphasisedTopic,
	shortcut,
	statistic,
} from './documents/homepage'
import menu from './documents/menu'
import newsArticle from './documents/newsArticle'
import podcast from './documents/podcast'
import profession from './documents/profession'
import program from './documents/program'
import project from './documents/project'

import resource from './documents/resource'
import standardText from './documents/standardText'
import video from './documents/video'
import warningText from './documents/warningText'
import wrapperPage from './documents/wrapperPage'
import passwordProtectedPage from './documents/passwordProtectedPage'

// objects
import aboutProject from './objects/aboutProject'
import { accordionItem, accordionObject } from './objects/accordionObject'
import currentTopic from './objects/currentTopic'
import eventProgram from './objects/eventProgram'
import file from './objects/fileInput'
import fileWithImage from './objects/fileWithImage'
import focusArea from './objects/focusArea'
import imageWithAlt from './objects/imageWithAlt'
import imageWithAltBasic from './objects/imageWithAltBasic'
import link from './objects/link'
import footnote from './objects/footnote'
import menuItemContent from './objects/menuItemContent'
import podcastService from './objects/podcastService'
import projectShortVersion from './objects/projectShortVersion'
import seo from './objects/seo'
import videoSection from './objects/videoSection'

// block content
import blockContentComplex from './blockContent/blockContentComplex'
import blockContentSimple from './blockContent/blockContentSimple'

// block content on KIK
import kikBlockContentComplex from './blockContent/kikBlockContentComplex'
import kikBlockContentSimple from './blockContent/kikBlockContentSimple'
// kik
import kikEntries, { kikEntry } from './objects/kikEntry'

// settings
import { redirect, redirectHas } from './settings/redirect'
import settingsCookies from './settings/settingsCookies'
import settingsGeneral from './settings/settingsGeneral'
import settingsSEO from './settings/settingsSEO'
import settingsSocialMedia from './settings/settingsSocialMedia'

export const schemaTypes = [
	homepage,
	grant,
	event,
	programEvent,
	project,
	program,
	contact,
	footer,
	informationArticle,
	newsArticle,

	factBox,
	menu,
	resource,
	standardText,
	video,
	podcast,
	warningText,
	crossArea,
	editorTopic,
	emphasisedTopics,
	discipline,
	file,
	emphasisedTopic,
	profession,
	approvalBody,
	wrapperPage,

	passwordProtectedPage,
	// When added to this list, object types can be used as
	// { type: 'typename' } in other document schemas
	blockContentSimple,
	blockContentComplex,
	redirectHas,
	imageWithAltBasic,
	imageWithAlt,
	focusArea,
	aboutProject,
	projectShortVersion,
	eventProgram,
	videoSection,
	podcastService,
	fileWithImage,
	link,
	footnote,
	accordionObject,
	accordionItem,
	currentTopic,

	shortcut,
	statistic,
	menuItemContent,
	alias,
	// SETTINGS
	redirect,
	settingsGeneral,
	settingsSEO,
	settingsCookies,
	settingsSocialMedia,
	seo,

	// Kik
	kikBlockContentComplex,
	kikBlockContentSimple,
	kikEntries,
	kikEntry,
]
