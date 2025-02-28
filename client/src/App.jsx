import { useEffect, useState } from 'react';

import { accountService } from './services/accountService';

import useAuth from './hooks/useAuth';
import useFilter from "./hooks/useFilter";

import { AuthContext } from './context/authContext';
import { FilterContext } from "./context/filterContext";

import AppRouter from './AppRouter';

import Auth from './pages/Auth';

import Navigation from './components/Navigation';
import Loading from './components/Loading';

import './globalStyles.scss';
import 'normalize.css';

function App() {
    const auth = useAuth();
    const filter = useFilter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkIsAuth();
    }, []);

    const checkIsAuth = async () => {
        try {
            const response = await accountService.getInfo();

            if (!response.ok) {
                return auth.setStatus('isAuth', false);
            }

            auth.setUserData(await response.json());

            auth.setStatus('isAuth', true);
        } catch (error) {
            auth.setStatus('isAuth', false);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <AuthContext.Provider value={auth}>
            <FilterContext.Provider value={filter}>
                {auth.isAuth ?
                    <>
                        <Navigation />
                        <AppRouter />
                    </>
                    : <Auth />
                }
            </FilterContext.Provider>
        </AuthContext.Provider>
    );
}

export default App;