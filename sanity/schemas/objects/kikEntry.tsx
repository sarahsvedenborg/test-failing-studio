export const kikEntry = {
  name: 'kikEntry',
  title: 'Kik inngang',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Tittel',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Beskrivelse',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Bilde',
      type: 'imageWithAltBasic',
    },
    {
      name: 'link',
      title: 'Lenke',
      type: 'link',
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
};

export default {
  name: 'kikEntries',
  title: 'Kik innganger',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Tittel',
      type: 'string',
    },
    {
      name: 'kikEntries',
      title: 'Kik innganger',
      type: 'array',
      of: [{ type: 'kikEntry' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
};
