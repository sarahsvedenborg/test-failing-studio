import { FiColumns as icon } from 'react-icons/fi';

interface PreviewProps {
  title: string;
}

export default {
  name: 'tableObject',
  title: 'Table',
  type: 'object',
  icon,
  fields: [
    {
      name: 'idFromWord',
      title: 'ID fra word',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Tabelltittel',
      type: 'string',
    },
    {
      name: 'hideTitle',
      title: 'Skjul tittel i frontend',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'showCompact',
      title: 'Vis som kompakt tabell',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'description',
      title: 'Tabellbeskrivelse',
      type: 'text',
      rows: 2,
    },
    {
      name: 'source',
      title: 'Kilde',
      type: 'string',
    },
    {
      name: 'table',
      title: 'Table',
      type: 'table',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }: PreviewProps) {
      return {
        title,
        subtitle: 'Table',
      };
    },
  },
};
