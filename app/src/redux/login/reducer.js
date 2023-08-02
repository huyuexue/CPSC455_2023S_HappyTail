import { createSlice } from '@reduxjs/toolkit'
import {getUserAsync} from "./thunks";

const loginReducer = createSlice({
    name: 'login',
    initialState: {
        user: {},
        value: true,
        token: null,
    },
    reducers: {
        TurnLogin: (state, action) => {
          state.value =false;
          state.token = action.payload
        },
        TurnLogout: (state) => {
          state.value =true;
          state.token = null;
          state.user = {};
          },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserAsync.pending, (state, action) => {
              console.log("waiting to get list by user");
            })
            .addCase(getUserAsync.fulfilled, (state, action) => {
              state.user = action.payload;
              console.log(state.user);
            })
            .addCase(getUserAsync.rejected, (state, action) => {
              console.log("rejected to get list by user");
            });
    }
})

// Action creators are generated for each case reducer function
export const {TurnLogin, TurnLogout} = loginReducer.actions;

export default loginReducer.reducer;