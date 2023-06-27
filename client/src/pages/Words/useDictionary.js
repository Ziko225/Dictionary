import { useState } from 'react';
import { httpGet, httpPut } from "../../http/http";

const useDictionary = () => {
    const [words, setWords] = useState();

    const getWords = async () => {
        const response = await httpGet("");
        if (!response?.ok) {
            return false;
            setWords([]);
        }

        const result = await response.json();
        setWords(result.words);

        return true;
    };

    const addWord = async (name, translate) => {
        if (!name || !translate) {
            return;
        }

        const response = await httpPut("", { name, translate });
        if (!response?.ok) {
            return false;
        }

        getWords();
    };

    const removeWord = () => {

    };

    const toggleIsLearned = () => {

    };

    return { words, getWords, addWord, removeWord, toggleIsLearned };
};

export default useDictionary;