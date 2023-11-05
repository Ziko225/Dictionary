import { useRef, useState } from "react";

const useVerbs = (addVerb) => {
    const [msg, setMsg] = useState("");
    const nameRef = useRef(null);
    const v2Ref = useRef(null);
    const v3Ref = useRef(null);
    const translateRef = useRef(null);

    const addNewVerb = async () => {
        const name = nameRef.current.value;
        const v2 = v2Ref.current.value;
        const v3 = v3Ref.current.value;
        const translate = translateRef.current.value;

        setMsg("");

        const data = {
            name,
            v2,
            v3,
            translate,
        };

        const response = await addVerb(data);
        if (response !== true) {
            return setMsg(response);
        }

        nameRef.current.value = "";
        v2Ref.current.value = "";
        v3Ref.current.value = "";
        translateRef.current.value = "";
    };

    return { msg, nameRef, v2Ref, v3Ref, translateRef, addNewVerb };
};

export default useVerbs;