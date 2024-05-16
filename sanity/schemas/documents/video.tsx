import { BiFilm as defaultVideoIcon } from 'react-icons/bi';
import { getVideoIcon } from '../../utils/Icons';
import { localeField, siteLocale } from '../../utils/schemaSnippets';
import { RuleType } from '../../utils/validation';

export default {
  name: 'video',
  title: 'Video',
  type: 'document',
  icon: defaultVideoIcon,
  fields: [
    siteLocale,
    localeField,
    {
      name: 'title',
      title: 'Tittel for skjermlesere',
      type: 'string',
      Validation: (Rule: RuleType) => Rule.required(),
    },
    {
      name: 'source',
      title: 'Hvor kommer videoen fra?',
      type: 'string',
      options: {
        list: [
          { title: 'Panopto', value: 'panopto' },
          { title: 'Youtube', value: 'youtube' },
          { title: 'Qbrick', value: 'qbrick' },
        ],
        layout: 'radio',
        direction: 'horizontal',

        initialValue: 'panopto',
      },
    },
    {
      name: 'panoptoURL',
      title: 'Video lenke (fra Panopto)',
      type: 'string',
      hidden: ({ parent }: { parent: { source: string } }) => {
        return parent?.source !== 'panopto';
      },
    },
    {
      name: 'youtubeURL',
      title: 'Video lenke (fra Youtube)',
      type: 'string',
      hidden: ({ parent }: { parent: { source: string } }) => parent?.source !== 'youtube',
    },
    {
      name: 'qbrickURL',
      title: 'Video lenke (fra Qbrick)',
      type: 'string',
      hidden: ({ parent }: { parent: { source: string } }) => parent?.source !== 'qbrick',
    },
  ],
  preview: {
    select: {
      title: 'title',
      url: 'videoURL',
      source: 'source',
    },
    prepare: ({ title, source }: { title: string; source: string }) => {
      return { title, media: getVideoIcon(source) };
    },
  },
};
