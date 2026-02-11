import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, ChevronRight, BookOpen, Star, Trophy, Sparkles, Plus, Search } from 'lucide-react';
import useSheetStore from '../../store/sheetStore';
import { getSlugById } from '../../store/sheets';

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

            {/* Search Box */}
            <div className="mb-8">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-600/60" size={20} />
                    <input
                        type="text"
                        placeholder="Search manuscripts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#0c1428]/80 border border-yellow-900/30 rounded-2xl pl-12 pr-6 py-4 text-yellow-100 placeholder-yellow-700/40 focus:outline-none focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20 transition-all font-serif"
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
                        <div
                            key={sheet.id}
                            onClick={() => handleSelectSheet(sheet.id)}
                            className={`group relative glass-card rounded-2xl p-8 cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden ${isActive ? 'ring-2 ring-yellow-500/50 shadow-lg shadow-yellow-900/20' : 'hover:shadow-yellow-900/20'
                                }`}
                        >
                            {/* Background Glow */}
                            <div className={`absolute top-0 right-0 w-32 h-32 ${colorClasses[sheet.color]} rounded-full blur-[60px] group-hover:opacity-50 transition-opacity`} />

                            {/* Popular Badge */}
                            {sheet.isPopular && (
                                <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-yellow-500/20 border border-yellow-500/40 rounded-full">
                                    <Star size={12} className="text-yellow-500" />
                                    <span className="text-[10px] text-yellow-500 font-black uppercase tracking-widest">Popular</span>
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
                            <div className="absolute bottom-0 left-0 h-1 bg-yellow-900/10 w-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-yellow-700 to-yellow-400 transition-all duration-1000"
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </div>
                    );
                })}

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

export default Dashboard;
