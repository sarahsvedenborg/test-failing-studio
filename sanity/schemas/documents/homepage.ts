import { BiHome as icon } from 'react-icons/bi';
import { filterOnLanguage } from '../../utils/filterOnLanguage';
import { siteLocale } from '../../utils/schemaSnippets';
import { seo } from '../objects/seoModule';

export const emphasisedTopic = {
  name: 'emphasisedTopic',
  title: 'Fremhevet tema',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'tittel',
      type: 'string',
    },
    {
      name: 'excerpt',
      title: 'Ingress',
      type: 'text',
    },
    {
      name: 'link',
      title: 'Lenke til',
      type: 'link',
    },
  ],
};

export const shortcut = {
  name: 'shortcut',
  title: 'Snarvei',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Tittel',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Beskrivelse',
      type: 'string',
    },
    {
      name: 'icon',
      title: 'Ikon',
      type: 'image',
      readOnly: true,
      // readOnly: import.meta.env.MODE === 'production',
    },
    {
      name: 'linkTo',
      title: 'Snarvei går til',
      type: 'link',
    },
  ],
};

export const statistic = {
  name: 'statistic',
  title: 'Statistikkelement',
  type: 'object',
  fields: [
    {
      name: 'number',
      title: 'Fremhevet tall',
      type: 'string',
    },
    {
      name: 'fact',
      title: 'Fakta',
      type: 'string',
    },
  ],
};

export default {
  name: 'homepage',
  title: 'Forside',
  type: 'document',
  icon,
  fields: [
    siteLocale,
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
      name: 'disciplines',
      title: 'Fagmiljø',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Tittel',
          type: 'string',
        },
        {
          name: 'disciplineArray',
          title: 'Liste av fagmiljø',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: { type: 'discipline' },
              options: {
                filter: filterOnLanguage,
              },
            },
          ],
        },
      ],
    },
    {
      name: 'shortcuts',
      title: 'Snarveier',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Tittel',
          type: 'string',
        },
        {
          name: 'shortcutArray',
          title: 'Liste av snarveier',
          type: 'array',
          of: [{ type: 'shortcut' }],
        },
      ],
    },
    {
      name: 'statistics',
      title: 'Statistikk',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Tittel',
          type: 'string',
        },
        {
          name: 'statisticArray',
          title: 'Liste av statistikkelementer',
          type: 'array',
          description: 'Maksimalt antall siffer(7): 1 000 000',
          of: [{ type: 'statistic' }],
        },
        {
          name: 'readMoreLink',
          title: 'Lenke til mer statistikk',
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Lenketekst',
              type: 'string',
            },
            {
              name: 'link',
              title: 'Lenke til',
              type: 'link',
            },
          ],
        },
      ],
    },
    {
      name: 'highlightedTopics',
      title: 'Fremhevede tema',
      type: 'array',
      of: [{ type: 'emphasisedTopic' }],
    },
    seo({}),
  ],
};
