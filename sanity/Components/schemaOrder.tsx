import React, { useState } from 'react';
import { Stack } from '@sanity/ui';
import { set } from 'sanity';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

type ItemType = { [key: string]: string };

interface Props {
  schemaType: {
    initialValue: string[];
    itemSelection: ItemType;
  };

  onChange: any;
}
export const SchemaOrder = (props: Props) => {
  const {
    schemaType: { itemSelection },
    onChange,
  } = props;

  const [items, setItems] = useState<string[]>(Object.keys(itemSelection));

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((existingItems) => {
        const oldIndex = existingItems.indexOf(active.id);
        const newIndex = existingItems.indexOf(over.id);
        onChange(set(arrayMove(existingItems, oldIndex, newIndex)));
        return arrayMove(existingItems, oldIndex, newIndex);
      });
    }
  };

  return (
    <div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <Stack space={[3, 3, 4]}>
            {items.map((item: string) => (
              <SortableItem key={item} id={item} value={itemSelection[item]} />
            ))}
          </Stack>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default SchemaOrder;
