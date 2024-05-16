import { FiTwitter as icon } from 'react-icons/fi';

export default {
  name: 'socialMediaSettings',
  type: 'document',
  icon,
  title: 'Social Media',
  fields: [
    /*     { name: 'socialMedia', title: 'Social media', type: 'socialMedia' }, */
    { name: 'title', title: 'Temporary field title', type: 'string' },
  ],
  preview: {
    prepare() {
      return {
        title: 'Social Media',
      };
    },
  },
};
