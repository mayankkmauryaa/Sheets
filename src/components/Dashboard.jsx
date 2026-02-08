import React from 'react';
import { Zap, ChevronRight, BookOpen, Star, Trophy, Sparkles } from 'lucide-react';
import useSheetStore from '../store/sheetStore';

const Dashboard = () => {
    const { setView, getStatistics } = useSheetStore();
    const stats = getStatistics();

    const availableSheets = [
        {
            id: 'zeus-magic-sheet',
            title: 'ZEUS MAGIC SHEET',
            description: 'Master the Art of Coding with the legendary SDE sheet. 450+ hand-picked problems from top tech archives.',
            stats: {
                total: stats.totalQuestions,
                completed: stats.completedQuestions,
                percent: stats.completionRate
            },
            difficulty: 'Intermediate to Advanced',
            color: 'from-yellow-900/40 to-yellow-600/20'
        }
    ];

    return (
        <div className="reveal-animation py-8">
            <div className="flex items-center justify-between mb-12">
                <div>
                    <h2 className="text-3xl font-black text-yellow-500 font-magical tracking-widest uppercase mb-2">
                        The Grand Archives
                    </h2>
                    <p className="text-yellow-100/60 font-serif italic text-sm">
                        Select a manuscript to begin your journey of mastery
                    </p>
                </div>
                <div className="flex items-center gap-4 bg-[#0c1428]/80 px-6 py-3 rounded-2xl border border-yellow-900/20">
                    <div className="text-center">
                        <div className="text-[10px] text-yellow-700 font-black uppercase tracking-widest mb-1">Total Manuscripts</div>
                        <div className="text-xl font-black text-white font-magical">{availableSheets.length}</div>
                    </div>
                    <div className="w-px h-8 bg-yellow-900/20" />
                    <div className="text-center">
                        <div className="text-[10px] text-yellow-700 font-black uppercase tracking-widest mb-1">Total Progress</div>
                        <div className="text-xl font-black text-white font-magical">{stats.completionRate}%</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {availableSheets.map((sheet) => (
                    <div
                        key={sheet.id}
                        onClick={() => setView('sheet')}
                        className={`group relative glass-card rounded-2xl p-8 cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-900/20 overflow-hidden`}
                    >
                        {/* Background Glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-[60px] group-hover:bg-yellow-500/10 transition-colors" />

                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-yellow-900/20 rounded-2xl flex items-center justify-center mb-6 border border-yellow-900/30 group-hover:border-yellow-500 transition-colors">
                                <Zap size={28} className="text-yellow-500 sparkle-animation" />
                            </div>

                            <h3 className="text-xl font-black text-yellow-500 font-magical tracking-wider uppercase mb-4 group-hover:text-glow-gold transition-all">
                                {sheet.title}
                            </h3>

                            <p className="text-yellow-100/60 text-sm leading-relaxed mb-8 spectral italic">
                                {sheet.description}
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-[#050a14]/60 p-3 rounded-xl border border-yellow-900/10">
                                    <div className="text-[9px] text-yellow-800 font-black uppercase tracking-widest mb-1 flex items-center gap-1.5">
                                        <BookOpen size={10} />
                                        Questions
                                    </div>
                                    <div className="text-lg font-black text-white font-magical">{sheet.stats.total}</div>
                                </div>
                                <div className="bg-[#050a14]/60 p-3 rounded-xl border border-yellow-900/10">
                                    <div className="text-[9px] text-yellow-800 font-black uppercase tracking-widest mb-1 flex items-center gap-1.5">
                                        <Trophy size={10} />
                                        Completion
                                    </div>
                                    <div className="text-lg font-black text-white font-magical">{sheet.stats.percent}%</div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-[10px] font-black text-yellow-700/60 uppercase tracking-widest font-magical">
                                    <Sparkles size={12} />
                                    {sheet.difficulty}
                                </div>
                                <div className="flex items-center gap-1 text-yellow-500 group-hover:translate-x-1 transition-transform">
                                    <span className="text-[10px] font-black uppercase tracking-widest font-magical">Open</span>
                                    <ChevronRight size={14} />
                                </div>
                            </div>
                        </div>

                        {/* Bottom Progress Bar */}
                        <div className="absolute bottom-0 left-0 h-1 bg-yellow-900/10 w-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-yellow-700 to-yellow-400 transition-all duration-1000"
                                style={{ width: `${sheet.stats.percent}%` }}
                            />
                        </div>
                    </div>
                ))}

                {/* Placeholder for future sheets */}
                <div className="border-2 border-dashed border-yellow-900/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center group hover:border-yellow-900/30 transition-all cursor-default">
                    <div className="w-12 h-12 bg-yellow-900/5 rounded-full flex items-center justify-center mb-4 text-yellow-900/30 group-hover:scale-110 transition-transform">
                        <Plus size={24} />
                    </div>
                    <h3 className="text-sm font-black text-yellow-900/40 font-magical tracking-widest uppercase mb-1">
                        More Archives Coming
                    </h3>
                    <p className="text-yellow-900/20 text-xs font-serif italic">
                        Expanding the library of mastery...
                    </p>
                </div>
            </div>
        </div>
    );
};

// Simple Plus icon since I forgot to import it
const Plus = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);

export default Dashboard;
