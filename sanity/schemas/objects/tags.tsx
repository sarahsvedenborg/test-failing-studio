export const disciplineTags = ({ group }: { group: string }) => ({
  name: 'disciplineTags',
  title: 'Fagmiljø',
  type: 'array',
  group,
  of: [{ type: 'string' }],
  // inputComponent: MultiSelect({ options: Object.values(disciplines) }),
});

export const crossAreaTags = ({ group }: { group: string }) => ({
  name: 'crossAreaTags',
  title: 'Tema',
  type: 'array',
  group: 'meta',
  of: [{ type: 'string' }],
  // inputComponent: MultiSelect({ options: Object.values(crossAreas) }),
});

export const resourceFormatTags = ({ group }: { group: string }) => ({
  name: 'resourceFormatTags',
  title: 'Ressursformater',
  type: 'array',
  group: 'meta',
  of: [{ type: 'string' }],
  // inputComponent: MultiSelect({ options: Object.values(resourceFormats) }),
});

export default disciplineTags;
