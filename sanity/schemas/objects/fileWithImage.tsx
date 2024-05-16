export default {
  name: 'fileWithImage',
  title: 'File with Image',
  type: 'object',
  fields: [
    {
      name: 'file',
      title: 'Fil',
      type: 'file',
    },
    {
      name: 'image',
      title: 'Bilde',
      type: 'image',
    },
  ],
  preview: {
    select: {
      title: 'file.asset.originalFilename',
    },
  },
};
