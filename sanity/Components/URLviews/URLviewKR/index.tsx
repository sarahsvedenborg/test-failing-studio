import { Container, useToast, Text, Card, Label, Stack } from '@sanity/ui';
import { useClient } from 'sanity';
import { useEffect, useState } from 'react';
import IconButtons from '../IconButtons';
import styles from './index.module.css';

const segments: Record<string, string> = {
  kr_meeting: '/moter/',
  kr_newsArticle: '/aktuelt/',
  kr_event: '/arrangementer/',
  kr_informationArticle: '/informasjonsartikler/',
  kr_homepage: '/',
};

type DocumentType = {
  published: {
    _type: string;
    en: { slug?: { current: string } };
    no: { slug?: { current: string } };
  };
};

const parentPathQuery = /* groq */ `*[_id == $id][0]
{
  "path_no": coalesce(
    no.parent->no.parent->no.slug.current + "/" + no.parent->no.slug.current + "/" + no.slug.current,
    no.parent->no.slug.current + "/" + no.slug.current,
    no.slug.current,
  ),
  "path_en": coalesce(
    en.parent->en.parent->en.slug.current + "/" + en.parent->en.slug.current + "/" + en.slug.current,
    en.parent->en.slug.current + "/" + en.slug.current,
    en.slug.current,
  ),
}`;

const URLview = ({ document, documentId }: { document: DocumentType; documentId: string }) => {
  const [parentPath, setParentPath] = useState<{ path_en: string; path_no: string } | undefined>(
    undefined,
  );
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
  const slugNO = document.published.no?.slug?.current;
  const slugEN = document.published.en?.slug?.current;
  const errorMsgNO = !slugNO
    ? `Kunne ikke generere lenke URL for innholdstypen: ${contentType}`
    : undefined;
  const errorMsgEN = !slugEN ? `Could not generate path for type: ${contentType}` : undefined;
  const pathNO = contentType in segments && slugNO ? basePath + segmentValue + slugNO : errorMsgNO;
  const pathEN =
    contentType in segments && slugEN ? `${basePath}/en${segmentValue}${slugEN}` : errorMsgEN;

  const hasURL = contentType in segments;

  // INFO: Make an api call to Sanity to fetch the path for this specific content type
  useEffect(() => {
    const getParentPaths = async () => {
      const paths: { path_no: string; path_en: string } = await client.fetch(parentPathQuery, {
        id: documentId,
      });

      console.log(paths);

      setParentPath(paths);
      toast.push({
        status: 'success',
        title: `Data lastet inn`,
      });
    };

    if (contentType === 'kr_navigationpage') {
      getParentPaths();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container width={1}>
      <div className={styles.wrapper}>
        <Text size={2} weight="semibold">
          {hasURL || parentPath ? (
            'Publisert URL for dette dokumentet'
          ) : (
            <Card
              shadow={1}
              paddingY={2}
              paddingLeft={3}
              paddingRight={2}
              radius={2}
              tone="primary"
            >
              Dette dokumentet har ikke en egen side på nettsiden
            </Card>
          )}
        </Text>

        {(hasURL || parentPath) && (
          <>
            <Stack space={2}>
              <Label size={2}>NO</Label>
              <div className={styles.row}>
                <Card
                  shadow={1}
                  paddingY={2}
                  paddingLeft={3}
                  paddingRight={2}
                  radius={1}
                  tone={errorMsgNO ? 'caution' : 'transparent'}
                  style={{ flexGrow: 1 }}
                >
                  <div className={styles.content}>
                    <span>{parentPath?.path_no || pathNO}</span>
                  </div>
                </Card>
                {!errorMsgNO && <IconButtons toast={toast} path={pathNO as string} />}
              </div>
            </Stack>

            <Stack space={2}>
              <Label size={2}>EN</Label>

              <div className={styles.row}>
                <Card
                  shadow={1}
                  paddingY={2}
                  paddingLeft={3}
                  paddingRight={2}
                  radius={1}
                  tone={errorMsgEN ? 'caution' : 'transparent'}
                  style={{ flexGrow: 1 }}
                >
                  <div className={styles.content}>
                    <span>{parentPath?.path_en || pathEN}</span>
                  </div>
                </Card>
                {!errorMsgEN && <IconButtons toast={toast} path={pathEN as string} />}
              </div>
            </Stack>
          </>
        )}
      </div>
    </Container>
  );
};

export default URLview;
