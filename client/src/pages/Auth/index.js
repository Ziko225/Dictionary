import useLogin from './useLogin';

const Auth = () => {
    const { handleSubmit, handlePassword, message } = useLogin();

    return (
        <div className='auth'>
            <h1 className='title'>Auth</h1>
            <form className='auth__form' onSubmit={handleSubmit}>
                <input required className='input' type='password' onChange={handlePassword} placeholder='Password' />
                <button type='submit' className='button'>Log in</button>
            </form>
            <h4 className="error">{message}</h4>
        </div>
    );
};

export default Auth;