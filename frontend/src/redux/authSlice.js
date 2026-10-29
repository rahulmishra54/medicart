import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        initialized: false,
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.initialized = true;
        },
        logout: (state) => {
            state.user = null;
            state.initialized = true;
        },
        restoreSession: (state, action) => {
            state.user = action.payload;
            state.initialized = true;
        },
    },
});

export const { login, logout, restoreSession } = authSlice.actions;
export default authSlice.reducer;