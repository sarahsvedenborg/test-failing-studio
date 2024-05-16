import { RuleType } from '../../utils/validation';

export default {
  name: 'projectShortVersion',
  title: 'Kortversjon av prosjektet',
  type: 'object',
  fields: [
    {
      name: 'responsible',
      title: 'Ansvarlig for prosjektet',
      type: 'string',
    },
    {
      name: 'timeFrom',
      title: 'Tid fra',
      type: 'number',
      validation: (Rule: RuleType) => Rule.required(),
    },
    {
      name: 'timeTo',
      title: 'Tid til',
      type: 'number',
    },

    {
      name: 'discipline',
      title: 'Fagområde',
      type: 'string',
      validation: (Rule: RuleType) => Rule.required(),
    },
    {
      name: 'partners',
      title: 'Samarbeidspartnere',
      type: 'string',
    },
    {
      name: 'allocatedFunds',
      title: 'Tildelte midler',
      type: 'string',
    },
  ],
};
