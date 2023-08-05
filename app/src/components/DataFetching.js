import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getFavoriteAsync, getUserPetsAsync} from "../redux/userPets/thunks";
import {getPetsAsync} from "../redux/pets/thunks";
import {getUserAsync} from "../redux/login/thunks";

export default function DataFetching(){
    const dispatch = useDispatch();
    const token = useSelector(state => state.login.token);
    const isLogin = useSelector(state => state.login.value);
    const isLoadingAllPets = useSelector(state => state.pets.isLoading);
    const isLoadingUserPets = useSelector(state => state.pets.isLoading);
    const isLoading = isLoadingAllPets || (isLogin? isLoadingUserPets : false);
    useEffect(() => {
        console.log(isLogin)
        if (!isLogin) {
            dispatch(getUserPetsAsync({token}));
            dispatch(getFavoriteAsync({token}));
            dispatch(getUserAsync({token}));
        }
        dispatch(getPetsAsync());
    }, []);

    return {isLoading};
};

