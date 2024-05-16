import { FiCreditCard as iconAccordionItem, FiServer as iconAccordion } from 'react-icons/fi';

interface PreviewProps {
  title: string;
}

export const accordionObject = {
  name: 'accordionObject',
  title: 'Accordion',
  type: 'object',
  icon: iconAccordion,
  fields: [
    {
      name: 'title',
      title: 'Title (ikke synlig i frontend)',
      type: 'string',
    },

    {
      name: 'content',
      title: 'Faner',
      type: 'array',
      of: [{ type: 'accordionItem' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }: PreviewProps) {
      return {
        title,
        subtitle: 'Accordion',
      };
    },
  },
};

export const accordionItem = {
  name: 'accordionItem',
  title: 'Accordion Item',
  type: 'object',
  icon: iconAccordionItem,
  fields: [
    {
      name: 'subtitle',
      title: 'Tittel på fanen',
      type: 'string',
    },
    {
      name: 'subcontent',
      title: 'Innhold',
      type: 'blockContentSimple',
    },
  ],
};
