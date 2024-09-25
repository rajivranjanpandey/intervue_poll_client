import { createSlice } from '@reduxjs/toolkit';

const livePollSlice = createSlice({
    name: 'livePoll',
    initialState: {
        data: null,
        loading: true
    },
    reducers: {
        fetchLivePollRequest: (state) => {
            state.loading = true;
        },
        fetchLivePollSuccess: (state, action) => {
            console.log('dt::::', action);
            state.data = action.payload;
            state.loading = false;
        },
        fetchLivePollFailure: (state, action) => {
            state.loading = false;
        }
    },
});

export const { fetchLivePollRequest, fetchLivePollSuccess, fetchLivePollFailure } = livePollSlice.actions;
export default livePollSlice.reducer;
