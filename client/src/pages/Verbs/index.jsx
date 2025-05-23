import { useState } from 'react';

import useDictionary from 'hooks/useDictionary';
import useFilter from 'hooks/useFilter';

import SpeakButton from "components/SpeakButton";
import Loading from 'components/Loading';
import Filter from 'components/Filter';
import Search from 'components/Search';
import Input from 'components/Input';

import TrashIcon from 'components/icons/trash.svg?react';

import "./styles.scss";

const Verbs = () => {
    const { data, speak, toggleIsLearned, remove, add: addVerb, isLoading } = useDictionary('verbs');

    const { getFilteredData, learned, unlearned, toggleHandler } = useFilter();

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
            <Filter
                learned={learned}
                unlearned={unlearned}
                toggleHandler={toggleHandler}
            />
            <Search />
            <div className="verbs">
                {msg && <span className="error">{msg}</span>}
                <div className="addingBlock">
                    <Input
                        value={newVerb.name}
                        onChange={(e) => submitInput('name', e.currentTarget.value)}
                        className="addingBlock__input"
                        placeholder="Base form"
                    />
                    <Input
                        value={newVerb.v2}
                        onChange={(e) => submitInput('v2', e.currentTarget.value)}
                        className="addingBlock__input"
                        placeholder="v2"
                    />
                    <Input
                        value={newVerb.v3}
                        onChange={(e) => submitInput('v3', e.currentTarget.value)}
                        className="addingBlock__input"
                        placeholder="v3"
                    />
                    <Input
                        value={newVerb.translate}
                        onChange={(e) => submitInput('translate', e.currentTarget.value)}
                        className="addingBlock__input"
                        placeholder="Translation"
                    />
                    <button onClick={addNewVerb} className="addingBlock__button">Add</button>
                </div>
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
                                    <SpeakButton className="li__speak" onClick={() => speak(`${verb.name}, ${verb.v2}, ${verb.v3}`)} />
                                    <span className="verb__text">{verb.name}</span>
                                    <span className="verb__text blurred">{verb.v2}</span>
                                    <span className="verb__text blurred">{verb.v3}</span>
                                </div>
                                <div className="li__controller">
                                    <div className="controller__translate">
                                        <span >Translation:</span>
                                        <span className="blurred translate__text">{verb.translate}</span>
                                    </div>

                                    <button className={`controller__button${verb.learned ? ' controller__button--active' : ''}`} onClick={() => toggleIsLearned(verb.id)}>
                                        {verb.learned ? "Learned" : "✓"}
                                    </button>

                                    {verb.learned &&
                                        <button
                                            className="controller__button controller__button--remove"
                                            onClick={() => remove(verb.id)} >
                                            <TrashIcon />
                                        </button>
                                    }
                                </div>
                            </li>
                        )
                        : <h2>Not found</h2>
                    }
                </ul>
                {!data[0] && <h2 className="title">Not found</h2>}
            </div >
        </>
    );
};

export default Verbs;