import { useEffect, useState } from 'react';

import useGame from 'hooks/useGame';

import Button from 'components/Button';

import { arrayUtils } from 'utils/array';
import { stringUtils } from 'utils/string';

import './styles.scss';

const WordBuilder = ({ gameLogic }) => {
    const { wordsArray, nextExercise, setIsWordCorrect, speak } = gameLogic;

    const [randomWordLetters, setRandomWordLetters] = useState([]);
    const [selectedWordLetters, setSelectedWordLetters] = useState([]);

    const {
        answerStatus,
        sortedWords,
        step,
        isPause,
        checkWord,
    } = useGame({ wordsArray, nextExercise, setIsWordCorrect, speak, withSpeak: true });

    const { getRandomSort, removeItemByIndex } = arrayUtils;
    const { cleanWord } = stringUtils;

    const statusClassNames = {
        correct: 'wordBuilder__list--ok',
        error: 'wordBuilder__list--error'
    };

    useEffect(() => {
        if (sortedWords[0]) {
            randomizeWordLetters();
        }
    }, [sortedWords, step]);

    const randomizeWordLetters = () => {
        const cleanCurrentWord = cleanWord(sortedWords[step].name);
        setRandomWordLetters(getRandomSort(cleanCurrentWord.split('')));
    };

    const removeLetter = (index) => {
        setRandomWordLetters((prevState) => [...prevState, selectedWordLetters[index]]);
        setSelectedWordLetters((prevState) => removeItemByIndex(prevState, index));
    };

    const selectLetter = (index) => {
        setSelectedWordLetters((prevState) => [...prevState, randomWordLetters[index]]);
        setRandomWordLetters((prevState) => removeItemByIndex(prevState, index));
    };

    const submit = async () => {
        if (isPause) {
            return;
        }

        await checkWord(sortedWords[step].name, selectedWordLetters.join(''));
        setSelectedWordLetters([]);
    };

    return (
        <div className='wordBuilder'>
            <h2 className='wordBuilder__title'>Word builder</h2>
            <p>
                {`${step + 1} / ${sortedWords.length}`}
            </p>
            <ul className='wordBuilder__list wordBuilder__list--rightOrders'>
                {
                    selectedWordLetters.map((letter, index) =>
                        <li key={index + letter}>
                            <button onClick={() => removeLetter(index)}>
                                {letter}
                            </button>
                        </li>
                    )
                }
            </ul>
            <p className='wordBuilder__info'>
                Put the letters together to form the word!
            </p>
            <ul className={`wordBuilder__list ${statusClassNames[answerStatus] || ''}`}>
                {randomWordLetters[0]
                    ? randomWordLetters.map((letter, index) =>
                        <li key={index + letter}>
                            <button onClick={() => selectLetter(index)}>
                                {letter}
                            </button>
                        </li>
                    )
                    : <Button onClick={submit}>Submit</Button>
                }
            </ul>
        </div>
    );
};

export default WordBuilder;