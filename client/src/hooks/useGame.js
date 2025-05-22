import { useEffect, useState } from 'react';

import { arrayUtils } from 'utils/array';
import { promiseUtils } from 'utils/promise';
import { stringUtils } from 'utils/string';

const useGame = ({ wordsArray, setIsWordCorrect, nextExercise, speak, withSpeak }) => {
    const [sortedWords, setSortedWords] = useState([]);
    const [step, setWordOrder] = useState(0);
    const [typedWord, setTypedWord] = useState('');
    const [isPause, setIsPause] = useState(false);
    const [answerStatus, setAnswerStatus] = useState('');

    const { cleanWord } = stringUtils;
    const { pause } = promiseUtils;
    const { getRandomSort } = arrayUtils;

    useEffect(() => {
        setSortedWords(getRandomSort(wordsArray.filter((word) => !word.learned)));
    }, []);

    const checkWord = async (word, autoTypedWord) => {
        if (isPause) {
            return;
        }

        setIsPause(true);

        if (cleanWord(autoTypedWord || typedWord) === cleanWord(word)) {
            setIsWordCorrect(sortedWords[step].id);
            setAnswerStatus('correct');

            if (withSpeak) {
                speak(sortedWords[step].name);
            }
        } else {
            setAnswerStatus('error');
        }

        await pause(700);

        if (step + 1 === sortedWords.length) {
            return nextExercise();
        }

        setIsPause(false);
        setWordOrder((prevState) => prevState + 1);
        setAnswerStatus('');
        setTypedWord('');
    };

    const typeWord = (text) => {
        if (isPause) {
            return;
        }

        setTypedWord(text);
    };

    return {
        answerStatus,
        sortedWords,
        step,
        typedWord,
        isPause,
        checkWord,
        setTypedWord: typeWord
    };
};

export default useGame;