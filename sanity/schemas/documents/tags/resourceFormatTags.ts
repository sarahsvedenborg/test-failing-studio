export default {
  name: 'resourceFormatTags',
  title: 'Ressursformater tags',
  type: 'document',
  fields: [
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string', readOnly: true }],
      options: {
        layout: 'tags',
      },
    },
  ],
};
