import { useContext, useEffect, useState } from 'react';

import { useQueryParams } from './useQueryParams';

import { AuthContext } from '../context/authContext';
import { dictionaryService } from '../services/dictionaryService';
import { queryKeys } from '../constants';

const useDictionary = (type) => {
    const { userData } = useContext(AuthContext);

    const { queryParams } = useQueryParams('search');

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getWords();
    }, []);

    const querySearch = queryParams[queryKeys.search] || '';

    const service = {
        words: {
            get: dictionaryService.getWords,
            add: dictionaryService.addWord,
            toggleLearned: dictionaryService.toggleIsLearnedWord,
            delete: dictionaryService.deleteWord,
        },

        verbs: {
            get: dictionaryService.getVerbs,
            add: dictionaryService.addVerb,
            toggleLearned: dictionaryService.toggleIsLearnedVerb,
            delete: dictionaryService.deleteVerb,
        }
    };

    const getWords = async () => {
        try {
            const response = await service[type].get();
            const result = await response.json();

            setData(result);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading();
        }
    };

    const add = async (data) => {
        try {
            await service[type].add(data);
            await getWords();

            return true;
        } catch (error) {
            if (error?.details?.body) {
                return error.details.body;
            }

            return "Something get wrong";
        }
    };

    const toggleIsLearned = async (id) => {
        try {
            await service[type].toggleLearned({ id });

            getWords();
        } catch (error) {

        }
    };

    const remove = async (id) => {
        try {
            await service[type].delete({ id });

            getWords();

            return true;
        } catch (error) {

        }
    };

    const speak = (word) => {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = userData.language || "en-US";
        window.speechSynthesis.speak(utterance);
    };

    const isFilterInclude = text => text.includes(querySearch.toLowerCase());

    const getFilteredData = () => {
        try {
            const filteredData = querySearch
                ? data.filter((word) => isFilterInclude(word.name) || isFilterInclude(word.translate))
                : data;

            return filteredData;
        } catch (error) {
            console.error(error);
            return data;
        }
    };

    return {
        data: getFilteredData(),
        add,
        remove,
        toggleIsLearned,
        speak,
        isLoading
    };
};

export default useDictionary;