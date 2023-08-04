import { useEffect, useState } from 'react';
import { httpGet, httpPost, httpPut, httpRemove } from "../../http";

const useDictionary = (isOffline) => {
    const [words, setWords] = useState();

    const getWords = async () => {
        if (isOffline) {
            setWords(JSON.parse(localStorage.getItem("words")));
            return true;
        }

        const response = await httpGet("words");
        if (!response?.ok) {
            return false;
        }

        const result = await response.json();

        setWords(result.words);
        localStorage.setItem("words", JSON.stringify(result.words));

        return true;
    };

    const addWord = async (name, translate) => {
        if (!name || !translate) {
            return;
        }

        const response = await httpPost("words", { name, translate });
        if (!response?.ok) {
            return false;
        }

        getWords();
        return true;
    };

    const toggleIsLearned = async (id) => {
        const response = await httpPut("words", { id });
        if (!response?.ok) {
            return false;
        }

        getWords();
    };

    const removeWord = async (id) => {
        const response = await httpRemove(`words/${id}`);
        if (!response?.ok) {
            return false;
        }

        getWords();

        return true;
    };

    const speak = (word) => {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = "en-US";
        window.speechSynthesis.speak(utterance);
    };

    useEffect(() => {
        getWords();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOffline]);

    return { words, getWords, addWord, removeWord, toggleIsLearned, speak };
};

export default useDictionary;