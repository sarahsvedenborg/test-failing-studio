import { BiImage as icon } from 'react-icons/bi';
import { RuleType } from '../../utils/validation';

export default {
  name: 'imageWithAlt',
  title: 'Image',
  type: 'image',
  icon,
  options: {
    hotspot: true,
    metadata: ['lqip', 'palette'],
  },
  fields: [
    {
      name: 'credits',
      title: 'Fotograf',
      type: 'string',
    },
    {
      name: 'size',
      title: 'Størrelse',
      type: 'string',
      options: {
        layout: 'radio',
        initialValue: 'standard',
        list: [
          { title: 'Automatisk', value: 'standard' },
          {
            title: 'Behold bildets dimensjoner (brukes kun når helt nødvendig)',
            value: 'large',
          },
        ],
      },
    },
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
          if (context.parent.asset && !value && !context?.parent?.isPresentational) {
            return 'Alt-tekst er påkrevd når bildet er meningsbærende.';
          }
          return true;
        }),
    },
    {
      name: 'caption',
      title: 'Bildetekst',
      type: 'text',
      rows: 3,
    },
    {
      name: 'base64',
      title: 'base64 (brukes av rapporter som er automatisk generert fra word-filer)',
      type: 'text',
      rows: 5,
    },
  ],
  preview: {
    select: {
      title: 'caption',
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
