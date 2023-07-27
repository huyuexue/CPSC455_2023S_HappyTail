import {createSlice, nanoid} from "@reduxjs/toolkit";
import {addPetAsync, deletePetAsync, getUserPetsAsync, getSearchResultsAsync} from "./thunks";

const initialState  = {
    list:[],
    search:"",
    sort:"default"
}

const userPetsReducer = createSlice({
    name: 'userPets',
    initialState,
    reducers: {
        setSort: {
            reducer: (state, action) => {
                state.sort = action.payload;
            }
        },
        setSearch: {
            reducer: (state, action) => {
                state.search = action.payload;

            },
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserPetsAsync.pending, (state, action) => {
                console.log("waiting to get all");
            })
            .addCase(getUserPetsAsync.fulfilled, (state, action) => {
                state.list = action.payload;
            })
            .addCase(getUserPetsAsync.rejected, (state, action) => {
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
            });
            

    }
});

export const {setSort, setSearch} = userPetsReducer.actions;
export default userPetsReducer.reducer