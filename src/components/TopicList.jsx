import React, { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Topic from './Topic';
import useSheetStore from '../store/sheetStore';

const TopicList = ({ topics: filteredTopics }) => {
  const { topics, reorderTopics } = useSheetStore();

  // Use filtered topics if provided, otherwise use all topics
  const displayTopics = filteredTopics || topics;

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
      const oldIndex = displayTopics.findIndex(topic => topic.id === active.id);
      const newIndex = displayTopics.findIndex(topic => topic.id === over.id);
      reorderTopics(oldIndex, newIndex);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={displayTopics.map(t => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4">
          {displayTopics.map((topic, index) => (
            <Topic key={topic.id} topic={topic} index={index} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default TopicList;