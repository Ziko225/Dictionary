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
        const utterance = new SpeechSynthesisUtterance(word);
        window.speechSynthesis.speak(utterance);
    };

    if (words) {
        return (
            <div className="container">
                <button className="container__learnedButton">Show learned worlds</button>
                {words[0] ? words.map((word) =>
                    <div className={`words ${isBarOpen ? "blur" : ""}`} key={word.id}>
                        <button onClick={() => speak(word.name)}>?</button>
                        <span className='words__word'>{word.name}:</span>
                        <span className='words__translate'>{word.translate}</span>
                        <button className='words__button' type='submit'>Learned?</button>
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