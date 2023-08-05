import {Outlet, useNavigate} from "react-router-dom";
import NavBar from "./NavBar";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useEffect, useState} from "react";
import {TurnLogin, TurnLogout} from "../redux/login/reducer";
import {useDispatch} from "react-redux";
export default function Layout() {
    const auth = getAuth();
    const nav = useNavigate();
    const dispatch = useDispatch();

    const[token, setToken] = useState('');
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                getToken(user).then(r => dispatch(TurnLogin(token))
                );
            } else {
                localStorage.removeItem('tokenId');
                dispatch(TurnLogout(token));
                nav("/login")
            }
        });
    },[])

    const getToken=async (user)=>{
        const token= await user.getIdToken();
        console.log(token);
        setToken(token);
    }


    return (
        <div className="App">
            <NavBar />
            <Outlet/>
        </div>
    )
}