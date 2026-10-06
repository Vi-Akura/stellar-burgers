import { createSlice, createAsyncThunk, type SerializedError } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import type { TIngredient } from '@/utils/types';

type TIngredientsState = {
  data: TIngredient[];
  loading: boolean;
  error: SerializedError | null;
};

const initialState: TIngredientsState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchIngredients = createAsyncThunk<TIngredient[]>(
  'ingredients/fetchIngredients',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);

const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error || 'Ошибка при загрузке ингредиентов';
      });
  },
});

export default ingredientSlice.reducer;
