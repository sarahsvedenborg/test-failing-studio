import { filterOnLanguage } from '../../utils/filterOnLanguage';

export default {
  name: 'focusArea',
  title: 'Satsningsområde',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'body',
      title: 'Brødtekst',
      type: 'blockContentComplex',
    },
    {
      name: 'contact',
      title: 'For spørsmål om satsningsområdet, ta kontakt med',
      type: 'reference',
      to: [{ type: 'contact' }],
      options: {
        filter: filterOnLanguage,
      },
    },
  ],
};
