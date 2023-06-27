import { useState } from "react";

const ModalsAddWord = ({ addWord }) => {
    const [name, setName] = useState("");
    const [translate, setTranslate] = useState("");

    const addNewWorld = async (e) => {
        e.preventDefault();

        const isAdded = addWord(name, translate);

        if (!isAdded) {
            return;
        }

        setName("");
        setTranslate("");
    };

    return (
        <form onSubmit={(e) => addNewWorld(e)} className='addWord'>
            <input value={name} onChange={(e) => setName(e.currentTarget.value)} required className='addWord__input' placeholder='Word'></input>
            <input value={translate} onChange={(e) => setTranslate(e.currentTarget.value)} required className='addWord__input' placeholder='Translate'></input>
            <button className='addWord__button'>Add</button>
        </form>
    );
};

export default ModalsAddWord;