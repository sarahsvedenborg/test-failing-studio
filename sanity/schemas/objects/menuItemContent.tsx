export default {
  name: 'menuItemContent',
  title: 'Menypunktinnhold',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Tittel på kolonne',
      description: 'Denne må fylles ut for alt som ikke er "interne" sider',
      type: 'string',
    },
    {
      name: 'targetPage',
      title: 'Landingsside for kolonne',
      type: 'link',
    },
    {
      name: 'option',
      title: 'Består av',
      type: 'string',
      options: {
        list: [
          { title: 'Lenker', value: 'links' },
          { title: 'Beksrivelse', value: 'description' },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'description',
      title: 'Beksrivelse',
      type: 'text',
      hidden({ parent }: HiddenProps) {
        return parent?.option !== 'description';
      },
    },
    {
      name: 'links',
      title: 'Lenker',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Alternativ tittel på lenke',
              type: 'string',
            },
            {
              name: 'link',
              title: 'Lenke',
              type: 'reference',
              to: [
                { type: 'informationArticle' },
                { type: 'editorTopic' },
                { type: 'wrapperPage' },
              ],
              options: {
                filter: ({ document }: { document: { siteLocale: string } }) => {
                  const { siteLocale } = document;

                  if (siteLocale) {
                    return {
                      filter: 'siteLocale == $siteLocale',
                      params: { siteLocale },
                    };
                  }
                  return '';
                },
              },
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'link.title',
            },
            prepare({ title, subtitle }: { title: string; subtitle: string }) {
              return {
                title: title || subtitle,
                subtitle,
              };
            },
          },
        },
      ],
      hidden({ parent }: HiddenProps) {
        return parent?.option !== 'links';
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      option: 'option',
    },
    prepare({ title, option }: MenuItemContentProps) {
      return {
        title,
        subtitle: option,
      };
    },
  },
};

type MenuItemContentProps = {
  title: string;
  option: string;
};

type HiddenProps = {
  parent: {
    option: string;
  };
};
