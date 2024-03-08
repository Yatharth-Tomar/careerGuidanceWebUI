import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../Redux/slices/authSlice"

const store=configureStore({
    reducer:{
        auth:authSliceReducer
    }

})

export default store;