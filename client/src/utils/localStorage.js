/**
 * @param {string} key
 * @param {any} data
 * @param {boolean} isSessionStorage
 *
 * @returns {void}
 */
const saveToStorage = (key, data, isSessionStorage) => {
    data = JSON.stringify(data);

    if (isSessionStorage) {
        return sessionStorage.setItem(key, data);
    }

    return localStorage.setItem(key, data);
};

/**
 * @param {string} key
 *
 * @returns {object|null}
 */
const getFromStorage = (key) => {
    const data = localStorage.getItem(key) || sessionStorage.getItem(key);

    if (data) {
        try {
            return JSON.parse(data);
        } catch (e) {
            console.warn(e);

            return null;
        }
    }

    return null;
};

/**
 * @param {string} key
 * @param {boolean} isSessionStorage
 *
 * @returns {void}
 */
const removeFromStorage = (key, isSessionStorage) => {
    if (isSessionStorage) {
        return sessionStorage.removeItem(key);
    }

    localStorage.removeItem(key);
};

export const localStorageUtils = {
    saveToStorage,
    getFromStorage,
    removeFromStorage
};
