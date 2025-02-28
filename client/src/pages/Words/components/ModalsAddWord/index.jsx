import { useRef, useState } from 'react';

const ModalsAddWord = ({ addWord }) => {
    const [name, setName] = useState("");
    const [translate, setTranslate] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const ref = useRef();

    const data = {
        name,
        translate
    };

    const inputHandler = (event) => {
        const target = event.target;

        if (target.name === "translate") {
            return setTranslate(target.value);
        }

        return setName(target.value);
    };

    const addNewWorld = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        const response = await addWord(data);

        if (response !== true) {
            return setErrorMessage(response);
        }

        window.scrollTo(0, document.body.scrollHeight);

        setName("");
        setTranslate("");
        ref.current?.focus();
    };

    return (
        <form onSubmit={addNewWorld} className='addWord'>
            <span className='error'>{errorMessage}</span>
            <input
                autoFocus
                ref={ref}
                value={name}
                onChange={inputHandler}
                required
                name="name"
                className='addWord__input'
                placeholder='Word'
            />
            <input
                value={translate}
                onChange={inputHandler}
                required
                className='addWord__input'
                name="translate"
                placeholder='Translate'
            />
            <button className='addWord__button'>Add</button>
        </form>
    );
};

export default ModalsAddWord;