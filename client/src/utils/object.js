/**
 * @param {object} object
 *
 * @returns {object}
 */
const getObjectWithoutEmptyValues = (object) => {
    return Object.fromEntries(Object.entries(object).filter((e) => e[1] || e[1] === 0));
};

/**
 * @param {object} object
 * @param {string} keys
 *
 * @returns {object}
 */
const removeValueFromObject = (object, ...keys) => {
    return keys.reduce((acc, key) => {
        const { [key]: _, ...rest } = acc;
        return rest;
    }, object);
};

export const objectUtil = {
    getObjectWithoutEmptyValues,
    removeValueFromObject
};
