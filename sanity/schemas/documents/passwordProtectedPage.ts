import { BiBookOpen as icon } from 'react-icons/bi';
import { SlugInputHkdir } from '../../Components';
import { PathGeneratorComponent } from '../../Components/PathGeneratorComponent';
import { localeField, siteLocale } from '../../utils/schemaSnippets';
import { RuleType } from '../../utils/validation';
import { isUniquePathAcrossAllDocuments } from '../../utils/isUniquePathAcrossAllDocuments';

export default {
  name: 'passwordProtectedPage',
  title: 'Passordbeskyttet side',
  type: 'document',
  icon,
  groups: [
    { name: 'content', title: 'Innhold' },
    { name: 'meta', title: 'Strukturelt' },
  ],
  fields: [
    siteLocale,
    localeField,
    {
      name: 'password',
      title: 'Passord',
      type: 'string',
      group: 'content',
      validation: (Rule: RuleType) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Tittel (synlig uten passord)',
      type: 'string',
      group: 'content',
      validation: (Rule: RuleType) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        isUnique: isUniquePathAcrossAllDocuments,
      },
      components: {
        input: SlugInputHkdir,
        schemaName: 'informationArticle',
      },
      validation: (Rule: RuleType) => Rule.required(),
    },
    {
      name: 'path',
      title: 'Fullpath',
      group: 'content',
      type: 'string',
      readOnly: true,
      components: {
        input: PathGeneratorComponent,
      },
    },
    {
      name: 'excerpt',
      title: 'Ingress (synlig uten passord)',
      type: 'text',
      group: 'content',
      validation: (Rule: RuleType) => Rule.required(),
    },
    {
      name: 'body',
      title: 'Brødtekst (KUN synlig med passord)',
      type: 'blockContentComplex',
      group: 'content',
      validation: (Rule: RuleType) =>
        Rule.custom((body, context) => {
          if (context.parent && context.parent.onKik === false && !body) {
            return 'Brødtekst er påkrevd';
          }
          return true;
        }),
    },
  ],
};
