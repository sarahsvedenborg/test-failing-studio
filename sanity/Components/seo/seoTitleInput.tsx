/* eslint-disable react/jsx-props-no-spreading */
import { Box, Flex, Text, TextInput, Tooltip, Badge } from '@sanity/ui';
import { ChangeEvent, useCallback } from 'react';
import { set, StringInputProps, unset } from 'sanity';

export const Counter = ({ max, min, length }: { max: number; min: number; length: number }) => {
  const counterStyle = {
    backgroundColor: length > min && length <= max ? '#e7f9ed' : '#fef7da',
    fontSize: '13px',
    fontWeight: '600',
    padding: '3px',
    width: 'fit-content',
    border: '1px solid #d9d5fc',
    borderColor: length > min && length <= max ? '#b1ccba' : '#ebe1bc',
    borderRadius: '5px',
    marginBottom: '2px',
  };
  return (
    <div style={counterStyle}>
      {length} / {max}
    </div>
  );
};

export const SeoTitleInput = (props: StringInputProps) => {
  const { elementProps, value = '', onChange } = props;

  const WARN_LENGTH_MAX = 60;
  const WARN_LENGTH_MIN = 15;

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      onChange(event.currentTarget.value ? set(event.currentTarget.value) : unset()),
    [onChange],
  );

  return (
    <Flex align="center" style={{ position: 'relative' }}>
      <Box flex={1}>
        <Counter max={WARN_LENGTH_MAX} min={WARN_LENGTH_MIN} length={value?.length} />
        <TextInput {...elementProps} value={value} onChange={handleChange} />
      </Box>
    </Flex>
  );
};

export default SeoTitleInput;
