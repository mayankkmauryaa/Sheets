import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, ChevronRight, BookOpen, Star, Trophy, Sparkles, Plus, Search } from 'lucide-react';
import useSheetStore from '../../store/sheetStore';
import { getSlugById } from '../../store/sheets';
import { Button, ManuscriptCard, Progress, Badge } from '../../components/ui';

const Dashboard = () => {
    const navigate = useNavigate();
    const { setView, availableSheets, currentSheetId, setCurrentSheet, fetchRemoteSheet, getStatistics } = useSheetStore();
    const stats = getStatistics();
    const [searchQuery, setSearchQuery] = React.useState('');

    const handleSelectSheet = async (sheetId) => {
        if (sheetId !== currentSheetId) {
            setCurrentSheet(sheetId);
            await fetchRemoteSheet(sheetId);
        }
        setView('sheet');
        const slug = getSlugById(sheetId);
        navigate(`/u/${slug}`);
    };

    // Filter sheets based on search query
    const filteredSheets = availableSheets.filter(sheet =>
        sheet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sheet.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="reveal-animation py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-black text-yellow-500 font-magical tracking-widest uppercase mb-2">
                        Sheets
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

            <div className="mb-10">
                <div className="relative group max-w-2xl mx-auto">
                    <div className="absolute inset-0 bg-yellow-500/5 blur-2xl group-focus-within:bg-yellow-500/10 transition-all opacity-0 group-focus-within:opacity-100" />
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-yellow-600/60 group-focus-within:text-yellow-500 transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search the ancient manuscripts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#0c1428]/40 border border-yellow-900/20 rounded-[1.5rem] pl-14 pr-8 py-5 text-yellow-100 placeholder-yellow-800/40 focus:outline-none focus:border-yellow-500/50 backdrop-blur-xl transition-all font-serif text-lg shadow-2xl relative z-10 italic"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredSheets.map((sheet) => {
                    const percentage = sheet.totalQuestions > 0 ? Math.round((sheet.completedQuestions / sheet.totalQuestions) * 100) : 0;
                    const isActive = sheet.id === currentSheetId;

                    const colorClasses = {
                        yellow: 'from-yellow-900/40 to-yellow-600/20',
                        blue: 'from-blue-900/40 to-blue-600/20',
                        green: 'from-green-900/40 to-green-600/20',
                        purple: 'from-purple-900/40 to-purple-600/20'
                    };

                    return (
                        <ManuscriptCard
                            key={sheet.id}
                            onClick={() => handleSelectSheet(sheet.id)}
                            className={`p-8 cursor-pointer hover:-translate-y-2 hover:shadow-2xl ${isActive ? 'ring-2 ring-yellow-500/50 shadow-lg shadow-yellow-900/20' : 'hover:shadow-yellow-900/20'
                                }`}
                        >
                            {/* Background Glow */}
                            <div className={`absolute top-0 right-0 w-32 h-32 ${colorClasses[sheet.color]} rounded-full blur-[60px] group-hover:opacity-50 transition-opacity`} />

                            {/* Popular Badge */}
                            {sheet.isPopular && (
                                <div className="absolute top-4 right-4 group">
                                    <Badge variant="magical" className="flex items-center gap-1 bg-yellow-500/10 border-yellow-500/30">
                                        <Star size={12} className="text-yellow-500" />
                                        Popular
                                    </Badge>
                                </div>
                            )}

                            <div className="relative z-10">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border ${isActive ? 'border-yellow-500 bg-yellow-900/20' : 'border-yellow-900/30 bg-yellow-900/10 group-hover:border-yellow-500'
                                    } transition-colors`}>
                                    <span className="text-2xl sparkle-animation">{sheet.icon}</span>
                                </div>

                                <h3 className={`text-xl font-black font-magical tracking-wider uppercase mb-4 ${isActive ? 'text-yellow-400' : 'text-yellow-500 group-hover:text-glow-gold'
                                    } transition-all`}>
                                    {sheet.title}
                                </h3>


                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="bg-[#050a14]/60 p-3 rounded-xl border border-yellow-900/10">
                                        <div className="text-[9px] text-yellow-800 font-black uppercase tracking-widest mb-1 flex items-center gap-1.5">
                                            <BookOpen size={10} />
                                            Questions
                                        </div>
                                        <div className="text-lg font-black text-white font-magical">{sheet.totalQuestions}</div>
                                    </div>
                                    <div className="bg-[#050a14]/60 p-3 rounded-xl border border-yellow-900/10">
                                        <div className="text-[9px] text-yellow-800 font-black uppercase tracking-widest mb-1 flex items-center gap-1.5">
                                            <Trophy size={10} />
                                            Completion
                                        </div>
                                        <div className="text-lg font-black text-white font-magical">{percentage}%</div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-[10px] font-black text-yellow-700/60 uppercase tracking-widest font-magical">
                                        <Sparkles size={12} />
                                        {sheet.difficulty}
                                    </div>
                                    <div className="flex items-center gap-1 text-yellow-500 group-hover:translate-x-1 transition-transform">
                                        <span className="text-[10px] font-black uppercase tracking-widest font-magical">
                                            {isActive ? 'Continue' : 'Open'}
                                        </span>
                                        <ChevronRight size={14} />
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Progress Bar */}
                            <Progress value={sheet.completedQuestions} max={sheet.totalQuestions} className="absolute bottom-0 left-0 w-full rounded-none" />
                        </ManuscriptCard>
                    );
                })}

                {/* Placeholder for future sheets */}
                <div className="border border-dashed border-yellow-900/20 rounded-2xl p-10 flex flex-col items-center justify-center text-center group hover:border-yellow-500/30 transition-all cursor-default bg-yellow-900/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
                    <div className="w-16 h-16 bg-yellow-900/10 rounded-full flex items-center justify-center mb-6 text-yellow-700/40 group-hover:scale-110 group-hover:text-yellow-500 transition-all duration-500">
                        <Plus size={32} />
                    </div>
                    <h3 className="text-base font-black text-yellow-700/50 font-magical tracking-[0.2em] uppercase mb-2 group-hover:text-yellow-500/60 transition-colors">
                        Expanding Archives
                    </h3>
                    <p className="text-yellow-800/30 text-xs font-serif italic max-w-[180px]">
                        The library of mastery is ever-growing. New manuscripts await discovery...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
