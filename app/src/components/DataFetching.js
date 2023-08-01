import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getFavoriteAsync, getUserPetsAsync} from "../redux/userPets/thunks";
import {getPetsAsync} from "../redux/pets/thunks";
;

export const DataFetching = () => {
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => !state.login.value);
    const token = useSelector((state) => state.login.token);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            if (isLogin) {
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

        if (isLogin) {
            fetchData();
        } else {
            setIsLoading(false);
        }
    }, [dispatch, isLogin]);
    return isLoading;
};

