import { BsCardText } from 'react-icons/bs';
import { localeField, siteLocale } from '../../utils/schemaSnippets';
import { RuleType } from '../../utils/validation';

export default {
  name: 'standardText',
  title: 'Standardtekst',
  type: 'document',
  icon: BsCardText,

  fields: [
    siteLocale,
    localeField,
    {
      name: 'title', // Not visiable in frontend
      title: 'Tittel',
      type: 'string',
      description: 'Tittel på standardteksten for gjenfinning i sanity studio',
      Validation: (Rule: RuleType) => Rule.required(),
    },
    {
      name: 'body',
      title: 'Brødtekst',
      type: 'blockContentComplex',
      Validation: (Rule: RuleType) => Rule.required(),
    },
  ],
};
