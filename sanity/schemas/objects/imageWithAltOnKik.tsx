import { BiImage as icon } from 'react-icons/bi';
import { RuleType } from '../../utils/validation';

interface ContextType {
  parent?: {
    size?: string;
  };
}

export default {
  name: 'imageWithAltOnKik',
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
          { title: 'Stor', value: 'large' },
          { title: 'Medium', value: 'medium' },
          { title: 'Liten', value: 'small' },
        ],
      },
    },
    {
      name: 'alignment',
      title: 'Align to',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          { title: 'Venstre', value: 'left' },
          { title: 'Høyre', value: 'right' },
        ],
      },
      hidden: ({ parent }: ContextType) => parent?.size !== 'small',
    },
    {
      name: 'fitStyle',
      title: 'Image Fit Style',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          { title: 'Tilpass til beholderen', value: 'fit', default: true },
          { title: 'Fill container', value: 'fill' },
        ],
      },
      description: 'Velg hvordan bildet skal tilpasses i beholderen sin.',
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
      description: 'Kort, beskrivende tekst som skjermlesere leser opp',
      type: 'string',
      hidden: ({ parent }: { parent: { isPresentational: boolean } }) => parent?.isPresentational,
      validation: (rule: RuleType) =>
        rule.custom((value, context) => {
          if (
            context?.parent?.isPresentational ||
            !context?.document?.onKik ||
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
    {
      name: 'kikBodySimple',
      title: 'Brødtekst',
      type: 'kikBlockContentSimple',
    },
    {
      name: 'caption',
      title: 'Bildetekst',
      type: 'text',
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
