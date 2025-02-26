import { useRef, useState } from "react";

const useAddWord = (addWord) => {
    const [name, setName] = useState("");
    const [translate, setTranslate] = useState("");
    const [msg, setMsg] = useState("");

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
        setMsg("");

        const response = await addWord(data);

        if (response !== true) {
            return setMsg(response);
        }

        window.scrollTo(0, document.body.scrollHeight);

        setName("");
        setTranslate("");
        ref.current?.focus();
    };

    return { name, translate, ref, msg, addNewWorld, inputHandler };
};

export default useAddWord;