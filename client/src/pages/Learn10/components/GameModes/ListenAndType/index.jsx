import { useEffect } from 'react';

import useGame from 'hooks/useGame';

import Input from 'components/Input';
import SpeakButton from 'components/SpeakButton';
import Button from 'components/Button';

import './styles.scss';

const ListenAndType = ({ gameLogic }) => {
    const { wordsArray, speak, nextExercise, setIsWordCorrect } = gameLogic;

    const {
        answerStatus,
        sortedWords,
        step,
        checkWord,
        typedWord,
        setTypedWord
    } = useGame({ wordsArray, nextExercise, setIsWordCorrect });

    const statusClassNames = {
        correct: 'listenType__input--ok',
        error: 'listenType__input--error'
    };

    const currentWordName = sortedWords[step]?.name;

    useEffect(() => {
        if (currentWordName) {
            speak(currentWordName);
        }
    }, [currentWordName]);

    const submit = async (event) => {
        event.preventDefault();

        await checkWord(currentWordName);
    };

    return (
        <form onSubmit={submit} className='listenType'>
            <h2 className='listenType__title'>
                {`${step + 1} / ${sortedWords.length}`}
            </h2>
            <SpeakButton
                type="button"
                className="listenType__speakButton"
                onClick={() => speak(currentWordName)}
            />
            <Input
                className={`listenType__input ${statusClassNames[answerStatus] || ''}`}
                value={typedWord}
                onChange={(e) => setTypedWord(e.currentTarget.value)}
                placeholder="Type word"
                required
            />
            <Button className="listenType__button">Submit</Button>
        </form >
    );
};

export default ListenAndType;