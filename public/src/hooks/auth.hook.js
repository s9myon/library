import { useState, useCallback, useEffect } from 'react';

const storageName = 'userData';

export function useAuth() {
    const [token, setToken] = useState(null);
    const [id, setId] = useState(null);

    const login = useCallback((userId, userToken) => {
        setToken(userToken);
        setId(userId);

        localStorage.setItem(storageName, JSON.stringify({
            id: userId, token: userToken
        }));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setId(null);

        localStorage.removeItem(storageName);
    }, []);
    // за счёт этого useEffect у нас не слетает login
    // после перезагрузки страницы
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));

        if (data && data.token) {
            login(data.token, data.id);
        }
    }, [login]);

    return { login, logout, token, id }
}