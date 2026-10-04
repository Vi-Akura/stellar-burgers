import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { TIngredient } from "@/utils/types";
import { getIngredientsApi } from "@/utils/burger-api";
import type { SerializedError } from "@reduxjs/toolkit";

type TIngredientsState = {
  data: TIngredient[];
  isLoading: boolean;
  error: SerializedError | null;
}

const initialState: TIngredientsState = {
  data: [],
  isLoading: false,
  error: null,
}

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const data = await getIngredientsApi();
    console.log('что вернуло апи', data);
    return data;
  }
)

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export const ingredientsReducer = ingredientsSlice.reducer;
