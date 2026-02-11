import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Download,
  Upload,
  RotateCcw,
  Share2,
  ChevronRight,
  Shuffle,
  ExternalLink,
  X,
  Zap,
  Sparkles,
  Flame,
  Wand2,
  Scroll,
  ShieldCheck
} from 'lucide-react';
import useSheetStore from '../store/sheetStore';
import { Button, Badge, Progress, ManuscriptCard } from '../components/ui';

// Progress Card Component with Glass Effect
const ProgressCard = ({ label, completed, total, color, icon }) => {
  return (
    <ManuscriptCard className="p-4 min-w-[110px] transition-smooth hover:scale-105 cursor-default group">
      <div className="flex items-center gap-2 mb-2">
        {icon && <span className="text-lg sparkle-animation">{icon}</span>}
        <span className={`text-xs font-bold ${color} uppercase tracking-widest font-magical opacity-80`}>{label}</span>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className={`text-2xl font-black ${color} font-magical`}>{completed}</span>
        <span className="text-xs text-yellow-700/60 font-bold">/ {total}</span>
      </div>
      <Progress value={completed} max={total} className="mt-3" />
    </ManuscriptCard>
  );
};

// Circular Progress Component with Animation
const CircularProgress = ({ percentage, size = 70 }) => {
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="circular-progress">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#1a1c2e"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="circular-progress-animated"
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#991b1b" />
            <stop offset="50%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#f87171" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-lg font-black text-red-400 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">{percentage}%</span>
      </div>
    </div>
  );
};

