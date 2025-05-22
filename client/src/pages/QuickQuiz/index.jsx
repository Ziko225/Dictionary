import { useEffect, useRef, useState } from "react";

import { useToggle } from "hooks/useToggle";
import useDictionary from "hooks/useDictionary";
import useFilter from 'hooks/useFilter';

import Filter from "components/Filter";
import Loading from "components/Loading";
import SpeakButton from "components/SpeakButton";
import Button from 'components/Button';

import { arrayUtils } from 'utils/array';
import { stringUtils } from 'utils/string';

import "./styles.scss";

const QuickQuiz = () => {
    const { data, toggleIsLearned, speak, isLoading } = useDictionary('words');

    const { getFilteredData, learned, unlearned, backward, toggleHandler } = useFilter();

    const [isPause, setIsPause] = useState(false);
    const [words, setWords] = useState([]);
    const [sessionWords, setSessionWords] = useState([]);
    const [randomWord, setRandomWord] = useState(null);
    const [typedWord, setTypedWord] = useState("");
    const [status, setStatus] = useState("");
    const [isNotEnoughWords, setIsNotEnoughWords] = useState(false);

    const [isGameStarted, toggleIsGameStarted] = useToggle(false);

    const { cleanWord } = stringUtils;

    useEffect(() => {
        const newWords = getFilteredData(words);

        if (!newWords[0] || newWords.length < 3) {
            return setIsNotEnoughWords(true);
        } else {
            setIsNotEnoughWords(false);
        }

        setSessionWords(newWords);
        getRandomWord(newWords);
    }, [learned, unlearned, backward, words]);

    const inputRef = useRef(null);

    const randomWordCurrentName = backward ? randomWord?.translate : randomWord?.name || '';
    const randomWordName = randomWord?.name || '';
    const word = backward ? randomWord?.name : randomWord?.translate || '';

    const getRandomWord = (words) => {
        const max = words?.length;
        const randomNumber = Math.floor(Math.random() * max);
        const nextRandomWord = words[randomNumber];

        setRandomWord(nextRandomWord);
        setIsPause(false);
        inputRef.current?.focus();
    };

    const removeLastRandomWord = (lastRandomWord) => {
        const newArray = sessionWords.filter((word) => word.id !== lastRandomWord.id);
        setSessionWords(newArray);

        return newArray;
    };

    const start = () => {
        try {
            if (!data[0] || data.length < 3) {
                return setIsNotEnoughWords(true);
            }

            setWords(data);
            toggleIsGameStarted();
        } catch (error) {
            setIsNotEnoughWords(true);
        }
    };

    const submit = async (event) => {
        event.preventDefault();

        if (isPause) {
            return;
        }

        const cleanedTypedWord = cleanWord(typedWord);

        const nextWord = async () => {
            if (!randomWord.learned) {
                await toggleIsLearned(randomWord.id);
            }

            setIsPause(true);
            setStatus("ok");
            speak(randomWordName);
            setTypedWord(randomWordCurrentName);

            const timeout = setTimeout(() => {
                setStatus("");
                setTypedWord("");

                const newArray = removeLastRandomWord(randomWord);
                getRandomWord(newArray);
                clearTimeout(timeout);
            }, 2000);
        };

        if (backward) {
            const translate = cleanWord(randomWord.translate);
            const isArrayIncludeTypedWord = arrayUtils.cleanAndSplitWords(translate).includes(cleanedTypedWord);

            if (isArrayIncludeTypedWord) {
                return await nextWord();
            }
        } else if (cleanedTypedWord === cleanWord(randomWordCurrentName)) {
            return await nextWord();
        }

        setStatus("mistake");
    };

    const dontKnow = async () => {
        if (isPause) {
            return;
        }

        if (randomWord?.learned) {
            await toggleIsLearned(randomWord.id);
        }

        setIsPause(true);
        setStatus("warn");
        setTypedWord(randomWordCurrentName);
        speak(randomWordName);

        const nextWord = () => {
            setTypedWord("");
            setStatus("");

            const newArray = removeLastRandomWord(randomWord);
            getRandomWord(newArray);
        };

        setTimeout(nextWord, 3000);
    };

    const skip = () => {
        if (isPause) {
            return;
        }

        const newArray = removeLastRandomWord(randomWord);
        getRandomWord(newArray);
    };

    const retry = () => {
        setWords([...data]);
    };

    if (!isGameStarted) {
        return (
            <div className="game">
                <h1 className='game__title'>Play and learn!</h1>
                <Button onClick={start}>Play!</Button>
            </div>
        );
    }

    if (isLoading) {
        return <Loading />;
    }

    if (isNotEnoughWords) {
        return (
            <>
                <Filter
                    learned={learned}
                    unlearned={unlearned}
                    toggleHandler={toggleHandler}
                    game
                />
                <div className='game'>
                    <h3>Not enough words</h3>
                </div>
            </>
        );
    }

    return (
        <>
            <Filter
                learned={learned}
                unlearned={unlearned}
                toggleHandler={toggleHandler}
                game
            />

            <div className="game">
                <p>Words left: {sessionWords.length}</p>
                {sessionWords[0]
                    ? <>
                        <h2 className="game__word">{word}</h2>
                        <form onSubmit={submit} className="form">
                            <input
                                required
                                ref={inputRef}
                                onChange={(e) => setTypedWord(e.target.value)}
                                value={typedWord}
                                placeholder="Translate it"
                                className={`input ${status}`}
                            />
                        </form>
                        <div className="buttonsBlock">
                            {backward && <SpeakButton className="buttonsBlock__button" onClick={() => speak(word)} />}
                            <Button onClick={skip}>Skip</Button>
                            <Button className="button--idk" onClick={dontKnow}>I don't know</Button>
                        </div>
                        <Button className="button--primary" onClick={submit}>Submit</Button>
                    </>
                    : <>
                        <h3>You finish the game!</h3>
                        <Button onClick={retry}>Retry?</Button>
                    </>
                }
            </div>
        </>
    );
};

export default QuickQuiz;