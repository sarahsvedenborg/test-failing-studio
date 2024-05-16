import { RiSuperscript2 } from 'react-icons/ri';

export default {
  name: 'footnote',
  title: 'Fotnote',
  type: 'object',
  icon: RiSuperscript2,
  fields: [
    {
      name: 'anchorId',
      title: 'ID',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Fotnote',
      type: 'blockContentSimple',
    },
  ],
};
