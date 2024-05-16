import { FiSettings as icon } from 'react-icons/fi';

export default {
  name: 'generalSettings',
  type: 'document',
  title: 'General Settings',
  icon,
  fields: [
    {
      name: 'domain',
      type: 'url',
      title: 'Domain',
      description: 'The root domain or subdomain of your website.',
    },
    {
      name: 'copyright',
      type: 'string',
      title: 'Copyright',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'General Settings',
      };
    },
  },
};
