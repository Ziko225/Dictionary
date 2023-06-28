import useAuth from './hooks/useAuth';
import Auth from './pages/Auth';
import Words from './pages/Words';
import { AuthContext } from './context/authContext';

function App() {
    const { isAuth, setIsUnAuth, login } = useAuth();

    return (
        <AuthContext.Provider value={{ isAuth, setIsUnAuth, login }}>
            {isAuth ? <Words /> : <Auth />}
        </AuthContext.Provider>
    );
}

export default App;
