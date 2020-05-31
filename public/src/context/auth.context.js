import { createContext } from 'react';

export const AuthContext = createContext({
    token: null,
    id: null,
    login: () => {},
    logout: () => {},
    isAuth: false
});