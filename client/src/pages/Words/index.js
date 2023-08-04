import { ReactComponent as VolumeIco } from "./volume.svg";
import { AuthContext } from "../../context/authContext";
import { useContext, useState } from "react";
import ModalsAddWord from "./ModalsAddWord";
import useDictionary from "./useDictionary";
import "./styles.css";

const Words = () => {
    const { isOffline } = useContext(AuthContext);
    const [isBarOpen, setIsBarOpen] = useState(false);
    const [showLearned, setShowLearned] = useState(false);
    const { words, addWord, removeWord, toggleIsLearned, speak } = useDictionary(isOffline);

    if (!words) {
        return (
            <div className="container">
                <h2>Loading...</h2>
            </div>
        );
    }

    return (
        <div className="container">
            {isOffline && <h2>Offline</h2>}
            <button onClick={() => setShowLearned(!showLearned)} className="container__learnedButton">
                {showLearned ? "Show UNlearned worlds" : "Show learned worlds"}
            </button>
            {words[0]
                ? words.filter((e) => e.learned === showLearned).map((word) =>
                    <div className={`words ${isBarOpen ? "blur" : ""}`} key={word.id}>
                        <button className="words__speakButton" onClick={() => speak(word.name)}><VolumeIco /></button>
                        <span className='words__word'>{word.name}:</span>
                        <span className='words__translate'>{word.translate}</span>
                        {!isOffline && <button onClick={() => toggleIsLearned(word.id)} className='words__button' type='submit'>{word.learned ? "Unlearned?" : "Learned?"}</button>}
                        {word.learned && !isOffline ? <button onClick={() => removeWord(word.id)} className='words__removeButton'>X</button> : null}
                    </div>)
                : <h2>Not found</h2>}
            {isBarOpen && <ModalsAddWord addWord={addWord} />}
            {!isOffline && <button onClick={() => setIsBarOpen(!isBarOpen)} className='addButton'>+</button>}
        </div>
    );
};

export default Words;