import {createSlice} from "@reduxjs/toolkit";


const authSlice = createSlice({
    name : "auth",
    initialState : {
        user : null,
     
    },
    reducers : {
        register:(state,action)=>{
            state.user = action.payload.user;
        },
        login : (state,action)=>{
            state.user = action.payload.user;
        },
        logout : (state,action)=>{
            state.user = null;
        }

    }
})



export const {register,login,logout}= authSlice.actions;
export default authSlice.reducer;