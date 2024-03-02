import { createSlice } from "@reduxjs/toolkit";

export const refreshsidebar = createSlice({
name:"refreshSidebar",
initialState:true,
reducers:{
    refreshSidebarFun :(state)=>{
     console.log("Refreshing sidebar from Redux");
     return(state = !state)
    },
},
});
export const {refreshSidebarFun} = refreshsidebar.actions;
export default refreshsidebar.reducer;

