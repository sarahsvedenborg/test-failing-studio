import { BiImage as icon } from 'react-icons/bi';
import { RuleType } from '../../utils/validation';

export default {
  name: 'imageWithAltBasic',
  title: 'Image',
  type: 'image',
  icon,
  options: {
    hotspot: true,
    metadata: ['lqip', 'palette'],
  },
  fields: [
    {
      name: 'isPresentational',
      title: 'Bare til dekorasjon',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'alt',
      title: 'Alt-tekst',
      description: 'Kort, beskrivende teskt som skjermlesere leser opp',
      type: 'string',
      hidden: ({ parent }: { parent: { isPresentational: boolean } }) => parent?.isPresentational,
      validation: (rule: RuleType) =>
        rule.custom((value, context) => {
          if (
            context?.parent?.isPresentational ||
            (!context?.document?.mainImage?.asset && !context?.parent?.asset)
          ) {
            return true;
          }
          if (!value && !context?.parent?.isPresentational) {
            return 'Alt-tekst er påkrevd når bildet er meningsbærende.';
          }
          return true;
        }),
    },
  ],
  preview: {
    select: {
      media: 'asset',
    },
    prepare({ title, media }: { title: string; media: any }) {
      return {
        title,
        media,
      };
    },
  },
};
