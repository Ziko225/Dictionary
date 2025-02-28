import { useContext, useEffect, useRef, useState } from "react";

import { FilterContext } from "../../context/filterContext";

import { useToggle } from "../../hooks/useToggle";
import useDictionary from "../../hooks/useDictionary";

import Filter from "../../components/Filter";
import Loading from "../../components/Loading";
import SpeakButton from "../../components/SpeakButton";

import "./styles.scss";

const Game = () => {
    const { data, toggleIsLearned, speak, isOffline, isLoading } = useDictionary('words');

    const { getFilteredData, learned, unlearned, backward, toggleHandler } = useContext(FilterContext);

    const [isPause, setIsPause] = useState();

    const filteredData = getFilteredData(data);

    const [randomWord, setRandomWord] = useState({ name: "" });

    const inputRef = useRef(null);

    const randomWordCurrentName = backward ? randomWord.translate : randomWord.name;

    const randomWordName = randomWord.name;

    const [typedWord, setTypedWord] = useState("");

    const [status, setStatus] = useState("");

    const [startGame, toggleStartGame] = useToggle(false);

    const isEnoughWords = filteredData?.length >= 3;

    useEffect(() => {
        if (status === "") {
            return;
        }

        setStatus("");
    }, [randomWord]);

    useEffect(() => {
        newRandomWord();
    }, [learned, unlearned, backward]);

    const cleanWord = (word) => {
        return word.toLowerCase().trim();
    };

    const getRandomWord = () => {
        const max = filteredData?.length;
        const min = 3;

        if (!filteredData || max < min) {
            return false;
        }

        const randomNumber = Math.floor(Math.random() * max);

        const nextRandomWord = filteredData[randomNumber];

        if (!randomWord) {
            setIsPause(false);
            return setRandomWord(nextRandomWord);
        }

        if (nextRandomWord.name === randomWord.name) {
            return getRandomWord();
        }

        setRandomWord(nextRandomWord);
        setIsPause(false);
        inputRef.current?.focus();
    };

    const newRandomWord = () => {
        if (isPause) {
            return;
        }

        getRandomWord();
    };

    const submit = (event) => {
        event.preventDefault();

        if (isPause) {
            return;
        }

        const cleanTypedWord = cleanWord(typedWord);

        const splitString = (word = "") => {
            if (!word) {
                return [];
            }

            const cleanWord = word
                .replaceAll("/", "@")
                .replaceAll(";", "@")
                .replaceAll("'", "")
                .replaceAll(",", "@");

            return cleanWord.split("@").map((name) => {
                if (name.includes("(")) {
                    const optional = name.slice(name.lastIndexOf("(", name.lastIndexOf(")")));
                    return name = name.replace(optional, "").trim();
                }

                return name = name.trim();
            });
        };

        const ok = () => {
            if (!randomWord.learned) {
                toggleIsLearned(randomWord.id);
            }

            setIsPause(true);
            setStatus("ok");
            speak(randomWordName);
            setTypedWord(randomWordCurrentName);

            const timeout = setTimeout(() => {
                setStatus("");
                setTypedWord("");
                getRandomWord();
                clearTimeout(timeout);
            }, 2000);
        };

        if (backward) {
            const translate = cleanWord(randomWord.translate);
            const isArrayIncludeTypedWord = splitString(translate).includes(cleanTypedWord);

            if (isArrayIncludeTypedWord) {
                return ok();
            }
        } else if (cleanTypedWord === cleanWord(randomWordCurrentName)) {
            return ok();
        }

        setStatus("mistake");
    };

    const dontKnow = () => {
        if (isPause) {
            return;
        }

        if (randomWord.learned) {
            toggleIsLearned(randomWord.id);
        }

        setIsPause(true);
        setStatus("warn");
        setTypedWord(randomWordCurrentName);
        speak(randomWordName);

        const ok = () => {

            setTypedWord("");
            getRandomWord();
        };

        setTimeout(ok, 3000);
    };

    const start = () => {
        toggleStartGame();
        newRandomWord();
    };

    const word = backward ? randomWord.name : randomWord.translate;

    if (!startGame) {
        return (
            <div className="game">
                <h1>Learn words with game!</h1>
                <button className="button" onClick={start}>Start</button>
            </div>
        );
    }

    if (isLoading) {
        return (<Loading />);
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
                {isEnoughWords
                    ? <>
                        {isOffline && <h2>Offline</h2>}
                        <h2 className="game__title">{word}</h2>
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
                            {backward && <SpeakButton speak={() => speak(word)} />}
                            <button onClick={newRandomWord} className="button">Skip</button>
                            <button onClick={dontKnow} className="button button--idk">I don't know</button>
                        </div>
                        <button onClick={submit} className="button button--primary">Submit</button>
                    </>
                    : <h3>Not enough words</h3>
                }
            </div>
        </>
    );
};

export default Game;