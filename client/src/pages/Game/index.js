
import useGame from "./useGame";
import "./styles.css";

const Game = () => {
    const {
        start,
        submit,
        setTypedWord,
        newRandomWord,
        dontKnow,
        typedWord,
        randomWord,
        status,
        startGame,
        isOffline
    } = useGame();

    if (!startGame) {
        return (
            <div className="game">
                <h1>Learn words with game!</h1>
                <button className="button" onClick={start}>Start</button>
            </div>
        );
    }

    return (
        randomWord
            ? <div className="game">
                {isOffline && <h1>Offline</h1>}
                <h2 className="game__title">{randomWord.translate}</h2>
                <form onSubmit={(e) => submit(e)} className="form">
                    <input required onChange={(e) => setTypedWord(e.target.value)} value={typedWord} placeholder="Translate" className={`input ${status}`} />
                    <button className="button">Submit</button>
                </form>
                <div className="buttonsBlock">
                    <button onClick={newRandomWord} className="button">Skip</button>
                    <button onClick={dontKnow} className="button">I don't know</button>
                </div>
            </div>
            : <div className="game">
                <h3>Not enough words</h3>
            </div>
    );
};

export default Game;