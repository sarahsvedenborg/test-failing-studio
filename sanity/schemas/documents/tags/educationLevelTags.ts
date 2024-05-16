export default {
  name: 'educationLevelTags',
  title: 'Utdanningsnivå tags',
  type: 'document',
  readOnly: true,
  fields: [
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
};
