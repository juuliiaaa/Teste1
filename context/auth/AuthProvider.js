import React, { useState, useEffect, useContext } from 'react';
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

// Hook para usar o contexto de autenticação
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};