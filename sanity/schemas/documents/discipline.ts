import { BiCalendarEvent as icon } from 'react-icons/bi';
import { defineField, Reference, Slug } from 'sanity';
import { SlugInputHkdir } from '../../Components';
import { PathGeneratorComponent } from '../../Components/PathGeneratorComponent';
import { SchemaOrder } from '../../Components/schemaOrder';
import ParentReferenceTypes from '../../constants/parentArray';
import { filterOnLanguage } from '../../utils/filterOnLanguage';
import { isUniquePathAcrossAllDocuments } from '../../utils/isUniquePathAcrossAllDocuments';
import ParentValidation from '../../utils/parentValidation';
import { localeField, siteLocale } from '../../utils/schemaSnippets';
import { RuleType } from '../../utils/validation';
import { seo } from '../objects/seoModule';

export default {
  name: 'discipline',
  title: 'Fagmiljø',
  type: 'document',
  icon,
  groups: [
    { name: 'content', title: 'Innhold' },
    { name: 'meta', title: 'Strukturelt' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    siteLocale,
    localeField,
    {
      name: 'inErasmus',
      title: 'Inkluder på erasmuspluss.no',
      description: 'Dette gleder kun for innhold på hkdir.no og erasmus+',
      type: 'boolean',
      group: 'meta',
      initialValue: false,
    },
    {
      name: 'onlyOnErasmus',
      title: 'Vis kun på erasmuspluss.no',
      description: 'Dette gleder kun for innhold på hkdir.no og erasmus+',
      type: 'boolean',
      group: 'meta',
      initialValue: false,
      hidden: ({ document }: { document?: { inErasmus?: boolean } }) => !document?.inErasmus,
    },
    {
      name: 'index',
      title: 'Vis som nummer i listevisning',
      type: 'number',
      group: 'meta',
      validation: (Rule: RuleType) => Rule.integer().positive(),
    },
    {
      name: 'approvalRelated',
      title: 'Relatert til godkjenning',
      type: 'boolean',
      initialValue: false,
      group: 'meta',
    },
    {
      name: 'parent',
      title: 'Overordnet side for URL og brødsmulesti',
      type: 'reference',
      to: ParentReferenceTypes,
      group: 'content',
      options: {
        filter: ({ document }: { document: { slug: Slug; siteLocale: string } }) => {
          const { slug, siteLocale: locale } = document;

          if (slug?.current) {
            return {
              filter: 'slug.current != $slug && siteLocale == $siteLocale',
              params: {
                slug: slug.current,
                siteLocale: locale,
              },
            };
          }
          return {
            filter: 'siteLocale == $siteLocale',
            params: {
              siteLocale: locale,
            },
          };
        },
      },
      validation: ParentValidation,
    },
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
      group: 'content',
    }),
    {
      name: 'searchstrings',
      description: 'Ord som dukker opp på søk',
      title: 'Søkeord',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'content',
      options: {
        layout: 'tags',
      },
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
        schemaName: 'discipline',
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
    defineField({
      name: 'excerpt',
      title: 'Ingress',
      type: 'text',
      group: 'content',
    }),
    defineField({
      name: 'emphasisedTopics',
      title: 'Navigasjon til undersider',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'informationArticle' }, { type: 'editorTopic' }, { type: 'crossArea' }],
          options: {
            filter: filterOnLanguage,
          },
        },
      ],
      group: 'content',
    }),
    {
      name: 'emphasisedTopicsErasmus',
      title: 'Navigasjon til undersider erasmus',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'informationArticle' }, { type: 'editorTopic' }],

          // reference must have inErasmus = true

          options: {
            filter: () => {
              return {
                filter: ' inErasmus == true',
                filterOnLanguage,
              };
            },
          },
        },
      ],
      group: 'content',
      hidden: ({ document }: { document?: { inErasmus?: boolean } }) => !document?.inErasmus,
    },
    {
      name: 'automaticSchemaContent',
      title: 'Rekkefølge på automatisk innhold',
      type: 'array',
      group: 'content',
      components: {
        input: SchemaOrder,
      },
      of: [{ type: 'string' }],
      itemSelection: {
        grant: 'Utlysninger og tilskudd',
        program: 'Program',
        event: 'Arrangement',
        report: 'Dokumenter',
        resource: 'Ressurser',
        news: 'Aktuelt',
        project: 'Prosjekteksempler',
        research: 'Rapporter, undersøkelser og statistikk',
      },
      initialValue: [
        'grant',
        'program',
        'event',
        'report',
        'resource',
        'news',
        'project',
        'research ',
      ],
    },
    seo({ group: 'seo' }),
  ],
  preview: {
    // preview index and title
    select: {
      title: 'title',
      index: 'index',
    },

    prepare({ title, index }: { title: string; index: number }) {
      return {
        title: `${index ? `${index}. ` : ''}${title}`,
      };
    },
  },
};
