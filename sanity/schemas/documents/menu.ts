import { siteLocale } from '../../utils/schemaSnippets';

export default {
  name: 'menu',
  title: 'Hovedmeny',
  type: 'document',
  fields: [
    siteLocale,
    {
      name: 'disciplineItemTitle',
      title: 'Menypunkttittel for fagmiljø',
      type: 'string',
    },
    {
      name: 'knowledgeInsight',
      title: 'Kunnskap og innsikt',
      description: 'Under eventuelle redaktørstyrte menypunkt vil alle tema listes ut.',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Menypunkttittel for "Kunnskap og innsikt"',
          type: 'string',
        },
        {
          name: 'flexibleItems',
          title: 'Redaktørstyrte menypunkter',
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
            },
          ],
        },
      ],
    },
    {
      name: 'grantEventTitle',
      title: 'Menypunkttittel for "Utlysninger og arrangementer"',
      type: 'string',
    },
    {
      name: 'tabs',
      title: 'Øvrige menypunkter',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Tittel på fane',
              type: 'string',
            },
            {
              name: 'options',
              title: 'Én lenke eller undermeny',
              type: 'string',
              options: {
                list: [
                  { title: 'Èn lenke', value: 'singleLink' },
                  { title: 'Undermeny med kolonner', value: 'multipleLinks' },
                ],
                layout: 'radio',
                direction: 'horizontal',
              },
            },
            {
              name: 'link',
              title: 'Lenke',
              type: 'reference',
              to: [{ type: 'informationArticle' }, { type: 'wrapperPage' }],
              hidden({ parent }: Menu) {
                return parent.options !== 'singleLink';
              },
              options: {
                filter: ({ document }: { document: { siteLocale: string } }) => {
                  const { siteLocale: locale } = document;

                  if (siteLocale) {
                    return {
                      filter: 'siteLocale == $siteLocale',
                      params: { siteLocale: locale },
                    };
                  }
                  return '';
                },
              },
            },
            {
              name: 'links',
              title: 'Kolonner',
              type: 'array',
              of: [{ type: 'menuItemContent' }],
              hidden({ parent }: Menu) {
                return parent.options !== 'multipleLinks';
              },
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'menu.title',
    },
  },
};

type Menu = {
  parent: any;
};
