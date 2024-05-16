import { Flex, Tooltip, Box, Text, Button, ToastContextValue } from '@sanity/ui';
import { FiClipboard, FiExternalLink } from 'react-icons/fi';
import React from 'react';

const IconButtons = ({ toast, path }: { toast: ToastContextValue; path: string }) => {
  return (
    <Flex gap={2} style={{ minWidth: 'max-content' }}>
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
          icon={FiClipboard}
          mode="ghost"
          aria-label="Copy URL"
          onClick={() => {
            navigator.clipboard.writeText(path);
            toast.push({
              status: 'info',
              title: `URL kopiert til utklippstavlen`,
            });
          }}
          style={{ cursor: 'pointer', height: 'max-content' }}
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
          href={path}
          icon={FiExternalLink}
          mode="ghost"
          aria-label="Copy URL"
          onMouseDown={() => {
            toast.push({
              status: 'info',
              title: `Lenke åpnet i ny fane`,
            });
          }}
          style={{ height: 'max-content' }}
        />
      </Tooltip>
    </Flex>
  );
};

export default IconButtons;
