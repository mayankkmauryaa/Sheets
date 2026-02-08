import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  MoreHorizontal
} from 'lucide-react';
import QuestionList from './QuestionList';
import useSheetStore from '../store/sheetStore';

const SubTopic = ({ topicId, topicTitle, subTopic, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(subTopic.title);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const {
    updateSubTopic,
    deleteSubTopic,
    toggleSubTopicExpansion,
    expandedSubTopics
  } = useSheetStore();

  // Always show questions expanded under subtopics (Codolio style)
  const isExpanded = true;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: subTopic.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      updateSubTopic(topicId, subTopic.id, editTitle.trim());
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(subTopic.title);
    setIsEditing(false);
  };

  return (
    <div ref={setNodeRef} style={style}>
      {/* Questions displayed directly - Codolio shows questions as rows */}
      <QuestionList
        topicId={topicId}
        topicTitle={topicTitle}
        subTopicId={subTopic.id}
        subTopicTitle={subTopic.title}
        questions={subTopic.questions}
        showAddQuestion={showAddQuestion}
        onCloseAddQuestion={() => setShowAddQuestion(false)}
        onAddQuestion={() => setShowAddQuestion(true)}
        onEditSubTopic={() => setIsEditing(true)}
        onDeleteSubTopic={() => {
          if (confirm('Are you sure you want to delete this sub-topic?')) {
            deleteSubTopic(topicId, subTopic.id);
          }
        }}
        isEditingSubTopic={isEditing}
        editTitle={editTitle}
        onEditTitleChange={setEditTitle}
        onSaveEdit={handleSaveEdit}
        onCancelEdit={handleCancelEdit}
      />
    </div>
  );
};

export default SubTopic;