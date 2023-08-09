import {createAsyncThunk} from "@reduxjs/toolkit";
import UserService from "./service"

export const getUserAsync = createAsyncThunk(
    'getUserInfo',
    async ({token}) => {
        return await UserService.getUser({token});
    }
);
