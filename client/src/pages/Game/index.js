
import Filter from "../../components/Filter";
import Loading from "../../components/Loading";
import useGame from "./useGame";

const Game = () => {
    const {
        start,
        submit,
        setTypedWord,
        newRandomWord,
        dontKnow,
        backward,
        toggleHandler,
        learned,
        unlearned,
        typedWord,
        randomWord,
        status,
        startGame,
        isOffline,
        isEnoughWords,
        isLoading
    } = useGame();

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
                        {isOffline && <h1>Offline</h1>}
                        <h2 className="game__title">{word}</h2>
                        <form onSubmit={(e) => submit(e)} className="form">
                            <input
                                required
                                onChange={(e) => setTypedWord(e.target.value)}
                                value={typedWord}
                                placeholder="Translate"
                                className={`input ${status}`}
                            />
                            <button className="button">Submit</button>
                        </form>
                        <div className="buttonsBlock">
                            <button onClick={newRandomWord} className="button">Skip</button>
                            <button onClick={dontKnow} className="button">I don't know</button>
                        </div>
                    </>
                    : <h3>Not enough words</h3>
                }
            </div>
        </>
    );
};

export default Game;