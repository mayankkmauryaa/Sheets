import React from 'react';
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
import Topic from './Topic';
import useSheetStore from '../../store/sheetStore';

const TopicList = ({ topics }) => {
    const { reorderTopics } = useSheetStore();

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
            const oldIndex = topics.findIndex((t) => t.id === active.id);
            const newIndex = topics.findIndex((t) => t.id === over.id);
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
                items={topics.map((t) => t.id)}
                strategy={verticalListSortingStrategy}
            >
                <div className="space-y-4">
                    {topics.map((topic, index) => (
                        <Topic key={topic.id} topic={topic} index={index} />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
};

export default TopicList;
