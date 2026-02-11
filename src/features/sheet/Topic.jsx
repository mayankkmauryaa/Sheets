import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ChevronDown, Edit2, Trash2, MoreHorizontal, Zap, X, GripVertical, Plus, BookOpen, Scroll as ScrollIcon } from 'lucide-react';
import useSheetStore from '../../store/sheetStore';
import SubTopicList from './SubTopicList';
import { Progress, ProgressInfo, Button, ManuscriptCard } from '../../components/ui';

const Topic = ({ topic, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(topic.title);
  const [showAddSubTopic, setShowAddSubTopic] = useState(false);
  const [newSubTopicTitle, setNewSubTopicTitle] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const {
    updateTopic,
    deleteTopic,
    addSubTopic,
    toggleTopicExpansion,
    expandedTopics
  } = useSheetStore();

  const isExpanded = expandedTopics.has(topic.id);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: topic.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: showMenu ? 50 : (isDragging ? 100 : 1),
    position: 'relative'
  };

  // Calculate progress
  const totalQuestions = topic.subTopics.reduce(
    (acc, st) => acc + st.questions.length, 0
  );
  const completedQuestions = topic.subTopics.reduce(
    (acc, st) => acc + st.questions.filter(q => q.status === 'completed').length, 0
  );
  const progressPercentage = totalQuestions > 0 ? Math.round((completedQuestions / totalQuestions) * 100) : 0;

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      updateTopic(topic.id, { title: editTitle.trim() });
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(topic.title);
    setIsEditing(false);
  };

  const handleAddSubTopic = () => {
    if (newSubTopicTitle.trim()) {
      addSubTopic(topic.id, newSubTopicTitle.trim());
      setNewSubTopicTitle('');
      setShowAddSubTopic(false);
    }
  };

  const handleDelete = () => {
    if (confirm(`Do you wish to banish "${topic.title}" from the archives?`)) {
      deleteTopic(topic.id);
    }
  };

  return (
    <div ref={setNodeRef} style={style} className="mb-4 reveal-animation">
      {/* Topic Header */}
      <ManuscriptCard
        className={`flex items-center px-6 py-5 cursor-pointer transition-all duration-500 group relative ${isExpanded ? 'rounded-b-none border-b-0 bg-[#0c1428]' : 'hover:bg-[#0c1428]'
          }`}
        onClick={() => !isEditing && toggleTopicExpansion(topic.id)}
      >

        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="mr-5 cursor-grab active:cursor-grabbing text-yellow-900/40 hover:text-yellow-500 opacity-0 group-hover:opacity-100 transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical size={20} />
        </div>

        {/* Expand Icon */}
        <div className={`mr-4 text-yellow-700 transition-transform duration-500 ${isExpanded ? 'rotate-0' : '-rotate-90'}`}>
          <ChevronDown size={20} className={isExpanded ? 'sparkle-animation' : ''} />
        </div>

        {/* Topic Title or Edit */}
        {isEditing ? (
          <div className="flex-1 flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="flex-1 bg-[#050a14]/60 text-yellow-100 px-4 py-2.5 rounded-xl border border-yellow-900/30 focus:border-yellow-500 focus:outline-none font-serif italic"
              autoFocus
              onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
            />
            <Button variant="primary" size="sm" onClick={handleSaveEdit}>
              <Zap size={16} />
            </Button>
            <Button variant="danger" size="sm" onClick={handleCancelEdit}>
              <X size={16} />
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <span className="text-yellow-500 font-black text-lg font-magical tracking-widest uppercase drop-shadow-[0_0_8px_rgba(255,215,0,0.1)]">
                  {topic.title}
                </span>
                <div className="h-px bg-yellow-900/20 flex-1 hidden md:block" />
              </div>

              {/* Progress info */}
              <div className="flex items-center gap-4">
                <Progress value={completedQuestions} max={totalQuestions} className="flex-1 max-w-[200px]" />
                <ProgressInfo completed={completedQuestions} total={totalQuestions} />
              </div>
            </div>

            {/* Actions Menu */}
            <div className="relative ml-4 z-50">
              <button
                onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
                className="p-2.5 text-yellow-700 hover:text-yellow-500 rounded-xl hover:bg-yellow-950/30 transition-all border border-transparent hover:border-yellow-900/30"
              >
                <MoreHorizontal size={20} />
              </button>

              {showMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setShowMenu(false); }} />
                  <div className="absolute right-0 mt-2 w-52 glass-card rounded-2xl shadow-2xl shadow-[#7e000120] z-20 py-3 card-enter border-[#ffd70033]" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => { setShowAddSubTopic(true); setShowMenu(false); }}
                      className="w-full px-5 py-3 text-left text-xs font-black uppercase tracking-widest text-yellow-500 hover:text-yellow-400 hover:bg-yellow-950/40 flex items-center gap-3 transition-all font-magical"
                    >
                      <Plus size={16} />
                      Add Subtopic
                    </button>
                    <button
                      onClick={() => { setIsEditing(true); setShowMenu(false); }}
                      className="w-full px-5 py-3 text-left text-xs font-black uppercase tracking-widest text-yellow-500 hover:text-yellow-400 hover:bg-yellow-950/40 flex items-center gap-3 transition-all font-magical"
                    >
                      <Edit2 size={16} />
                      Edit Title
                    </button>
                    <div className="my-2 border-t border-yellow-900/20" />
                    <button
                      onClick={() => { handleDelete(); setShowMenu(false); }}
                      className="w-full px-5 py-3 text-left text-xs font-black uppercase tracking-widest text-red-500 hover:bg-red-900/20 flex items-center gap-3 transition-all font-magical"
                    >
                      <Trash2 size={16} />
                      Delete Topic
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </ManuscriptCard>

      {/* Add SubTopic Input */}
      {
        showAddSubTopic && (
          <div className="flex items-center gap-3 px-6 py-5 bg-[#0c1428]/40 border-x border-[#ffd7001a] expand-animation relative">
            <div className="absolute inset-y-0 left-0 w-1 bg-yellow-600 shadow-[0_0_10px_rgba(255,215,0,0.5)]" />
            <input
              type="text"
              placeholder="Name the new subtopic..."
              value={newSubTopicTitle}
              onChange={(e) => setNewSubTopicTitle(e.target.value)}
              className="flex-1 bg-[#050a14]/60 text-yellow-100 px-5 py-3 rounded-xl border border-yellow-900/30 focus:border-yellow-500 focus:outline-none text-sm placeholder-yellow-900/30 font-serif italic"
              autoFocus
              onKeyPress={(e) => e.key === 'Enter' && handleAddSubTopic()}
            />
            <button onClick={handleAddSubTopic} className="px-6 py-3 bg-yellow-600 hover:bg-yellow-500 text-[#050a14] text-xs font-black uppercase tracking-widest font-magical rounded-xl transition-all shadow-lg shadow-yellow-900/20">
              Add
            </button>
            <button onClick={() => { setShowAddSubTopic(false); setNewSubTopicTitle(''); }} className="px-4 py-3 text-yellow-900 hover:text-yellow-500 text-xs font-black uppercase tracking-widest font-magical transition-all">
              Cancel
            </button>
          </div>
        )
      }

      {/* SubTopics List */}
      {
        isExpanded && (
          <div className="glass-card border-t-0 rounded-t-none rounded-b-2xl overflow-hidden shadow-2xl bg-[#0c1428]/30 card-enter">
            <SubTopicList
              topicId={topic.id}
              topicTitle={topic.title}
              subTopics={topic.subTopics}
            />
          </div>
        )
      }
    </div >
  );
};

export default Topic;