
import Filter from "../../components/Filter";
import Loading from "../../components/Loading";
import SpeakButton from "../../components/SpeakButton";
import useGame from "./useGame";

const Game = () => {
    const {
        start,
        submit,
        setTypedWord,
        newRandomWord,
        dontKnow,
        speak,
        backward,
        toggleHandler,
        learned,
        unlearned,
        inputRef,
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
                            <button onClick={dontKnow} className="button">I don't know</button>
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