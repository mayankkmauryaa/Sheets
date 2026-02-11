import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Edit2,
  Trash2,
  Zap,
  X,
  ExternalLink,
  ShieldCheck,
  Circle,
  Star,
  FileText,
  GripVertical,
  FlaskConical,
  Gem,
  Flame,
  Ghost
} from 'lucide-react';
import useSheetStore from '../../store/sheetStore';

// Platform badge
const PlatformBadge = ({ platform }) => {
  const config = {
    leetcode: { bg: 'bg-gradient-to-r from-orange-950 to-orange-900 border-orange-800/30', text: 'LC' },
    geeksforgeeks: { bg: 'bg-gradient-to-r from-green-950 to-green-900 border-green-800/30', text: 'GFG' },
    gfg: { bg: 'bg-gradient-to-r from-green-950 to-green-900 border-green-800/30', text: 'GFG' },
    interviewbit: { bg: 'bg-gradient-to-r from-blue-950 to-blue-900 border-blue-800/30', text: 'IB' },
  };

  const p = platform?.toLowerCase() || '';
  const c = Object.keys(config).find(k => p.includes(k));
  const { bg, text } = c ? config[c] : { bg: 'bg-[#050a14] border-yellow-900/20', text: platform?.slice(0, 3) || '?' };

  return (
    <span className={`px-2 py-0.5 ${bg} text-yellow-500/80 text-[10px] font-black uppercase tracking-widest rounded border shadow-sm font-magical`}>
      {text}
    </span>
  );
};

