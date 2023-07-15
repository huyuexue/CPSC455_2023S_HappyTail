import {createAsyncThunk} from "@reduxjs/toolkit";
import PetsService from "./service"

export const getPetsAsync = createAsyncThunk(
    'getPets',
    async () => {
        return await PetsService.getPets();
    }
);


export const addPetAsync = createAsyncThunk(
    'addItem',
    async ({
               petName,
               species,
               breed,
               gender,
                age,
                picture,
                description,
                houseTrained,
                furType,
                size,
                spayed,
                petPersonality,
                postCode,
                reason,
                length,
                email,
                firstName,
                lastName,
                phoneNumber,
                postalCode,
                city,
                province}) => {
        return await PetsService.addPet({
            petName,
            species,
            breed,
            gender,
            age,
            picture,
            description,
            houseTrained,
            furType,
            size,
            spayed,
            petPersonality,
            postCode,
            reason,
            length,
            email,
            firstName,
            lastName,
            phoneNumber,
            postalCode,
            city,
            province
        });
    }
);

export const deletePetAsync = createAsyncThunk(
    'deleteItem',
    async (id) => {
        return await PetsService.deletePet({id});
    }
);

export const getSearchResultsAsync = createAsyncThunk(
    'getSearchResults',
    async ({searchTerm, sortTerm}) => {
        return await PetsService.getSearchResults({searchTerm, sortTerm});
    }
);