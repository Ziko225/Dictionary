import useGame from 'hooks/useGame';

import Input from 'components/Input';
import Button from 'components/Button';

import './styles.scss';

const TranslateForward = ({ gameLogic }) => {
    const { wordsArray, nextExercise, setIsWordCorrect } = gameLogic;

    const {
        answerStatus,
        sortedWords,
        step,
        checkWord,
        typedWord,
        setTypedWord
    } = useGame({ wordsArray, nextExercise, setIsWordCorrect });

    const statusClassNames = {
        correct: 'translateForward__input--ok',
        error: 'translateForward__input--error'
    };

    const currentWord = sortedWords[step];

    const submit = async (event) => {
        event.preventDefault();

        await checkWord(currentWord.name);
    };

    return (
        <form onSubmit={submit} className='translateForward'>
            <h2 className='translateForward__title'>
                {currentWord?.translate}
            </h2>
            <p className='translateForward__subtitle'>
                {`${step + 1} / ${sortedWords.length}`}
            </p>
            <Input
                className={`translateForward__input ${statusClassNames[answerStatus] || ''}`}
                value={typedWord}
                onChange={(e) => setTypedWord(e.currentTarget.value)}
                placeholder="Type word"
                required
            />
            <Button className="translateForward__button">Submit</Button>
        </form>
    );
};

export default TranslateForward;