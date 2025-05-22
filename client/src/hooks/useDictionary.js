import { useEffect, useState } from 'react';

import { userStore } from 'store/userStore';
import { dictionaryStore } from 'store/dictionaryStore';

import { useQueryParams } from './useQueryParams';

import { dictionaryService } from 'services/dictionaryService';
import { queryKeys } from 'constants';

const useDictionary = (type) => {
    const { userData } = userStore();
    const { dictionaryData, setDictionaryData } = dictionaryStore();

    const { queryParams } = useQueryParams('search');

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getWords();
    }, []);

    const querySearch = queryParams[queryKeys.search] || '';

    const services = {
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

    const getWords = async (forceUpdate) => {
        try {
            if (dictionaryData[type][0] && !forceUpdate) {
                setData(dictionaryData[type]);
                return setIsLoading(false);
            }

            const response = await services[type].get();
            const result = await response.json();

            setData(result);
            setDictionaryData(result, type);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading();
        }
    };

    const add = async (data) => {
        try {
            await services[type].add(data);
            await getWords(true);

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
            await services[type].toggleLearned({ id });

            getWords(true);
        } catch (error) {

        }
    };

    const remove = async (id) => {
        try {
            await services[type].delete({ id });

            getWords(true);

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