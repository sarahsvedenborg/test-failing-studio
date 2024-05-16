import React, { useEffect, useState } from 'react';
import { Card, Flex, Checkbox, Box, Text, Button, Stack } from '@sanity/ui';
import { set, useClient, useFormValue } from 'sanity';

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
  path: string[];
  value: RefType[];
  onChange: any;
  renderDefault: any;
}
export const CopyReferences = (props: Props) => {
  const { path, onChange, value = '', renderDefault } = props;

  const testPath: string[] = [...path];
  testPath[0] = 'nb_NO';

  const references: { _ref: string }[] = useFormValue(testPath) as { _ref: string }[];

  if (path.includes('nb_NO')) {
    return renderDefault(props);
  }

  const copyReferences = () => {
    onChange(set([...value, ...references]));
  };

  return (
    <Stack padding={4} space={[3, 3, 4, 3]}>
      {renderDefault(props)}
      <Button
        fontSize={[2, 2, 2]}
        mode="ghost"
        tone="default"
        padding={[3, 3, 3]}
        text="Kopier fra bokmål"
        onClick={copyReferences}
      />
    </Stack>
  );
};

export default CopyReferences;
