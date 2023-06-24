import { configureStore } from '@reduxjs/toolkit';
import petsReducer from "./components/pets/petsSlice";
import petDetailReducer from "./components/petDetail/petDetailSlice"
import updateFormReducer from "./components/updatePet/updateFormSlice"

export const store = configureStore({
    reducer: {
        pets: petsReducer,
        petDetail: petDetailReducer,
        updateForm: updateFormReducer
    }
});