import { useState } from 'react';

const useAuth = () => {
    const [isAuth, setIsAuth] = useState(true);
    const [isOffline, setIsOffline] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    return { setIsAuth, setIsOffline, setIsLoading, isLoading, isAuth, isOffline, };
};

export default useAuth;
