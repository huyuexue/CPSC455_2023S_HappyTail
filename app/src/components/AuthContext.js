import { createContext, useContext, useEffect, useState } from 'react';
import {
    signInWithEmailAndPassword,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence,
    GoogleAuthProvider,
    onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState('');
    const [emailErr, setEmailErr] = useState(''); // Add state for email error
    const [psErr, setPsErr] = useState(''); // Add state for password error

    const login = async (email, password, remember) => {
        try {
            setEmailErr(''); // Reset email error state
            setPsErr(''); // Reset password error state
            const persistence = remember ? browserLocalPersistence : browserSessionPersistence;

            await setPersistence(auth, persistence);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const token = await userCredential.user.getIdToken(true);

            setToken(token);
            setLoggedIn(true);
            localStorage.setItem('tokenId', token);
        } catch (error) {
            setEmailErr('Your email or password is incorrect');
            setPsErr('Your email or password is incorrect');
        }
    };

    const logout = () => {
        setToken('');
        setLoggedIn(false);
        localStorage.removeItem('tokenId');
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoggedIn(true);
                user.getIdToken().then((token) => {
                    setToken(token);
                    localStorage.setItem('tokenId', token);
                });
            } else {
                setLoggedIn(false);
                setToken('');
                localStorage.removeItem('tokenId');
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ loggedIn, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
