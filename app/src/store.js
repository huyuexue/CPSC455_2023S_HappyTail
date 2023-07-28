import { configureStore } from '@reduxjs/toolkit';
import petsReducer from "./redux/pets/reducer";
import petDetailReducer from "./redux/detail/reducer";
import userPetsReducer from "./redux/userPets/reducer";
export const store = configureStore({
    reducer: {
        pets: petsReducer,
        petDetail: petDetailReducer,
        user: userPetsReducer,
    }
});