import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import pharmisctAuthReducer from "./pharmisctAuthSlice.js";
import categoryReducer from "./category.js";
export const store = configureStore({
    reducer : {
        auth : authReducer,
        pharmisctAuth : pharmisctAuthReducer,
        category : categoryReducer
    }
})