import { FiRepeat as icon } from 'react-icons/fi';

export const redirectHas = {
  title: 'Has',
  name: 'has',
  type: 'object',
  fields: [
    {
      title: 'Type',
      description: 'Must be either header, cookie, host, or query.',
      name: 'type',
      type: 'string',
      options: {
        list: [
          { title: 'Header', value: 'header' },
          { title: 'Cookie', value: 'cookie' },
          { title: 'Query', value: 'query' },
        ],
      },
    },
    {
      title: 'Key',
      description: 'The key from the selected type to match against.',
      name: 'key',
      type: 'string',
    },
    {
      title: 'Value',
      description:
        'The value to check for, if undefined any value will match. A regex like string can be used to capture a specific part of the value, e.g. if the value first-(?<paramName>.*) is used for first-second then second will be usable in the destination with :paramName.',
      name: 'value',
      type: 'string',
    },
  ],
};

interface PreviewProps {
  from: string;
  to: string;
  isPermanent: boolean;
}

export const redirect = {
  title: 'Redirect',
  name: 'redirect',
  type: 'document',
  icon,
  fields: [
    {
      title: 'From',
      description:
        'The incoming request path pattern. Path matches are allowed, for example /old-blog/:slug will match /old-blog/hello-world. To match a regex path you can wrap the regex in parenthesis after a parameter, for example /post/:slug(\\d{1,}) will match /post/123 but not /post/abc',
      name: 'source',
      type: 'string',
    },
    {
      title: 'Has',
      description:
        'To only match a redirect when header, cookie, or query values also match the has field can be used. Both the source and all has items must match for the redirect to be applied.',
      name: 'has',
      type: 'array',
      of: [{ type: 'has' }],
    },
    {
      title: 'To',
      description: 'The path you want to route to',
      name: 'destination',
      type: 'string',
    },
    {
      title: 'Is Permanent?',
      description: '',
      name: 'isPermanent',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      to: 'to',
      from: 'from',
      isPermanent: 'isPermanent',
    },
    prepare({ from, to, isPermanent }: PreviewProps) {
      return {
        title: from && to ? `(${from}) → (${to})` : 'New Redirect',
        subtitle: isPermanent ? '301' : '302',
      };
    },
  },
};

export default redirect;
