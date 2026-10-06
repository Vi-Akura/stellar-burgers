import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TIngredient, TConstructorState, TConstructorIngredient } from '@/utils/types';

const initialState: TConstructorState = {
  bun: null,
  ingredients: [],
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const ingredient = action.payload;
        if (ingredient.type === 'bun') {
          state.bun = ingredient;
        } else {
          state.ingredients.push(ingredient);
        }
      },
      prepare: (ingredient: TIngredient) => {
        return {
          payload: {
            ...ingredient,
            id: Math.random().toString(36).substring(2, 11) + Date.now().toString(36),
          } as TConstructorIngredient,
        };
      },
    },

    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },

    resetConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
  },
});

export const { addIngredient, removeIngredient, resetConstructor } = constructorSlice.actions;
export default constructorSlice.reducer;
