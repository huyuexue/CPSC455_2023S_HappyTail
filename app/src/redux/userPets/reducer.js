import {createSlice} from "@reduxjs/toolkit";
import {addPetAsync, deletePetAsync, getUserPetsAsync, updateDetailAsync} from "./thunks";

const initialState  = {
    list:[],
    updateOpen: false,
    selectItem: {},
}

const userPetsReducer = createSlice({
    name: 'userPets',
    initialState,
    reducers: {
        getSelectedItem: {
            reducer: (state, action) => {
                state.selectItem = action.payload;
            }
        },
        openUpdateView: {
            reducer: (state, action) => {
                state.updateOpen = true;
            }
        },
        closeUpdateView: {
            reducer: (state, action) => {
                state.updateOpen = false;
            }
        },
        clearSelectInUserPets: {
            reducer: (state, action) => {
                state.selectItem = {};
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserPetsAsync.pending, (state, action) => {
                console.log("waiting to get list by user");
            })
            .addCase(getUserPetsAsync.fulfilled, (state, action) => {
                state.list = action.payload;
            })
            .addCase(getUserPetsAsync.rejected, (state, action) => {
                console.log("rejected to get list by user");
            })
            .addCase(addPetAsync.pending, (state, action) => {
                console.log("waiting to add");
            })
            .addCase(addPetAsync.fulfilled, (state, action) => {
                state.list.push(action.payload);
                console.log(state.list);
            })
            .addCase(addPetAsync.rejected, (state, action) => {
                console.log("rejected to add");
            })
            .addCase(deletePetAsync.pending, (state, action) => {
                console.log("waiting to delete");
            })
            .addCase(deletePetAsync.fulfilled, (state, action) => {
                const id = action.payload;
                state.list = state.list.filter((item) => item._id !== id);
            })
            .addCase(deletePetAsync.rejected, (state, action) => {
                console.log("rejected to delete");
            })
            .addCase(updateDetailAsync.pending, (state, action) => {
                console.log("waiting to update detail");
            })
            .addCase(updateDetailAsync.fulfilled, (state, action) => {
                state.selectItem = action.payload;
            })
            .addCase(updateDetailAsync.rejected, (state, action) => {
                console.log("update detail rejected");
            });
    }
});

export const {getSelectedItem, openUpdateView, closeUpdateView, clearSelectInUserPets} = userPetsReducer.actions;
export default userPetsReducer.reducer