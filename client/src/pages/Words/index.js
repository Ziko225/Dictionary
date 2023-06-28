import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import ModalsAddWord from "./ModalsAddWord";
import useDictionary from "./useDictionary";
import { ReactComponent as VolumeIco } from "./volume.svg";
import "./styles.css";

const Words = () => {
    const [isBarOpen, setIsBarOpen] = useState(false);
    const [showLearned, setShowLearned] = useState(false);
    const { words, getWords, addWord, removeWord, toggleIsLearned, speak } = useDictionary();
    const { isAuth, setIsUnAuth } = useContext(AuthContext);

    useEffect(() => {
        getWords().then((e) => !e && setIsUnAuth());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuth, showLearned]);



    if (!words) {
        return (
            <div className="container">
                <h2>Loading...</h2>
            </div>
        );
    }

    return (
        <div className="container">
            <button onClick={() => setShowLearned(!showLearned)} className="container__learnedButton">
                {showLearned ? "Show UNlearned worlds" : "Show learned worlds"}
            </button>
            {words[0]
                ? words.filter((e) => e.learned === showLearned).map((word) =>
                    <div className={`words ${isBarOpen ? "blur" : ""}`} key={word.id}>
                        <button className="words__speakButton" onClick={() => speak(word.name)}><VolumeIco /></button>
                        <span className='words__word'>{word.name}:</span>
                        <span className='words__translate'>{word.translate}</span>
                        <button onClick={() => toggleIsLearned(word.id)} className='words__button' type='submit'>{word.learned ? "Unlearned?" : "Learned?"}</button>
                        {word.learned && <button onClick={() => removeWord(word.id)} className='words__removeButton'>X</button>}
                    </div>)
                : <h2>Not found</h2>}
            {isBarOpen && <ModalsAddWord addWord={addWord} />}
            <button onClick={() => setIsBarOpen(!isBarOpen)} className='addButton'>+</button>
        </div>
    );
};

export default Words;