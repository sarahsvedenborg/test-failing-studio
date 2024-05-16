import { Rule as IRule } from 'sanity';
import { RuleType } from './validation';

export const localeField = {
  name: 'contentLocale',
  title: 'Målform',
  type: 'string',
  options: {
    list: [
      { title: 'Bokmål', value: 'nb_NO' },
      { title: 'Nynorsk', value: 'nn_NO' },
    ],
    layout: 'radio',
    direction: 'horizontal',
  },
  hidden: ({ document }: { document: { siteLocale: string } }) => {
    return document?.siteLocale !== 'no';
  },
  validation: (Rule: RuleType) =>
    Rule.custom((contentLocale, context) => {
      const {
        document: { siteLocale },
      } = context;
      if (!contentLocale && siteLocale === 'no') {
        return 'Målform er påkrevd.';
      }
      return true;
    }),
};

export const siteLocale = {
  name: 'siteLocale',
  title: 'Språk',
  type: 'string',
  options: {
    list: [
      { title: 'Norsk', value: 'no' },
      { title: 'Engelsk', value: 'en' },
    ],
    layout: 'radio',
    direction: 'horizontal',
  },
  validation: (Rule: IRule) => Rule.required(),
};

export default localeField;
