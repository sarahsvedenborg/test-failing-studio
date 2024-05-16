// eslint-disable-next-line import/no-extraneous-dependencies
import { ClipboardIcon } from '@sanity/icons';
import { Box, Button, Container, Flex, Stack, Text, Tooltip, useToast } from '@sanity/ui';
import { useEffect, useState } from 'react';
import { RxOpenInNewWindow } from 'react-icons/rx';
import { useClient } from 'sanity';
import urlQuery from './urlQuery';

const URLview = ({ document }: { document: any }) => {
  const client = useClient({
    apiVersion: '2021-06-07',
  });
  const [siteLocale, setSiteLocale] = useState('');
  const [path, setPath] = useState('');
  const toast = useToast();

  // Get base path of frontend URL
  const getBasePath = () => {
    return process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://hkdir.no';
  };

  // Get full path of frontend URL
  const getFullPath = () => {
    const basePath = getBasePath();
    return siteLocale === 'en' ? `${basePath}/en${path}` : `${basePath}${path}`;
  };

  const getPath = async () => {
    const res = await client.fetch(urlQuery, { id: document?.published?._id });
    setPath(res.path);
    setSiteLocale(res.siteLocale);

    toast.push({
      status: 'success',
      title: `Data lastet inn`,
    });
  };

  useEffect(() => {
    getPath();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, toast]);

  return (
    <Container>
      {path && (
        <Stack space={4} marginY={3} style={{ width: '100%' }}>
          <Text size={2} weight="semibold">
            URL for dette dokumentet
          </Text>
          {path}
          <Flex align="center" gap={2} style={{ minWidth: 'max-content' }}>
            <Tooltip
              content={
                <Box padding={2}>
                  <Text muted size={1}>
                    Kopier URL
                  </Text>
                </Box>
              }
              placement="top"
            >
              <Button
                icon={ClipboardIcon}
                mode="ghost"
                aria-label="Copy URL"
                onClick={() => {
                  navigator.clipboard.writeText(getFullPath());
                  toast.push({
                    status: 'info',
                    title: `URL kopiert til utklippstavlen`,
                  });
                }}
              />
            </Tooltip>
            <Tooltip
              content={
                <Box padding={2}>
                  <Text muted size={1} style={{ minWidth: 'max-content' }}>
                    Åpne lenke i ny fane
                  </Text>
                </Box>
              }
              placement="top"
              portal
            >
              <Button
                as="a"
                target="_blank"
                href={getFullPath()}
                icon={RxOpenInNewWindow}
                mode="ghost"
                aria-label="Copy URL"
                onMouseDown={() => {
                  toast.push({
                    status: 'info',
                    title: `Lenke åpnet i ny fane`,
                  });
                }}
              />
            </Tooltip>
          </Flex>
        </Stack>
      )}
    </Container>
  );
};

export default URLview;
