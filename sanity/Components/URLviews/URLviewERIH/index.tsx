import { Container, useToast, Text, Card, Label, Stack } from '@sanity/ui';
import { useClient } from 'sanity';
import { useEffect, useState } from 'react';
import IconButtons from '../IconButtons';
import styles from './index.module.css';

const segments: Record<string, string> = {
  erih_meeting: '/moter/',
  erih_newsArticle: '/aktuelt/',
  erih_event: '/arrangementer/',
  erih_informationArticle: '/informasjonsartikler/',
  erih_homepage: '/',
};

type DocumentType = {
  published: {
    _type: string;
    slug?: { current: string };
  };
};

const parentPathQuery = /* groq */ `*[_id == $id][0] {
  "path": coalesce(
    parent->parent->slug.current + "/" + parent->slug.current + "/" + slug.current,
    parent->slug.current + "/" + slug.current,
    slug.current,
  ),
}.path`;

const URLviewERIH = ({ document, documentId }: { document: DocumentType; documentId: string }) => {
  const [parentPath, setParentPath] = useState<string | undefined>(undefined);
  const contentType = document.published._type;
  const client = useClient({
    apiVersion: '2021-06-07',
  });
  const toast = useToast();
  const basePath =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://kanalregister.hkdir.no/';

  /*
   * // INFO: We could handle all the urls in the useEffect, but to minimize api-calls to sanity
   * we only query when its needed (parent paths). The section below retrieves data already present.
   * */
  const segmentValue = segments[contentType];
  const slug = document.published.slug?.current;
  const errorMessage = !slug ? `Could not generate path for type: ${contentType}` : undefined;
  const path = contentType in segments && slug ? basePath + segmentValue + slug : errorMessage;
  const hasURL = contentType in segments;

  // INFO: Make an api call to Sanity to fetch the path for this specific content type
  useEffect(() => {
    const getParentPaths = async () => {
      const fetchedPath: string = await client.fetch(parentPathQuery, {
        id: documentId,
      });
      setParentPath(fetchedPath);
      toast.push({
        status: 'success',
        title: `Retrieved data`,
      });
    };

    if (contentType === 'erih_navigationpage') {
      getParentPaths();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container width={1}>
      <div className={styles.wrapper}>
        <Text size={2} weight="semibold">
          {hasURL || parentPath ? (
            'Published URL for this document'
          ) : (
            <Card
              shadow={1}
              paddingY={2}
              paddingLeft={3}
              paddingRight={2}
              radius={2}
              tone="primary"
            >
              This document does not have its own page on the website
            </Card>
          )}
        </Text>

        {(hasURL || parentPath) && (
          <div className={styles.row}>
            <Card
              shadow={1}
              paddingY={2}
              paddingLeft={3}
              paddingRight={2}
              radius={1}
              tone={errorMessage ? 'caution' : 'transparent'}
              style={{ flexGrow: 1 }}
            >
              <div className={styles.content}>
                <span>{parentPath || path}</span>
              </div>
            </Card>
            {!errorMessage && <IconButtons toast={toast} path={(parentPath || path) as string} />}
          </div>
        )}
      </div>
    </Container>
  );
};

export default URLviewERIH;
