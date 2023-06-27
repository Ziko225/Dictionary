import { useContext, useState } from 'react';
import './styles.css';
import { AuthContext } from '../../context/authContext';

const Auth = () => {
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);

    return (
        <div className='auth'>
            <h1 className='title'>Auth</h1>
            <form className='auth__form' onSubmit={e => (login(e, password))}>
                <input required className='input' type='password' onChange={(e) => setPassword(e.currentTarget.value)} placeholder='Password' />
                <button type='submit' className='button'>Log in</button>
            </form>
        </div>
    );
};

export default Auth;