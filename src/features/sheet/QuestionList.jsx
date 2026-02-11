import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { Plus, ChevronRight, Edit2, Zap, X, Trash2, Book, Sparkles, GripVertical } from 'lucide-react';
import useSheetStore from '../../store/sheetStore';
import Question from './Question';

const QuestionList = ({
  topicId,
  topicTitle,
  subTopicId,
  subTopicTitle,
  questions,
  isEditingSubTopic,
  editTitle,
  onEditTitleChange,
  onSaveEdit,
  onCancelEdit,
  onEditSubTopic,
  onDeleteSubTopic,
  dragHandleProps
}) => {
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    difficulty: 'Medium',
    platform: 'LeetCode',
    link: ''
  });

  const { addQuestion, reorderQuestions } = useSheetStore();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = questions.findIndex(q => q.id === active.id);
      const newIndex = questions.findIndex(q => q.id === over.id);
      reorderQuestions(topicId, subTopicId, oldIndex, newIndex);
    }
  };

  const handleAddQuestion = () => {
    if (newQuestion.title.trim()) {
      addQuestion(topicId, subTopicId, newQuestion);
      setNewQuestion({ title: '', difficulty: 'Medium', platform: 'LeetCode', link: '' });
      setShowAddQuestion(false);
    }
  };

  // Determine if header should be hidden or simplified
  const isDefaultSubTopic = !subTopicTitle || subTopicTitle === topicTitle || subTopicTitle === 'Problems';

  return (
    <div className="reveal-animation">
      {/* SubTopic Header */}
      <div className={`flex items-center justify-between px-6 py-3 border-b border-yellow-900/10 ${isDefaultSubTopic ? 'bg-transparent' : 'bg-yellow-900/5'
        }`}>
        {isEditingSubTopic ? (
          <div className="flex items-center gap-3 flex-1">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => onEditTitleChange(e.target.value)}
              className="bg-[#050a14]/60 text-yellow-100 px-3 py-1.5 text-sm rounded-xl border border-yellow-900/30 focus:border-yellow-500 focus:outline-none spectral italic"
              autoFocus
            />
            <button onClick={onSaveEdit} className="text-yellow-500 hover:text-yellow-400"><Zap size={14} /></button>
            <button onClick={onCancelEdit} className="text-red-500 hover:text-red-400"><X size={14} /></button>
          </div>
        ) : (
          <div className="flex items-center gap-2 group flex-1">
            <div
              {...dragHandleProps}
              className="mr-2 cursor-grab active:cursor-grabbing text-yellow-900/40 hover:text-yellow-500 opacity-0 group-hover:opacity-100 transition-all"
            >
              <GripVertical size={16} />
            </div>
            {!isDefaultSubTopic && (
              <>
                <Sparkles size={14} className="text-yellow-600/60" />
                <span className="font-magical tracking-[0.15em] uppercase text-yellow-600 text-[11px] font-black drop-shadow-[0_0_8px_rgba(255,215,0,0.05)]">
                  {subTopicTitle}
                </span>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all ml-4">
                  <button onClick={onEditSubTopic} className="text-yellow-700 hover:text-yellow-500"><Edit2 size={12} /></button>
                  <button onClick={onDeleteSubTopic} className="text-yellow-700 hover:text-red-500"><Trash2 size={12} /></button>
                </div>
              </>
            )}
          </div>
        )}

        <button
          onClick={() => setShowAddQuestion(!showAddQuestion)}
          className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.1em] font-magical px-4 py-2 rounded-xl transition-all border ${showAddQuestion
            ? 'bg-red-900/10 text-red-500 border-red-900/20 hover:bg-red-900/20'
            : 'text-yellow-600 hover:text-yellow-400 border-transparent hover:bg-yellow-950/20'
            }`}
        >
          {showAddQuestion ? <X size={14} /> : <Plus size={14} />}
          {showAddQuestion ? 'Dismiss' : 'Add Question'}
        </button>
      </div>

      {/* Add Question Form */}
      {showAddQuestion && (
        <div className="px-6 py-5 bg-yellow-950/10 border-b border-yellow-900/10 card-enter relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-900/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-wrap items-center gap-3 relative z-10">
            <input
              type="text"
              placeholder="Question title..."
              value={newQuestion.title}
              onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
              className="flex-1 min-w-[200px] bg-[#050a14]/60 text-yellow-100 px-5 py-3 rounded-xl border border-yellow-900/30 focus:border-yellow-500 focus:outline-none placeholder-yellow-900/20 text-sm spectral italic"
              autoFocus
              onKeyPress={(e) => e.key === 'Enter' && handleAddQuestion()}
            />
            <select
              value={newQuestion.difficulty}
              onChange={(e) => setNewQuestion({ ...newQuestion, difficulty: e.target.value })}
              className="bg-[#050a14]/60 text-yellow-500 text-[10px] font-black uppercase tracking-widest px-4 py-3 rounded-xl border border-yellow-900/30 font-magical focus:border-yellow-500 focus:outline-none cursor-pointer"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <input
              type="text"
              placeholder="Platform"
              value={newQuestion.platform}
              onChange={(e) => setNewQuestion({ ...newQuestion, platform: e.target.value })}
              className="w-32 bg-[#050a14]/60 text-yellow-100 px-4 py-3 rounded-xl border border-yellow-900/30 focus:border-yellow-500 focus:outline-none text-sm spectral italic"
            />
            <input
              type="text"
              placeholder="Link"
              value={newQuestion.link}
              onChange={(e) => setNewQuestion({ ...newQuestion, link: e.target.value })}
              className="w-48 bg-[#050a14]/60 text-yellow-100 px-4 py-3 rounded-xl border border-yellow-900/30 focus:border-yellow-500 focus:outline-none text-sm spectral italic"
            />
            <button
              onClick={handleAddQuestion}
              className="px-6 py-3 bg-gradient-to-r from-yellow-700 to-yellow-600 hover:from-yellow-600 hover:to-yellow-500 text-[#050a14] text-[10px] font-black uppercase tracking-widest font-magical rounded-xl transition-all shadow-lg shadow-yellow-900/20"
            >
              Add
            </button>
          </div>
        </div>
      )}

      {/* Questions with Drag & Drop */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={questions.map(q => q.id)} strategy={verticalListSortingStrategy}>
          {questions.map((question, index) => (
            <Question
              key={question.id}
              topicId={topicId}
              subTopicId={subTopicId}
              question={question}
              index={index}
            />
          ))}
        </SortableContext>
      </DndContext>

      {/* Empty State */}
      {questions.length === 0 && !showAddQuestion && (
        <div className="px-6 py-10 text-center relative group">
          <Book className="mx-auto text-yellow-900/20 mb-3 group-hover:text-yellow-950/40 transition-colors" size={32} />
          <p className="text-yellow-900/40 text-[10px] font-black uppercase tracking-[0.3em] font-magical mb-4">No questions yet...</p>
          <button
            onClick={() => setShowAddQuestion(true)}
            className="text-yellow-700 hover:text-yellow-500 text-[10px] font-black uppercase tracking-widest font-magical px-6 py-3 rounded-xl border border-yellow-900/10 hover:border-yellow-900/30 transition-all hover:bg-yellow-950/20 shadow-inner"
          >
            + New Question
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionList;