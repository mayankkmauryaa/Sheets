import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SubTopic from './SubTopic';
import useSheetStore from '../../store/sheetStore';

const SubTopicList = ({ topicId, topicTitle, subTopics }) => {
  const { reorderSubTopics } = useSheetStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = subTopics.findIndex(st => st.id === active.id);
      const newIndex = subTopics.findIndex(st => st.id === over.id);
      reorderSubTopics(topicId, oldIndex, newIndex);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={subTopics.map(st => st.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="py-2">
          {subTopics.map((subTopic, index) => (
            <SubTopic
              key={subTopic.id}
              topicId={topicId}
              topicTitle={topicTitle}
              subTopic={subTopic}
              index={index}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default SubTopicList;