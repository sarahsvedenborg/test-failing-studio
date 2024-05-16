import link from '../objects/link';

export default {
  title: 'Block Content',
  name: 'kikBlockContentSimple',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      // Styles let you set what your user can mark up blocks with. These
      // correspond with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Nivå 1', value: 'h1' },
        { title: 'Nivå 2', value: 'h2' },
        { title: 'Nivå 3', value: 'h3' },
        { title: 'Nivå 4', value: 'h4' },
        /*      { title: 'Quote', value: 'blockquote' }, */
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [{ title: 'Strong', value: 'strong' }],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [link],
      },
    },
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
  ],
};
