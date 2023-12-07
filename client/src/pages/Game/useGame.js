import { useContext, useEffect, useRef, useState } from "react";
import { useToggle } from "../../hooks/useToggle";
import useDictionary from "../../hooks/useDictionary";
import { FilterContext } from "../../context/filterContext";

const useGame = () => {
    const { data, toggleIsLearned, speak, isOffline, isLoading } = useDictionary(true);

    const { getFilteredData, learned, unlearned, backward, toggleHandler } = useContext(FilterContext);

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

    const newRandomWord = () => {
        const getRandomWord = () => {

            const max = filteredData?.length;
            const min = 3;

            if (!filteredData || max < min) {
                return false;
            }

            const randomNumber = Math.floor(Math.random() * max);

            return filteredData[randomNumber];
        };

        const nextRandomWord = getRandomWord();

        if (!randomWord) {
            return setRandomWord(nextRandomWord);
        }

        if (nextRandomWord.name === randomWord.name) {
            return newRandomWord();
        }

        setRandomWord(nextRandomWord);
        inputRef.current?.focus();
    };

    const submit = (e) => {
        e.preventDefault();

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

            setStatus("ok");
            speak(randomWordName);
            setTypedWord(randomWordCurrentName);

            const timeout = setTimeout(() => {
                setStatus("");
                setTypedWord("");
                newRandomWord();
                clearTimeout(timeout);
            }, 1000);
        };

        if (backward) {
            const translate = cleanWord(randomWord.translate);
            const isArrayIncludeTypedWord = splitString(translate).includes(cleanTypedWord);

            if (isArrayIncludeTypedWord) {
                return ok();
            }
        }

        if (cleanTypedWord === cleanWord(randomWordCurrentName)) {
            return ok();
        }

        setStatus("mistake");
    };

    const dontKnow = () => {
        if (randomWord.learned) {
            toggleIsLearned(randomWord.id);
        }

        setTypedWord(randomWordCurrentName);
        speak(randomWordName);

        const ok = () => {
            setStatus("");
            setTypedWord("");
            newRandomWord();
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