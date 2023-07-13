import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    isOpen: false,
    selected:{}
}
const updateFormSlice = createSlice({
    name:'updateForm',
    initialState,
    reducers: {
        openUpdateView: {
            reducer: (state, action) => {
                state.isOpen = true;
            }
        },
        closeUpdateView: {
            reducer: (state, action) => {
                state.isOpen = false;
            }
        },
        update: {
            reducer: (state, action) =>{
                state.selected =  action.payload;
                console.log(state.selected );
            }
        }
    }

});

export const {openUpdateView, closeUpdateView, update} = updateFormSlice.actions;
export default updateFormSlice.reducer
export const updateStatus = (state) => state.updateForm.isOpen;
export const editItem = (state) => state.updateForm.selected;