// Difficulty badge
const DifficultyBadge = ({ difficulty }) => {
  const config = {
    Easy: 'text-green-500/80 bg-green-950/20 border-green-900/40 shadow-[0_0_10px_rgba(34,197,94,0.1)]',
    Medium: 'text-yellow-500/80 bg-yellow-950/20 border-yellow-900/40 shadow-[0_0_10px_rgba(234,179,8,0.1)]',
    Hard: 'text-red-500/80 bg-red-950/20 border-red-900/40 shadow-[0_0_10px_rgba(239,68,68,0.1)]',
  };

  const labels = {
    Easy: 'Easy',
    Medium: 'Medium',
    Hard: 'Hard',
  };

  return (
    <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1.5 rounded-lg border font-magical transition-all duration-500 hover:scale-105 ${config[difficulty] || 'text-yellow-700 bg-yellow-950/20 border-yellow-900/30'}`}>
      {labels[difficulty] || difficulty}
    </span>
  );
};

// Tag pill
const TagPill = ({ tag, color = 'text-yellow-700', bg = 'bg-[#0c1428]' }) => (
  <span className={`px-2 py-0.5 ${bg} ${color} text-[9px] font-black uppercase tracking-widest rounded-full border border-yellow-900/20 font-magical`}>
    {tag}
  </span>
);

// Notes Modal
const NotesModal = ({ question, topicId, subTopicId, onClose }) => {
  const [note, setNote] = useState(question.note || '');
  const { setQuestionNote } = useSheetStore();

  const handleSave = () => {
    setQuestionNote(topicId, subTopicId, question.id, note);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center card-enter" onClick={onClose}>
      <div className="glass-card rounded-2xl p-10 w-full max-w-xl mx-4 shadow-2xl border-[#ffd70033] relative overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-900/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-black text-yellow-500 font-magical tracking-[0.2em] uppercase flex items-center gap-4">
            <FileText size={24} className="text-yellow-600 sparkle-animation" />
            Question Notes
          </h3>
          <button onClick={onClose} className="p-2 text-yellow-800 hover:text-yellow-500 rounded-xl hover:bg-yellow-950/30 transition-all">
            <X size={20} />
          </button>
        </div>

        <div className="text-sm text-yellow-700/60 mb-6 font-serif italic tracking-wide">Refining: <span className="text-yellow-400/80 not-italic font-magical uppercase tracking-widest">{question.title}</span></div>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Type your notes here..."
          className="w-full h-56 bg-[#050a14]/60 text-yellow-100 px-6 py-5 rounded-2xl border border-yellow-900/30 focus:border-yellow-500 focus:outline-none resize-none spectral italic text-lg shadow-inner placeholder-yellow-900/20"
          autoFocus
        />

        <div className="flex justify-end gap-6 mt-8">
          <button onClick={onClose} className="px-6 py-3 text-yellow-800 hover:text-yellow-400 transition-all text-[10px] font-black uppercase tracking-[0.2em] font-magical rounded-xl">
            Discard
          </button>
          <button onClick={handleSave} className="btn-magical px-10 py-3.5 bg-gradient-to-r from-[#7e0001] to-[#a30002] hover:from-[#a30002] hover:to-[#c40003] text-white font-black rounded-xl text-[10px] uppercase tracking-[0.2em] font-magical shadow-xl shadow-[#7e00014d]">
            Save Notes
          </button>
        </div>
      </div>
    </div>
  );
};

const Question = ({ topicId, subTopicId, question, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [editData, setEditData] = useState({
    title: question.title,
    difficulty: question.difficulty,
    platform: question.platform,
    link: question.link
  });

  const { updateQuestion, deleteQuestion, toggleQuestionStatus, toggleQuestionStar } = useSheetStore();

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: question.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  const handleSaveEdit = () => {
    if (editData.title.trim()) {
      updateQuestion(topicId, subTopicId, question.id, editData);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditData({ title: question.title, difficulty: question.difficulty, platform: question.platform, link: question.link });
    setIsEditing(false);
  };

  const getTags = () => {
    const tags = [];
    if (question.difficulty === 'Easy') tags.push({ text: 'Fundamental', color: 'text-green-500/60' });
    else if (question.difficulty === 'Medium') tags.push({ text: 'Intermediate', color: 'text-yellow-500/60' });
    else tags.push({ text: 'Advanced', color: 'text-red-500/60' });

    // Add company tags as well (max 2 for UI space)
    if (question.companyTags && question.companyTags.length > 0) {
      question.companyTags.slice(0, 2).forEach(c => tags.push({ text: c, color: 'text-blue-400/60', bg: 'bg-blue-950/20' }));
    }
    return tags;
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className="flex items-center px-6 py-4 border-b border-yellow-900/10 group hover:bg-yellow-950/10 transition-colors duration-500"
      >
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="mr-4 cursor-grab active:cursor-grabbing text-yellow-900/40 hover:text-yellow-500 opacity-0 group-hover:opacity-100 transition-all"
        >
          <GripVertical size={18} />
        </div>

        {/* Status Toggle */}
        <button
          onClick={() => toggleQuestionStatus(topicId, subTopicId, question.id)}
          className="mr-5 flex-shrink-0 transition-all duration-500 hover:scale-110 active:scale-95"
        >
          {question.status === 'completed' ? (
            <ShieldCheck size={24} className="text-yellow-500 sparkle-animation drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]" />
          ) : (
            <div className="w-6 h-6 rounded-full border border-yellow-900/30 flex items-center justify-center hover:border-yellow-600 group/status">
              <Zap size={14} className="text-yellow-900/20 group-hover/status:text-yellow-600 transition-colors" />
            </div>
          )}
        </button>

        {isEditing ? (
          <div className="flex-1 flex items-center gap-3">
            <input
              type="text"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              className="flex-1 bg-[#050a14]/60 text-yellow-100 px-4 py-2 text-sm rounded-xl border border-yellow-900/30 focus:border-yellow-500 focus:outline-none spectral italic"
            />
            <select
              value={editData.difficulty}
              onChange={(e) => setEditData({ ...editData, difficulty: e.target.value })}
              className="bg-[#050a14]/60 text-yellow-500 text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-xl border border-yellow-900/30 font-magical"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <input
              type="text"
              value={editData.platform}
              onChange={(e) => setEditData({ ...editData, platform: e.target.value })}
              className="w-28 bg-[#050a14]/60 text-yellow-500 text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-xl border border-yellow-900/30 font-magical"
              placeholder="Source"
            />
            <button onClick={handleSaveEdit} className="p-2.5 bg-yellow-600 hover:bg-yellow-500 text-[#050a14] rounded-xl transition-all">
              <Zap size={16} />
            </button>
            <button onClick={handleCancelEdit} className="p-2.5 bg-red-900/20 hover:bg-red-900/40 text-red-500 rounded-xl transition-all">
              <X size={16} />
            </button>
          </div>
        ) : (
          <>
            {/* Title & Info */}
            <div className="flex-1 min-w-0 flex flex-col">
              <div className="flex items-center gap-3">
                <span className={`text-[15px] font-medium tracking-wide truncate ${question.status === 'completed' ? 'text-yellow-800/60 italic spectral' : 'text-yellow-100/95'
                  }`}>
                  {question.title}
                </span>

                {question.verified && (
                  <ShieldCheck size={14} className="text-blue-500 sparkle-animation opacity-60" title="Verified Manuscript" />
                )}

                {question.link && (
                  <a
                    href={question.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-600 hover:text-yellow-400 transition-all flex-shrink-0 group-hover:scale-110"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>

              {question.description && (
                <span className="text-[10px] text-yellow-800/40 spectral italic truncate max-w-md hidden group-hover:block">
                  {question.description}
                </span>
              )}
            </div>

            {/* Platform */}
            <div className="w-20 flex-shrink-0 flex justify-center">
              <PlatformBadge platform={question.platform} />
            </div>

            {/* Difficulty */}
            <div className="w-28 flex-shrink-0 flex justify-center">
              <DifficultyBadge difficulty={question.difficulty} />
            </div>

            {/* Tags */}
            <div className="w-48 flex-shrink-0 flex gap-1.5 justify-end hidden lg:flex overflow-hidden">
              {getTags().map((tag, i) => (
                <TagPill key={i} tag={tag.text} color={tag.color} bg={tag.bg} />
              ))}
            </div>

            {/* Actions */}
            <div className="w-32 flex-shrink-0 flex items-center justify-end gap-1 ml-4">
              <button
                onClick={() => toggleQuestionStar(topicId, subTopicId, question.id)}
                className={`p-2 rounded-xl transition-all duration-300 ${question.starred
                  ? 'text-yellow-400 glow-gold scale-110'
                  : 'text-yellow-700/40 hover:text-yellow-500 opacity-0 group-hover:opacity-100'
                  }`}
              >
                <Star size={16} fill={question.starred ? 'currentColor' : 'none'} className={question.starred ? 'sparkle-animation' : ''} />
              </button>
              <button
                onClick={() => setShowNotes(true)}
                className={`p-2 rounded-xl transition-all duration-300 ${question.note
                  ? 'text-yellow-400'
                  : 'text-yellow-700/40 hover:text-yellow-500 opacity-0 group-hover:opacity-100'
                  }`}
              >
                <FileText size={16} />
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-yellow-700/40 hover:text-yellow-500 opacity-0 group-hover:opacity-100 transition-all rounded-xl"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => confirm('Do you wish to delete this question?') && deleteQuestion(topicId, subTopicId, question.id)}
                className="p-2 text-yellow-700/40 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all rounded-xl"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </>
        )}
      </div>

      {showNotes && (
        <NotesModal question={question} topicId={topicId} subTopicId={subTopicId} onClose={() => setShowNotes(false)} />
      )}
    </>
  );
};

export default Question;