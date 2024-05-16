import { BiCalendarEvent as icon } from 'react-icons/bi';
import { defineField, Reference, Slug } from 'sanity';
import { SlugInputHkdir } from '../../Components';
import { PathGeneratorComponent } from '../../Components/PathGeneratorComponent';
import { ReferenceSelect } from '../../Components/referenceSelect';
import { SchemaOrder } from '../../Components/schemaOrder';
import ParentReferenceTypes from '../../constants/parentArray';
import { filterOnLanguage } from '../../utils/filterOnLanguage';
import { isUniquePathAcrossAllDocuments } from '../../utils/isUniquePathAcrossAllDocuments';
import ParentValidation from '../../utils/parentValidation';
import { localeField, siteLocale } from '../../utils/schemaSnippets';
import { RuleType } from '../../utils/validation';
import { seo } from '../objects/seoModule';

export default {
  name: 'crossArea',
  title: 'Tema',
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
      type: 'boolean',
      initialValue: false,
      group: 'meta',
    },
    {
      name: 'onlyOnErasmus',
      title: 'Vis kun på erasmuspluss.no',
      type: 'boolean',
      group: 'meta',
      initialValue: false,
      hidden: ({ document }: { document?: { inErasmus?: boolean } }) => !document?.inErasmus,
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
        filter: ({
          document,
        }: {
          document: { slug: Slug; siteLocale: string; inErasmus: boolean };
        }) => {
          const { slug, siteLocale: locale, inErasmus } = document;

          if (slug?.current && locale && inErasmus === true) {
            return {
              filter: 'slug.current != $slug && siteLocale == $siteLocale && inErasmus == true',
              params: { slug: slug.current, siteLocale: locale },
            };
          }
          if (slug?.current && locale && inErasmus !== true) {
            return {
              filter: 'slug.current != $slug && siteLocale == $siteLocale && onlyOnErasmus != true',
              params: { slug: slug.current, siteLocale: locale },
            };
          }
          return '';
        },
      },
      validation: (Rule: RuleType) => [
        ParentValidation,
        Rule.custom(async (value, context) => {
          const { getClient } = context;

          const client = getClient({ apiVersion: '2021-03-25' });
          if (value) {
            const parentIsErasmus = await client.fetch('*[_id == $id][0].inErasmus', {
              id: value._ref,
            });
            const { inErasmus } = context.document;
            if (inErasmus) {
              if (inErasmus === true && parentIsErasmus === false) {
                return 'Denne siden er merket som "Inkluder på erasmuspluss.no", og kan derfor ikke ha en forelder som ikke er merket som det samme.';
              }
              if (inErasmus === true && parentIsErasmus === true) {
                return true;
              }
            }
            return true;
          }
          return true;
        }),
      ],
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
        schemaName: 'crossArea',
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
          to: [{ type: 'informationArticle' }, { type: 'editorTopic' }],
          options: {
            filter: filterOnLanguage,
          },
        },
      ],
      group: 'content',
    }),
    {
      name: 'currentTopic',
      title: 'Høyaktuelt tema',
      type: 'currentTopic',
      group: 'content',
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
        event: 'Arrangement',
        report: 'Dokumenter',
        resource: 'Ressurser',
        news: 'Aktuelt',
        research: 'Rapporter, undersøkelser og statistikk',
        program: 'Programmer og tilskuddsordninger',
        project: 'Prosjekteksempler',
      },
      initialValue: [
        'grant',
        'event',
        'report',
        'resource',
        'news',
        'research',
        'program',
        'project',
      ],
    },
    {
      name: 'disciplines',
      title: 'Fagmiljø',
      group: 'meta',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'crossArea' }],
        },
      ],
      components: {
        input: ReferenceSelect,
      },
      referenceType: 'discipline',
    },
    seo({ group: 'seo' }),
  ],
};
