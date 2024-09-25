import { createSlice } from '@reduxjs/toolkit';

const studentSlice = createSlice({
    name: 'student',
    initialState: {
        data: null,
        loading: true
    },
    reducers: {
        fetchStudentRequest: (state) => {
            state.loading = true;
        },
        fetchStudentSuccess: (state, action) => {
            state.data = action.payload;
            state.loading = false;
        },
        fetchStudentFailure: (state, action) => {
            state.loading = false;
        }
    },
});

export const { fetchStudentRequest, fetchStudentSuccess, fetchStudentFailure } = studentSlice.actions;
export default studentSlice.reducer;
