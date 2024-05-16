export default {
  name: 'seoSettings',
  type: 'document',
  title: 'Default SEO / Share',
  fields: [
    {
      name: 'seo',
      type: 'seo',
      title: 'SEO',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Default SEO / Share',
      };
    },
  },
};
