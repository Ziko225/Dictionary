import { BrowserRouter } from "react-router-dom";
import { AuthContext } from './context/authContext';
import Auth from './pages/Auth';
import AppRouter from './AppRouter';
import useAuth from './hooks/useAuth';
import Navigation from './components/Navigation';
import { FilterContext } from "./context/filterContext";
import useFilter from "./hooks/useFilter";
import './styles.css';
import 'normalize.css';

function App() {
    const auth = useAuth();

    const filter = useFilter();

    return (
        <AuthContext.Provider value={auth}>
            <FilterContext.Provider value={filter}>
                {auth.isAuth
                    ? <BrowserRouter>
                        <Navigation />
                        <AppRouter />
                    </BrowserRouter>
                    : <Auth />
                }
            </FilterContext.Provider>
        </AuthContext.Provider>
    );
}

export default App;