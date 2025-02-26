/**
 * @param {number} number
 * @param {string} word
 * @param {string} word2
 * @param {string} word3
 *
 * @returns {string}
 */
const lastLetterFixer = (number = 0, word, word2, word3) => {
    const positiveNumber = Math.abs(number);

    if (positiveNumber % 10 === 1) {
        return `${number} ${word}`;
    } else if (
        (positiveNumber % 10 === 2 && positiveNumber % 100 !== 12) ||
        (positiveNumber % 10 === 3 && positiveNumber % 100 !== 13) ||
        (positiveNumber % 10 === 4 && positiveNumber % 100 !== 14)
    ) {
        return `${number} ${word2}`;
    }

    return `${number} ${word3}`;
};

/**
 * @returns {string}
 */
const generateElementKey = () => {
    return Math.random().toString(36).substring(2, 9);
};

export const stringUtil = {
    lastLetterFixer,
    generateElementKey
};
