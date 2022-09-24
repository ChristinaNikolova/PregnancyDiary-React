import { createContext } from 'react';

import { useLocalStorage } from '../hooks/useLocaleStorage';

export const AuthContext = createContext();

export const AuthProvider = ({
    children
}) => {
    const [user, setUser] = useLocalStorage('auth', {});

    const userLogin = (authData) => {
        setUser(authData);
    };

    const userLogout = () => {
        setUser({});
    };

    return (
        <AuthContext.Provider value={{
            userLogin,
            userLogout,
            isAuthenticated: !!user.token,
            isAdmin: !!user.isAdmin,
            username: user.username,
            userId: user.id,
        }}>
            {children}
        </AuthContext.Provider>
    );
}