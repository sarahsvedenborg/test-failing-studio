export default {
  title: 'Cookie Consent Settings',
  name: 'cookieSettings',
  type: 'document',
  fields: [
    {
      title: 'Message',
      name: 'message',
      type: 'text',
      rows: 2,
      description: 'Your cookie consent message.',
    },
    /*   {
      title: 'Link',
      name: 'link',
      type: 'anyLink',
      description: 'Show a link to "Learn More" about your cookie policy.',
    }, */
  ],
  preview: {
    prepare() {
      return {
        title: 'Cookie Consent Settings',
      };
    },
  },
};
