export const availableSheets = [
    {
        id: 'strivers-a2z-dsa-sheet',
        slug: 'zeus-a2z-dsa',
        title: 'ZEUS A2Z DSA',
        description: 'Complete DSA journey from fundamentals to advanced topics. Structured learning path for interview preparation.',
        difficulty: 'Beginner to Advanced',
        totalQuestions: 0,
        completedQuestions: 0,
        color: 'blue',
        icon: '🔮',
        isPopular: true
    },
    {
        id: 'striver-sde-sheet',
        slug: 'zeus-sde-sheet',
        title: 'ZEUS SDE SHEET',
        description: 'Master the Art of Coding with the legendary SDE sheet. 450+ hand-picked problems from top tech archives.',
        difficulty: 'Intermediate to Advanced',
        totalQuestions: 0,
        completedQuestions: 0,
        color: 'yellow',
        icon: '⚡',
        isPopular: true
    },
    // CP-31 rated-cp-31-sheet (800-1600)
    ...[800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600].map(rating => ({
        id: `${rating}-rated-cp-31-sheet`,
        slug: `cp-31-${rating}`,
        title: `CP-31 (${rating})`,
        description: `Master Competitive Programming with the ${rating} rated CP-31 sheet. Essential problems for competitive excellence.`,
        difficulty: rating < 1200 ? 'Beginner' : rating < 1500 ? 'Intermediate' : 'Advanced',
        totalQuestions: 0,
        completedQuestions: 0,
        color: rating < 1200 ? 'green' : rating < 1500 ? 'blue' : 'purple',
        icon: rating < 1200 ? '🌱' : rating < 1500 ? '⚔️' : '🔥',
        isPopular: rating === 800 || rating === 1600
    })),
    // CP-31 cp-31-sheet (1700-1900)
    ...[1700, 1800, 1900].map(rating => ({
        id: `${rating}-cp-31-sheet`,
        slug: `cp-31-${rating}`,
        title: `CP-31 (${rating})`,
        description: `Ascend to Mastery with the ${rating} rated CP-31 sheet. Challenging problems for top-tier competitive programmers.`,
        difficulty: 'Advanced',
        totalQuestions: 0,
        completedQuestions: 0,
        color: 'purple',
        icon: '🌌',
        isPopular: rating === 1900
    }))
];

export const getSheetById = (id) => availableSheets.find(sheet => sheet.id === id);
export const getSheetBySlug = (slug) => availableSheets.find(sheet => sheet.slug === slug);
export const getSlugById = (id) => availableSheets.find(sheet => sheet.id === id)?.slug;
export const getIdBySlug = (slug) => availableSheets.find(sheet => sheet.slug === slug)?.id;
