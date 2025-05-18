import { useContext } from 'react';

import { useToggle } from "../../hooks/useToggle";
import useDictionary from '../../hooks/useDictionary';

import { FilterContext } from '../../context/filterContext';

import SpeakButton from "../../components/SpeakButton";
import Loading from '../../components/Loading';
import Filter from '../../components/Filter';
import Search from '../../components/Search';
import ModalsAddWord from "./components/ModalsAddWord";

import "./styles.scss";

const Words = () => {
    const [isBarOpen, toggleIsBarOpen] = useToggle(false);

    const { data, speak, toggleIsLearned, remove, add: addWord, isLoading } = useDictionary('words');

    const { getFilteredData, learned, unlearned, toggleHandler } = useContext(FilterContext);

    const filteredData = getFilteredData(data);

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
            <div className="container">
                {filteredData[0]
                    ? filteredData.map((word) =>
                        <div className="words" key={word.id}>
                            <SpeakButton className="words__speak" speak={speak} data={word.name} />
                            <span className='words__word'>{word.name}:</span>
                            <span className='words__translate'>{word.translate}</span>

                            <button
                                onClick={() => toggleIsLearned(word.id)}
                                className='words__button'
                                type='submit'>
                                {word.learned ? "Learned" : "✓"}
                            </button>
                            {word.learned &&
                                <button onClick={() => remove(word.id)} className='words__removeButton'>
                                    X
                                </button>
                            }
                        </div>
                    )
                    : <h2>Not found</h2>
                }
                {isBarOpen && <ModalsAddWord addWord={addWord} speak={speak} />}
                <button onClick={toggleIsBarOpen} className='addButton'>+</button>
            </div>
        </>
    );
};

export default Words;