import {createSlice} from "@reduxjs/toolkit";
import {addPetAsync, deletePetAsync, getPetsAsync, getSearchResultsAsync, getFilteredPetsAsync} from "./thunks";

const initialState  = {
    list:[],
    search: {
        species:'',
        age:'',
        breed:'',
        size:'',
        gender:'',
        coatLength: '',
    },
    sort:"default",
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
                state.search.species = species;
                if (species === '') {
                    state.searchList = state.list;
                }else if (species !== 'Any') {
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
                console.log("waiting to search");
            })
            .addCase(getSearchResultsAsync.fulfilled, (state, action) => {
                state.list = action.payload;
                console.log(state.list);
            })
            .addCase(getSearchResultsAsync.rejected, (state, action) => {
                console.log("rejected to search");
            })
            .addCase(getFilteredPetsAsync.pending, (state, action) => {
                console.log("waiting to get filtered pets");
            })
            .addCase(getFilteredPetsAsync.fulfilled, (state, action) => {
                state.list = action.payload;
                console.log(state.list);
            })
            .addCase(getFilteredPetsAsync.rejected, (state, action) => {
                console.log("rejected to get filtered pets");
            });

    }
});

export const {updateSpecies, setSort, setSearch} = petsReducer.actions;
export default petsReducer.reducer