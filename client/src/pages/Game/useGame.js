import { useEffect, useState } from "react";
import { useToggle } from "../../hooks/useToggle";
import useDictionary from "../../hooks/useDictionary";

const useGame = () => {
    const { data, toggleIsLearned, speak, isOffline } = useDictionary(true);

    const [randomWord, setRandomWord] = useState();
    const randomWordName = randomWord?.name;

    const [typedWord, setTypedWord] = useState("");

    const [status, setStatus] = useState("");

    const [startGame, toggleStartGame] = useToggle(false);

    useEffect(() => {
        setStatus("");
    }, [typedWord]);


    const clearWord = (word) => {
        return word.toLowerCase().trim();
    };

    const newRandomWord = () => {
        const getRandomWord = () => {
            const max = data?.length;
            const min = 3;

            if (!data || max < min) {
                return false;
            }

            const randomNumber = Math.floor(Math.random() * max);

            return data[randomNumber];
        };

        setRandomWord(getRandomWord());
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
        status,
        startGame,
        randomWord,
        typedWord,
        isOffline
    };
};

export default useGame;