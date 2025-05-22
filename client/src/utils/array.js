const getRandomSort = (array) => {
    const result = [...array];

    for (let index = result.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1));

        [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
    }

    return result;
};

const cleanAndSplitWords = (word = "") => {
    if (!word) {
        return [];
    }

    const cleanedWord = word
        .replaceAll("/", "@")
        .replaceAll(";", "@")
        .replaceAll("'", "")
        .replaceAll(",", "@");

    return cleanedWord.split("@").map((name) => {
        if (name.includes("(")) {
            const optional = name.slice(name.lastIndexOf("(", name.lastIndexOf(")")));
            return name = name.replace(optional, "").trim();
        }

        return name = name.trim();
    });
};

const removeItemByIndex = (array, index) => {
    return [
        ...array.slice(0, index),
        ...array.slice(index + 1),
    ];
};

export const arrayUtils = {
    getRandomSort,
    cleanAndSplitWords,
    removeItemByIndex
};
