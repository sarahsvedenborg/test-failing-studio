import { Box, Button, Card, Flex, Text, Tooltip } from '@sanity/ui'
// eslint-disable-next-line import/no-extraneous-dependencies
import { LaunchIcon } from '@sanity/icons'
import { useEffect, useState } from 'react'
import { useClient } from 'sanity'

interface Props {
	value: { current: string }
	renderDefault: any
	schemaType: { components: { schemaName: string } }
}
export const SlugInputHkdir = (props: Props) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const client = useClient({
		apiVersion: '2021-06-07',
	})

	const { value = { current: '' }, renderDefault, schemaType } = props
	const { schemaName } = schemaType.components
	const [wrapperPageParentPath, setWrapperPageParentPath] = useState<string>('')
	const [editorTopicParentPath, setEditorTopicParentPath] = useState<string>('')
	const [informationArticlePath, setnformationArticlePath] =
		useState<string>('')
	const [automaticContent, setAutomaticContent] = useState<string>('')

	useEffect(() => {
		const fetchWrapperPage = async () => {
			const query = `*[ _type == "wrapperPage" && slug.current == $slug ] {
        automaticContent,
        'parent': parent->slug.current,

      }`

			const params = { slug: value.current }

			const data = await client.fetch(query, params)
			setAutomaticContent(data[0]?.automaticContent || '')
			setWrapperPageParentPath(data[0]?.parent || '')
		}

		if (schemaName === 'wrapperPage') {
			fetchWrapperPage()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		const fetchEditorTopicPage = async () => {
			const query = `*[ _type == "editorTopic" && slug.current == $slug ] {
        'parent': parent->slug.current,
      }`

			const params = { slug: value.current }

			const data = await client.fetch(query, params)
			setEditorTopicParentPath(data[0]?.parent || '')
		}

		if (schemaName === 'editorTopic') {
			fetchEditorTopicPage()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		const fetchInformationArticlePage = async () => {
			const query = `*[ _type == "informationArticle" && slug.current == $slug ] {
        'parent': parent->slug.current,
      }`

			const params = { slug: value.current }

			const data = await client.fetch(query, params)
			setnformationArticlePath(data[0]?.parent || '')
		}

		if (schemaName === 'informationArticle') {
			fetchInformationArticlePage()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const schemaNameToUrlPrefix: { [key: string]: string } = {
		grant: 'utlysninger-og-tilskudd',
		event: 'arrangementer',
		resource: 'ressurser',

		research: 'rapporter-undersokelser-og-statistikk',
		newsArticle: 'aktuelt',
		project: 'prosjekteksempler',
		program: 'programmer-og-tilskuddsordninger',
	}

	let relativeURL = schemaNameToUrlPrefix[schemaName]

	if (relativeURL) {
		relativeURL = `${relativeURL}/${value.current}`
	} else if (schemaName === 'editorTopic') {
		relativeURL = editorTopicParentPath
			? `${editorTopicParentPath}/${value.current}`
			: `${value.current}`
	} else if (schemaName === 'informationArticle') {
		relativeURL = informationArticlePath
			? `${informationArticlePath}/${value.current}`
			: `${value.current}`
	} else if (schemaName === 'wrapperPage') {
		const automaticContentPaths = [
			'approvalBodies',
			'documentationRequirements',
			'professions',
		]

		if (automaticContentPaths.includes(automaticContent)) {
			relativeURL = `${wrapperPageParentPath}/${value.current}`
		} else {
			relativeURL = `${value.current}`
		}
	} else {
		relativeURL = `${value.current}`
	}

	let frontendBaseUrl

	if (import.meta.env.DEV) {
		frontendBaseUrl = 'http://localhost:3000'
	} else if (import.meta.env.PROD) {
		switch (import.meta.env.PROD_URL_TYPE) {
			case 'epluss':
				frontendBaseUrl = 'https://hkdirepluss-prod.azurewebsites.net'
				break
			case 'web':
				frontendBaseUrl = 'https://hkdir.no'
				break
			case 'fr':
				frontendBaseUrl = 'https://hkdirefr-prod.azurewebsites.net'
				break
			default:
				frontendBaseUrl = 'https://hkdir.no'
				break
		}
	}

	return (
		<Flex padding={2}>
			<Card flex={1}>{renderDefault(props)}</Card>
			{relativeURL && (
				<Tooltip
					content={
						<Box padding={2}>
							<Text muted size={1} style={{ minWidth: 'max-content' }}>
								Åpne lenke i ny fane
							</Text>
						</Box>
					}
					placement="top"
					portal
				>
					<Button
						as="a"
						target="_blank"
						href={`${frontendBaseUrl}/${relativeURL}`}
						icon={LaunchIcon}
						mode="ghost"
						aria-label="Copy URL"
						onMouseDown={() => {}}
					/>
				</Tooltip>
			)}
		</Flex>
	)
}

export default SlugInputHkdir
