import { RuleType, timeValidation, compareTime } from '../../utils/validation';

export default {
  name: 'eventProgram',
  title: 'Arrangement Program',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Tittel programpost',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Beskrivelse',
      type: 'blockContentComplex',
    },
    {
      name: 'timeFrom',
      title: 'Programposten begynner kl (hh:mm)',
      placeholder: 'e.g. 00:00',
      type: 'string',
      validation: timeValidation,
    },
    {
      name: 'timeTo',
      title: 'Programposten slutter kl (hh:mm)',
      placeholder: 'e.g. 00:00',
      type: 'string',
      validation: (Rule: RuleType) =>
        Rule.custom((timetoTest: string, context) => {
          if (compareTime(context.parent.timeFrom, timetoTest) !== 2) {
            return 'Tidspunkt for slutt må være etter tidspunkt for start';
          }
          return true;
        }),
    },
  ],

  preview: {
    select: {
      title: 'title',
      timeFrom: 'timeFrom',
      timeTo: 'timeTo',
    },
    prepare(selection: { title: string; timeFrom: string; timeTo: string }) {
      const { title, timeFrom, timeTo } = selection;
      return {
        title,
        subtitle: timeFrom && timeTo ? `${timeFrom} - ${timeTo}` : '',
      };
    },
  },
};
