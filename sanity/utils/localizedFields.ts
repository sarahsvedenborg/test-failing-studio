export const localizedString = ({ name, title }: { name: string; title: string }) => ({
  name,
  title,
  type: 'object',
  fields: [
    {
      name: 'no',
      title: 'Norsk',
      type: 'string',
      hidden: ({ document }: { document: { showLanguages: string } }) =>
        document?.showLanguages === 'Engelsk',
    },
    {
      name: 'en',
      title: 'Engelsk',
      type: 'string',
      hidden: ({ document }: { document: { showLanguages: string } }) =>
        document?.showLanguages === 'Norsk',
    },
  ],
});

export const localizedText = ({
  name,
  title,
  fieldset,
}: {
  name: string;
  title: string;
  fieldset?: string;
}) => ({
  name,
  title,
  type: 'object',
  fieldset,
  fields: [
    {
      name: 'no',
      title: 'Norsk',
      type: 'text',
      rows: 5,
      hidden: ({ document }: { document: { showLanguages: string } }) =>
        document?.showLanguages === 'Engelsk',
    },
    {
      name: 'en',
      title: 'Engelsk',
      type: 'text',
      rows: 5,
      hidden: ({ document }: { document: { showLanguages: string } }) =>
        document?.showLanguages === 'Norsk',
    },
  ],
});

export const localizedBlockContentSimple = ({
  name,
  title,
  fieldset,
}: {
  name: string;
  title: string;
  fieldset?: string;
}) => ({
  name,
  title,
  type: 'object',
  fieldset,
  fields: [
    {
      name: 'no',
      title: 'Norsk',
      type: 'blockContentSimple',
      hidden: ({ document }: { document: { showLanguages: string } }) =>
        document?.showLanguages === 'Engelsk',
    },
    {
      name: 'en',
      title: 'Engelsk',
      type: 'blockContentSimple',
      hidden: ({ document }: { document: { showLanguages: string } }) =>
        document?.showLanguages === 'Norsk',
    },
  ],
});

export const localizedBlockContent = ({
  name,
  title,
  fieldset,
}: {
  name: string;
  title: string;
  fieldset?: string;
}) => ({
  name,
  title,
  type: 'object',
  fieldset,
  fields: [
    {
      name: 'no',
      title: 'Norsk',
      type: 'blockContentComplex',
      hidden: ({ document }: { document: { showLanguages: string } }) =>
        document?.showLanguages === 'Engelsk',
    },
    {
      name: 'en',
      title: 'Engelsk',
      type: 'blockContentComplex',
      hidden: ({ document }: { document: { showLanguages: string } }) =>
        document?.showLanguages === 'Norsk',
    },
  ],
});

export const localizedReuseText = ({
  name,
  title,
  fieldset,
}: {
  name: string;
  title: string;
  fieldset?: string;
}) => ({
  name,
  title,
  fieldset,
  type: 'object',
  fields: [
    {
      name: 'no',
      title: 'Norsk',
      type: 'reference',
      to: [{ type: 'standardText' }],
      options: {
        filter: 'siteLocale == $siteLocale',
        filterParams: { siteLocale: 'no' },
      },
      hidden: ({ document }: { document: { showLanguages: string } }) =>
        document?.showLanguages === 'Engelsk',
    },
    {
      name: 'en',
      title: 'Engelsk',
      type: 'reference',
      to: [{ type: 'standardText' }],
      options: {
        filter: 'siteLocale == $siteLocale',
        filterParams: { siteLocale: 'en' },
      },
      hidden: ({ document }: { document: { showLanguages: string } }) =>
        document?.showLanguages === 'Norsk',
    },
  ],
});
