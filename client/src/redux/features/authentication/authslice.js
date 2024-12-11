import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "./authApi";

const initialState = {
    auth: false,
    isLoading: false,
    isError: false,
    error: "",
};

// async thunk
export const loginApi = createAsyncThunk("login", async ({email , password }) => {
    const loginResponse = await login(email , password);
    return loginResponse;
});

 const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(loginApi.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
            state.auth=false
        })
        .addCase(loginApi.fulfilled, (state, action) => {
            state.isLoading = false;
            state.auth = true;
        })
        .addCase(loginApi.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.auth = false;
            state.error = action.error?.message;
        });
    
    }
 })

 export default authSlice.reducer;