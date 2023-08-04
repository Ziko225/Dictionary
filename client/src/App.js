import { BrowserRouter } from "react-router-dom";
import { AuthContext } from './context/authContext';
import Auth from './pages/Auth';
import AppRouter from './AppRouter';
import useAuth from './hooks/useAuth';
import Navigation from './components/Navigation';

function App() {
    const { isAuth, isOffline, login } = useAuth();

    return (
        <AuthContext.Provider value={{ isAuth, isOffline, login }}>
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