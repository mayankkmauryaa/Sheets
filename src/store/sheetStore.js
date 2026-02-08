import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
      currentView: 'sheet', // 'sheet' or 'dashboard'

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

      // API Integration - Fetch Remote Sheet
      fetchRemoteSheet: async (slug = 'striver-sde-sheet') => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`https://node.codolio.com/api/question-tracker/v1/sheet/public/get-sheet-by-slug/${slug}`);
          const result = await response.json();

          if (!result.status.success) {
            throw new Error(result.status.message || 'Failed to fetch sheet');
          }

          const { questions } = result.data;
          const topicMap = new Map();

          questions.forEach((q, index) => {
            const topicTitle = q.topic || 'Uncategorized';
            const subTopicTitle = q.subTopic || '';
            const difficultyMapping = {
              'Easy': 'Easy',
              'Medium': 'Medium',
              'Hard': 'Hard'
            };

            const mappedQuestion = {
              id: q._id || `q-${index}`,
              title: q.title,
              difficulty: difficultyMapping[q.questionId?.difficulty] || 'Medium',
              platform: q.questionId?.platform || 'Practice',
              link: q.questionId?.problemUrl || q.resource,
              status: q.isSolved ? 'completed' : 'pending',
              order: index + 1
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

          const newTopics = Array.from(topicMap.keys()).map((topicTitle, topicIdx) => {
            const subTopicMap = topicMap.get(topicTitle);
            const subTopics = Array.from(subTopicMap.keys()).map((subTopicTitle, subTopicIdx) => ({
              id: `subtopic-${topicIdx}-${subTopicIdx}`,
              title: subTopicTitle,
              order: subTopicIdx + 1,
              questions: subTopicMap.get(subTopicTitle)
            }));

            return {
              id: `topic-${topicIdx}`,
              title: topicTitle,
              order: topicIdx + 1,
              subTopics
            };
          });

          set({
            topics: newTopics,
            isLoading: false,
            lastSynced: new Date().toISOString()
          });
        } catch (error) {
          console.error('Error fetching remote sheet:', error);
          set({ isLoading: false, error: error.message });
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
      name: 'sheets-storage',
      partialize: (state) => ({
        topics: state.topics,
        expandedTopics: Array.from(state.expandedTopics),
        expandedSubTopics: Array.from(state.expandedSubTopics),
        activity: state.activity,
        currentStreak: state.currentStreak,
        maxStreak: state.maxStreak,
        lastSynced: state.lastSynced
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.expandedTopics = new Set(state.expandedTopics || []);
          state.expandedSubTopics = new Set(state.expandedSubTopics || []);
        }
      }
    }
  )
);

export default useSheetStore;