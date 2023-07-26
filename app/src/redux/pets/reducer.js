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
    sort:"default"
}

const petsReducer = createSlice({
    name: 'pets',
    initialState,
    reducers: {
        updateSpecies: {
            reducer: (state, action)=> {
                state.search.species = action.payload;
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
                console.log("waiting to get all");
            })
            .addCase(getPetsAsync.fulfilled, (state, action) => {
                state.list = action.payload;
            })
            .addCase(getPetsAsync.rejected, (state, action) => {
                console.log("rejected  to get all");
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
                state.list = action.payload;
                console.log(state.list);
            })
            .addCase(deletePetAsync.rejected, (state, action) => {
                console.log("rejected to delete");
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