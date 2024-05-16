export default {
  name: 'aboutProject',
  title: 'Om prosjektet',
  type: 'object',
  fields: [
    {
      name: 'body',
      title: 'Brødtekst',
      type: 'blockContentComplex',
    },
    {
      name: 'background',
      title: 'Bakgrunn',
      type: 'blockContentComplex',
    },
    {
      name: 'participants',
      title: 'Om deltakerne',
      type: 'blockContentComplex',
    },
    {
      name: 'activities',
      title: 'Aktivitetene',
      type: 'blockContentComplex',
    },
    {
      name: 'results',
      title: 'Resultatene',
      type: 'blockContentComplex',
    },
    {
      name: 'advice',
      title: 'Råd til andre',
      type: 'blockContentComplex',
    },
  ],
};
