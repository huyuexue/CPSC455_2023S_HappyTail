import {createSlice} from "@reduxjs/toolkit";
import {getDetailAsync, updateDetailAsync} from "./thunks";

const initialState = {
    detailOpen: false,
    updateOpen: false,
    selectItem: {},
    updated: false,
}
const detailReducer = createSlice({
    name: 'detail',
    initialState,
    reducers: {
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
        openUpdateView: {
            reducer: (state, action) => {
                state.updateOpen = true;
                state.detailOpen = false;
            }
        },
        closeUpdateView: {
            reducer: (state, action) => {
                state.updateOpen = false;
                state.detailOpen = true;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDetailAsync.pending, (state, action) => {
                console.log("waiting to open detail view");
            })
            .addCase(getDetailAsync.fulfilled, (state, action) => {
                state.selectItem = action.payload
                console.log(state.selectItem);
            })
            .addCase(getDetailAsync.rejected, (state, action) => {
                console.log("get detail rejected");
            })
            .addCase(updateDetailAsync.pending, (state, action) => {
                console.log("waiting to update detail");
            })
            .addCase(updateDetailAsync.fulfilled, (state, action) => {
                state.selectItem = action.payload
                state.updated = !state.updated;
            })
            .addCase(updateDetailAsync.rejected, (state, action) => {
                console.log("update detail rejected");
            });

    }
});

export const {openDetailView, closeDetailView, closeDetailViewFull, openUpdateView, closeUpdateView} = detailReducer.actions;
export default detailReducer.reducer
export const detailViewStatus = (state) => state.detailView.detailOpen;
export const updateStatus = (state) => state.detailView.updateOpen;