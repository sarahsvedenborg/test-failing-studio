import { BiInfoCircle as icon } from 'react-icons/bi';
import { siteLocale, localeField } from '../../utils/schemaSnippets';

export default {
  name: 'factBox',
  title: 'Faktaboks',
  type: 'document',
  icon,
  fields: [
    siteLocale,
    localeField,
    {
      name: 'title',
      title: 'Tittel',
      type: 'string',
    },
    {
      name: 'body',
      title: 'Brødtekst',
      type: 'blockContentComplex',
    },
  ],
};
