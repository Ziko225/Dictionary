import { useContext, useEffect, useRef, useState } from "react";
import { useToggle } from "../../hooks/useToggle";
import useDictionary from "../../hooks/useDictionary";
import { FilterContext } from "../../context/filterContext";

const useGame = () => {
    const { data, toggleIsLearned, speak, isOffline, isLoading } = useDictionary(true);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [randomWord]);

    useEffect(() => {
        newRandomWord();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    return {
        setTypedWord,
        newRandomWord,
        start,
        submit,
        dontKnow,
        speak,
        backward,
        toggleHandler,
        learned,
        unlearned,
        inputRef,
        status,
        startGame,
        randomWord,
        typedWord,
        isOffline,
        isEnoughWords,
        isLoading
    };
};

export default useGame;