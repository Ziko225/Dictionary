import { BrowserRouter } from "react-router-dom";
import { AuthContext } from './context/authContext';
import Auth from './pages/Auth';
import AppRouter from './AppRouter';
import useAuth from './hooks/useAuth';
import Navigation from './components/Navigation';
import './styles.css';
import 'normalize.css';

function App() {
    const { isAuth, isOffline, setIsAuth, setIsOffline } = useAuth();

    return (
        <AuthContext.Provider value={{ isAuth, isOffline, setIsAuth, setIsOffline }}>
            {isAuth
                ? <BrowserRouter>
                    <Navigation />
                    <AppRouter />
                </BrowserRouter>
                : <Auth />
            }
        </AuthContext.Provider>
    );
}

export default App;