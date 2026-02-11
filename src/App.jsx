import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './components/layout/Header';
import TopicList from './features/sheet/TopicList';
import ActivityGraph from './features/sheet/ActivityGraph';
import Controls from './features/sheet/Controls';
import Dashboard from './features/dashboard/Dashboard';
import useSheetStore from './store/sheetStore';
import { getIdBySlug, getSlugById } from './store/sheets';

function App() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Inject global asset styles from environment variables
  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      :root {
        --stardust-url: url('${import.meta.env.VITE_STARDUST_URL}');
        --leather-url: url('${import.meta.env.VITE_LEATHER_URL}');
        --cursor-url: url('${import.meta.env.VITE_CURSOR_URL}');
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const {
    topics,
    searchQuery,
    filterStatus,
    filterDifficulty,
    consolidateSheets,
    isLoading,
    error,
    fetchRemoteSheet,
    currentView,
    setView,
    currentSheetId,
    setCurrentSheet
  } = useSheetStore();

  // Sync URL with store state (URL is source of truth)
  React.useEffect(() => {
    if (slug && slug !== 'all') {
      // Convert slug to ID for store operations
      const sheetId = getIdBySlug(slug);
      if (sheetId) {
        // URL has a specific sheet, load it if needed
        if (currentSheetId !== sheetId) {
          setCurrentSheet(sheetId);
          fetchRemoteSheet(sheetId);
        }
        if (currentView !== 'sheet') {
          setView('sheet');
        }
      } else {
        // Invalid slug, redirect to dashboard
        navigate('/u/all', { replace: true });
      }
    } else {
      // URL is /u/all, show dashboard
      if (currentView !== 'dashboard') {
        setView('dashboard');
      }
    }
  }, [slug]); // Only depend on slug to prevent loops

  // One-time layout fix for existing users
  React.useEffect(() => {
    const storageKeyPrefix = import.meta.env.VITE_STORAGE_KEY || 'zeus-sheets-storage';
    const hasConsolidated = localStorage.getItem(`${storageKeyPrefix}-layout-consolidated`);
    const hasSanitized = localStorage.getItem(`${storageKeyPrefix}-terms-sanitized`);

    const state = useSheetStore.getState();

    if (!hasConsolidated || !hasSanitized) {
      state.topics.forEach(topic => {
        topic.subTopics.forEach(subTopic => {
          if (subTopic.title === 'Scroll of Problems') {
            state.updateSubTopic(topic.id, subTopic.id, '');
          }
        });
      });

      if (!hasConsolidated) {
        consolidateSheets();
        localStorage.setItem(`${storageKeyPrefix}-layout-consolidated`, 'true');
      }
      localStorage.setItem(`${storageKeyPrefix}-terms-sanitized`, 'true');
    }
  }, [consolidateSheets]);

  // Synchronize all available sheets on initial load to populate dashboard counts
  React.useEffect(() => {
    const { availableSheets, fetchRemoteSheet, currentSheetId } = useSheetStore.getState();

    availableSheets.forEach((sheet) => {
      // Fetch data for all sheets that haven't been synchronized yet
      if (sheet.totalQuestions === 0) {
        // Only update 'topics' if it's the current sheet, otherwise just update metadata
        const isCurrentSheet = sheet.id === currentSheetId;
        fetchRemoteSheet(sheet.id, !isCurrentSheet);
      }
    });

    // If current sheet IS synchronized but we are entering sheet view, 
    // we don't need a separate effect if we trust the initial sync/persistence.
  }, [fetchRemoteSheet]);

  // Filter topics based on search and filters
  const filteredTopics = topics.map(topic => {
    const topicMatchesSearch = topic.title?.toLowerCase().includes(searchQuery?.toLowerCase() || '');

    const filteredSubTopics = topic.subTopics.map(subTopic => {
      const subTopicMatchesSearch = subTopic.title?.toLowerCase().includes(searchQuery?.toLowerCase() || '');

      const filteredQuestions = subTopic.questions.filter(question => {
        const matchesSearch = question.title?.toLowerCase().includes(searchQuery?.toLowerCase() || '') ||
          topicMatchesSearch ||
          subTopicMatchesSearch;
        const matchesStatus = filterStatus === 'all' || question.status === filterStatus;
        const matchesDifficulty = filterDifficulty === 'all' || question.difficulty === filterDifficulty;

        return matchesSearch && matchesStatus && matchesDifficulty;
      });

      return {
        ...subTopic,
        questions: filteredQuestions
      };
    }).filter(subTopic =>
      subTopic.questions.length > 0 ||
      subTopic.title?.toLowerCase().includes(searchQuery?.toLowerCase() || '')
    );

    return {
      ...topic,
      subTopics: filteredSubTopics
    };
  }).filter(topic =>
    topic.subTopics.length > 0 ||
    topic.title?.toLowerCase().includes(searchQuery?.toLowerCase() || '')
  );

  return (
    <div className="min-h-screen bg-[#050a14] selection:bg-yellow-900/30">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 reveal-animation">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-yellow-500/10 border-t-yellow-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-full blur-xl animate-pulse"></div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-yellow-500 mt-8 mb-2 font-magical tracking-[0.3em] uppercase">
              Summoning data...
            </h3>
            <p className="text-red-300/60 italic spectral animate-pulse">
              Consulting the archives of ZEUS MAGIC
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-red-950/20 rounded-2xl border border-red-900/30">
            <h3 className="text-xl font-bold text-red-500 mb-4 font-magical">
              An unexpected error occurred!
            </h3>
            <p className="text-red-300/80 mb-6 spectral">
              {error}
            </p>
            <button
              onClick={() => fetchRemoteSheet()}
              className="px-6 py-2 bg-red-900/40 hover:bg-red-800/60 text-red-200 rounded-lg border border-red-700/50 transition-all font-magical tracking-widest"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            {currentView === 'sheet' ? (
              <>
                <ActivityGraph />
                <Controls />
                {filteredTopics.length > 0 ? (
                  <TopicList topics={filteredTopics} />
                ) : (
                  <div className="text-center py-20">
                    <div className="w-20 h-20 bg-[#0c1428] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#ffd70033] shadow-[0_0_20px_rgba(255,215,0,0.1)]">
                      <svg className="w-10 h-10 text-yellow-500 sparkle-animation" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-yellow-500 mb-2 font-magical tracking-widest">
                      {searchQuery || filterStatus !== 'all' || filterDifficulty !== 'all'
                        ? 'No matches found...'
                        : 'Your sheet is empty'}
                    </h3>
                    <p className="text-red-300/60 mb-6 italic spectral">
                      {searchQuery || filterStatus !== 'all' || filterDifficulty !== 'all'
                        ? 'Try a different search term'
                        : 'Add a new topic to begin your journey'}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <Dashboard />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#ffd7001a] mt-auto bg-[#050a14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-yellow-600/60 font-medium tracking-widest uppercase">
              ✨ ZEUS MAGIC SHEETS - Master the Art of Coding
            </p>
            <div className="flex items-center gap-6">
              <p className="text-xs text-red-900/40 font-serif italic">
                Powered by ZEUS Archives
              </p>
              {/* <p className="text-sm text-yellow-900/40">
                
              </p> */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;