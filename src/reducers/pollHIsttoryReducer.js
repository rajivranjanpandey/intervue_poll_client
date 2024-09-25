import { createSlice } from '@reduxjs/toolkit';

const pollHistorySlice = createSlice({
    name: 'pollHistory',
    initialState: {
        data: null,
        loading: true
    },
    reducers: {
        fetchPollHistoryRequest: (state) => {
            state.loading = true;
        },
        fetchPollHistorySuccess: (state, action) => {
            state.data = action.payload;
            state.loading = false;
        },
        fetchPollHistoryFailure: (state, action) => {
            state.loading = false;
        }
    },
});

export const { fetchPollHistoryRequest, fetchPollHistorySuccess, fetchPollHistoryFailure } = pollHistorySlice.actions;
export default pollHistorySlice.reducer;
