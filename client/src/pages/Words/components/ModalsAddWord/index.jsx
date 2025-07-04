import { useRef, useState } from 'react';
import SpeakButton from 'components/SpeakButton';

import "./styles.scss";

const ModalsAddWord = ({ addWord, speak }) => {
    const [typedWord, setTypedWord] = useState("");
    const [translate, setTranslate] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const ref = useRef();

    const data = {
        name: typedWord,
        translate
    };

    const inputHandler = (event) => {
        const target = event.target;

        if (target.name === "translate") {
            return setTranslate(target.value);
        }

        return setTypedWord(target.value);
    };

    const addNewWorld = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        const response = await addWord(data);

        if (response !== true) {
            return setErrorMessage(response);
        }

        window.scrollTo(0, document.body.scrollHeight);

        setTypedWord("");
        setTranslate("");
        ref.current?.focus();
    };

    return (
        <form onSubmit={addNewWorld} className='addWord'>
            <span className='error'>{errorMessage}</span>
            <div className='addWord__inputBox'>
                <SpeakButton className="inputBox__speak" type="button" onClick={() => speak(typedWord)} />
                <input
                    autoFocus
                    ref={ref}
                    value={typedWord}
                    onChange={inputHandler}
                    required
                    name="name"
                    className='addWord__input'
                    placeholder='Word'
                />
            </div>
            <input
                value={translate}
                onChange={inputHandler}
                required
                className='addWord__input'
                name="translate"
                placeholder='Translate'
            />
            <button className='addWord__button'>Add</button>
            <p className='addWord__tips'>
                Tip: Add more translated words for the best experience - word1,&nbsp;word2
            </p>
        </form>
    );
};

export default ModalsAddWord;