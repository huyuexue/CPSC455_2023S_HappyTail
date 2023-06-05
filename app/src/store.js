import { configureStore } from '@reduxjs/toolkit';
import petsReducer from "./components/pets/petsSlice";
import petDetailReducer from "./components/petDetail/petDetailSlice"


export const store = configureStore({
    reducer: {
        pets: petsReducer,
        petDetail: petDetailReducer,
    }
});