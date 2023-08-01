import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getFavoriteAsync, getUserPetsAsync} from "../redux/userPets/thunks";
import {getPetsAsync} from "../redux/pets/thunks";
;

export const DataFetching = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('tokenId');
    const isLogin = (token === '') ? false : true;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (isLogin) {
                console.log("isLogin is " + isLogin)
                try {
                    await Promise.all([
                        dispatch(getUserPetsAsync({ token })),
                        dispatch(getFavoriteAsync({ token })),
                    ]);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
            try {
                await dispatch(getPetsAsync());
            } catch (error) {
                console.error('Error fetching pets:', error);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [dispatch, isLogin, token]);
    return isLoading;
};

