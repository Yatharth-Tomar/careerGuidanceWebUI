import { createSlice } from "@reduxjs/toolkit";

const initialState={

    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    role: localStorage.geItem("role"),
     data: localStorage.getItem("data")


}
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:" "
})

//inside reducers all elements are actions
export const {}=authSlice.actions
export default authSlice.reducer