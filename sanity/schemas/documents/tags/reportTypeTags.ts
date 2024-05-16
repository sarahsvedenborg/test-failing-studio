export default {
  name: 'reportTypeTags',
  title: 'Rapporter og andre publikasjoner tags',
  type: 'document',
  fields: [
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string', readOnly: true }],
    },
  ],
};
