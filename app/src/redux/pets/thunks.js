import {createAsyncThunk} from "@reduxjs/toolkit";
import PetsService from "./service"

export const getPetsAsync = createAsyncThunk(
    'getPets',
    async () => {
        return await PetsService.getPets();
    }
);

export const getSearchResultsAsync = createAsyncThunk(
    'getSearchResults',
    async ({searchTerm, sortTerm}) => {
        return await PetsService.getSearchResults({searchTerm, sortTerm});
    }
);

export const getFilteredPetsAsync = createAsyncThunk(
    'getFilteredPets',
    async ({age, breed, size, gender, coatLength}) => {
        return await PetsService.getFilteredPets({age, breed, size, gender, coatLength});
    }
);
