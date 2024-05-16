import { CgDockBottom as icon } from 'react-icons/cg';
import { siteLocale } from '../../utils/schemaSnippets';
import { RuleType } from '../../utils/validation';

export default {
  name: 'footer',
  title: 'Footer',
  type: 'document',
  icon,
  fields: [
    siteLocale,
    {
      name: 'titleLeft',
      title: 'Tittel venstre kolonne',
      type: 'string',
      Validation: (Rule: RuleType) => Rule.required(),
    },
    {
      name: 'linksLeft',
      title: 'Lenker venstre kolonne',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Tittel',
              description: 'Denne må fylles ut for alt som ikke er "interne" sider',
              type: 'string',
            },
            {
              name: 'targetPage',
              title: 'Landingsside',
              type: 'link',
            },
          ],
          preview: {
            select: {
              title: 'title',
              targetPage: 'targetPage.target.title',
            },
            prepare({ title, targetPage }: { title: string; targetPage: string }) {
              return {
                title: title || targetPage,
              };
            },
          },
        },
      ],
    },
    {
      name: 'titleMid',
      title: 'Tittel midterste kolonne',
      type: 'string',
      Validation: (Rule: RuleType) => Rule.required(),
    },
    {
      name: 'textMiddle',
      title: 'Tekst midterste kolonne',
      type: 'string',
    },
    {
      name: 'linksMid',
      title: 'Lenker midterste kolonne',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Tittel',
              description: 'Denne må fylles ut for alt som ikke er "interne" sider',
              type: 'string',
            },
            {
              name: 'targetPage',
              title: 'Landingsside',
              type: 'link',
            },
          ],
          preview: {
            select: {
              title: 'title',
              targetPage: 'targetPage.target.title',
            },
            prepare({ title, targetPage }: { title: string; targetPage: string }) {
              return {
                title: title || targetPage,
              };
            },
          },
        },
      ],
    },
    {
      name: 'facebook',
      title: 'Facebook (lenke)',
      type: 'string',
      Validation: (Rule: RuleType) => Rule.required(),
    },
    {
      name: 'linkedIn',
      title: 'LinkedIn (lenke)',
      type: 'string',
      Validation: (Rule: RuleType) => Rule.required(),
    },
    {
      name: 'twitter',
      title: 'Twitter (lenke)',
      type: 'string',
      Validation: (Rule: RuleType) => Rule.required(),
    },
    {
      name: 'titleRight',
      title: 'Tittel høyre kolonne',
      type: 'string',
      Validation: (Rule: RuleType) => Rule.required(),
    },
    {
      name: 'linksRight',
      title: 'Lenker høyre kolonne',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Tittel',
              description: 'Denne må fylles ut for alt som ikke er "interne" sider',
              type: 'string',
            },
            {
              name: 'targetPage',
              title: 'Landingsside',
              type: 'link',
            },
          ],
          preview: {
            select: {
              title: 'title',
              targetPage: 'targetPage.target.title',
            },
            prepare({ title, targetPage }: { title: string; targetPage: string }) {
              return {
                title: title || targetPage,
              };
            },
          },
        },
      ],
    },
  ],
};
