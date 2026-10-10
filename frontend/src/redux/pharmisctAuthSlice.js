import {createSlice} from "@reduxjs/toolkit";

const pharmisctAuthSlice = createSlice({
    name : "pharmisctAuth",
    initialState : {
        user : null,
       

    },
    reducers: {
        registerPharmisct : (state,action)=>{
            state.user = action.payload.user;
        },
        loginPharmisct : (state,action)=>{
            state.user = action.payload.user;
        },
        logoutPharmisct : (state,action)=>{
            state.user = null;
        }
    }
})


export const {registerPharmisct, loginPharmisct, logoutPharmisct} = pharmisctAuthSlice.actions;
export default pharmisctAuthSlice.reducer;