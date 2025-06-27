const cleanWord = (word) => {
    return word
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
};

export const stringUtils = {
    cleanWord,
};