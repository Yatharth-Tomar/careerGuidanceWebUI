import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const boolString = "true";
const localLog = localStorage.getItem("isLoggedIn");

const initialState = {
  isLoggedIn: boolString === localLog || false,
  role: localStorage.getItem("role") || "USER",
  data: JSON.parse(localStorage.getItem("data")) || {},
};

//function to handle post request to the backend server application using asyncthunk
//here toast is use to show the status of request as per the three stages of proises that are load,sucess,error
export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const res = axiosInstance.post("user/register", data);
    toast.promise(res, {
      loading: "Wait creating your account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to create account",
    });

    return (await res).data;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
});

export const loginAction = createAsyncThunk("/auth/login", async (data) => {
  try {
    const res = axiosInstance.post("user/login", data);
    toast.promise(res, {
      loading: "Wait Logging you in...",
      success: (data) => {
        console.log("hi  ", data?.data?.message);
        return data?.data?.message;
      },
      error: "Failed to Login",
    });

    return (await res).data;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
});

export const logoutAction = createAsyncThunk("/auth/logout", async () => {
  try {
    const res = axiosInstance.get("user/logout");
    toast.promise(res, {
      loading: "Wait Logging you out...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to Logout",
    });

    return (await res).data;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
});
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducer: " ",

  extraReducers: (builder) => {
    builder
      .addCase(loginAction.fulfilled, (state, action) => {
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
        if (state.data == undefined) {
          localStorage.setItem("isLoggedIn", false);
        } else {
          state.isLoggedIn = true;
          localStorage.setItem("isLoggedIn", true),
            localStorage.setItem("role", action?.payload?.user?.role);
          localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        }
      })
      .addCase(logoutAction.fulfilled, (state) => {
        localStorage.clear();
        state.role = "";
        state.data = {};
        state.isLoggedIn = false;
      });
  },
});

//inside reducers all elements are actions
export const {} = authSlice.actions;
export default authSlice.reducer;
