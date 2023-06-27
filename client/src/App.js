import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [password, setPassword] = useState("0@34982");
    const [isAuth, setIsAuth] = useState(true);

    const url = "http://mc.bychyk.it:5500";

    const httpPost = async (path) => {
        try {
            const response = await fetch(`${url}/${path}`, {
                method: "POST",
                origin: url,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({ password }),
            });

            return response;

        } catch (error) {
            alert(error.message);
        }
    };

    const auth = async (e) => {
        e.preventDefault();
        const response = await httpPost("auth");

        if (!response.ok) {
            alert(response.statusText);
        }
    };

    const getWords = () => {

    };

    const addWord = () => {

    };

    const removeWord = () => {

    };

    const toggleIsLearned = () => {

    };

    useEffect(() => {
        if (!isAuth) {
            return;
        };


    }, [isAuth]);

    return isAuth && false
        ? <div className='App auth'>
            <h1 className='title'>Auth</h1>
            <form className='auth__form' onSubmit={e => (auth(e.currentTarget.value))}>
                <input className='input' type='password' onChange={(e) => setPassword(e.currentTarget.value)} placeholder='Password' />
                <button className='button' onClick={auth}>Log in</button>
            </form>
        </div>
        : <div className='auth'>
            <h1 className='title'>Auth</h1>
            <form className='auth__form' onSubmit={e => (auth(e.currentTarget.value))}>
                <input className='input' type='password' onChange={(e) => setPassword(e.currentTarget.value)} placeholder='Password' />
                <button className='button' onClick={auth}>Log in</button>
            </form>
        </div>;

}

export default App;
