import React, { useEffect, useState } from 'react';
import { Card, Flex, Checkbox, Box, Text } from '@sanity/ui';
import { set, useClient } from 'sanity';

interface Props {
  schemaType: { referenceType: string };
  value: string[];
  onChange: any;
}

export const SelectStringBySchema = (props: Props) => {
  const {
    schemaType: { referenceType },
    value, // Current field value
    onChange, // Method to handle patch events,
  } = props;
  const [options, setOptions] = useState([]);

  const client = useClient({
    apiVersion: '2021-06-07',
  });

  useEffect(() => {
    const fetchOptions = async () => {
      await client
        .fetch(`*[_type == $schemaType][0].tags`, { schemaType: referenceType })
        .then(setOptions);
    };
    fetchOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = React.useCallback(
    (e: any) => {
      const inputValue = e.target.value;

      if (value) {
        if (value.some((option) => option === inputValue)) {
          onChange(set(value.filter((item) => item !== inputValue)));
        } else {
          onChange(set([...value, inputValue]));
        }
      } else {
        onChange(set([inputValue]));
      }
    },
    [onChange, value],
  );

  return options.map((option, index) => (
    <Card padding={2}>
      <Flex align="center">
        <Checkbox
          id={`item-${index}`}
          style={{ display: 'block' }}
          onClick={handleClick}
          value={option}
          checked={value ? value.some((item) => item === option) : false}
        />
        <Box flex={1} paddingLeft={3}>
          <Text>
            <label htmlFor={`item-${index}`}>{option}</label>
          </Text>
        </Box>
      </Flex>
    </Card>
  ));
};

export default SelectStringBySchema;
