import {createSlice} from "@reduxjs/toolkit";
import {getDetailAsync,} from "./thunks";


const initialState = {
    detailOpen: false,
    selectItem: {},
}
const detailReducer = createSlice({
    name: 'detail',
    initialState,
    reducers: {
        getSelectedItem: {
            reducer: (state, action) => {
                state.selectItem = action.payload;
            }
        },
        openDetailView: {
            reducer: (state, action) => {
                state.detailOpen = true;
            }
        },
        closeDetailView: {
            reducer: (state, action) => {
                state.detailOpen = false;
            }
        },
        closeDetailViewFull: {
            reducer: (state, action) => {
                state.selectItem = {};
                state.detailOpen = false;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDetailAsync.pending, (state, action) => {
            })
            .addCase(getDetailAsync.fulfilled, (state, action) => {
                state.selectItem = action.payload
            })
            .addCase(getDetailAsync.rejected, (state, action) => {
                console.log("get detail rejected");
            });
    }
});

export const {getSelectedItem, openDetailView, closeDetailView, closeDetailViewFull} = detailReducer.actions;
export default detailReducer.reducer
