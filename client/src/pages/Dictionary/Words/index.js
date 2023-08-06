import { useState } from "react";
import ModalsAddWord from "./ModalsAddWord";
import SpeakButton from "../../../components/SpeakButton";
import "./styles.css";

const Words = ({ isOffline, words, speak, toggleIsLearned, remove, addWord }) => {
    const [isBarOpen, setIsBarOpen] = useState(false);

    return (
        <div className="container">
            {words[0]
                ? words.map((word) =>
                    <div className={`words ${isBarOpen ? "blur" : ""}`} key={word.id}>
                        <SpeakButton speak={speak} data={word.name} />
                        <span className='words__word'>{word.name}:</span>
                        <span className='words__translate'>{word.translate}</span>
                        {!isOffline &&
                            <button
                                onClick={() => toggleIsLearned(word.id)}
                                className='words__button'
                                type='submit'>
                                {word.learned ? "Unlearned" : "Learned"}
                            </button>
                        }
                        {word.learned && !isOffline
                            ? <button onClick={() => remove(word.id)} className='words__removeButton'>X</button>
                            : null
                        }
                    </div>)
                : <h2>Not found</h2>}
            {isBarOpen && <ModalsAddWord addWord={addWord} />}
            {!isOffline && <button onClick={() => setIsBarOpen(!isBarOpen)} className='addButton'>+</button>}
        </div>
    );
};

export default Words;