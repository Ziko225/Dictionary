import { useToggle } from "hooks/useToggle";
import useDictionary from 'hooks/useDictionary';
import useFilter from 'hooks/useFilter';

import SpeakButton from "components/SpeakButton";
import Loading from 'components/Loading';
import Filter from 'components/Filter';
import Search from 'components/Search';
import ModalsAddWord from "./components/ModalsAddWord";

import TrashIcon from 'components/icons/trash.svg?react';

import "./styles.scss";

const Words = () => {
    const [isBarOpen, toggleIsBarOpen] = useToggle(false);

    const { data, speak, toggleIsLearned, remove, add: addWord, isLoading } = useDictionary('words');

    const { getFilteredData, learned, unlearned, toggleHandler } = useFilter();

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
                            <SpeakButton className="words__speak" onClick={() => speak(word.name)} />
                            <span className='words__word'>{word.name}:</span>
                            <span className='words__translate'>{word.translate}</span>

                            {word.learned &&
                                <button onClick={() => remove(word.id)} className='words__removeButton'>
                                    <TrashIcon />
                                </button>
                            }
                            <button
                                aria-label='Toggle is word learned'
                                onClick={() => toggleIsLearned(word.id)}
                                className='words__button'
                                type='submit'>
                                {word.learned ? "Learned" : "✓"}
                            </button>
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