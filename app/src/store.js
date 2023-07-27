import { configureStore } from '@reduxjs/toolkit';
import petsReducer from "./redux/pets/reducer";
import petDetailReducer from "./redux/detail/reducer"
import updateFormReducer from "./components/updatePet/updateFormSlice"

export const store = configureStore({
    reducer: {
        pets: petsReducer,
        petDetail: petDetailReducer,
        updateForm: updateFormReducer
    }
});