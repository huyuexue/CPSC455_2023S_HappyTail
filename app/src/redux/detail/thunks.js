import {createAsyncThunk} from "@reduxjs/toolkit";
import DetailService from "./service"

export const getDetailAsync = createAsyncThunk(
    'getItemDetail',
    async (id) => {
        return await DetailService.getPet({id});
    }
);

export const updateDetailAsync = createAsyncThunk(
    'updateItemDetail',
    async ({id}) => {
        return await DetailService.updatePet({});
    }
);