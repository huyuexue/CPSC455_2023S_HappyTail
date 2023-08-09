import {Outlet} from "react-router-dom";
import NavBar from "./NavBar";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useEffect, } from "react";
import {TurnLogin, TurnLogout} from "../redux/login/reducer";
import {useDispatch, useSelector} from "react-redux";
import {getPetsAsync} from "../redux/pets/thunks";
import {getFavoriteAsync, getUserPetsAsync} from "../redux/userPets/thunks";
import {getUserAsync} from "../redux/login/thunks";
export default function Layout() {
    const auth = getAuth();
    const dispatch = useDispatch();
    const finishStatusLoading = useSelector(state => state.login.finishStatusLoading);

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                getToken(user);
            } else {
                localStorage.removeItem('tokenId');
                localStorage.removeItem('prevURL');
                dispatch(TurnLogout());
            }
        });
    },[finishStatusLoading])

    const getToken=async (user)=>{
        const token= await user.getIdToken();
        dispatch(TurnLogin(token));
    }

    const isLogIn = useSelector(state => !state.login.value);
    const token = useSelector(state => state.login.token);
    useEffect(()=>{
        if (finishStatusLoading) {
            dispatch(getPetsAsync());
            if (isLogIn) {
                dispatch(getUserAsync({token}));
                dispatch(getUserPetsAsync({token}));
                dispatch(getFavoriteAsync({token}));
            }
        }
    },[finishStatusLoading]);

    return (
        <div className="App">
            <NavBar />
            <Outlet/>
        </div>
    )
}
