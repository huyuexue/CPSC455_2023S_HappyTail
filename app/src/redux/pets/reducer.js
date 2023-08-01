import {createSlice} from "@reduxjs/toolkit";
import {addPetAsync, deletePetAsync, getPetsAsync, getSearchResultsAsync, getFilteredPetsAsync} from "./thunks";

const initialState  = {
    list:[],
    species:'',
    searchList:[],
    isLoading: false
}

const petsReducer = createSlice({
    name: 'pets',
    initialState,
    reducers: {
        updateSpecies: {
            reducer: (state, action)=> {
                var species = action.payload;
                state.species = species;
                if (species === '') {
                    state.searchList = state.list;
                }else if (species !== 'any') {
                    state.searchList = state.list.filter(pet => pet.species === species);
                } else {
                    state.searchList = state.list;
                }
            }
        },
        setSort: {
            reducer: (state, action) => {
                state.sort = action.payload;
            }
        },
        setSearch: {
            reducer: (state, action) => {
                state.search = action.payload;

            },
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPetsAsync.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getPetsAsync.fulfilled, (state, action) => {
                state.list = action.payload;
                state.isLoading = false;
            })
            .addCase(getPetsAsync.rejected, (state, action) => {
                console.log("rejected  to get all");
                state.isLoading = false;
            })
            .addCase(getSearchResultsAsync.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getSearchResultsAsync.fulfilled, (state, action) => {
                state.list = action.payload.matchingPets;
                state.isLoading = false;
            })
            .addCase(getSearchResultsAsync.rejected, (state, action) => {
                console.log("rejected to search");
                state.isLoading = false;
            })
            .addCase(getFilteredPetsAsync.pending, (state, action) => {
                console.log("waiting to get filtered pets");
            })
            .addCase(getFilteredPetsAsync.fulfilled, (state, action) => {
                state.list = action.payload;
            })
            .addCase(getFilteredPetsAsync.rejected, (state, action) => {
                console.log("rejected to get filtered pets");
            });

    }
});

export const {updateSpecies, setSort, setSearch} = petsReducer.actions;
export default petsReducer.reducer