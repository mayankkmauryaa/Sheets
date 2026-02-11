import { availableSheets } from './sheets.js';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

// Manual .env loading for Node.js
async function loadEnv() {
    try {
        const envPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '../../.env');
        const envContent = await fs.readFile(envPath, 'utf8');
        const env = {};
        envContent.split('\n').forEach(line => {
            const [key, value] = line.split('=');
            if (key && value) env[key.trim()] = value.trim();
        });
        return env;
    } catch (err) {
        return {};
    }
}

async function startExtraction() {
    const env = await loadEnv();
    const BASE_URL = env.VITE_API_BASE_URL || "https://node.codolio.com/api/question-tracker/v1/sheet/public/get-sheet-by-slug/";

    const slugs = availableSheets.map(s => s.id);
    console.log(`\n🔮 ZEUS ARCHIVES - Node.js Key Extraction for ALL ${slugs.length} manuscripts...`);

    const report = {};
    const allUniqueKeys = new Set();

    async function fetchAllKeys(slug) {
        try {
            const url = `${BASE_URL}${slug}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
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
            return [];
        }
    }

    const fetchPromises = slugs.map(async (slug) => {
        try {
            const keys = await fetchAllKeys(slug);
            report[slug] = {
                count: keys.length,
                keys: keys.sort()
            };
            keys.forEach(k => allUniqueKeys.add(k));
            console.log(`✅ ${slug.padEnd(30)} | Keys: ${String(keys.length).padStart(3)} ✨`);
        } catch (err) {
            console.log(`❌ ${slug.padEnd(30)} | Failed`);
        }
    });

    await Promise.all(fetchPromises);

    const sortedAllKeys = [...allUniqueKeys].sort();
    const finalReport = {
        summary: {
            totalSheets: slugs.length,
            totalUniqueKeysAcrossAll: sortedAllKeys.length,
            generatedAt: new Date().toISOString()
        },
        allUniqueKeys: sortedAllKeys,
        perSheet: report
    };

    console.log("\n\n✅ EXTRACTION COMPLETE");
    console.log("-----------------------");
    console.log(`Total Unique Keys discovered: ${sortedAllKeys.length}`);

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const reportPath = path.join(__dirname, 'api_keys_report.json');

    try {
        await fs.writeFile(reportPath, JSON.stringify(finalReport, null, 2));
        console.log(`\n📄 Report saved to: ${reportPath}`);
    } catch (err) {
        console.error("\n❌ Failed to save report file:", err);
    }
    console.log("-----------------------\n");
}

startExtraction();


