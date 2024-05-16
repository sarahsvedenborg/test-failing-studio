import { RuleType } from '../../utils/validation';

export default {
  name: 'reusableText',
  title: 'Gjenbrukbar tekst',
  type: 'document',
  fields: [
    {
      name: 'body',
      title: 'Brødtekst',
      type: 'blockContentComplex',
      Validation: (Rule: RuleType) => Rule.required(),
    },
  ],
};
