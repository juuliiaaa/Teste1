import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase.config';
import AuthContext from './AuthContext';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (usuario) => {
            setUser(usuario);
            setCarregando(false);
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, carregando }}>
            {children}
        </AuthContext.Provider>
    );
};