/* eslint-disable react/jsx-props-no-spreading */
import { Box, Flex, Text, TextArea, Tooltip } from '@sanity/ui';
import { ChangeEvent, useCallback, useRef } from 'react';
import { set, StringInputProps, unset } from 'sanity';
import { Counter } from './seoTitleInput';

const WARN_MAX = 160;
const WARN_MIN = 70;

export const SeoDescriptionInput = (props: StringInputProps) => {
  const { elementProps, value = '', onChange } = props;
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      onChange(event.currentTarget.value ? set(event.currentTarget.value) : unset());
    },
    [onChange],
  );

  return (
    <Flex align="center" style={{ position: 'relative' }}>
      <Box flex={1}>
        <Counter min={WARN_MIN} max={WARN_MAX} length={value?.length} />
        <TextArea
          {...elementProps}
          ref={textAreaRef}
          value={value}
          rows={5}
          onChange={handleChange}
        />
      </Box>
    </Flex>
  );
};

export default SeoDescriptionInput;
