import { useContext, useEffect, useState } from "react";
import ModalsAddWord from "./ModalsAddWord";
import useDictionary from "./useDictionary";
import "./styles.css";
import { AuthContext } from "../../context/authContext";

const Words = () => {
    const [isBarOpen, setIsBarOpen] = useState(false);
    const [showLearned, setShowLearned] = useState(false);
    const { words, getWords, addWord, removeWord, toggleIsLearned } = useDictionary();
    const { isAuth, setIsUnAuth } = useContext(AuthContext);

    useEffect(() => {
        getWords().then((e) => !e && setIsUnAuth());
    }, [isAuth, showLearned]);

    const speak = (word) => {
        let utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = "en-US";
        window.speechSynthesis.speak(utterance);
    };

    if (words) {
        return (
            <div className="container">
                <button onClick={() => setShowLearned(!showLearned)} className="container__learnedButton">
                    {showLearned ? "Show UNlearned worlds" : "Show learned worlds"}
                </button>
                {words[0] ? words.filter((e) => e.learned === showLearned).map((word) =>
                    <div className={`words ${isBarOpen ? "blur" : ""}`} key={word.id}>
                        <button className="words__speakButton" onClick={() => speak(word.name)}>?</button>
                        <span className='words__word'>{word.name}:</span>
                        <span className='words__translate'>{word.translate}</span>
                        <button onClick={() => toggleIsLearned(word.id)} className='words__button' type='submit'>{word.learned ? "Unlearned?" : "Learned?"}</button>
                        {word.learned && <button onClick={() => removeWord(word.id)} className='words__removeButton'>X</button>}
                    </div>
                ) : <h2>Not found</h2>}
                {isBarOpen && <ModalsAddWord addWord={addWord} />}
                <button onClick={() => setIsBarOpen(!isBarOpen)} className='addButton'>+</button>
            </div>
        );
    } else {
        return (
            <div className="container">
                <h2>Loading...</h2>
            </div>
        );
    }
};

export default Words;