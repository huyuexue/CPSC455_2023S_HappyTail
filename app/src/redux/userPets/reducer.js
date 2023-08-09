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
    isLoading: false
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
                state.isLoading = true;
            })
            .addCase(getUserPetsAsync.fulfilled, (state, action) => {
                state.list = action.payload;
                state.isLoading = false;
            })
            .addCase(getUserPetsAsync.rejected, (state, action) => {
                console.log("rejected to get list by user");
                state.isLoading = false;
            })
            .addCase(addPetAsync.pending, (state, action) => {
            })
            .addCase(addPetAsync.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(addPetAsync.rejected, (state, action) => {
                console.log("rejected to add");
            })
            .addCase(deletePetAsync.pending, (state, action) => {
            })
            .addCase(deletePetAsync.fulfilled, (state, action) => {
                const id = action.payload;
                state.list = state.list.filter((item) => item._id !== id);
            })
            .addCase(deletePetAsync.rejected, (state, action) => {
                console.log("rejected to delete");
            })
            .addCase(updateDetailAsync.pending, (state, action) => {
            })
            .addCase(updateDetailAsync.fulfilled, (state, action) => {
                state.selectItem = action.payload;
            })
            .addCase(updateDetailAsync.rejected, (state, action) => {
                console.log("update detail rejected");
            })
            .addCase(getFavoriteAsync.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getFavoriteAsync.fulfilled, (state, action) => {
                state.favorite = action.payload.favoriteList;
                state.isLoading = false;
            })
            .addCase(getFavoriteAsync.rejected, (state, action) => {
                console.log("rejected to get favorite");
                state.isLoading = false;
            })
            .addCase(updateFavoriteAsync.pending, (state, action) => {
            })
            .addCase(updateFavoriteAsync.fulfilled, (state, action) => {
                state.favorite = action.payload.favoriteList;
            })
            .addCase(updateFavoriteAsync.rejected, (state, action) => {
                console.log("rejected to update favorite");
            });
    }
});

export const {getSelectedItem,clearSelectInUserPets, clearAll} = userPetsReducer.actions;
export default userPetsReducer.reducer