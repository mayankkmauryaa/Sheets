import React, { useMemo } from 'react';
import useSheetStore from '../../store/sheetStore';
import { Flame, Trophy, Scroll, Zap } from 'lucide-react';

const ActivityGraph = () => {
    const { activity, currentStreak, maxStreak } = useSheetStore();

    const graphData = useMemo(() => {
        const today = new Date();
        const days = [];
        // Show last 53 weeks (rolling year)
        const totalDays = 53 * 7;

        for (let i = totalDays - 1; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            const count = activity[dateStr] || 0;

            days.push({
                date: dateStr,
                count,
                level: count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 6 ? 3 : 4
            });
        }
        return days;
    }, [activity]);

    const monthLabels = useMemo(() => {
        const today = new Date();
        const labels = [];
        const totalWeeks = 53;

        let lastMonth = -1;
        for (let i = 0; i < totalWeeks; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - (totalWeeks - i) * 7);
            const currentMonth = date.getMonth();

            if (currentMonth !== lastMonth) {
                labels.push({
                    month: date.toLocaleString('default', { month: 'short' }),
                    index: i
                });
                lastMonth = currentMonth;
            }
        }
        return labels;
    }, []);

    return (
        <div className="glass-card rounded-2xl p-6 mb-8 border-[#ffd70033] relative overflow-hidden group">
            {/* Background ambient glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-yellow-900/10 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 relative z-10">
                <div>
                    <h2 className="text-xl font-black text-yellow-500 flex items-center gap-3 mb-1 font-magical tracking-widest">
                        <Scroll className="text-yellow-600 sparkle-animation" size={20} />
                        Activity Tracker
                    </h2>
                    <p className="text-yellow-100/60 text-xs font-serif italic">The Daily Consistency of a Master Coder</p>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 ${currentStreak > 0 ? 'bg-orange-500/10 border-orange-500/40 shadow-[0_0_15px_rgba(255,69,0,0.2)]' : 'bg-slate-900/40 border-slate-800/40 text-slate-700/40'}`}>
                            <Flame size={20} className={currentStreak > 0 ? 'fire-animation' : 'opacity-20'} />
                        </div>
                        <div>
                            <div className="text-[10px] text-yellow-600 font-black uppercase tracking-widest font-magical">Current Streak</div>
                            <div className="text-lg font-black text-white font-magical">
                                {currentStreak > 0 ? (
                                    <>{currentStreak} <span className="text-[10px] text-orange-700 font-bold uppercase tracking-widest">Days</span></>
                                ) : (
                                    <span className="text-slate-500 font-normal spectral italic">Start your journey!</span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="w-px h-8 bg-yellow-900/20" />

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-yellow-950/20 border border-yellow-900/30 flex items-center justify-center text-yellow-500/80 shadow-inner">
                            <Trophy size={18} />
                        </div>
                        <div>
                            <div className="text-[10px] text-yellow-600 font-black uppercase tracking-widest font-magical">Max Streak</div>
                            <div className="text-lg font-black text-white font-magical">{maxStreak} <span className="text-[10px] text-yellow-700/60 font-bold uppercase tracking-widest">Days</span></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative overflow-x-auto pb-2 scrollbar-magical">
                <div className="min-w-max">
                    <div className="relative flex text-[10px] text-yellow-600 font-black uppercase tracking-[0.2em] mb-3 ml-10 h-4 font-magical">
                        {monthLabels.map((label, i) => (
                            <div
                                key={i}
                                className="absolute"
                                style={{ left: `${label.index * 16}px` }}
                            >
                                {label.month}
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-2">
                        <div className="flex flex-col justify-between text-[10px] text-yellow-700/60 font-black py-1 h-[90px] font-serif uppercase tracking-widest">
                            <span>Mon</span>
                            <span>Wed</span>
                            <span>Fri</span>
                        </div>

                        <div className="grid grid-flow-col grid-rows-7 gap-1.5 p-1 bg-[#0c1428]/50 rounded-lg border border-[#ffd7000d]">
                            {graphData.map((day, i) => (
                                <div
                                    key={i}
                                    title={`${day.date}: ${day.count} questions completed`}
                                    className={`w-3 h-3 rounded-[3px] transition-all duration-700 cursor-help hover:scale-150 hover:relative hover:z-20
                                        ${day.level === 0 ? 'bg-slate-900/40 border border-slate-800/20' :
                                            day.level === 1 ? 'bg-yellow-950/60 border border-yellow-900/30' :
                                                day.level === 2 ? 'bg-yellow-700/40 border border-yellow-600/30 shadow-[0_0_8px_rgba(224,159,62,0.15)]' :
                                                    day.level === 3 ? 'bg-yellow-500/60 border border-yellow-400/40 shadow-[0_0_12px_rgba(255,215,0,0.25)] sparkle-animation' :
                                                        'bg-yellow-400 border border-white/60 shadow-[0_0_15px_rgba(255,215,0,0.5)] sparkle-animation'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-[#ffd7001a]">
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-yellow-700/60 font-magical">
                    <span>Low Activity</span>
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-[2px] bg-slate-900/40 border-slate-800/20" />
                        <div className="w-3 h-3 rounded-[2px] bg-yellow-950/60 border-yellow-900/30" />
                        <div className="w-3 h-3 rounded-[2px] bg-yellow-700/40 border-yellow-600/30" />
                        <div className="w-3 h-3 rounded-[2px] bg-yellow-500/60 border-yellow-400/40" />
                        <div className="w-3 h-3 rounded-[2px] bg-yellow-400 border-white/60" />
                    </div>
                    <span>High Activity</span>
                </div>

                <div className="text-xs text-yellow-600/60 font-medium italic spectral tracking-wide">
                    "{currentStreak >= 10 ? 'Consistency is the hallmark of the masters.' :
                        currentStreak >= 5 ? 'You are well on your way to brilliance.' :
                            currentStreak >= 1 ? 'Small steps lead to great heights.' :
                                'The journey of a thousand miles begins with a single step...'}"
                </div>
            </div>
        </div>
    );
};

export default ActivityGraph;
