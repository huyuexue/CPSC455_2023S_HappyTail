import {createAsyncThunk} from "@reduxjs/toolkit";
import UserService from "./service"

export const getUserPetsAsync = createAsyncThunk(
    'getUserPets',
    async ({token}) => {
        return await UserService.getUserPets({token});
    }
);

export const addPetAsync = createAsyncThunk(
    'addItem',
    async ({input, token}) => {
        return await UserService.addPet({input, token});
    }
);

export const deletePetAsync = createAsyncThunk(
    'deleteItem',
    async ({id,token}) => {
        return await UserService.deletePet({id,token});
    }
);

export const updateDetailAsync = createAsyncThunk(
    'updateItemDetail',
    async ({pet, token}) => {
        return await UserService.updatePet({pet, token});
    }
);

export const getFavoriteAsync = createAsyncThunk(
    'getFavoriteList',
    async ({token}) => {
        return await UserService.getFavorite({token});
    }
);
export const updateFavoriteAsync = createAsyncThunk(
    'updateFavoriteList',
    async ({token, petId}) => {
        return await UserService.updateFavorite({token, petId});
    }
);