async function fetchAllKeys(apiUrl) {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Recursive key extractor
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
        console.error("API Error:", error);
        return [];
    }
}

const API_URL = "https://node.codolio.com/api/question-tracker/v1/sheet/public/get-sheet-by-slug/striver-sde-sheet";

fetchAllKeys(API_URL).then(keys => {
    console.log("All keys:", keys);
});
