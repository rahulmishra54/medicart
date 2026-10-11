import { createSlice } from "@reduxjs/toolkit";

const pharmacySlice = createSlice({
    name: "pharmacy",
    initialState: {
        pharmacies: [],
        pharmaciesStats: {
            totalPharmacies: 0,
            pendingPharmacies: 0,
            approvedPharmacies: 0,
            rejectedPharmacies: 0,
        },
        loading: false,
        statsLoading: false,
        error: null,
        statsError: null,
    },
    reducers: {
        getAllPharmacies: (state, action) => {
            state.pharmacies = action.payload;
        },
        getPharmacyStats: (state, action) => {
            state.pharmaciesStats = action.payload;
            state.statsError = null;
        },
        setPharmacyLoading: (state, action) => {
            state.loading = action.payload;
        },
        setPharmacyStatsLoading: (state, action) => {
            state.statsLoading = action.payload;
        },
        setPharmacyError: (state, action) => {
            state.error = action.payload;
        },
        setPharmacyStatsError: (state, action) => {
            state.statsError = action.payload;
        },
        updatePharmacy: (state, action) => {
            state.pharmacies = state.pharmacies.map((pharmacy) => (
                pharmacy._id === action.payload._id ? action.payload : pharmacy
            ));
        },
    },
});

export const {
    getAllPharmacies,
    getPharmacyStats,
    setPharmacyLoading,
    setPharmacyStatsLoading,
    setPharmacyError,
    setPharmacyStatsError,
    updatePharmacy,
} = pharmacySlice.actions;
export default pharmacySlice.reducer;