import { createSlice } from '@reduxjs/toolkit'

export const loginReducer = createSlice({
  name: 'login',
  initialState: {
    value: true,
  },
  reducers: {
    TurnLogin: (state) => {
      state.value =false
      console.log("the value is true")
    },
    TurnLogout: (state) => {
        state.value =true
        console.log("the value is false")
    },
  },
})

// Action creators are generated for each case reducer function
export const {TurnLogin, TurnLogout} = loginReducer.actions;

export default loginReducer.reducer;