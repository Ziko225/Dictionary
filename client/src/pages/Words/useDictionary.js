import { useState } from 'react';
import { httpGet, httpPost, httpPut, httpRemove } from "../../http/http";

const useDictionary = () => {
    const [words, setWords] = useState();

    const getWords = async () => {
        const response = await httpGet("");
        if (!response?.ok) {
            setWords(null);
            return false;
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
        return true;
    };

    const removeWord = async (id) => {
        const response = await httpRemove(id);
        if (!response?.ok) {
            return false;
        }

        getWords();

        return true;
    };

    const toggleIsLearned = async (id) => {
        const response = await httpPost(id);
        if (!response?.ok) {
            return false;
        }

        getWords();
    };

    const speak = (word) => {
        let utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = "en-US";
        window.speechSynthesis.speak(utterance);
    };

    return { words, getWords, addWord, removeWord, toggleIsLearned, speak };
};

export default useDictionary;