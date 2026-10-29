import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import categoryReducer from "./category.js";
import pharmacyReducer from "./pharmacyManagment.js";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer,
        pharmacy: pharmacyReducer,
    },
});