import {createSlice} from "@reduxjs/toolkit";
import {
    addPetAsync,
    deletePetAsync,
    getFavoriteAsync,
    getUserPetsAsync,
    updateDetailAsync,
    updateFavoriteAsync
} from "./thunks";

const initialState  = {
    list:[],
    selectItem: {},
    favorite:[],
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
        clearSelectInUserPets: {
            reducer: (state, action) => {
                state.selectItem = {};
            }
        },
        clearAll: {
            reducer: (state, action) => {
                state.list = [];
                state.favorite = [];
            }
        }
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
            })
            .addCase(getFavoriteAsync.pending, (state, action) => {
                console.log("waiting to get favorite");
            })
            .addCase(getFavoriteAsync.fulfilled, (state, action) => {
                state.favorite = action.payload.favoriteList;
            })
            .addCase(getFavoriteAsync.rejected, (state, action) => {
                console.log("rejected to get favorite");
            })
            .addCase(updateFavoriteAsync.pending, (state, action) => {
                console.log("waiting to update favorite");
            })
            .addCase(updateFavoriteAsync.fulfilled, (state, action) => {
                state.favorite = action.payload.favoriteList;
                console.log(state.favorite);
            })
            .addCase(updateFavoriteAsync.rejected, (state, action) => {
                console.log("rejected to update favorite");
            });
    }
});

export const {getSelectedItem, openUpdateView, clearSelectInUserPets, clearAll} = userPetsReducer.actions;
export default userPetsReducer.reducer