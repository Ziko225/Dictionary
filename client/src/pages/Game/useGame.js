import { useEffect, useState } from "react";
import { useToggle } from "../../hooks/useToggle";
import useDictionary from "../../hooks/useDictionary";

const useGame = () => {
    const { data, toggleIsLearned, speak, isOffline } = useDictionary(true);

    const [randomWord, setRandomWord] = useState();
    const randomWordName = randomWord?.name;

    const [typedWord, setTypedWord] = useState("");

    useEffect(() => {
        setStatus("");
    }, [typedWord]);

    const [status, setStatus] = useState("");

    const [startGame, toggleStartGame] = useToggle(false);

    const clearWord = (word) => {
        return word.toLowerCase().trim();
    };

    const newRandomWord = () => {
        const getRandomWord = () => {
            const learnedWords = data?.filter((e) => e.learned);

            const max = learnedWords?.length;

            const min = 3;

            if (!learnedWords || max <= min) {
                return false;
            }

            const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

            return learnedWords[randomNumber];
        };

        setRandomWord(getRandomWord());
    };

    const submit = (e) => {
        e.preventDefault();

        if (clearWord(typedWord) !== clearWord(randomWordName)) {
            setStatus("mistake");
            return false;
        }

        const ok = () => {
            setStatus("");
            setTypedWord("");
            newRandomWord();
        };

        setTimeout(ok, 1000);
        setStatus("ok");
        speak(randomWordName);
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
        status,
        startGame,
        randomWord,
        typedWord,
        isOffline
    };
};

export default useGame;