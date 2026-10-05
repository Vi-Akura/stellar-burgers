import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUserApi,
  registerUserApi,
  getUserApi,
  logoutApi,
} from "@/utils/burger-api";

import type { TUser } from "@/utils/types";
import type { TLoginData, TRegisterData } from "@/utils/burger-api";
import type { SerializedError } from "@reduxjs/toolkit";

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: SerializedError | null;
}

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: null,
}

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData: TRegisterData) => registerUserApi(userData)
)

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userData: TLoginData) => loginUserApi(userData)
)

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async () => logoutApi()
)

export const fetchAuthUser = createAsyncThunk(
  'user/fetchAuthUser',
  async () => {
    return await getUserApi();
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    //регистрация
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })

      //вход
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })

      //выход
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthChecked = true;
      })

      //проверка токена
      .addCase(fetchAuthUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAuthUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(fetchAuthUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.user = null;
      })
  },
});

export const userReducer = userSlice.reducer;
