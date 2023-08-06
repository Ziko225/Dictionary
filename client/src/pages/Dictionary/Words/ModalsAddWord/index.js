import { useState } from "react";

const ModalsAddWord = ({ addWord }) => {
    const [name, setName] = useState("");
    const [translate, setTranslate] = useState("");
    const [msg, setMsg] = useState("");

    const data = {
        name,
        translate
    };

    const addNewWorld = async (e) => {
        e.preventDefault();
        setMsg("");

        const isAdded = await addWord(data);

        if (isAdded !== true) {
            setMsg(isAdded);
            return;
        }

        setName("");
        setTranslate("");
    };

    return (
        <form onSubmit={(e) => addNewWorld(e)} className='addWord'>
            <span className='error'>{msg}</span>
            <input value={name} onChange={(e) => setName(e.currentTarget.value)} required className='addWord__input' placeholder='Word'></input>
            <input value={translate} onChange={(e) => setTranslate(e.currentTarget.value)} required className='addWord__input' placeholder='Translate'></input>
            <button className='addWord__button'>Add</button>
        </form>
    );
};

export default ModalsAddWord;