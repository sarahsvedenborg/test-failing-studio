export const pkLocales = [
  {
    title: 'Bokmål',
    name: 'nb_NO',
  },
  {
    title: 'Nynorsk',
    name: 'nn_NO',
  },
  {
    title: 'Engelsk',
    name: 'en',
  },
];

export const localizeFields = (fields: unknown) => {
  return pkLocales.map((locale) => ({
    name: locale.name,
    title: locale.title,
    type: 'object',
    group: locale.name,
    fields,
  }));
};
