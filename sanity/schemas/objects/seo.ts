interface ValidationProps {
  max: (text: number) => {
    warning: (text: string) => void;
  };
}

export default {
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    {
      name: 'disallowRobots',
      type: 'boolean',
      title: 'Hide page from search engines',
      description: 'NB: If the global option is turned on, this will not have any effect',
      initialValue: false,
    },
    {
      name: 'disableSuffix',
      type: 'boolean',
      title: 'Hide suffix from title',
      description: 'Remove the text behind | from the title',
      initialValue: false,
    },

    {
      name: 'title',
      title: 'SEO title',
      type: 'string',
      description: 'The name of your site, usually your company/brand name.',
      validation: (Rule: ValidationProps) =>
        Rule.max(50).warning('Longer titles may be truncated by search engines'),
    },
    {
      name: 'description',
      title: 'SEO description',
      type: 'string',
      description: 'Description for search engines.',
      validation: (Rule: ValidationProps) =>
        Rule.max(150).warning('Longer descriptions may be truncated by search engines'),
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'image',
      title: 'SEO image',
      type: 'image',
      description: 'Share graphics will be cropped to 1200x630',
    },
  ],
};
