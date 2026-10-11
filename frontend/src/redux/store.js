import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import pharmisctAuthReducer from "./pharmisctAuthSlice.js";
import categoryReducer from "./category.js";
import pharmacyReducer from "./pharmacyManagment.js";
export const store = configureStore({
    reducer : {
        auth : authReducer,
        pharmisctAuth : pharmisctAuthReducer,
        category : categoryReducer,
        pharmacy : pharmacyReducer
    }
})