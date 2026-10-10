import {createSlice} from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name : "category",
    initialState:{
        categories : [],
        categoryStats : []
    },
    reducers :{
        getAllCategories :(state,action)=>{
            state.categories = action.payload;
        },
        getCategoryStats :(state,action)=>{
            state.categoryStats = action.payload;
        }
    }
})

export const {getAllCategories, getCategoryStats} = categorySlice.actions;
export default categorySlice.reducer;