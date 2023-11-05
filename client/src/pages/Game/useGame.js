import { useEffect, useState } from "react";
import { useToggle } from "../../hooks/useToggle";
import useDictionary from "../../hooks/useDictionary";
import useFilter from "../../hooks/useFilter";

const useGame = () => {
    const { data, toggleIsLearned, speak, isOffline } = useDictionary(true);

    const { filteredData, learned, unlearned, toggleHandler } = useFilter(data);

    const [randomWord, setRandomWord] = useState();
    const randomWordName = randomWord?.name;

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
    }, [typedWord]);

    useEffect(() => {
        newRandomWord();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filteredData]);

    const clearWord = (word) => {
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
    };

    const submit = (e) => {
        e.preventDefault();

        if (clearWord(typedWord) !== clearWord(randomWordName)) {
            setStatus("mistake");
            return;
        }

        const ok = () => {
            if (!randomWord.learned) {
                toggleIsLearned(randomWord.id);
            }

            setStatus("");
            setTypedWord("");
            newRandomWord();
        };

        setTimeout(ok, 1000);
        setStatus("ok");
        speak(randomWordName);
    };

    const dontKnow = () => {
        if (randomWord.learned) {
            toggleIsLearned(randomWord.id);
        }

        setTypedWord(randomWordName);
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
        toggleHandler,
        learned,
        unlearned,
        status,
        startGame,
        randomWord,
        typedWord,
        isOffline,
        isEnoughWords
    };
};

export default useGame;