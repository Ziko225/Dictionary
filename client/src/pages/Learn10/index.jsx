import { useState } from 'react';

import useDictionary from 'hooks/useDictionary';

import Button from 'components/Button';
import Loading from 'components/Loading';
import Counter from './components/Counter';

import Communicate from './components/Communicate';
import WordPreview from './components/GameModes/WordPreview';
import ListenAndType from './components/GameModes/ListenAndType';
import TranslateForward from './components/GameModes/TranslateForward';
import WordBuilder from './components/GameModes/WordBuilder';
import TranslateBackward from './components/GameModes/TranslateBackward';

import { wordProgress, wordCheckList, dataStorageKey } from './constants';

import './styles.scss';

const Learn10 = () => {
    const [isStarted, setIsStarted] = useState(false);
    const [random10Words, setRandom10Words] = useState([]);
    const [gameStages, setGameStages] = useState(0);

    const { data, speak, isLoading, toggleIsLearned } = useDictionary('words');

    const onlyUnlearnedWords = data.filter((word) => !word.learned);

    const totalStagesLength = 5;

    const getLocalStorageData = () => JSON.parse(localStorage.getItem(dataStorageKey));

    const saveToLocalStorage = (data) => {
        localStorage.setItem(dataStorageKey, JSON.stringify(data));
    };

    const getRandom10Words = () => {
        const localStorageData = getLocalStorageData();

        if (localStorageData) {
            const localDataDate = new Date(localStorageData.date);
            const triggerDate = new Date();

            triggerDate.setDate(triggerDate.getDate());
            triggerDate.setHours(4, 0, 0, 0);

            if (localDataDate.getTime() === triggerDate.getTime()) {
                setRandom10Words(localStorageData.words);
                return;
            }
        }

        if (!data || !data[0]) {
            return;
        }

        if (onlyUnlearnedWords.length < 10) {
            return;
        }

        const copyUnlearnedWords = [...onlyUnlearnedWords];
        const result = [];

        for (let i = 0; i < 10 && copyUnlearnedWords.length > 0; i++) {
            const randomIndex = Math.floor(Math.random() * copyUnlearnedWords.length);
            result.push(copyUnlearnedWords.splice(randomIndex, 1)[0]);
        }

        const target = new Date();
        target.setHours(4, 0, 0, 0);

        saveToLocalStorage({
            words: result,
            date: target.toISOString()
        });

        setRandom10Words(result);
    };

    const start = () => {
        getRandom10Words();
        setIsStarted(true);
    };

    const nextExercise = () => {
        if (gameStages >= totalStagesLength) {
            return setGameStages(0);
        }

        setGameStages((previousStep) => previousStep + 1);
    };

    const checkIsWordLearned = async (wordId) => {
        if (gameStages !== totalStagesLength) {
            return false;
        }

        const selectedWordIndex = random10Words.findIndex((word) => word.id === wordId);
        const isLearned = wordCheckList.every(mode => random10Words[selectedWordIndex].wordProgress.includes(mode));

        if (isLearned && !random10Words[selectedWordIndex].learned) {
            toggleIsLearned(wordId);
        }

        return isLearned;
    };

    const setIsWordCorrect = async (wordId) => {
        const certeficate = wordProgress[gameStages];
        const selectedWordIndex = random10Words.findIndex((word) => word.id === wordId);
        const updatedRandomWords = [
            ...random10Words,
        ];

        const newWordProgress = updatedRandomWords[selectedWordIndex].wordProgress || [];
        if (!newWordProgress.includes(certeficate)) {
            newWordProgress.push(certeficate);
        }

        updatedRandomWords[selectedWordIndex].wordProgress = newWordProgress;

        const isWordLearned = await checkIsWordLearned(wordId);
        updatedRandomWords[selectedWordIndex].learned = isWordLearned;

        setRandom10Words(updatedRandomWords);
        const localStorageData = getLocalStorageData();
        localStorageData.words = updatedRandomWords;
        saveToLocalStorage(localStorageData);
    };

    const repeatGame = () => {
        const newArray = random10Words.map((word) => {
            word.learned = false;
            word.wordProgress = [];

            return word;
        });

        setRandom10Words(newArray);
        const localStorageData = getLocalStorageData();
        localStorageData.words = newArray;
        saveToLocalStorage(localStorageData);
    };

    const standardGameLogic = {
        wordsArray: random10Words,
        speak,
        nextExercise,
        setIsWordCorrect,
    };

    const gameModes = {
        0: <WordPreview gameLogic={standardGameLogic} />,
        1: <ListenAndType gameLogic={standardGameLogic} />,
        2: <TranslateForward gameLogic={standardGameLogic} />,
        3: <TranslateBackward
            gameLogic={standardGameLogic}
            unlearnedWords={onlyUnlearnedWords}
        />,
        4: <WordBuilder gameLogic={standardGameLogic} />,
        5: <TranslateBackward
            gameLogic={standardGameLogic}
            unlearnedWords={onlyUnlearnedWords}
            withTimer
        />,
    };

    if (isLoading) {
        return <Loading />;
    }

    if (!isStarted) {
        return <Communicate
            title=" Learn 10 new words every day!"
            subtitle="Your words refresh every day at 4:00 AM"
        >
            <Button onClick={start}>Get words</Button>
        </Communicate>;
    }

    if (random10Words.length < 10) {
        return <Communicate
            title="Oops! Not enough words..."
            subtitle="Add more unlearned words to your dictionary and come back!"
        >
            {`:(`}
        </Communicate>;
    }

    if (!random10Words.filter((word) => !word.learned)[0]) {
        return <Communicate
            title="Test passed."
            subtitle="All tasks completed successfully! Please wait while we update your progress... or"
        >
            <Button onClick={repeatGame}>Repeat?</Button>
        </Communicate>;
    }

    return (
        <div className="container learn10">
            <Counter className='learn10__counter' />
            {gameModes[gameStages]}
        </div>
    );
};

export default Learn10;