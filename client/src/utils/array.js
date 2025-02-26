/**
 * @param {number} totalElements
 * 
 * @returns {unknown[]}
 */
const createArrayWithIndexes = (totalElements = 0) => {
    return [...Array(totalElements)].map((v, i) => i + 1);
};


export const arrayUtil = {
    createArrayWithIndexes
}
