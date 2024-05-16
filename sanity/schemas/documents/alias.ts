import { FiRepeat } from 'react-icons/fi';
import ParentReferenceTypes from '../../constants/parentArray';
import { siteLocale } from '../../utils/schemaSnippets';
import { PathGeneratorComponent } from '../../Components/PathGeneratorComponent';
import { RuleType } from '../../utils/validation';

export default {
  name: 'alias',
  title: 'Alias URL',
  type: 'document',
  icon: FiRepeat,
  fields: [
    siteLocale,
    {
      name: 'slug',
      title: 'Alias slug',
      type: 'slug',
      // If any document with no parent has the same slug, throw an error message
      validation: (Rule: RuleType) => [
        Rule.required(),
        Rule.custom(async (slug, context) => {
          const {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            parent: { _id },
          } = context;
          const { getClient } = context;
          const client = getClient({ apiVersion: '2021-03-25' });

          const homePageIds = [
            'homepage',
            'homepage_no',
            'homepage_en',
            'ePlussHomepage_no',
            'frHomepage_no',
            'pk_homepage',
          ];

          const slugExists = await client.fetch('*[parent._ref in $homePageIds && path == $path]', {
            path: `/${slug.current}`,
            id: _id,
            homePageIds,
          });
          if (slugExists.length > 0) {
            return 'Denne slugen finnes allerede';
          }
          return true;
        }),
      ],
    },
    {
      name: 'path',
      title: 'Fullpath',
      type: 'string',
      readOnly: true,
      components: {
        input: PathGeneratorComponent,
      },
    },
    {
      name: 'destination',
      title: 'Peker til',
      type: 'reference',
      to: ParentReferenceTypes,
    },
  ],
  preview: {
    select: {
      slug: 'slug.current',
      path: 'destination.path',
    },
    prepare({ slug, path }: any) {
      return {
        title: `/${slug}`,
        subtitle: `-> ${path}`,
      };
    },
  },
};
