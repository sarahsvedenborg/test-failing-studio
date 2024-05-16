import link from '../objects/link';

export default {
  title: 'Block Content',
  name: 'blockContentSimple',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      styles: [{ title: 'Normal', value: 'normal' }],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Strong EM', value: 'em' },
        ],
        annotations: [link],
      },
    },
  ],
};
