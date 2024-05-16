import React, { useEffect, useState } from 'react';
import { Card, Flex, Checkbox, Box, Text } from '@sanity/ui';
import { set, useClient } from 'sanity';

type OptionType = {
  _id: string;
  title: string;
};

type RefType = {
  _key: string;
  _ref: string;
  _type: string;
};

interface Props {
  schemaType: { referenceType: string; locale?: string };
  value: RefType[];
  onChange: any;
}
export const LocalizedReferenceSelect = (props: Props) => {
  const {
    schemaType: { referenceType, locale },
    onChange,
    value = '',
  } = props;

  const client = useClient({
    apiVersion: '2021-06-07',
  });

  const [options, setOptions] = useState<OptionType[]>([]);

  const query = `*[_type == $schemaType && !(_id in path('drafts.**'))]{_id, "title": @[$locale].title}`;

  useEffect(() => {
    const fetchOptions = async () => {
      await client
        .fetch(query, {
          schemaType: referenceType,
          locale,
        })
        .then(setOptions);
    };
    fetchOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = React.useCallback(
    (e: any) => {
      const inputValue = {
        _key: e.target.value.slice(0, 10),
        _type: 'reference',
        _ref: e.target.value,
      };

      if (value) {
        if (value.some((tag: RefType) => tag._ref === inputValue._ref)) {
          onChange(set(value.filter((tag: RefType) => tag._ref !== inputValue._ref)));
        } else {
          onChange(set([...value, inputValue]));
        }
      } else {
        onChange(set([inputValue]));
      }
    },
    [value, onChange],
  );

  return (
    <div>
      {options.map((option, index) => (
        <Card padding={2} key={option._id}>
          <Flex align="center">
            <Checkbox
              id={option._id}
              style={{ display: 'block' }}
              onClick={handleClick}
              value={option._id}
              defaultChecked={value ? value.some((item: any) => item._ref === option._id) : false}
            />
            <Box flex={1} paddingLeft={3}>
              <Text>
                <label htmlFor={`item-${index}`}>{option.title}</label>
              </Text>
            </Box>
          </Flex>
        </Card>
      ))}
    </div>
  );
};

export default LocalizedReferenceSelect;
