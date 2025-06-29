import {useData, useRoute} from "vitepress";
import {computed} from 'vue';

const dataFiles = import.meta.glob('../data/*.json', {
    eager: true,
    import: 'default'
})

// Default fallback language
const FALLBACK_LANG = 'en';

/**
 * Get available language list
 * @returns {string[]} Array of language codes
 */
export function getAvailableLanguages() {
    return Object.keys(dataFiles)
        .map(path => path.match(/[^\/]+(?=\.json$)/)[0])
        .filter(lang => lang && lang.length);
}

/**
 * Advanced path splitting function
 * @param {string} path - Original path
 * @returns {string[]} Split path segments
 */
function splitPath(path) {
    // Use state machine to precisely split path
    const segments = [];
    let current = '';
    let inBracket = false;

    for (let i = 0; i < path.length; i++) {
        const char = path[i];

        switch (char) {
            case '[':
                if (inBracket) {
                    throw new Error(`Nested brackets at position ${i}`);
                }
                inBracket = true;
                if (current) {
                    segments.push(current);
                    current = '';
                }
                break;

            case ']':
                if (!inBracket) {
                    throw new Error(`Unclosed bracket at position ${i}`);
                }
                inBracket = false;
                if (current) {
                    segments.push(current);
                    current = '';
                }
                break;

            case '.':
                if (inBracket) {
                    current += char;
                } else {
                    if (current) {
                        segments.push(current);
                        current = '';
                    }
                }
                break;

            default:
                current += char;
        }
    }

    if (inBracket) {
        throw new Error(`Unclosed bracket at path end`);
    }

    if (current) {
        segments.push(current);
    }

    return segments;
}

/**
 * Enhanced path resolution - supports arbitrarily deep nested objects and arrays
 * @param {string} path - Path to resolve (e.g., "advantage.items[0].items[0]")
 * @param {Object|Array} data - Language data object
 * @returns {any} Resolved value
 */
function resolvePath(path, data) {
    // 1. Split the path
    const segments = splitPath(path);

    // 2. Initialize current value
    let current = data;

    // 3. Iterate through all segments
    for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];

        // 4. Handle null/undefined values
        if (current === null || current === undefined) {
            return `[i18n] Path broken: '${segment}' (position ${i + 1} in '${path}')`;
        }

        // 5. Handle array indices
        if (/^\d+$/.test(segment)) {
            const index = parseInt(segment, 10);

            if (!Array.isArray(current)) {
                return `[i18n] Expected array but got ${typeof current} (position ${i + 1} in '${path}')`;
            }

            if (index < 0 || index >= current.length) {
                return `[i18n] Index out of bounds: ${index} (length ${current.length}) (position ${i + 1} in '${path}')`;
            }

            current = current[index];
            continue;
        }

        // 6. Handle object properties
        if (typeof current === 'object' && !Array.isArray(current)) {
            if (!(segment in current)) {
                return `[i18n] Missing property: '${segment}' (position ${i + 1} in '${path}')`;
            }

            current = current[segment];
            continue;
        }

        // 7. Unresolvable cases
        return `[i18n] Cannot access '${segment}' on ${typeof current} (position ${i + 1} in '${path}')`;
    }

    return current;
}

/**
 * Get data by language
 * @param {string} lang Language code
 * @returns {Object} Corresponding language data object
 */
function getDataByLang(lang) {
    const fileName = `../data/${lang}.json`;

    // 1. Try direct match for requested language
    if (dataFiles[fileName]) {
        return dataFiles[fileName];
    }

    // 2. Try matching base language variant (e.g., zh for zh-CN)
    const baseLang = lang.split('-')[0];
    const baseLangFile = `../data/${baseLang}.json`;

    if (dataFiles[baseLangFile]) {
        console.warn(`[i18n] Language ${lang} not found, using base ${baseLang}`);
        return dataFiles[baseLangFile];
    }

    // 3. Fallback to default language
    const fallbackFile = `../data/${FALLBACK_LANG}.json`;
    if (dataFiles[fallbackFile]) {
        console.warn(`[i18n] Language ${lang} not found, using fallback ${FALLBACK_LANG}`);
        return dataFiles[fallbackFile];
    }

    // 4. Final fallback solution
    console.error(`[i18n] Critical: Fallback language ${FALLBACK_LANG} also not found!`);

    // Try returning any available language
    const firstLang = getAvailableLanguages()[0];
    if (firstLang) {
        console.warn(`[i18n] Using first available language: ${firstLang}`);
        return dataFiles[`../data/${firstLang}.json`];
    }

    // 5. No available language files
    throw new Error(`No valid language files found in ${Object.keys(dataFiles).join(', ')}`);
}

/**
 * Automatically fixes common path syntax issues
 * @param {string} path - Original path string
 * @returns {string} Fixed path
 */
function autoFixPath(path) {
    // Remove all whitespace characters from the path
    let fixed = path.replace(/\s/g, '');

    // Standardize bracket syntax conventions:
    // 1. Convert '[.' to '['
    // 2. Convert '].' to ']'
    // 3. Fix consecutive closing/opening brackets by inserting '.' between them
    fixed = fixed
        .replace(/\.$$/g, '[')  // Convert '[.' to '['
        .replace(/$$\./g, ']')   // Convert '].' to ']'
        .replace(/\]$$/g, '].['); // Convert '][' to '].[' for proper separation

    // Ensure array indices are properly formatted by converting non-numeric indices
    // to quoted property access syntax (e.g., [abc] becomes ['abc'])
    fixed = fixed.replace(/\[(\D+)$$/g, (match, p1) => {
        console.warn(`[i18n] Invalid array index: ${p1}`);
        return `['${p1}']`;
    });

    return fixed;
}

export function useSafeI18n() {
    const {dataForLang} = useI18nData();

    const safeGet = (path, fallback = '') => {
        return computed(() => {
            try {
                const result = resolvePath(autoFixPath(path), dataForLang.value);
                return typeof result === 'string' && result.startsWith('[i18n]')
                    ? fallback
                    : result;
            } catch {
                return fallback;
            }
        }).value;
    };

    return {safeGet};
}

/**
 * Vue composable - Get current language data
 * @returns {Object} { currentLang, dataForLang }
 */
export function useI18nData() {
    const {lang: siteLang, site} = useData();
    const route = useRoute();

    // Determine current language (consider language in URL path)
    const currentLang = computed(() => {
        const langFromPath = route.path.split('/')[1];
        const availableLangs = getAvailableLanguages();

        return availableLangs.includes(langFromPath)
            ? langFromPath
            : site.value.lang || siteLang.value;
    });

    // Get current language data (with fallback mechanism)
    const dataForLang = computed(() => {
        return getDataByLang(currentLang.value);
    });

    // Provide function for switching languages
    const switchLanguage = (newLang) => {
        const router = useRouter();
        const newPath = `/${newLang}${route.path.replace(/^\/([a-z]{2}-[A-Z]{2}|[a-z]{2})\/?/, '')}`;
        router.go(newPath);
    };

    // Enhanced translation function that supports array paths
    const t = (keyPath) => {
        return resolvePath(keyPath, dataForLang.value);
    };

    return {
        currentLang,
        dataForLang,
        t, // Return enhanced translation function
        switchLanguage,
        availableLangs: getAvailableLanguages()
    };
}

// Global translation function (supports array syntax)
export function t(keyPath, lang = null) {
    const data = lang ? getDataByLang(lang) :
        (typeof useI18nData === 'function' ? useI18nData().dataForLang.value : {});

    return resolvePath(keyPath, data);
}