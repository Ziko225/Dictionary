import { useEffect, useState } from 'react';

import useGame from 'hooks/useGame';

import Button from 'components/Button';
import Communicate from '../../Communicate';

import TimerIco from './timer.svg?react';

import { arrayUtils } from 'utils/array';

import './styles.scss';

const TranslateBackward = ({ gameLogic, unlearnedWords, withTimer }) => {
    const { wordsArray, speak, nextExercise, setIsWordCorrect } = gameLogic;

    const [translateOptions, setTranslateOptions] = useState([]);
    const [wordIndexSelected, setWordIndexSelected] = useState(-1);
    const [isReady, setIsReady] = useState(false);
    const [timerInSeconds, setTimerInSeconds] = useState(7);

    const {
        answerStatus,
        sortedWords,
        step,
        checkWord,
        isPause,
    } = useGame({ wordsArray, nextExercise, setIsWordCorrect, speak, withSpeak: true });

    useEffect(() => {
        if (sortedWords[0]) {
            getRandomWordsTranslateWithOnlyOneRight();
        }
    }, [sortedWords, step]);

    useEffect(() => {
        if (withTimer && isReady) {
            setTimerInSeconds(7);

            const interval = setInterval(() => {
                setTimerInSeconds((prevState) => {

                    if (prevState <= 1) {
                        clearInterval(interval);
                        nextWord();
                    }

                    return prevState - 1;
                });

            }, 1000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [isReady, step]);

    const { getRandomSort } = arrayUtils;

    const getRandomWordsTranslateWithOnlyOneRight = () => {
        const currentWord = sortedWords[step];

        const randomArray = getRandomSort(unlearnedWords).
            filter((word) => word.name !== currentWord.name);

        const array = [
            randomArray[0].translate,
            randomArray[1].translate,
            currentWord.translate,
            randomArray[2].translate,
            randomArray[3].translate,
        ];

        setTranslateOptions(getRandomSort(array));
    };

    const nextWord = () => {
        if (isPause) {
            return;
        }

        checkWord('-');
        setTranslateOptions([]);
        setWordIndexSelected([]);
    };

    const submit = (word, index) => {
        if (isPause) {
            return;
        }

        if (withTimer) {
            setTimerInSeconds(8);
        }

        setWordIndexSelected(index);
        checkWord(word, sortedWords[step].translate);
    };

    if (withTimer && !isReady) {
        return <Communicate
            title="Fast Translation Challenge"
            subtitle="You have 7 seconds to choose the correct translation for each word.">
            <Button className="translateBackward__startButton" onClick={() => setIsReady(true)}>
                Ready? <TimerIco />
            </Button>
        </Communicate>;
    }

    return (
        <div className='translateBackward'>
            {withTimer && <div className="translateBackward__timer">
                <p>{timerInSeconds}</p>
                <TimerIco />
            </div>}
            <h2 className='translateBackward__title'>
                {sortedWords[step]?.name}
            </h2>
            <p className='translateBackward__subtitle'>
                {`${step + 1} / ${sortedWords.length}`}
            </p>
            <div className='translateBackward__buttons'>
                {
                    translateOptions.map((word, index) =>
                        <button
                            key={word}
                            className={index === wordIndexSelected ? `button--${answerStatus}` : ''}
                            onClick={() => submit(word, index)}
                        >
                            {word}
                        </button>
                    )
                }
            </div>
        </div>
    );
};

export default TranslateBackward;