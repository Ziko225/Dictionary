import Communicate from '../../Communicate';
import Button from 'components/Button';

import './styles.scss';

const WordPreview = ({ gameLogic }) => {
    const { wordsArray, speak, nextExercise } = gameLogic;

    return (
        <>
            <Communicate
                title="Your words to learn today:"
                subtitle="Click to listen"
            />

            <ul className='randomWords'>
                {wordsArray.map((word) =>
                    <li
                        className={word.learned ? 'learned' : ''}
                        onClick={() => speak(word.name)}
                        key={word.id}
                    >
                        {word.name}
                    </li>
                )}
            </ul>

            <ul className='randomTranslateWords'>
                {wordsArray.map((word) =>
                    <li
                        className={word.learned ? 'learned' : ''}
                        key={word.id}
                    >
                        {word.name} - {word.translate}
                    </li>
                )}
            </ul>

            <Button onClick={nextExercise}>Ready? Let's start ➤</Button>
        </>
    );
};

export default WordPreview;