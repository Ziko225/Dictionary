import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import useHttp from './useHttp';

const useDictionary = (isWordsPage) => {
    const { check, isOffline, setIsOffline } = useContext(AuthContext);

    const [data, setData] = useState();

    const getApi = useHttp();

    const [isLoading, setIsLoading] = useState(false);

    const key = isWordsPage ? "words" : "verbs";

    const getWords = async () => {
        if (isOffline) {
            setData(JSON.parse(localStorage.getItem(key)));
            check();
            return true;
        }

        const response = await getApi(key, "GET");

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
        const response = await getApi(key, "POST", data);
        if (!response?.ok) {
            check();
            return response.json();
        }

        getWords();
        return true;
    };

    const toggleIsLearned = async (id) => {
        const response = await getApi(key, "PUT", { id });
        if (!response?.ok) {
            check();
            return false;
        }

        getWords();
    };

    const removeWord = async (id) => {
        const response = await getApi(`${key}/${id}`, "DELETE");
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

    return {
        data,
        getWords,
        add,
        removeWord,
        toggleIsLearned,
        speak,
        isOffline,
        isLoading
    };
};

export default useDictionary;