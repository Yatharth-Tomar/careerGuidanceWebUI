import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  courseData: [],
};

export const getAllCourses = createAsyncThunk("/courses/get", async () => {
  try {
    const response = axiosInstance.get("/courses");
    toast.promise(response, {
      loading: "loading courses...",
      success: "Courses Loaded Sucessfully",
      error: "Failed to get the course",
    });
    return (await response).data.courses;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

//thunk for creating course
export const addCourse = createAsyncThunk("/courses/post", async (data) => {
  try {
    console.log("action dispatched");

    const res = axiosInstance.post("/courses", data);
    toast.promise(res, {
      loading: "Creating your course.",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to create course",
    });
    return (await res).data;
  } catch (e) {
    toast.error(error?.response?.data?.message);
  }
});

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      if (action.payload) {
        state.courseData = [...action.payload];
      }
    });
  },
});

export default courseSlice.reducer;