const Header = () => {
  const [randomQuestion, setRandomQuestion] = useState(null);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const {
    topics,
    getStatistics,
    getRandomQuestion,
    currentStreak,
    setView,
    currentView
  } = useSheetStore();

  const stats = getStatistics();

  const handleRandomQuestion = () => {
    const question = getRandomQuestion();
    setRandomQuestion(question);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'ZEUS MAGIC SHEETS',
      text: 'Check out my progress on the ZEUS MAGIC SHEETS!',
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <div
      className="border-b border-[#ffd70033] relative z-40 bg-transparent backdrop-blur-md"
    >
      {/* Sparkle Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />

      {/* Breadcrumb Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-14 text-sm font-serif">
          {/* Magical Logo */}
          <div
            onClick={() => navigate('/')}
            className="w-11 h-11 mr-3 flex-shrink-0 bg-[#0c1428] rounded-full overflow-hidden border-2 border-yellow-600 flex items-center justify-center glow-gold cursor-pointer hover:scale-110 active:scale-95 transition-all"
          >
            <Zap size={22} className="text-yellow-500 sparkle-animation" />
          </div>
          <ChevronRight size={14} className="text-yellow-700 mx-2" />
          <span
            onClick={() => setView('dashboard')}
            className="text-yellow-500/80 hover:text-yellow-400 cursor-pointer transition-colors tracking-widest uppercase text-[10px] font-black"
          >
            Sheets
          </span>
          {currentView === 'sheet' && (() => {
            const currentSheet = useSheetStore.getState().getCurrentSheet();
            return (
              <>
                <ChevronRight size={14} className="text-yellow-700 mx-2" />
                <span
                  onClick={() => setView('sheet')}
                  className="text-yellow-400 font-black font-magical tracking-wider cursor-pointer hover:text-yellow-300 transition-colors"
                >
                  {currentSheet?.icon} {currentSheet?.title}
                </span>
              </>
            );
          })()}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Streak Counter - Top Right */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-500 ${currentStreak > 0 ? 'bg-orange-500/10 border-orange-500/40 shadow-[0_0_15px_rgba(255,69,0,0.1)]' : 'bg-[#0c1428] border-yellow-900/20'} mr-3 group shadow-inner`}>
            <Flame
              size={18}
              className={`transition-all duration-1000 ${currentStreak > 0 ? 'fire-animation' : 'text-yellow-900/40'}`}
            />
            {currentStreak > 0 && (
              <span className="text-[14px] font-black text-orange-500 leading-none font-magical drop-shadow-[0_0_8px_rgba(255,69,0,0.4)]">
                {currentStreak}
              </span>
            )}
          </div>

          {/* Share Button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={handleShare}
            className={copied ? 'bg-green-500/10 border-green-500/40 text-green-400' : ''}
          >
            {copied ? <ShieldCheck size={14} /> : <Share2 size={14} />}
            {copied ? 'Copied!' : 'Share'}
          </Button>
        </div>
      </div>

      {/* Main Header & Stats - Only show in sheet view */}
      {currentView === 'sheet' && (
        <>
          {/* Main Header */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Left Side */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-3xl md:text-4xl font-black text-yellow-500 text-glow-gold font-magical tracking-widest uppercase wingardium-leviosa group cursor-default">
                    {(() => {
                      const currentSheet = useSheetStore.getState().getCurrentSheet();
                      return `${currentSheet?.icon} ${currentSheet?.title}`;
                    })()}
                  </h1>
                  <div className="flex flex-col gap-1">
                    <Badge variant="magical" className="border-yellow-700/50">
                      Latest Edition
                    </Badge>
                    {(() => {
                      const currentSheet = useSheetStore.getState().getCurrentSheet();
                      return currentSheet?.author && (
                        <span className="text-[10px] text-yellow-700/60 font-serif italic text-center">
                          by {currentSheet.author}
                        </span>
                      );
                    })()}
                  </div>
                </div>
                <p className="text-yellow-100/80 text-sm leading-relaxed max-w-xl font-serif italic">
                  {(() => {
                    const currentSheet = useSheetStore.getState().getCurrentSheet();
                    return currentSheet?.description || 'Master these algorithmic challenges to crack your dream job at Google, Amazon, and beyond. Track your progress and consistency... ✨';
                  })()}
                </p>
              </div>

              {/* Right Side - Stats */}
              <div className="flex items-center gap-4 group transition-all">
                <div className="relative">
                  <CircularProgress percentage={stats.completionRate} size={70} />
                </div>
                <div className="ml-0">
                  <div className="text-[10px] text-yellow-600 font-black uppercase tracking-[0.2em] font-magical flex items-center gap-2">
                    <Wand2 size={14} className="text-yellow-600 group-hover:text-yellow-500 group-hover:sparkle-animation transition-all" />
                    Level Progress
                  </div>
                  <div className="text-2xl font-black text-yellow-400 font-magical drop-shadow-[0_0_10px_rgba(255,215,0,0.3)]">
                    {stats.completedQuestions}<span className="text-yellow-700/60 font-serif"> / {stats.totalQuestions}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats and Progress Container */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            {/* Stats Cards */}
            <div className="flex flex-wrap items-center gap-3 mt-8">
              <ProgressCard
                label="Easy"
                completed={stats.easy.completed}
                total={stats.easy.total}
                color="text-green-500"
                icon={<Zap size={18} className="text-green-600 sparkle-animation" />}
              />
              <ProgressCard
                label="Medium"
                completed={stats.medium.completed}
                total={stats.medium.total}
                color="text-yellow-500"
                icon={<Zap size={18} className="text-yellow-500 sparkle-animation" />}
              />
              <ProgressCard
                label="Hard"
                completed={stats.hard.completed}
                total={stats.hard.total}
                color="text-red-500"
                icon={<Zap size={18} className="text-red-600 sparkle-animation" />}
              />

              {/* Expecto Patronum Button */}
              <Button
                variant="danger"
                size="lg"
                onClick={handleRandomQuestion}
                className="btn-magical bg-gradient-to-r from-[#7e0001] to-[#a30002] hover:from-[#a30002] hover:to-[#c40003] border-red-700/50 shadow-[#7e00014d] ml-auto lg:ml-0"
              >
                <Shuffle size={18} className="group-hover:rotate-180 transition-transform duration-700" />
                Surprise Me!
                <Sparkles size={16} className="text-yellow-400 sparkle-animation" />
              </Button>
            </div>

            {/* Global Progress Bar */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-yellow-700 uppercase tracking-widest font-magical">Total Completion</span>
                <span className="text-[10px] font-black text-yellow-500 font-magical">{stats.completionRate}%</span>
              </div>
              <Progress value={stats.completionRate} max={100} className="h-2.5 p-0.5 border border-[#ffd7001a]" />
            </div>
          </div>

          {/* Random Question Modal */}
          {randomQuestion && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center card-enter">
              <div className="glass-card rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl shadow-yellow-900/10 border-[#ffd70033] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-900/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-black text-yellow-500 flex items-center gap-3 font-magical tracking-widest">
                    <Zap size={22} className="sparkle-animation" />
                    Patronus Charm
                  </h3>
                  <button onClick={() => setRandomQuestion(null)} className="p-2 text-yellow-700 hover:text-yellow-400 transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <div className="bg-yellow-950/20 border border-yellow-900/10 rounded-xl p-5 mb-6 shadow-inner">
                  <div className="text-[10px] text-yellow-700 font-bold uppercase tracking-widest mb-2 italic spectral">
                    📁 {randomQuestion.topicTitle} › {randomQuestion.subTopicTitle}
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-4 leading-tight spectral">{randomQuestion.title}</h4>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest border ${randomQuestion.difficulty === 'Easy' ? 'text-green-400 border-green-900/50 bg-green-950/20' :
                      randomQuestion.difficulty === 'Medium' ? 'text-yellow-400 border-yellow-900/50 bg-yellow-950/20' :
                        'text-red-400 border-red-900/50 bg-red-950/20'
                      }`}>
                      {randomQuestion.difficulty}
                    </span>
                    <span className="text-xs text-yellow-500/60 italic font-serif tracking-widest uppercase">{randomQuestion.platform || 'Practice'}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  {randomQuestion.link && (
                    <a
                      href={randomQuestion.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full btn-magical bg-gradient-to-r from-yellow-700 to-yellow-500 hover:from-yellow-600 hover:to-yellow-400 text-[#050a14] font-black py-4 rounded-xl text-center shadow-lg shadow-yellow-900/20 flex items-center justify-center gap-2 transition-all uppercase tracking-widest text-xs"
                    >
                      Enter the Chamber
                      <ExternalLink size={16} />
                    </a>
                  )}
                  <button
                    onClick={handleRandomQuestion}
                    className="w-full py-3 text-yellow-700 hover:text-yellow-500 font-bold text-[10px] uppercase tracking-[0.2em] transition-all font-magical"
                  >
                    Call another Patronus
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Header;