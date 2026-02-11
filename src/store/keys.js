export const API_KEYS = {
    // Main Sheets
    A2Z: 'strivers-a2z-dsa-sheet',
    SDE: 'striver-sde-sheet',

    // CP-31 Rated Sheets (800-1600)
    CP31_RATED: (rating) => `${rating}-rated-cp-31-sheet`,

    // CP-31 Advanced Sheets (1700-1900)
    CP31_ADV: (rating) => `${rating}-cp-31-sheet`
};

// Safe access for import.meta.env (Vite only)
const getBaseUrl = () => {
    try {
        if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL) {
            return import.meta.env.VITE_API_BASE_URL;
        }
    } catch (e) {
        // Fallback for non-Vite environments
    }
    return "https://node.codolio.com/api/question-tracker/v1/sheet/public/get-sheet-by-slug/";
};

export const BASE_URL = getBaseUrl();
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

/**
 * REDIRECTOR: If this file is run directly in Node (terminal), 
 * it will dynamically load the debug tools to avoid browser errors.
 */
if (typeof process !== 'undefined' && process.argv && process.argv[1] && process.argv[1].includes('keys.js')) {
    // Use dynamic import to keep Node modules (fs, path) out of the browser bundle
    (async () => {
        try {
            await import('./debug-keys.js');
        } catch (err) {
            console.error("Failed to launch debug tools:", err);
        }
    })();
}
