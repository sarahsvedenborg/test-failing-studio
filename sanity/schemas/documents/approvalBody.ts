import { MdOutlineApproval as icon } from 'react-icons/md';
import { localizedString } from '../../utils/localizedFields';

export default {
  name: 'approvalBody',
  title: 'Godkjenningsmyndighet',
  type: 'document',
  icon,
  fields: [
    localizedString({ name: 'title', title: 'Navn' }),
    {
      name: 'website',
      title: 'Nettsted',
      type: 'object',
      fields: [
        {
          name: 'no',
          title: 'Norsk',
          type: 'url',
        },
        {
          name: 'en',
          title: 'Engelsk',
          type: 'url',
        },
      ],
    },
    {
      name: 'phone',
      title: 'Telefonnummer',
      type: 'object',
      fields: [
        {
          name: 'no',
          title: 'Norsk',
          type: 'string',
        },
        {
          name: 'en',
          title: 'Engelsk',
          type: 'string',
        },
      ],
    },
    {
      name: 'email',
      title: 'E-postadresse',
      type: 'object',
      fields: [
        {
          name: 'no',
          title: 'Norsk',
          type: 'email',
        },
        {
          name: 'en',
          title: 'Engelsk',
          type: 'email',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title.no',
    },
    prepare({ title }: { title: string }) {
      return { title };
    },
  },
};
