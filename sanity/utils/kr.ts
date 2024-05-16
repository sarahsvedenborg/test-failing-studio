import { SanityDocument } from 'sanity';

export const krLocales = [
  {
    title: 'Norsk',
    name: 'no',
  },
  {
    title: 'Engelsk',
    name: 'en',
  },
];

export const dialectSwitch = {
  name: 'contentLocale',
  title: 'Målform',
  type: 'string',
  initialValue: 'nb_NO',
  options: {
    list: [
      { title: 'Bokmål', value: 'nb_NO' },
      { title: 'Nynorsk', value: 'nn_NO' },
    ],
    layout: 'radio',
    direction: 'horizontal',
  },
};

type SanityObjectType = {
  name: string;
  title: string;
  type: string;
  group: string;
  fields: object[];
  fieldsets?: {
    name: string;
    title: string;
    options?: {
      collapsible?: boolean;
      collapsed?: boolean;
    };
  }[];
  hidden: (context: { document: SanityDocument }) => boolean;
};

export const localizeFields = (
  fields: object[],
  fieldsets?: {
    name: string;
    title: string;
    options?: {
      collapsible?: boolean;
      collapsed?: boolean;
    };
  }[],
  dialect = true,
) => {
  let localizedFields;

  return krLocales.map((locale) => {
    if (dialect) {
      localizedFields = locale.name === 'no' ? [dialectSwitch, ...fields] : fields;
    } else {
      localizedFields = fields;
    }

    const resultObject: SanityObjectType = {
      name: locale.name,
      title: locale.title,
      type: 'object',
      group: locale.name,
      fields: localizedFields,
      hidden: ({ document }: { document: SanityDocument }) => {
        if (document.website === 'erih' && locale.name === 'no') {
          return true;
        }
        return false;
      },
    };

    if (fieldsets) {
      resultObject.fieldsets = fieldsets;
    }

    return resultObject;
  });
};
