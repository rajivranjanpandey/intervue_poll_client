import { createSlice } from '@reduxjs/toolkit';

const pollSlice = createSlice({
    name: 'poll',
    initialState: {
        data: null,
        loading: true
    },
    reducers: {
        fetchActivePollRequest: (state) => {
            state.loading = true;
        },
        fetchActivePollSuccess: (state, action) => {
            state.data = action.payload;
            state.loading = false;
        },
        fetchActivePollFailure: (state, action) => {
            state.loading = false;
        }
    },
});

export const { fetchActivePollRequest, fetchActivePollSuccess, fetchActivePollFailure } = pollSlice.actions;
export default pollSlice.reducer;
