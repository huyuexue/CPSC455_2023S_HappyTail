import { createSlice } from '@reduxjs/toolkit'
import {getUserAsync} from "./thunks";

const loginReducer = createSlice({
    name: 'login',
    initialState: {
        user: {},
        value: true,
        token: null,
        isLoading: false,
        finishStatusLoading: false,
    },
    reducers: {
        TurnLogin: (state, action) => {
            state.value =false;
            state.token = action.payload;
            state.finishStatusLoading = true;
            },
        TurnLogout: (state) => {
            state.value =true;
            state.token = null;
            state.user = {};
            state.finishStatusLoading = true;
            },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserAsync.pending, (state, action) => {
              state.isLoading = true;
            })
            .addCase(getUserAsync.fulfilled, (state, action) => {
              state.user = action.payload;
              state.isLoading = false;
            })
            .addCase(getUserAsync.rejected, (state, action) => {
              console.log("rejected to get list by user");
              state.isLoading = false;
            });
    }
})

// Action creators are generated for each case reducer function
export const {TurnLogin, TurnLogout} = loginReducer.actions;

export default loginReducer.reducer;