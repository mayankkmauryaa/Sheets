export const API_KEYS = {
    // Main Sheets
    A2Z: 'strivers-a2z-dsa-sheet',
    SDE: 'striver-sde-sheet',

    // CP-31 Rated Sheets (800-1600)
    CP31_RATED: (rating) => `${rating}-rated-cp-31-sheet`,

    // CP-31 Advanced Sheets (1700-1900)
    CP31_ADV: (rating) => `${rating}-cp-31-sheet`
};



export const BASE_URL = "https://node.codolio.com/api/question-tracker/v1/sheet/public/get-sheet-by-slug/";
export const getSheetUrl = (slug) => `${BASE_URL}${slug}`;

/**
 * Utility to extract all unique object keys from a JSON response.
 * Browser Compatible.
 */
export async function fetchAllKeys(slug) {
    try {
        const response = await fetch(getSheetUrl(slug));

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        function getAllKeys(value, keys = new Set()) {
            if (Array.isArray(value)) {
                value.forEach(item => getAllKeys(item, keys));
            } else if (value !== null && typeof value === "object") {
                Object.keys(value).forEach(key => {
                    keys.add(key);
                    getAllKeys(value[key], keys);
                });
            }
            return keys;
        }

        return [...getAllKeys(data)];
    } catch (error) {
        console.error(`API Error Extracting Keys for ${slug}:`, error);
        return [];
    }
}