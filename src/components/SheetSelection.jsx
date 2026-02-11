import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Zap,
  Trophy,
  Star,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Wand2,
  ShieldCheck,
  Flame
} from 'lucide-react';
import useSheetStore from '../store/sheetStore';

const SheetCard = ({ sheet, isActive, onSelect, stats }) => {
  const percentage = sheet.totalQuestions > 0 ? Math.round((sheet.completedQuestions / sheet.totalQuestions) * 100) : 0;

  const colorClasses = {
    yellow: {
      bg: 'from-yellow-900/20 to-yellow-800/10',
      border: 'border-yellow-700/50',
      text: 'text-yellow-500',
      progress: 'from-yellow-700 to-yellow-500',
      hover: 'hover:border-yellow-500/70'
    },
    blue: {
      bg: 'from-blue-900/20 to-blue-800/10',
      border: 'border-blue-700/50',
      text: 'text-blue-500',
      progress: 'from-blue-700 to-blue-500',
      hover: 'hover:border-blue-500/70'
    },
    green: {
      bg: 'from-green-900/20 to-green-800/10',
      border: 'border-green-700/50',
      text: 'text-green-500',
      progress: 'from-green-700 to-green-500',
      hover: 'hover:border-green-500/70'
    },
    purple: {
      bg: 'from-purple-900/20 to-purple-800/10',
      border: 'border-purple-700/50',
      text: 'text-purple-500',
      progress: 'from-purple-700 to-purple-500',
      hover: 'hover:border-purple-500/70'
    }
  };

  const colors = colorClasses[sheet.color] || colorClasses.yellow;

  return (
    <div
      onClick={() => onSelect(sheet.id)}
      className={`relative glass-card rounded-2xl p-6 cursor-pointer transition-all duration-300 border ${colors.border} ${colors.hover} ${isActive ? 'ring-2 ring-yellow-500/50 shadow-lg shadow-yellow-900/20' : 'shadow-xl'
        } group overflow-hidden`}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-50`} />

      {/* Popular Badge */}
      {sheet.isPopular && (
        <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-yellow-500/20 border border-yellow-500/40 rounded-full">
          <Star size={12} className="text-yellow-500" />
          <span className="text-[10px] text-yellow-500 font-black uppercase tracking-widest">Popular</span>
        </div>
      )}

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.bg} border ${colors.border} flex items-center justify-center text-2xl sparkle-animation`}>
              {sheet.icon}
            </div>
            <div>
              <h3 className={`text-xl font-black ${colors.text} font-magical tracking-wider uppercase`}>
                {sheet.title}
              </h3>
              <p className={`text-xs ${colors.text.replace('500', '600')} font-serif italic opacity-80`}>
                {sheet.difficulty}
              </p>
            </div>
          </div>
          {isActive && (
            <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${colors.progress} flex items-center justify-center`}>
              <Sparkles size={14} className="text-white" />
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-yellow-100/70 leading-relaxed mb-6 font-serif">
          {sheet.description}
        </p>

        {/* Stats */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className={`text-2xl font-black ${colors.text} font-magical`}>
                  {sheet.completedQuestions}
                </div>
                <div className="text-[10px] text-yellow-700 uppercase tracking-widest font-magical">
                  Completed
                </div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-black ${colors.text.replace('500', '600')} font-magical opacity-60`}>
                  {sheet.totalQuestions}
                </div>
                <div className="text-[10px] text-yellow-700 uppercase tracking-widest font-magical">
                  Total
                </div>
              </div>
              {sheet.totalQuestions > 0 && (
                <div className="text-center">
                  <div className={`text-2xl font-black ${colors.text} font-magical`}>
                    {percentage}%
                  </div>
                  <div className="text-[10px] text-yellow-700 uppercase tracking-widest font-magical">
                    Progress
                  </div>
                </div>
              )}
            </div>

            <ChevronRight
              size={20}
              className={`${colors.text} transition-transform duration-300 group-hover:translate-x-1 opacity-0 group-hover:opacity-100`}
            />
          </div>

          {/* Progress Bar */}
          {sheet.totalQuestions > 0 && (
            <div className="relative">
              <div className="w-full bg-[#0c1428] rounded-full h-2 overflow-hidden border border-[#ffd7001a] p-0.5">
                <div
                  className={`h-full bg-gradient-to-r ${colors.progress} rounded-full transition-all duration-1000 progress-bar-animated`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )}

          {/* Action Button */}
          <button
            className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300 ${isActive
                ? `bg-gradient-to-r ${colors.progress} text-white shadow-lg`
                : `bg-gradient-to-r ${colors.bg} ${colors.text} border ${colors.border} hover:shadow-lg`
              } font-magical flex items-center justify-center gap-2`}
          >
            {isActive ? (
              <>
                <Zap size={16} />
                Continue Journey
              </>
            ) : (
              <>
                <BookOpen size={16} />
                Begin Journey
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const SheetSelection = () => {
  const navigate = useNavigate();
  const {
    availableSheets,
    currentSheetId,
    setCurrentSheet,
    fetchRemoteSheet,
    isLoading
  } = useSheetStore();

  const handleSelectSheet = async (sheetId) => {
    if (sheetId !== currentSheetId) {
      setCurrentSheet(sheetId);
      await fetchRemoteSheet(sheetId);
    }
    navigate('/sheet');
  };

  const totalQuestions = availableSheets.reduce((acc, sheet) => acc + sheet.totalQuestions, 0);
  const totalCompleted = availableSheets.reduce((acc, sheet) => acc + sheet.completedQuestions, 0);
  const totalProgress = totalQuestions > 0 ? Math.round((totalCompleted / totalQuestions) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#050a14] selection:bg-yellow-900/30">
      {/* Sparkle Background */}
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 border-b border-[#ffd70033] bg-[#050a14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#0c1428] rounded-full border-2 border-yellow-600 flex items-center justify-center glow-gold">
                <Wand2 size={24} className="text-yellow-500 sparkle-animation" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-yellow-500 font-magical tracking-wider uppercase">
                  Sheets
                </h1>
                <p className="text-yellow-100/70 font-serif italic">
                  Select a manuscript to begin your journey of mastery
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overall Stats */}
        <div className="glass-card rounded-2xl p-6 mb-8 border-[#ffd70033] bg-gradient-to-r from-[#0c1428] to-[#050a14]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <div className="text-[10px] text-yellow-700 font-black uppercase tracking-widest font-magical">
                  Total Manuscripts
                </div>
                <div className="text-3xl font-black text-yellow-500 font-magical">
                  {availableSheets.length}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-yellow-700 font-black uppercase tracking-widest font-magical">
                  Total Progress
                </div>
                <div className="text-3xl font-black text-yellow-500 font-magical">
                  {totalProgress}%
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-yellow-600/60">
              <ShieldCheck size={20} />
              <span className="text-sm font-serif italic">Powered by ZEUS Archives</span>
            </div>
          </div>
        </div>

        {/* Sheet Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-yellow-500/10 border-t-yellow-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-full blur-xl animate-pulse"></div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-yellow-500 mt-8 mb-2 font-magical tracking-[0.3em] uppercase">
              Summoning archives...
            </h3>
            <p className="text-red-300/60 italic spectral animate-pulse">
              Consulting the manuscripts of ZEUS MAGIC
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {availableSheets.map((sheet) => (
              <SheetCard
                key={sheet.id}
                sheet={sheet}
                isActive={sheet.id === currentSheetId}
                onSelect={handleSelectSheet}
              />
            ))}
          </div>
        )}

        {/* Coming Soon Section */}
        <div className="mt-12 text-center">
          <div className="glass-card rounded-2xl p-8 border-[#ffd70033]/30 bg-[#0c1428]/50">
            <div className="w-16 h-16 bg-[#0c1428] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#ffd70033] shadow-[0_0_20px_rgba(255,215,0,0.1)]">
              <Sparkles className="w-8 h-8 text-yellow-500 sparkle-animation" />
            </div>
            <h3 className="text-xl font-black text-yellow-500 mb-2 font-magical tracking-widest uppercase">
              More Archives Coming
            </h3>
            <p className="text-yellow-100/60 font-serif italic">
              Expanding the library of mastery...
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#ffd7001a] mt-auto bg-[#050a14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-yellow-600/60 font-medium tracking-widest uppercase">
              ✨ ZEUS MAGIC SHEET - Master the Art of Coding
            </p>
            <div className="flex items-center gap-6">
              <p className="text-xs text-red-900/40 font-serif italic">
                Powered by ZEUS Archives
              </p>
              <p className="text-sm text-yellow-900/40">
                React + Vite + Magical CSS
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SheetSelection;