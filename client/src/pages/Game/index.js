import { useToggle } from "../../hooks/useToggle";
import { useEffect, useState } from "react";
import useDictionary from "../../hooks/useDictionary";
import "./styles.css";

const Game = () => {
    const { data, toggleIsLearned, speak, isOffline } = useDictionary(true);

    const [randomWord, setRandomWord] = useState();

    const [typedWord, setTypedWord] = useState("");

    const [status, setStatus] = useState("");

    const [startGame, toggleStartGame] = useToggle(false);

    useEffect(() => {
        setStatus("");
    }, [typedWord]);

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

    const start = () => {
        toggleStartGame();
        newRandomWord();
    };

    const submit = (e) => {
        e.preventDefault();

        if (typedWord.toLowerCase() !== randomWord?.name) {
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
    };

    if (!startGame) {
        return (
            <div className="game">
                <h1>Learn words with game!</h1>
                <button className="button" onClick={start}>Start</button>
            </div>
        );
    }

    return (
        <>
            <div className="search">
                {isOffline && <h1>Offline</h1>}
            </div>
            <div className="game">
                <h2 className="game__title">{randomWord.name}</h2>
                <form onSubmit={(e) => submit(e)} className="form">
                    <input onChange={(e) => setTypedWord(e.target.value)} value={typedWord} placeholder="Translate" className={`input ${status}`} />
                    <button className="button">Submit</button>
                </form>
                <div className="buttonsBlock">
                    <button onClick={newRandomWord} className="button">Skip</button>
                    <button className="button">I don't know</button>
                </div>
            </div>
        </>
    );
};

export default Game;