import { BiPodcast as PodbeanIcon } from 'react-icons/bi';
import { getPodcastIcon } from '../../utils/Icons';
import { localeField, siteLocale } from '../../utils/schemaSnippets';
import { RuleType } from '../../utils/validation';

export default {
  name: 'podcast',
  title: 'Podcast',
  type: 'document',
  icon: PodbeanIcon,
  fields: [
    siteLocale,
    localeField,
    {
      name: 'title',
      title: 'Tittel for skjermlesere',
      type: 'string',
      validation: (Rule: RuleType) => Rule.required(),
    },
    {
      name: 'source',
      title: 'Hvor kommer podcasten fra?',
      type: 'string',
      options: {
        list: [
          { title: 'Podbean', value: 'podbean' },
          { title: 'Spotify Podcast', value: 'spotifyPodcast' },
        ],
        layout: 'radio',
        direction: 'horizontal',
        initialValue: 'spotifyPodcast',
      },
    },
    {
      name: 'spotifyURL',
      title: 'Embed url fra Spotify',
      type: 'string',
      validation: (Rule: RuleType) =>
        Rule.custom((fieldValue, context) => {
          if (context.document.source === 'spotifyPodcast' && !fieldValue) {
            return 'Spotify podcast URL er påkrevd';
          }
          return true;
        }),
      hidden: ({ parent }: { parent: { source: string } }) => parent?.source !== 'spotifyPodcast',
    },
    {
      name: 'podbeanURL',
      title: 'Embed url fra Podbean',
      type: 'string',
      validation: (Rule: RuleType) =>
        Rule.custom((fieldValue, context) => {
          if (context.document.source === 'podbean' && !fieldValue) {
            return 'Podbean URL er påkrevd';
          }
          return true;
        }),
      hidden: ({ parent }: { parent: { source: string } }) => parent?.source !== 'podbean',
    },
  ],
  preview: {
    select: {
      title: 'title',
      source: 'source',
    },
    prepare: ({ title, source }: { title: string; source: string }) => {
      return {
        title,
        media: getPodcastIcon(source),
      };
    },
  },
};
