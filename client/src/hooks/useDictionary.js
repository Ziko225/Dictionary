import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { useLocation } from "react-router-dom";
import useHttp from './useHttp';

const useDictionary = (isWordsPage) => {
    const { isOffline, isLoading } = useContext(AuthContext);

    const [data, setData] = useState();

    const [fixSearch, setFixSearch] = useState(false);

    const { getApi } = useHttp();

    const key = isWordsPage ? "words" : "verbs";

    const location = useLocation();

    useEffect(() => {
        getWords();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOffline, isWordsPage]);

    useEffect(() => {
        if (isOffline) {
            getApi("auth", "GET");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    useEffect(() => {
        window.addEventListener("scroll", windowSearchHandler);

        return () => {
            window.removeEventListener("scroll", windowSearchHandler);
        };
    }, []);

    const up = () => {
        window.scrollTo(0, 0);
    };

    const windowSearchHandler = () => {
        if (window.scrollY > 200) {
            setFixSearch(true);
        } else if (window.scrollY < 100) {
            setFixSearch(false);
        }
    };

    const getWords = async () => {
        if (isOffline) {
            setData(JSON.parse(localStorage.getItem(key)));

            return true;
        }

        const response = await getApi(key, "GET");

        if (!response) {
            return;
        }

        const result = await response.json();

        setData(result);
        localStorage.setItem(key, JSON.stringify(result));

        return response;
    };

    const add = async (data) => {
        const response = await getApi(key, "POST", data);

        if (response.ok) {
            getWords();
            return true;
        }

        if (response.status === 400) {
            return await response.json();
        }

        return "Something get wrong";
    };

    const toggleIsLearned = async (id) => {
        await getApi(key, "PUT", { id });

        getWords();
    };

    const removeWord = async (id) => {
        await getApi(`${key}/${id}`, "DELETE");

        getWords();

        return true;
    };

    const speak = (word) => {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = "en-US";
        window.speechSynthesis.speak(utterance);
    };

    return {
        data,
        getWords,
        add,
        up,
        removeWord,
        toggleIsLearned,
        speak,
        fixSearch,
        isOffline,
        isLoading
    };
};

export default useDictionary;