import {createAsyncThunk} from "@reduxjs/toolkit";
import DetailService from "./service"

export const getDetailAsync = createAsyncThunk(
    'getItemDetail',
    async (id) => {
        return await DetailService.getPet({id});
    }
);

