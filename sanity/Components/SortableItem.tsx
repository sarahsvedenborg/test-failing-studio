import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, Flex } from '@sanity/ui';
import { RxDragHandleDots2 } from 'react-icons/rx';

interface Props {
  id: string;
  value: string;
}

export const SortableItem = ({ id, value }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: '100%',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Flex direction="row" align="center">
        <RxDragHandleDots2 />
        <Card padding={2} shadow={1} margin={[0, 0, 0, 1]}>
          {value}
        </Card>
      </Flex>
    </div>
  );
};

export default SortableItem;
