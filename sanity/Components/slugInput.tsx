import React, { useEffect, useState } from 'react';
import { Card, Flex, Box, Text, Button, Tooltip } from '@sanity/ui';
// eslint-disable-next-line import/no-extraneous-dependencies
import { LaunchIcon } from '@sanity/icons';
import { useClient, useFormValue } from 'sanity';

interface Props {
  path: string[];
  value: { current: string };
  renderDefault: any;
  schemaType: { components: { schemaName: string } };
}
export const SlugInput = (props: Props) => {
  const client = useClient({
    apiVersion: '2021-06-07',
  });

  const { path, value = { current: '' }, renderDefault, schemaType } = props;

  const [examSlug, setExamSlug] = useState('');
  const locale = path[0].replace('_', '-');
  const { schemaName } = schemaType.components;
  const exam: undefined | { _ref: string } = useFormValue(['relatedExam']) as
    | undefined
    | { _ref: string };

  useEffect(() => {
    const fetchExamSlug = async (examId: string) => {
      await client
        .fetch(`*[_id == $examId][$locale].slug.current`, {
          examId,
          locale: path[0],
        })
        .then(setExamSlug);
    };
    if (exam) {
      fetchExamSlug(exam._ref);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let relativeURL;

  if (['pk_article', 'pk_exam'].includes(schemaName)) {
    relativeURL = value.current;
  } else if (schemaName === 'pk_resource') {
    relativeURL = `ressurser/${value.current}`;
  } else if (schemaName === 'pk_step' && examSlug !== '') {
    relativeURL = `${examSlug}/${value.current}`;
  }

  const frontendBaseUrl = import.meta.env.DEV
    ? 'localhost:3000'
    : 'https://hkdirpk-prod.azurewebsites.net';

  return (
    <Flex padding={2}>
      <Card flex={1}>{renderDefault(props)}</Card>
      {relativeURL && (
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
            href={`${frontendBaseUrl}/${locale}/${relativeURL}`}
            icon={LaunchIcon}
            mode="ghost"
            aria-label="Copy URL"
            onMouseDown={() => {}}
          />
        </Tooltip>
      )}
    </Flex>
  );
};

export default SlugInput;
