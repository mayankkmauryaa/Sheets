import React, { useState } from 'react';
import {
    Plus,
    ChevronDown,
    ChevronUp,
    Search,
    Filter,
    Download,
    Upload,
    RotateCcw,
    Zap,
    Wand2,
    Scroll,
    Sparkles
} from 'lucide-react';
import useSheetStore from '../store/sheetStore';

const Controls = () => {
    const [showAddTopic, setShowAddTopic] = useState(false);
    const [newTopicTitle, setNewTopicTitle] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    const {
        addTopic,
        topics,
        expandAllTopics,
        collapseAllTopics,
        filterStatus,
        filterDifficulty,
        searchQuery,
        setFilterStatus,
        setFilterDifficulty,
        setSearchQuery
    } = useSheetStore();

    const handleAddTopic = () => {
        if (newTopicTitle.trim()) {
            addTopic(newTopicTitle.trim());
            setNewTopicTitle('');
            setShowAddTopic(false);
        }
    };

    const handleExport = () => {
        const data = { topics, exportedAt: new Date().toISOString() };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'wizard-sheet-data.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleImport = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    if (data.topics) {
                        useSheetStore.setState({ topics: data.topics });
                    }
                } catch (error) {
                    console.error('Error importing magic data:', error);
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <div className="relative z-30 mb-8">
            {/* Controls Bar */}
            <div className="border border-[#ffd70033] bg-[#0c1428]/60 backdrop-blur-md rounded-2xl p-4 shadow-2xl overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/5 to-transparent pointer-events-none" />

                <div className="flex flex-wrap items-center justify-between gap-6 relative z-10">
                    {/* Left Controls */}
                    <div className="flex flex-wrap items-center gap-6">
                        {/* Search */}
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-700 group-focus-within:text-yellow-500 transition-all duration-300" size={18} />
                            <input
                                type="text"
                                placeholder="Search for questions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-56 sm:w-72 bg-[#050a14]/60 text-yellow-100 pl-12 pr-6 py-3 rounded-xl border border-yellow-900/40 focus:border-yellow-600 focus:bg-[#050a14]/80 focus:outline-none text-sm transition-all placeholder-yellow-800/60 spectral italic shadow-inner"
                            />
                        </div>

                        {/* Filter Toggle */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl transition-all text-xs font-black uppercase tracking-[0.2em] font-magical border ${showFilters
                                ? 'bg-yellow-900/40 text-yellow-400 border-yellow-500/30 glow-gold'
                                : 'text-yellow-600 hover:text-yellow-400 hover:bg-yellow-950/20 border-transparent'
                                }`}
                        >
                            <Filter size={16} />
                            Filters
                            {(filterStatus !== 'all' || filterDifficulty !== 'all') && (
                                <span className="w-2 h-2 bg-yellow-500 rounded-full sparkle-animation" />
                            )}
                        </button>

                        {/* Expand/Collapse */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={expandAllTopics}
                                className="text-yellow-600 hover:text-yellow-400 flex items-center gap-1.5 transition-all text-[10px] font-black uppercase tracking-widest font-magical px-3 py-1.5 rounded-lg hover:bg-yellow-950/20"
                            >
                                <ChevronDown size={14} />
                                Expand
                            </button>
                            <div className="w-1 h-1 bg-yellow-900/50 rounded-full" />
                            <button
                                onClick={collapseAllTopics}
                                className="text-yellow-600 hover:text-yellow-400 flex items-center gap-1.5 transition-all text-[10px] font-black uppercase tracking-widest font-magical px-3 py-1.5 rounded-lg hover:bg-yellow-950/20"
                            >
                                <ChevronUp size={14} />
                                Collapse
                            </button>
                        </div>
                    </div>

                    {/* Right Controls */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 bg-[#050a14]/40 p-1.5 rounded-xl border border-yellow-900/20">
                            <input type="file" accept=".json" onChange={handleImport} className="hidden" id="import-magic" />
                            <label
                                htmlFor="import-magic"
                                className="flex items-center justify-center w-10 h-10 text-yellow-600 hover:text-yellow-400 hover:bg-yellow-950/30 rounded-lg transition-all cursor-pointer group"
                                title="Import Data"
                            >
                                <Upload size={18} className="group-hover:-translate-y-1 transition-transform" />
                            </label>

                            <button
                                onClick={handleExport}
                                className="flex items-center justify-center w-10 h-10 text-yellow-600 hover:text-yellow-400 hover:bg-yellow-950/30 rounded-lg transition-all group"
                                title="Export Data"
                            >
                                <Download size={18} className="group-hover:translate-y-1 transition-transform" />
                            </button>
                        </div>

                        <button
                            onClick={() => setShowAddTopic(true)}
                            className="btn-magical flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-[#7e0001] to-[#a30002] hover:from-[#a30002] hover:to-[#c40003] text-white font-black rounded-xl text-xs uppercase tracking-[0.15em] font-magical shadow-xl shadow-[#7e00014d] border border-red-800/20 group"
                        >
                            <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                            New Topic
                        </button>
                    </div>
                </div>
            </div>

            {/* Filters Bar */}
            {showFilters && (
                <div className="mt-4 border border-[#ffd7001a] bg-[#0c1428]/80 backdrop-blur-md rounded-2xl p-6 shadow-xl card-enter">
                    <div className="flex flex-wrap items-center gap-8">
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] text-yellow-600 font-black uppercase tracking-[0.2em] font-magical">Mastery Status:</span>
                            <div className="relative">
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="appearance-none bg-[#050a14]/60 text-yellow-400 text-xs font-bold px-6 py-3 pr-10 rounded-xl border border-yellow-900/40 focus:border-yellow-600 focus:outline-none cursor-pointer hover:bg-[#050a14]/80 transition-all uppercase tracking-widest spectral italic"
                                >
                                    <option value="all">All Questions</option>
                                    <option value="completed">✓ Completed</option>
                                    <option value="in-progress">⋯ In-Progress</option>
                                    <option value="pending">○ Pending</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-600 pointer-events-none" size={14} />
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-[10px] text-yellow-600 font-black uppercase tracking-[0.2em] font-magical">Arcane Difficulty:</span>
                            <div className="relative">
                                <select
                                    value={filterDifficulty}
                                    onChange={(e) => setFilterDifficulty(e.target.value)}
                                    className="appearance-none bg-[#050a14]/60 text-yellow-400 text-xs font-bold px-6 py-3 pr-10 rounded-xl border border-yellow-900/40 focus:border-yellow-600 focus:outline-none cursor-pointer hover:bg-[#050a14]/80 transition-all uppercase tracking-widest spectral italic"
                                >
                                    <option value="all">All Difficulties</option>
                                    <option value="Easy">Easy</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Hard">Hard</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-600 pointer-events-none" size={14} />
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                setFilterStatus('all');
                                setFilterDifficulty('all');
                                setSearchQuery('');
                            }}
                            className="ml-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-yellow-600 hover:text-yellow-400 transition-all font-magical px-5 py-3 rounded-xl hover:bg-yellow-950/30"
                        >
                            <RotateCcw size={14} />
                            Reset Filters
                        </button>
                    </div>
                </div>
            )}

            {/* Add Topic Modal */}
            {showAddTopic && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center card-enter">
                    <div className="glass-card rounded-2xl p-10 w-full max-w-md mx-4 shadow-2xl shadow-yellow-900/10 border-[#ffd70033] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-900/5 rounded-full blur-[100px] pointer-events-none" />

                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-black text-yellow-500 flex items-center gap-4 font-magical tracking-[0.1em] uppercase">
                                <Wand2 size={28} className="sparkle-animation" />
                                Create Topic
                            </h3>
                        </div>

                        <div className="relative mb-8">
                            <input
                                type="text"
                                placeholder="Enter topic title..."
                                value={newTopicTitle}
                                onChange={(e) => setNewTopicTitle(e.target.value)}
                                className="w-full bg-[#050a14]/60 text-yellow-100 px-6 py-5 rounded-2xl border border-yellow-900/30 focus:border-yellow-500 focus:outline-none placeholder-yellow-900/40 text-lg transition-all spectral italic shadow-inner"
                                autoFocus
                                onKeyPress={(e) => e.key === 'Enter' && handleAddTopic()}
                            />
                            <div className="absolute -bottom-6 left-0 text-[10px] text-yellow-900/40 uppercase tracking-[0.3em] font-magical">Enter a title...</div>
                        </div>

                        <div className="flex justify-end gap-6">
                            <button
                                onClick={() => {
                                    setShowAddTopic(false);
                                    setNewTopicTitle('');
                                }}
                                className="px-6 py-3 text-yellow-800 hover:text-yellow-400 transition-all font-black uppercase tracking-[0.2em] text-[10px] font-magical hover:bg-yellow-950/20 rounded-xl"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddTopic}
                                className="btn-magical px-10 py-3.5 bg-gradient-to-r from-[#7e0001] to-[#a30002] hover:from-[#a30002] hover:to-[#c40003] text-white font-black rounded-xl text-[10px] uppercase tracking-[0.2em] font-magical shadow-xl shadow-[#7e00014d]"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Controls;
