import { useContext, useEffect, useState } from 'react';
import { httpGet, httpPost, httpPut, httpRemove } from "../../http";
import { AuthContext } from '../../context/authContext';

const useDictionary = (isWordsPage) => {
    const { check, isOffline } = useContext(AuthContext);

    const [data, setData] = useState();
    const key = isWordsPage ? "words" : "verbs";

    const getWords = async () => {
        if (isOffline) {
            setData(JSON.parse(localStorage.getItem(key)));
            check();
            return true;
        }

        const response = await httpGet(key);
        if (!response) {
            check();
        }

        if (!response?.ok) {
            check();
            return false;
        }

        const result = await response.json();

        setData(result);
        localStorage.setItem(key, JSON.stringify(result));

        return true;
    };

    const add = async (data) => {
        const response = await httpPost(key, data);
        if (!response?.ok) {
            check();
            return response.json();
        }

        getWords();
        return true;
    };

    const toggleIsLearned = async (id) => {
        const response = await httpPut(key, { id });
        if (!response?.ok) {
            check();
            return false;
        }

        getWords();
    };

    const removeWord = async (id) => {
        const response = await httpRemove(`${key}/${id}`);
        if (!response?.ok) {
            check();
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
    }, [isOffline, isWordsPage]);

    return { data, getWords, add, removeWord, toggleIsLearned, speak, isOffline };
};

export default useDictionary;