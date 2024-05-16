import React, { useEffect } from 'react';
import { set, useClient, useFormValue } from 'sanity';

interface Props {
  value: string;
  onChange: any;
  renderDefault: any;
}

export const getRootByType = (type: string) => {
  switch (type) {
    case 'grant':
      return '/utlysninger-og-tilskudd';
    case 'event':
      return '/arrangementer';
    case 'project':
      return '/prosjekteksempler';
    case 'program':
      return '/programmer-og-tilskuddsordninger';
    case 'resource':
      return '/ressurser';
    case 'report':
      return '/dokumenter';
    case 'research':
      return '/rapporter-undersokelser-og-statistikk';
    case 'newsArticle':
      return '/aktuelt';
    case 'passwordProtectedPage':
      return '/beskyttet';
    default:
      return '';
  }
};

export const rootByTypeAndLocale: {
  [key: string]: { nb_NO: string; nn_NO: string; en: string };
} = {
  grant: {
    nb_NO: '/utlysninger-og-tilskudd',
    nn_NO: '/utlysninger-og-tilskudd',
    en: '/grants-and-open-calls',
  },
  event: { nb_NO: '/arrangementer', nn_NO: '/arrangementer', en: '/events' },
  report: { nb_NO: '/dokumenter', nn_NO: '/dokumenter', en: '/documents' },
  research: {
    nb_NO: '/rapporter-undersokelser-og-statistikk',
    nn_NO: '/rapporter-undersokelser-og-statistikk',
    en: '/reports-ongoing-surveys-and-statistics',
  },
  resource: { nb_NO: '/ressurser', nn_NO: '/ressurser', en: '/resources' },
  program: {
    nb_NO: '/programmer-og-tilskuddsordninger',
    nn_NO: '/programmer-og-tilskuddsordninger',
    en: '/programmes-and-grant-schemes',
  },
  project: { nb_NO: '/prosjekteksempler', nn_NO: '/prosjekteksempler', en: '/project-examples' },
  newsArticle: { nb_NO: '/aktuelt', nn_NO: '/aktuelt', en: '/articles' },
  passwordProtectedPage: { nb_NO: '/beskyttet', nn_NO: '/beskyttet', en: '/protected' },
};

export const generateNewPath = (
  parentPath: string | undefined,
  documentSlug: string,
  myType: string,
  myLocale: 'nb_NO' | 'nn_NO' | 'en',
) => {
  const root = parentPath || rootByTypeAndLocale[myType]?.[myLocale] || '';
  return `${root}/${documentSlug}`;
};

export const PathGeneratorComponent = (props: Props) => {
  const parentRef = useFormValue(['parent']);
  const slug = useFormValue(['slug']) as { current: string };
  const path = useFormValue(['path']);
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const _type = useFormValue(['_type']) as string;
  const contentLocale = useFormValue(['contentLocale']) as 'nb_NO' | 'nn_NO';

  const { onChange, value, renderDefault } = props;

  const client = useClient({
    apiVersion: '2021-06-07',
  });

  useEffect(() => {
    const getParentPath = async () => {
      if (!parentRef) {
        const newPath = generateNewPath(undefined, slug.current, _type, contentLocale || 'en');
        if (value !== newPath) {
          onChange(set(newPath));
        }
      } else {
        await client
          .fetch(`*[_id == $parent._ref && !(_id in path('drafts.**'))][0].path`, {
            parent: parentRef,
          })
          .then((parentPath: string) => {
            // Can reset to only fetching path
            const newPath = generateNewPath(parentPath, slug.current, _type, contentLocale || 'en');
            // const newPath = `${parent.path ? parent.path : ''}/${slug.current}`;
            // eslint-disable-next-line react/destructuring-assignment
            if (props.value !== newPath) {
              onChange(set(newPath));
            }
          });
      }
    };
    getParentPath();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentRef, slug, path]);

  return <>{renderDefault(props)}</>;
};

export default PathGeneratorComponent;
