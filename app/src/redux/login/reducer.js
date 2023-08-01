import { createSlice } from '@reduxjs/toolkit'

export const loginReducer = createSlice({
  name: 'login',
  initialState: {
    value: true,
    token: null,
  },
  reducers: {
    TurnLogin: (state, action) => {
      state.value =false;
      state.token = action.payload;
      //console.log(state.value);
      //console.log(state.token);
    },
    TurnLogout: (state) => {
      state.value =true;
      state.token = null;
    },
  },
})

// Action creators are generated for each case reducer function
export const {TurnLogin, TurnLogout} = loginReducer.actions;

export default loginReducer.reducer;