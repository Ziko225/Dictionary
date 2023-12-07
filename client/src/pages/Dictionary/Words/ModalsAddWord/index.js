import useAddWord from "./useAddWord";

const ModalsAddWord = ({ addWord }) => {
    const { name, translate, ref, msg, addNewWorld, inputHandler } = useAddWord(addWord);

    return (
        <form onSubmit={addNewWorld} className='addWord'>
            <span className='error'>{msg}</span>
            <input
                autoFocus
                ref={ref}
                value={name}
                onChange={inputHandler}
                required
                name="name"
                className='addWord__input'
                placeholder='Word'
            />
            <input
                value={translate}
                onChange={inputHandler}
                required
                className='addWord__input'
                name="translate"
                placeholder='Translate'
            />
            <button className='addWord__button'>Add</button>
        </form>
    );
};

export default ModalsAddWord;