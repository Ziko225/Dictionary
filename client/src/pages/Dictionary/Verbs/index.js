import SpeakButton from "../../../components/SpeakButton";
import useVerbs from "./useVerbs";
import "styles.css"

const Verbs = ({ isOffline, verbs, speak, toggleIsLearned, remove, addVerb }) => {

    const { msg, nameRef, v2Ref, v3Ref, translateRef, addNewVerb } = useVerbs(addVerb);

    return (
        <div className="verbs">
            <ul className="verbs__ul">
                <li className="ul__header">
                    <h4>Base form</h4>
                    <h4>Past Simple (V2)</h4>
                    <h4>Past Participle (V3)</h4>
                </li>
                {
                    verbs?.map((verb) =>
                        <li key={verb.id} className="ul__li">
                            <div className="li__verb">
                                <span className="verb__text">{verb.name}</span>
                                <span className="verb__text blured">{verb.v2}</span>
                                <span className="verb__text blured">{verb.v3}</span>
                            </div>
                            <div className="li__controller">
                                <SpeakButton speak={speak} data={`${verb.name}, ${verb.v2}, ${verb.v3}`} />
                                <div className="controller__translate">
                                    <span >Translation:</span>
                                    <span className="blured">{verb.translate}</span>
                                </div>
                                {!isOffline &&
                                    <button className="controller__button" onClick={() => toggleIsLearned(verb.id)}>
                                        {verb.learned ? "Unlearned" : "Learned"}
                                    </button>
                                }
                                {verb.learned && !isOffline
                                    ? <button className="controller__button controller__button--remove" onClick={() => remove(verb.id)}>
                                        X
                                    </button>
                                    : null
                                }
                            </div>
                        </li>
                    )
                }
            </ul>
            {!verbs[0] && <h2 className="title">Not found</h2>}
            {msg && <span className="error">{msg}</span>}
            {!isOffline &&
                <div className="addingBlock">
                    <input ref={nameRef} className="addingBlock__input" placeholder="Base form" />
                    <input ref={v2Ref} className="addingBlock__input" placeholder="v2" />
                    <input ref={v3Ref} className="addingBlock__input" placeholder="v3" />
                    <input ref={translateRef} className="addingBlock__input" placeholder="Translation" />
                    <button onClick={addNewVerb} className="addingBlock__button">Add</button>
                </div>
            }
        </div >
    );
};

export default Verbs;