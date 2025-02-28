import { useContext, useState } from 'react';

import useDictionary from '../../hooks/useDictionary';

import SpeakButton from "../../components/SpeakButton";
import Loading from '../../components/Loading';
import Filter from '../../components/Filter';
import Search from '../../components/Search';

import { FilterContext } from '../../context/filterContext';

import "./styles.scss";

const Verbs = () => {
    const { data, speak, toggleIsLearned, remove, add: addVerb, isLoading } = useDictionary('verbs');


    const { getFilteredData, learned, unlearned, toggleHandler } = useContext(FilterContext);

    const [msg, setMsg] = useState("");

    const initialVerbData = {
        name: '',
        v2: '',
        v3: '',
        translate: '',
    };

    const [newVerb, setNewVerb] = useState(initialVerbData);

    const filteredData = getFilteredData(data);

    const addNewVerb = async () => {
        setMsg("");

        const response = await addVerb(newVerb);

        if (typeof response === 'string') {
            return setMsg(response);
        }

        if (!response) {
            return;
        }

        setNewVerb(initialVerbData);
    };

    const submitInput = (key, value) => {
        setNewVerb({
            ...newVerb,
            [key]: value
        });
    };

    if (isLoading) {
        return (
            <div className='container'>
                <Loading />
            </div>
        );
    }

    return (
        <>
            <Search />
            <Filter
                learned={learned}
                unlearned={unlearned}
                toggleHandler={toggleHandler}
            />
            <div className="verbs">
                <ul className="verbs__ul">
                    <li className="ul__header">
                        <h4>Base form</h4>
                        <h4>Past Simple (V2)</h4>
                        <h4>Past Participle (V3)</h4>
                    </li>
                    {filteredData[0] ?
                        filteredData?.map((verb) =>
                            <li key={verb.id} className="ul__li">
                                <div className="li__verb">
                                    <SpeakButton className="li__speak" speak={speak} data={`${verb.name}, ${verb.v2}, ${verb.v3}`} />
                                    <span className="verb__text">{verb.name}</span>
                                    <span className="verb__text blurred">{verb.v2}</span>
                                    <span className="verb__text blurred">{verb.v3}</span>
                                </div>
                                <div className="li__controller">
                                    <div className="controller__translate">
                                        <span >Translation:</span>
                                        <span className="blurred translate__text">{verb.translate}</span>
                                    </div>

                                    <button className="controller__button" onClick={() => toggleIsLearned(verb.id)}>
                                        {verb.learned ? "Learned" : "✓"}
                                    </button>

                                    {verb.learned &&
                                        <button
                                            className="controller__button controller__button--remove"
                                            onClick={() => remove(verb.id)} >
                                            X
                                        </button>
                                    }
                                </div>
                            </li>
                        )
                        : <h2>Not found</h2>
                    }
                </ul>
                {!data[0] && <h2 className="title">Not found</h2>}
                {msg && <span className="error">{msg}</span>}
                <div className="addingBlock">
                    <input
                        value={newVerb.name}
                        onChange={(e) => submitInput('name', e.currentTarget.value)}
                        className="addingBlock__input"
                        placeholder="Base form"
                    />
                    <input
                        value={newVerb.v2}
                        onChange={(e) => submitInput('v2', e.currentTarget.value)}
                        className="addingBlock__input"
                        placeholder="v2"
                    />
                    <input
                        value={newVerb.v3}
                        onChange={(e) => submitInput('v3', e.currentTarget.value)}
                        className="addingBlock__input"
                        placeholder="v3"
                    />
                    <input
                        value={newVerb.translate}
                        onChange={(e) => submitInput('translate', e.currentTarget.value)}
                        className="addingBlock__input"
                        placeholder="Translation"
                    />
                    <button onClick={addNewVerb} className="addingBlock__button">Add</button>
                </div>
            </div >
        </>
    );
};

export default Verbs;