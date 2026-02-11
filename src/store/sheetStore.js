import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { availableSheets as configSheets } from './sheets';
import { getSheetUrl } from './keys';

// ZEUS SDE Sheet - Complete Data Structure
const initialData = { topics: [] };

const useSheetStore = create(
  persist(
    (set, get) => ({
      // State
      topics: initialData.topics,
      filterStatus: 'all',
      filterDifficulty: 'all',
      searchQuery: '',
      expandedTopics: new Set(),
      expandedSubTopics: new Set(),
      activity: {},
      currentStreak: 0,
      maxStreak: 0,
      isLoading: false,
      error: null,
      lastSynced: null,
      currentView: 'dashboard', // 'sheet' or 'dashboard'

      // Actions - View
      setView: (view) => set({ currentView: view }),

      // Actions - Topics
      addTopic: (title) => {
        const topics = get().topics;
        const newTopic = {
          id: `topic-${Date.now()}`,
          title,
          order: topics.length + 1,
          subTopics: []
        };
        set({ topics: [...topics, newTopic] });
      },

      updateTopic: (topicId, title) => {
        const topics = get().topics.map(topic =>
          topic.id === topicId ? { ...topic, title } : topic
        );
        set({ topics });
      },

      deleteTopic: (topicId) => {
        const topics = get().topics.filter(topic => topic.id !== topicId);
        // Reorder remaining topics
        const reorderedTopics = topics.map((topic, index) => ({
          ...topic,
          order: index + 1
        }));
        set({ topics: reorderedTopics });
      },

      reorderTopics: (oldIndex, newIndex) => {
        const topics = [...get().topics];
        const [movedTopic] = topics.splice(oldIndex, 1);
        topics.splice(newIndex, 0, movedTopic);

        // Update order property
        const reorderedTopics = topics.map((topic, index) => ({
          ...topic,
          order: index + 1
        }));

        set({ topics: reorderedTopics });
      },

      // Actions - SubTopics
      addSubTopic: (topicId, title) => {
        const topics = get().topics.map(topic => {
          if (topic.id === topicId) {
            const newSubTopic = {
              id: `subtopic-${Date.now()}`,
              title,
              order: topic.subTopics.length + 1,
              questions: []
            };
            return {
              ...topic,
              subTopics: [...topic.subTopics, newSubTopic]
            };
          }
          return topic;
        });
        set({ topics });
      },

      updateSubTopic: (topicId, subTopicId, title) => {
        const topics = get().topics.map(topic => {
          if (topic.id === topicId) {
            return {
              ...topic,
              subTopics: topic.subTopics.map(subTopic =>
                subTopic.id === subTopicId ? { ...subTopic, title } : subTopic
              )
            };
          }
          return topic;
        });
        set({ topics });
      },

      deleteSubTopic: (topicId, subTopicId) => {
        const topics = get().topics.map(topic => {
          if (topic.id === topicId) {
            const filteredSubTopics = topic.subTopics.filter(
              subTopic => subTopic.id !== subTopicId
            );
            // Reorder remaining subtopics
            const reorderedSubTopics = filteredSubTopics.map((subTopic, index) => ({
              ...subTopic,
              order: index + 1
            }));
            return { ...topic, subTopics: reorderedSubTopics };
          }
          return topic;
        });
        set({ topics });
      },

      reorderSubTopics: (topicId, oldIndex, newIndex) => {
        const topics = get().topics.map(topic => {
          if (topic.id === topicId) {
            const subTopics = [...topic.subTopics];
            const [movedSubTopic] = subTopics.splice(oldIndex, 1);
            subTopics.splice(newIndex, 0, movedSubTopic);

            // Update order property
            const reorderedSubTopics = subTopics.map((subTopic, index) => ({
              ...subTopic,
              order: index + 1
            }));

            return { ...topic, subTopics: reorderedSubTopics };
          }
          return topic;
        });
        set({ topics });
      },

      // Actions - Questions
      addQuestion: (topicId, subTopicId, questionData) => {
        const topics = get().topics.map(topic => {
          if (topic.id === topicId) {
            return {
              ...topic,
              subTopics: topic.subTopics.map(subTopic => {
                if (subTopic.id === subTopicId) {
                  const newQuestion = {
                    id: `question-${Date.now()}`,
                    ...questionData,
                    status: 'pending',
                    order: subTopic.questions.length + 1
                  };
                  return {
                    ...subTopic,
                    questions: [...subTopic.questions, newQuestion]
                  };
                }
                return subTopic;
              })
            };
          }
          return topic;
        });
        set({ topics });
      },

      updateQuestion: (topicId, subTopicId, questionId, questionData) => {
        const topics = get().topics.map(topic => {
          if (topic.id === topicId) {
            return {
              ...topic,
              subTopics: topic.subTopics.map(subTopic => {
                if (subTopic.id === subTopicId) {
                  return {
                    ...subTopic,
                    questions: subTopic.questions.map(question =>
                      question.id === questionId
                        ? { ...question, ...questionData }
                        : question
                    )
                  };
                }
                return subTopic;
              })
            };
          }
          return topic;
        });
        set({ topics });
      },

      deleteQuestion: (topicId, subTopicId, questionId) => {
        const topics = get().topics.map(topic => {
          if (topic.id === topicId) {
            return {
              ...topic,
              subTopics: topic.subTopics.map(subTopic => {
                if (subTopic.id === subTopicId) {
                  const filteredQuestions = subTopic.questions.filter(
                    question => question.id !== questionId
                  );
                  // Reorder remaining questions
                  const reorderedQuestions = filteredQuestions.map((question, index) => ({
                    ...question,
                    order: index + 1
                  }));
                  return { ...subTopic, questions: reorderedQuestions };
                }
                return subTopic;
              })
            };
          }
          return topic;
        });
        set({ topics });
      },

      reorderQuestions: (topicId, subTopicId, oldIndex, newIndex) => {
        const topics = get().topics.map(topic => {
          if (topic.id === topicId) {
            return {
              ...topic,
              subTopics: topic.subTopics.map(subTopic => {
                if (subTopic.id === subTopicId) {
                  const questions = [...subTopic.questions];
                  const [movedQuestion] = questions.splice(oldIndex, 1);
                  questions.splice(newIndex, 0, movedQuestion);

                  // Update order property
                  const reorderedQuestions = questions.map((question, index) => ({
                    ...question,
                    order: index + 1
                  }));

                  return { ...subTopic, questions: reorderedQuestions };
                }
                return subTopic;
              })
            };
          }
          return topic;
        });
        set({ topics });
      },

      reorderTopics: (oldIndex, newIndex) => {
        set((state) => {
          const newTopics = [...state.topics];
          const [movedTopic] = newTopics.splice(oldIndex, 1);
          newTopics.splice(newIndex, 0, movedTopic);
          return { topics: newTopics };
        });
      },

      reorderSubTopics: (topicId, oldIndex, newIndex) => {
        set((state) => {
          const topics = state.topics.map((topic) => {
            if (topic.id === topicId) {
              const newSubTopics = [...topic.subTopics];
              const [movedSubTopic] = newSubTopics.splice(oldIndex, 1);
              newSubTopics.splice(newIndex, 0, movedSubTopic);
              return { ...topic, subTopics: newSubTopics };
            }
            return topic;
          });
          return { topics };
        });
      },

      toggleQuestionStatus: (topicId, subTopicId, questionId) => {
        let isNowCompleted = false;
        let completionDate = null;

        const topics = get().topics.map(topic => {
          if (topic.id === topicId) {
            return {
              ...topic,
              subTopics: topic.subTopics.map(subTopic => {
                if (subTopic.id === subTopicId) {
                  return {
                    ...subTopic,
                    questions: subTopic.questions.map(question => {
                      if (question.id === questionId) {
                        const newStatus = question.status === 'completed' ? 'pending' : 'completed';
                        isNowCompleted = newStatus === 'completed';
                        completionDate = question.completedAt || new Date().toISOString().split('T')[0];
                        return {
                          ...question,
                          status: newStatus,
                          completedAt: newStatus === 'completed' ? (question.completedAt || new Date().toISOString().split('T')[0]) : null
                        };
                      }
                      return question;
                    })
                  };
                }
                return subTopic;
              })
            };
          }
          return topic;
        });

        const today = new Date().toISOString().split('T')[0];
        const activity = { ...get().activity };

        if (isNowCompleted) {
          activity[today] = (activity[today] || 0) + 1;
        } else if (completionDate) {
          // If we are unmarking a question, decrement the count for the date it was completed
          if (activity[completionDate]) {
            activity[completionDate] = Math.max(0, activity[completionDate] - 1);
            if (activity[completionDate] === 0) delete activity[completionDate];
          }
        }

        set({ topics, activity });
        get().calculateStreak();
      },

      calculateStreak: () => {
        const activity = get().activity;
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        let streak = 0;
        let checkDate = new Date();

        // If no activity today, check if streak is still alive from yesterday
        if (!activity[today]) {
          if (!activity[yesterdayStr]) {
            set({ currentStreak: 0 });
            return;
          }
          checkDate.setDate(checkDate.getDate() - 1);
        }

        while (activity[checkDate.toISOString().split('T')[0]]) {
          streak++;
          checkDate.setDate(checkDate.getDate() - 1);
        }

        set((state) => ({
          currentStreak: streak,
          maxStreak: Math.max(state.maxStreak || 0, streak)
        }));
      },

      // Filter and Search Actions
      setFilterStatus: (status) => set({ filterStatus: status }),
      setFilterDifficulty: (difficulty) => set({ filterDifficulty: difficulty }),
      setSearchQuery: (query) => set({ searchQuery: query }),

      // Expand/Collapse Actions
      toggleTopicExpansion: (topicId) => {
        const expandedTopics = new Set(get().expandedTopics);
        if (expandedTopics.has(topicId)) {
          expandedTopics.delete(topicId);
        } else {
          expandedTopics.add(topicId);
        }
        set({ expandedTopics });
      },

      toggleSubTopicExpansion: (subTopicId) => {
        const expandedSubTopics = new Set(get().expandedSubTopics);
        if (expandedSubTopics.has(subTopicId)) {
          expandedSubTopics.delete(subTopicId);
        } else {
          expandedSubTopics.add(subTopicId);
        }
        set({ expandedSubTopics });
      },

      expandAllTopics: () => {
        const topicIds = get().topics.map(t => t.id);
        set({ expandedTopics: new Set(topicIds) });
      },

      collapseAllTopics: () => {
        set({ expandedTopics: new Set() });
      },

      // Statistics
      getStatistics: () => {
        const topics = get().topics;
        let totalQuestions = 0;
        let completedQuestions = 0;
        let pendingQuestions = 0;
        let inProgressQuestions = 0;

        // Difficulty breakdown
        let easyTotal = 0, easyCompleted = 0;
        let mediumTotal = 0, mediumCompleted = 0;
        let hardTotal = 0, hardCompleted = 0;

        topics.forEach(topic => {
          topic.subTopics.forEach(subTopic => {
            subTopic.questions.forEach(question => {
              totalQuestions++;
              if (question.status === 'completed') completedQuestions++;
              else if (question.status === 'in-progress') inProgressQuestions++;
              else pendingQuestions++;

              // Count by difficulty
              if (question.difficulty === 'Easy') {
                easyTotal++;
                if (question.status === 'completed') easyCompleted++;
              } else if (question.difficulty === 'Medium') {
                mediumTotal++;
                if (question.status === 'completed') mediumCompleted++;
              } else if (question.difficulty === 'Hard') {
                hardTotal++;
                if (question.status === 'completed') hardCompleted++;
              }
            });
          });
        });

        return {
          totalQuestions,
          completedQuestions,
          pendingQuestions,
          inProgressQuestions,
          completionRate: totalQuestions > 0 ? Math.round((completedQuestions / totalQuestions) * 100) : 0,
          easy: { total: easyTotal, completed: easyCompleted },
          medium: { total: mediumTotal, completed: mediumCompleted },
          hard: { total: hardTotal, completed: hardCompleted }
        };
      },

      // Get random pending question
      getRandomQuestion: () => {
        const topics = get().topics;
        const pendingQuestions = [];

        topics.forEach(topic => {
          topic.subTopics.forEach(subTopic => {
            subTopic.questions.forEach(question => {
              if (question.status !== 'completed') {
                pendingQuestions.push({
                  ...question,
                  topicId: topic.id,
                  subTopicId: subTopic.id,
                  topicTitle: topic.title,
                  subTopicTitle: subTopic.title
                });
              }
            });
          });
        });

        if (pendingQuestions.length === 0) return null;
        return pendingQuestions[Math.floor(Math.random() * pendingQuestions.length)];
      },

      // Consolidate subtopics into one per topic
      consolidateSheets: () => {
        set((state) => {
          const newTopics = state.topics.map(topic => {
            // Only consolidate if multiple subtopics exist
            if (topic.subTopics.length > 1) {
              // Collect all questions
              let allQuestions = [];
              topic.subTopics.forEach(st => {
                allQuestions = [...allQuestions, ...st.questions];
              });

              // Update order
              allQuestions = allQuestions.map((q, idx) => ({ ...q, order: idx + 1 }));

              const newSubTopic = {
                id: `${topic.id}-consolidated`,
                title: '',
                order: 1,
                questions: allQuestions
              };

              return { ...topic, subTopics: [newSubTopic] };
            }
            return topic;
          });
          return { topics: newTopics };
        });
      },

      // Available Sheets State
      availableSheets: configSheets,

      syncAvailableSheets: () => {
        const state = get();
        const currentIds = new Set(state.availableSheets.map(s => s.id));
        const missingSheets = configSheets.filter(s => !currentIds.has(s.id));

        if (missingSheets.length > 0) {
          set({ availableSheets: [...state.availableSheets, ...missingSheets] });
        }
      },

      // Current active sheet
      currentSheetId: 'strivers-a2z-dsa-sheet',

      // Sheet Management Actions
      setCurrentSheet: (sheetId) => set({ currentSheetId: sheetId }),

      getCurrentSheet: () => {
        const state = get();
        return state.availableSheets.find(sheet => sheet.id === state.currentSheetId) || state.availableSheets[0];
      },

      updateSheetProgress: (sheetId, stats) => {
        set((state) => ({
          availableSheets: state.availableSheets.map(sheet =>
            sheet.id === sheetId
              ? {
                ...sheet,
                totalQuestions: stats.totalQuestions,
                completedQuestions: stats.completedQuestions
              }
              : sheet
          )
        }));
      },

      // API Integration - Fetch Remote Sheet
      fetchRemoteSheet: async (slug = 'strivers-a2z-dsa-sheet', updateOnlyMetadata = false) => {
        if (!updateOnlyMetadata) set({ isLoading: true, error: null });
        try {
          const response = await fetch(getSheetUrl(slug));
          const result = await response.json();

          if (!result.status.success) {
            throw new Error(result.status.message || 'Failed to fetch sheet');
          }

          const { questions } = result.data;
          const topicMap = new Map();

          questions.forEach((q, index) => {
            // Normalize CP-31 nested structure vs Standard structure
            const qData = q.questionId || {};
            const topicTitle = q.topic || qData.topics?.[0] || 'Uncategorized';
            const subTopicTitle = q.subTopic || '';

            // Map numeric ratings (800-1900) or strings to Display Difficulty
            const rawDiff = qData.difficulty || 'Medium';
            let mappedDifficulty = 'Medium';

            if (typeof rawDiff === 'string' && /^\d+$/.test(rawDiff)) {
              const rating = parseInt(rawDiff, 10);
              if (rating < 1200) mappedDifficulty = 'Easy';
              else if (rating < 1600) mappedDifficulty = 'Medium';
              else mappedDifficulty = 'Hard';
            } else {
              const difficultyMapping = {
                'Easy': 'Easy',
                'Medium': 'Medium',
                'Hard': 'Hard'
              };
              mappedDifficulty = difficultyMapping[rawDiff] || 'Medium';
            }

            const mappedQuestion = {
              id: q._id || `q-${index}`,
              title: q.title || qData.name || 'Untitled Problem',
              difficulty: mappedDifficulty,
              platform: qData.platform || 'Practice',
              link: qData.problemUrl || q.resource || '#',
              status: q.isSolved ? 'completed' : 'pending',
              order: q.questionOrder || index + 1,
              topicOrder: q.topicOrder || 0,
              subTopicOrder: q.subTopicOrder || 0,
              // Rich Metadata
              companyTags: qData.companyTags || [],
              verified: qData.verified || false,
              description: qData.description || '',
            };

            if (!topicMap.has(topicTitle)) {
              topicMap.set(topicTitle, new Map());
            }

            const subTopicMap = topicMap.get(topicTitle);
            if (!subTopicMap.has(subTopicTitle)) {
              subTopicMap.set(subTopicTitle, []);
            }

            subTopicMap.get(subTopicTitle).push(mappedQuestion);
          });

          // Helper function to extract numeric prefix from strings like "Step 1", "Lec 2", etc.
          const extractNumericPrefix = (str) => {
            if (!str) return 999999; // Put items without numbers at the end
            const match = str.match(/(?:Step|Lec|Lecture)\s*(\d+)/i);
            return match ? parseInt(match[1], 10) : 999999;
          };

          // Sort topics and questions
          const topicArray = Array.from(topicMap.entries()).map(([topicTitle, subTopicMap]) => {
            // Extract order from topic name or use API topicOrder if available
            const firstSubTopic = Array.from(subTopicMap.values())[0];
            const topicOrder = firstSubTopic?.[0]?.topicOrder ?? extractNumericPrefix(topicTitle);

            const subTopicArray = Array.from(subTopicMap.entries()).map(([subTopicTitle, questions]) => {
              // Extract order from subtopic name or use API subTopicOrder if available
              const subTopicOrder = questions[0]?.subTopicOrder ?? extractNumericPrefix(subTopicTitle);

              // Sort questions by their order field
              questions.sort((a, b) => (a.order || 0) - (b.order || 0));

              return {
                title: subTopicTitle,
                order: subTopicOrder,
                questions
              };
            });

            // Sort subtopics by their order
            subTopicArray.sort((a, b) => a.order - b.order);

            return {
              title: topicTitle,
              order: topicOrder,
              subTopics: subTopicArray
            };
          });

          // Sort topics by their order
          topicArray.sort((a, b) => a.order - b.order);

          // Now assign IDs based on sorted positions
          const newTopics = topicArray.map((topic, topicIdx) => ({
            id: `topic-${topicIdx}`,
            title: topic.title,
            order: topic.order,
            subTopics: topic.subTopics.map((subTopic, subTopicIdx) => ({
              id: `subtopic-${topicIdx}-${subTopicIdx}`,
              title: subTopic.title,
              order: subTopic.order,
              questions: subTopic.questions
            }))
          }));

          const stats = {
            totalQuestions: newTopics.reduce((acc, topic) =>
              acc + topic.subTopics.reduce((subAcc, subTopic) =>
                subAcc + subTopic.questions.length, 0), 0),
            completedQuestions: newTopics.reduce((acc, topic) =>
              acc + topic.subTopics.reduce((subAcc, subTopic) =>
                subAcc + subTopic.questions.filter(q => q.status === 'completed').length, 0), 0)
          };

          // Extract sheet-level metadata from the first question's sheet info or overall result if available
          const sheetMetadata = result.data.sheet || {};

          set((state) => ({
            availableSheets: state.availableSheets.map(sheet =>
              sheet.id === slug
                ? {
                  ...sheet,
                  totalQuestions: stats.totalQuestions,
                  completedQuestions: stats.completedQuestions,
                  // Rich Sheet Metadata
                  author: sheetMetadata.author?.name || sheet.author,
                }
                : sheet
            )
          }));

          const updates = { lastSynced: new Date().toISOString() };

          if (!updateOnlyMetadata) {
            updates.topics = newTopics;
            updates.expandedTopics = new Set();
            updates.expandedSubTopics = new Set();
            updates.isLoading = false;
          }

          set(updates);
        } catch (error) {
          console.error('Error fetching remote sheet:', error);
          if (!updateOnlyMetadata) set({ isLoading: false, error: error.message });
        }
      },

      // Notes functionality
      setQuestionNote: (topicId, subTopicId, questionId, note) => {
        const topics = get().topics.map(topic => {
          if (topic.id === topicId) {
            return {
              ...topic,
              subTopics: topic.subTopics.map(subTopic => {
                if (subTopic.id === subTopicId) {
                  return {
                    ...subTopic,
                    questions: subTopic.questions.map(question =>
                      question.id === questionId
                        ? { ...question, note }
                        : question
                    )
                  };
                }
                return subTopic;
              })
            };
          }
          return topic;
        });
        set({ topics });
      },

      // Star/Favorite functionality
      toggleQuestionStar: (topicId, subTopicId, questionId) => {
        const topics = get().topics.map(topic => {
          if (topic.id === topicId) {
            return {
              ...topic,
              subTopics: topic.subTopics.map(subTopic => {
                if (subTopic.id === subTopicId) {
                  return {
                    ...subTopic,
                    questions: subTopic.questions.map(question =>
                      question.id === questionId
                        ? { ...question, starred: !question.starred }
                        : question
                    )
                  };
                }
                return subTopic;
              })
            };
          }
          return topic;
        });
        set({ topics });
      },

      // Get starred questions
      getStarredQuestions: () => {
        const topics = get().topics;
        const starredQuestions = [];

        topics.forEach(topic => {
          topic.subTopics.forEach(subTopic => {
            subTopic.questions.forEach(question => {
              if (question.starred) {
                starredQuestions.push({
                  ...question,
                  topicId: topic.id,
                  subTopicId: subTopic.id,
                  topicTitle: topic.title,
                  subTopicTitle: subTopic.title
                });
              }
            });
          });
        });

        return starredQuestions;
      }
    }),
    {
      name: import.meta.env.VITE_STORAGE_KEY || 'zeus-sheets-storage',
      partialize: (state) => ({
        topics: state.topics,
        activity: state.activity,
        currentStreak: state.currentStreak,
        maxStreak: state.maxStreak,
        lastSynced: state.lastSynced,
        currentSheetId: state.currentSheetId,
        availableSheets: state.availableSheets
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.expandedTopics = new Set();
          state.expandedSubTopics = new Set();
          state.syncAvailableSheets();
        }
      }
    }
  )
);

export default useSheetStore;